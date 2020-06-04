import React from 'react';
import { Checkbox } from '../Checkbox';
import './Filter.scss';

export const Filter = (props) => {
    return (
        <div className="box">
            <h4>{props.heading}</h4>
            {
                props.data && props.data.map((item, i) => {
                    return <Checkbox key={i} handleFilter={props.filterClick} option={props.option} item={item} />
                })
            }
        </div>
    )
}