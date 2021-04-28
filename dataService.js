let data;
let dataMap;

const initData = () =>{
    data = [];
    dataMap = new Map();
}

const getData = () =>
    data;

const setData = (newData) => {
    data = newData;
    return;
}

const getMapData = () =>
    dataMap;

const setMapData = (newDataMap) => {
    dataMap = newDataMap;
    return;
}


module.exports = {
    initData,
    getData,
    setData,
    getMapData,
    setMapData,
}