'use strict'

let data = [
    {name: "life", speaker:"Hugh Jackman", birthDate:1969, birthPlace:"Austin, TX"},
    {name: "love", speaker:"Rodney Smith", birthDate:1975, birthPlace:"San Jose, CA"},
    {name: "hope", speaker:"Scarlett Jones", birthDate:1973, birthPlace:"New York, NY"},
    {name: "winning", speaker:"Wolverine", birthDate:1975, birthPlace:"Sunnydale, CA"},
    {name: "happiness", speaker:"Jennifer Allen", birthDate:1992, birthPlace:"Ruston, VA"},
];

const getAll = () => {
    return data;
};

const getItem = (name) => {
    return data.find((item) => {
        return item.name === name;
    });
};

const deleteItem = (name) => {
    // retain array length for later comparison after array modification
    const oldLength = data.length;
    data = data.filter((item) => {
        return item.name !== name;
    });
    // if old & new array lengths differ, item was deleted
    return {deleted: oldLength !== data.length, total: data.length };
};

const addItem = (newItem) => {
    if (!newItem["name"]) {
        return {added: false };
    }
    const oldLength = data.length;
    // use existing get() method to check if Item already in our list
    let found = getItem(newItem.name);
    if (!found) {
        data.push(newItem);
    }
    // if old & new array lengths differ, item was added
    return {added: oldLength !== data.length, total: data.length };
};

module.exports = { getAll, getItem, addItem, deleteItem }