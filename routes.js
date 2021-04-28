const dataService = require('./dataService');
const utils = require('./utils')

const spendPoints = (req, res) => {
    list = dataService.getData()
    sorted_list = utils.sortList(list)
    dataMap = dataService.getMapData()
    if(!utils.isValidData(sorted_list, dataMap))
        res.send('ERROR: The points of a payer is in negative. Please check the data')
    solution = utils.calculateSpendingPoints(req.body.points, list)
    res.send(solution)
};

const addTransaction = (req, res) => {
    newData = dataService.getData()
    if(utils.checkInput(req.body)){
        res.send({msg: req.body})
        newData.push(req.body)
        dataService.setData(newData)
        console.log(req.body)
    }
    else
        res.send("ERROR: Incorrect data. Please enter the correct data!")
}

const balancePoints = (req, res) => {
    balanceData = dataService.getData()
    res.send(balanceData)
    console.log(balanceData)
}

module.exports = {
    addTransaction,
    spendPoints,
    balancePoints,
}