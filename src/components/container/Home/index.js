import React, { Component } from "react";
import { ItemList } from '../../presentation/ItemList/ItemList';
import { Header } from '../../presentation/Header';
import Accordion from '../Accordion/Accordion';
import { baseService } from '../../../service/apiService';
import * as constants from '../../../constants';
import * as utils from '../../../utils';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            filteredOption: constants.FILTERED_OPTIONS,
            searchText: '',
            sortOption: ''
        }
    };

    componentDidMount() {        
        const sorting = localStorage.getItem('sorting');
        this.getAllCharacter(sorting)
    };

    /**
     * Description: Get Data from character API
     * @method getAllCharacter
     * @param {null} 
     */
    getAllCharacter = (sorting) => {
        const data = {
            sorting: sorting,
            searchName: '',
            filters: {
                species: [],
                gender: [],
                origin: []
            }
        };
        baseService.post('/filters', data).then(response => {
            if (response.status === 200) {
                this.setState({
                    dataList: response.data,
                    sortOption: sorting
                })
            }
        }).catch(error => {
            console.log(error)
        })
    };

    /**
     * Description: Get Filter Data API call
     * @method getFilteredData
     * @param {null} 
     */
    getFilteredData = () => {
        const { searchText, sortOption, filteredOption } = this.state;
        const data = {
            sorting: sortOption,
            searchName: searchText,
            filters: {
                species: filteredOption.species,
                gender: filteredOption.gender,
                origin: filteredOption.origin
            }
        };
        utils.setLocalstorage({ sorting: sortOption });
        baseService.post('/filters', data).then(response => {
            this.setState({ filteredDataList: response.data })
        }).catch(error => {
            try {
                if (error) {
                    console.log(constants.NETWORK_ERROR)
                }
            } catch (error) {
                console.log(error)
            }
        })
    }

    /**
     * Description: Filter Option update in State
     * @method addedFilterOption
     * @param {Object} options 
     */
    addedFilterOption = (options) => {
        this.setState({
            filteredOption: options
        }, () => {
            this.getFilteredData();
        })
    }

    /**
     * Description: Search By name text update in State
     * @method searchByName
     * @param {Object} options 
     */
    searchByName = (e) => {
        const searchText = e.target.value.trim();
        this.setState({
            searchText: searchText
        });
    }

    /**
     * Description: Get data filtere with search name
     * @method handleSearch
     * @param {null}  
     */
    handleSearch = () => {
        this.getFilteredData();
    }

    /**
     * Description: Sorting order update in State
     * @method handleSorting
     * @param {String} sortOption 
     */
    handleSorting = (sortOption) => {
        this.setState({
            sortOption: sortOption
        }, () => {
            this.getFilteredData();
            this.updateSorting();
        });

    }

    updateSorting = () => {
        const username = localStorage.getItem('userId');
        const data = {
            username: username,
            sorting: this.state.sortOption
        }
        baseService.post('/updatesort', data).then(response => {
            if (response.status === 200) {
                console.log('sorting data updated')
            }
        }).catch(error => {
            console.log(error)
        })
    }

    /**
     * Description: Redirect to the Login page
     * @method handleLogout
     * @param {null} 
     */
    handleLogout = () => {
        this.props.history.push('/');
    }

    render() {
        console.log(this.state)
        return (
            <>
                <Header
                    searchByName={this.searchByName}
                    handleSorting={this.handleSorting}
                    handleLogout={this.handleLogout}
                    handleSearch={this.handleSearch}
                    sortingValue={this.state.sortOption}
                />
                <Accordion data={this.state.dataList} filteredOption={this.addedFilterOption} />
                <ItemList data={this.state.filteredDataList || this.state.dataList} />
            </>
        )
    }
}

export default Home;