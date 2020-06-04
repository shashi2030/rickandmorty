import React from 'react';
import Grid from '@material-ui/core/Grid';
import * as constants from '../../../constants';
import { getCheckboxData } from '../../../utils';
import { Filter } from '../../presentation/Filter';
import './Accordion.scss';

class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: true,
            filteredOption: constants.FILTERED_OPTIONS
        }
    }
    
    componentDidMount(){
        this.setState({
            filteredOption: {
                species: [],
                gender: [],
                origin: []
            }
        })
    }

    /**
     * Description: Set Accordion open/close true/false
     * @method handleAccordion
     * @param {null}
     */
    handleAccordion = () => {
        this.setState({
            filtered: !this.state.filtered
        })
    }

    /**
     * Description: Added filter on click
     * @method filterClick
     * @param {Event} e
     * @param {String} option
     */
    filterClick = (e, option) => {
        const filterName = (e.target.id);
        let data = { ...this.state.filteredOption };
        if (e.target.checked) {
            data[option].push(filterName)
        } else {
            data[option].splice(data[option].indexOf(filterName), 1)
        }
        this.setState({
            ...this.state,
            filteredOption: data
        }, () => {
            this.props.filteredOption(this.state.filteredOption);
        });
    }

    render() {
        const accordionClass = this.state.filtered ? "right" : "down";
        const activeClass = !this.state.filtered ? "active" : "";
        const all_character = this.props.data;
        const species = getCheckboxData(all_character, constants.SPECIES);
        const gender = getCheckboxData(all_character, constants.GENDER);
        const origin = getCheckboxData(all_character, constants.ORIGIN, true);
        return (
            <Grid container className="accordion">
                <Grid item >
                    <div className="accordion-title" onClick={this.handleAccordion}>{constants.FILTERED_SOMETHING} <span className={`arrow ${accordionClass}`}></span></div>
                    <div className={`filter-container ${activeClass}`}>
                        <Filter
                            heading={constants.SPECIES_FILTER_HEADING}
                            data={species}
                            filterClick={this.filterClick}
                            option={constants.SPECIES}
                        />
                        <Filter
                            heading={constants.GENDER_FILTER_HEADING}
                            data={gender}
                            filterClick={this.filterClick}
                            option={constants.GENDER}
                        />
                        <Filter
                            heading={constants.ORIGIN_FILTER_HEADING}
                            data={origin}
                            filterClick={this.filterClick}
                            option={constants.ORIGIN}
                        />
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default Accordion;
