import { NavLink } from "react-router-dom";
import React,{useState,Fragment} from "react";
import {LOGIN_LABEL,PROFILE_PAGE_LABEL, LOGOUT_LABEL} from './constants.navbar'
import { useAuth0 } from "../../react-auth0-spa";
import { USER, POWER_OFF } from "../../constants/faicons"
import { PROFILE_ROUTE } from "../../constants/routes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Login = (props) => {
    const {isAuthenticated, user, loading, authError,loginWithRedirect,logoutWithRedirect } = useAuth0();
    const [isOpen,setOpen] =useState(false);

    const toggle = () => setOpen(prevState => !prevState);
    const disabled= authError===true  ? {disabled:true} : {onClick : () => loginWithRedirect()} 
    const dropdownContent = isOpen===true ? "tdb__dropdown__content  tdb__dropdown__content--show" : "tdb__dropdown__content tdb__dropdown__content--hide"
  
    return (<Fragment>      
            {!isAuthenticated && !user && 
                <button className="tdb__button__base nav__main__login" {...disabled}>
                    {LOGIN_LABEL}
                </button>
            }
            {isAuthenticated && user &&
                <div className="tdb__dropdown" >
                    <button onClick={toggle} className="nav__main__profile__button"  aria-expanded="false">
                        <img src={user.picture}
                            alt={PROFILE_PAGE_LABEL}
                            className="nav__main__profile__img" 
                            width="50"/>
                    </button>               
                    <div className={dropdownContent}>
                        <NavLink tag = {NavLink} className="tdb__dropdown__button"
                            to = {PROFILE_ROUTE}
                            exact>
                            <FontAwesomeIcon icon={USER} className="mr-3" />{PROFILE_PAGE_LABEL}                 
                        </NavLink>
                        <NavLink tag = {NavLink} className="tdb__dropdown__button"
                            onClick={() => logoutWithRedirect()}
                            to = {PROFILE_ROUTE}
                            exact>
                            <FontAwesomeIcon icon={POWER_OFF} className="mr-3" />{LOGOUT_LABEL}                 
                        </NavLink>                  
                    </div>
                   </div>
            }                 
            </Fragment>       
    )
}