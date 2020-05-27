import React, { useState } from "react";
import Loading from "../../components/Reports/Loading";
import { WOQLClientObj } from "../../init/woql-client-instance";
import { TERMINUS_SUCCESS, TERMINUS_ERROR, TERMINUS_WARNING, TERMINUS_COMPONENT } from "../../constants/identifiers"
import { CREATE_DB_FORM } from "./constants.createdb"
import { goDBHome } from "../../components/Router/ConsoleRouter"
import { APIUpdateReport } from "../../components/Reports/APIUpdateReport";
import { DBDetailsForm } from "./DBDetails"
import { AccessControlErrorPage } from "../../components/Reports/AccessControlErrorPage"

export const DBCreateForm = () => {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState();
    let update_start = Date.now()
    const {woqlClient, reconnectServer} = WOQLClientObj();
    const canCreate =  woqlClient.connection.capabilitiesPermit("create_database")
    if(!canCreate){
        return (<AccessControlErrorPage />)
    }

    /**
     * Creates the database and, if a schema graph is set, creates the main schema graph
     * On success, it fires up the home page of the database and rebuilds the list of databases 
     */
    function onCreate(doc, schema){
        update_start = Date.now()
        setLoading(true)
        let accountid = woqlClient.account() || woqlClient.uid()
        return woqlClient.createDatabase(doc.id, doc, accountid)
        .then(() => {
            let message = `${CREATE_DB_FORM.createSuccessMessage} ${doc.label}, (id: ${doc.id}) `
            if(schema){
                return createStarterGraph(message, doc.id, accountid)
            }
            else {
                message += CREATE_DB_FORM.noSchemaGraphMessage
                let rep = {message: message, status: TERMINUS_SUCCESS, time: (Date.now() - update_start)}
                setReport(rep)
                afterCreate(doc.id, accountid, rep)
            }
        })
        .catch((err) => {
            let message = `${CREATE_DB_FORM.createFailureMessage} ${doc.label}, (id: ${doc.id}) `
            setReport({error: err, status: TERMINUS_ERROR, message: message, time: (Date.now() - update_start)});
        })
        .finally(() => {
            setLoading(false)
        })    
    }

    /**
     * Creates default main schema graph when chosen
     */
    function createStarterGraph(message, id, acc){
        return woqlClient.createGraph("schema", "main", CREATE_DB_FORM.schemaGraphCommitMessage)
        .then(() => {
            let rep = {status: TERMINUS_SUCCESS, message: message, time: (Date.now() - update_start)}
            setReport(rep)
            afterCreate(id, acc, rep)
        }).catch((e) => {
            message += CREATE_DB_FORM.schemaFailedMessage
            let wrep = {message: message, error: e, status: TERMINUS_WARNING, time: (Date.now() - update_start)}
            setReport(wrep)
            afterCreate(id, acc, wrep)
        })
    }

    /**
     * Reloads database list by reconnecting and goes to the db home
     */
    function afterCreate(id, acc, mreport){
        reconnectServer()
        goDBHome(id, acc, mreport)
    }

     return (<>
        {loading && 
            <Loading type={TERMINUS_COMPONENT} />
        }
        {(report && report.error) && 
            <APIUpdateReport status={report.status} error={report.error} message={report.message} time={report.time} />
        }
        <DBDetailsForm 
            buttons={CREATE_DB_FORM.buttons}
            onSubmit={onCreate}
        /> 
    </>)
}
