import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import './Search.scss';

export const Search = (props) => {
    return (<>
        <TextField
            onChange={props.searchByName}
            label="Search by Name"
            type="search"
            size="small"
            variant="outlined"
            InputProps={{
                endAdornment: (
                    <InputAdornment>
                        <IconButton onClick={props.handleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    </>)
}