'use strict'

let data = [
    {name: "Life", speaker:"Hugh Jackman", birthDate:1969, birthPlace:"Austin, TX"},
    {name: "Love", speaker:"Rodney Smith", birthDate:1975, birthPlace:"San Jose, CA"},
    {name: "Hope", speaker:"Scarlett Jones", birthDate:1973, birthPlace:"New York, NY"},
    {name: "Winning", speaker:"Wolverine", birthDate:1975, birthPlace:"Sunnydale, CA"},
    {name: "Happiness", speaker:"Jennifer Allen", birthDate:1992, birthPlace:"Ruston, VA"},
];

const getAll = () => {
    return data;
};

const getItem = (name) => {
    return data.find((item) => {
        return item.name.toLowerCase() === name.toLowerCase();
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

const addItem = (newBook) => {
    const oldLength = data.length;
    // use existing get() method to check if book already in our list
    let found = this.get(newBook.name);
    if (!found) {
        data.push(newBook);
    }
    // if old & new array lengths differ, item was added
    return {added: oldLength !== data.length, total: data.length };
};

export { getAll, getItem, addItem, deleteItem }