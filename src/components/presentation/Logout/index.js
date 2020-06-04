import React from 'react';
import Button from '@material-ui/core/Button';
import logout from '../../../assets/images/logout.svg';
import './Logout.scss';

export const Logout = (props) =>{
    const logOut = () => {
        localStorage.clear();
        props.handleLogout();
    }

    return <Button id="logout" size="large" onClick={logOut} color="primary"><img src={logout} alt="logout" /></Button>
}