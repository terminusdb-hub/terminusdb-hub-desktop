import React, { useState, useEffect } from "react";
import { WOQLGraph } from '@terminusdb/terminusdb-react-graph';
import { WOQLTable } from '@terminusdb/terminusdb-react-table';
import TerminusClient from '@terminusdb/terminusdb-client';
//import { WOQLChart } from '@terminusdb/terminusdb-react-chart';
import { Container } from 'reactstrap'

export const ResultViewer = ({bindings, type, viewConfig, query, updateQuery}) => {
    
    const [currentView, setView] = useState(viewConfig)
   // const [myviewer, setConfig] = useState(undefined);

    /*function updateView(newconfig, newvtype){
        setView(newConfig)
        if(newvtype && newvtype != type) type = newvtype
    }*/
    const woqlGraphConfig= TerminusClient.View.graph();
    woqlGraphConfig.height(500).width(800)

        const result = new TerminusClient.WOQLResult({bindings:bindings},query);

        let viewer = woqlGraphConfig.create(null);
        viewer.setResult(result);
    const myviewer=viewer;

   
    return (<>{bindings && type==="table" &&
                <WOQLTable bindings={bindings} config={currentView} query={query} updateQuery={updateQuery} />
              }
              {bindings && type==="graph" &&
                <WOQLGraph config={myviewer.config} dataProvider={myviewer} query={query} updateQuery={updateQuery}/>
              }
            </>                        
    )
}
//{JSON.stringify(bindingsMy, null, 4)} 
//{JSON.stringify(bindingsMy, null, 4)}
//<WOQLTable bindings={bindingsMy}  query={query}/>
 /*{(binds && type == "table") && 
                <WOQLTable bindings={binds} config={currentView} query={query} updateQuery={updateQuery} updateView={updateView}/>
            }
            {(binds && type == "graph") && 
                <WOQLGraph bindings={binds} view={currentView} query={query} updateQuery={updateQuery} updateView={updateView}/>
            }
            {(binds && type == "chart") && 
                <WOQLChart bindings={binds} view={currentView} query={query} updateQuery={updateQuery} updateView={updateView}/>
            }*/