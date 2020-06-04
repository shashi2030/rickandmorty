import React from 'react';

export const Checkbox = props =>{
    return <label ><input type="checkbox" id={props.item} onClick={(e)=>props.handleFilter(e, props.option)} /> {props.item} </label>
}