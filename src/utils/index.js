/**
 * Description: Created Count of Year
 * @method getCreatedYear
 * @param {String} createdDate 
 * @returns {String}  
 */
export const getCreatedYear = (createdDate) => {
    const createdYear = new Date(createdDate).getFullYear();
    const presentYear = new Date().getFullYear();
    return presentYear - createdYear;
};

/**
 * Description: Get Checkbox data
 * @method getCheckboxData
 * @param {Array} data
 * @param {String} label
 * @param {Boolean} origin 
 * @returns {Array}
 */
export const getCheckboxData = (data, label, origin = false) => {
    let result = [];
    data.map(item => {
        return result.push(origin ? item[label].name : item[label])
    })
    return [...new Set(result)];
}

/**
 * Description: Set data in localStorage
 * @method setLocalstorage
 * @param {Object} data 
 */
export const setLocalstorage = (data) => {
    if (data) {
        for (let value in data) {
            localStorage.setItem(value, data[value]);
        }
    }
}

/**
 * Description: Remove data from localStorage
 * @method removeFromLocalStorage
 * @param {Object} data 
 */
export const removeFromLocalStorage = (data) => {
    if (data) {
        data.forEach(item => {
            localStorage.removeItem(item);
        })
    }
}