import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import * as constants from '../../../constants';
import './Sorting.scss';

export const Sorting = (props) => {
    const handleSorting = (event) => {
        props.handleSorting(event.target.value);
    };
    return (
        <>       
            <FormControl variant="outlined" size="small" className='formControl'>
                <InputLabel id="demo-simple-select-outlined-label">{constants.SORT_BY_ID}</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={handleSorting}
                    label="sortingbyid"
                    value={props.sortingValue}
                    >
                    <MenuItem value={'asc'}>{constants.ASCENDING_OPTION}</MenuItem>
                    <MenuItem value={'dsc'}>{constants.DESCENDING_OPTION}</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}