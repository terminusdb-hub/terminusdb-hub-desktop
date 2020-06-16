/**
 * Defines universal structure of Terminus Console page:
 * Full Page Container
 *      Navbar (top of page)
 */
import React from "react";
import { ConsoleNavbar } from "../../components/Navbar/ConsoleNavbar";
import { Container } from "reactstrap";
//import Footer  from "./Footer"
import Loading from "../../components/Reports/Loading"
import { TERMINUS_PAGE } from "../../constants/identifiers"
import { TerminusDBSpeaks } from "../../components/Reports/TerminusDBSpeaks"


export const PageView = (props) => {
    return (
        <div id={props.id} className="console__page" id="terminus-console-page">           
            <ConsoleNavbar onHeadChange={props.onHeadChange} />
            <main >
                <div className="console__page__container">     
                { props.children }
                </div>
            </main>
        </div>
    )
}
