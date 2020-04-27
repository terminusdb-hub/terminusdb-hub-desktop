import React, {useState} from "react";
import { Container, Row, Col, Jumbotron,
		Button,Form,FormGroup,Label,Input,FormText,Collapse} from "reactstrap";
import { useAuth0} from "../../react-auth0-spa";
import Loading from "../../components/Loading";
import { createDatabaseLabels } from '../../variables/content'
import { createDatabaseForm } from "../../variables/formLabels"
import { useForm } from 'react-hook-form';
import NavBar from '../../components/NavBar'
import { Tabs, Tab } from 'react-bootstrap-tabs';
import { CREATE_DATABASE_TAB, CLONE_LOCAL_DB_TAB, CLONE_REMOTE_DB_TAB } from "../../labels/tabLabels"
import CreateDB from "./Create"
import CloneLocalDB from "./CloneLocalDB"
import CloneRemoteDB from "./CloneRemoteDB"

const CreateDatabase = (props) => {
  const { user, loading } = useAuth0();
  const { register, handleSubmit, errors } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  if (loading || !user) {
    return <Loading />;
  }

  return (
  	<Container fluid className="h-100 pl-0 pr-0">
    	<NavBar resetDB = {true}/>
  		<Container className="flex-grow-1">
            <hr className = "my-space-50"/>
            <legend>{ createDatabaseLabels.title }</legend>
            <hr className = "my-3"/>
            <Tabs>
                <Tab label = { CREATE_DATABASE_TAB }>
                    <CreateDB action = { CREATE_DATABASE_TAB }/>
                </Tab>
                <Tab label = { CLONE_LOCAL_DB_TAB }>
                    <CloneLocalDB action = { CLONE_LOCAL_DB_TAB }/>
                </Tab>
				<Tab label = { CLONE_REMOTE_DB_TAB }>
                    <CloneRemoteDB action = { CLONE_REMOTE_DB_TAB }/>
                </Tab>
            </Tabs>
  		</Container>
   </Container>
  )

}

export default CreateDatabase;