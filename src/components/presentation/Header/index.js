import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Search } from '../Search';
import { Sorting } from '../Sorting';
import { Logout } from '../Logout';
import * as constants from '../../../constants';
import './Header.scss';


export const Header = (props) => {
    const getUser = () => {
        return localStorage.getItem('name');
    }
    return (
        <header>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={4} className="logo-heading">
                    <h1>{constants.APP_HEADING}</h1>
                    <span className="username">Welcome <span>{getUser()}</span></span>
                </Grid>
                <Grid item xs={12} sm={12} md={4} className="search">
                    <Search searchByName={props.searchByName} handleSearch={props.handleSearch} />
                </Grid>
                <Grid item xs={12} sm={12} md={4} className="select">
                    <Sorting handleSorting={props.handleSorting} sortingValue={props.sortingValue} />
                    <Logout handleLogout={props.handleLogout} />
                </Grid>
            </Grid>
        </header>
    )
}