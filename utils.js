const dataService = require('./dataService');

const sortList = (list) => {
    list.sort(function(a,b){
        return((a.timestamp<b.timestamp)? -1:((a.timestamp == b.timestamp)?0:1));
    });
    return list
}

const isValidData = (list, dataMap) =>{
    for(i=0; i<list.length; i++){
        let payerName = list[i]['payer']
        let payerPoints = list[i]['points']

        if(dataMap.has(payerName)){
            let tempVal = dataMap.get(payerName)
            tempVal += payerPoints
            if(tempVal<0){
                return false
            }
            dataMap.set(payerName, tempVal)
        }else{
            dataMap.set(payerName, payerPoints)
        }
    }
    for(var i=0; i<list.length; i++){
        if(dataMap.get(list[i]['payer']) < 0)
            return false
    }
    dataService.setData(dataMap)
    return true
}


const checkInput = (inputData) => {
    if(inputData.payer && inputData.points && inputData.timestamp)
        return true
    return false
}

const calculateSpendingPoints = (total_pts, list) =>{
    let solution = []
    let sum = 0
    let pos = 0
    while(sum<total_pts){

//  CODE TO EXECUTE IF THERE IS NOT ENOUGH POINTS FOR THE
        if(pos == list.length){
            let errorMessage = "ERROR: Not enough points! Please restart the server with new data."
            return errorMessage;
        }

//  CODE TO EXECUTE IF A NEGATIVE VALUE IS ENCOUNTERED
        if(list[pos]['points'] < 0){
            let neg_val = list[pos]['points']
            let diff = 0
            for(i=0; i<solution.length;i++){

                if(solution[i]['payer'] == list[pos]['payer']){
                    diff = solution[i]['points'] + neg_val
                    if(diff>0){
                        sum += neg_val
                        neg_val += solution[i]['points']
                        delete solution[i]
                        solution.push({'payer': list[pos]['payer'], 'points': diff})
                        pos++;
                        break;
                    }else{
                        neg_val -= solution[i]['points']
                        delete solution[i]
                    }
                }
            }
            if(neg_val < 0){
                let errorMessage = "ERROR: The payer: "+list[pos]['payer'] + ", has an outstanding balance of: " + diff + " points. Please restart the server with new data."
                return errorMessage
            }
            solution = solution.filter(function(x) {
                return x !== undefined;
            });
            delete list[pos-1]
        }

// CODE TO EXECUTE IF THE ADDITION OF "SUM" AND THE POINTS IN THE DATA IS LESS THAN THE SPENT POINTS
        else if(sum + list[pos]['points'] < total_pts){
            sum += list[pos]['points']
            solution.push({'payer': list[pos]['payer'], 'points': list[pos]['points']})
            delete list[pos]
            pos++
        }

// CODE TO EXECUTE IF THE SUM OF SUM AND THE POINTS IN THE DATA IS MORE THE SPENT POINTS
        else{
            let diff = total_pts - sum
            solution.push({'payer': list[pos]['payer'], 'points': diff})
            sum+=total_pts
            list[pos]['points'] = list[pos]['points'] - diff
            break
        }
    }
    var newList = list.filter(function(x) {
        return x !== undefined;
    });
    dataService.setData(newList)
    return solution
}

module.exports = {
    isValidData,
    calculateSpendingPoints,
    sortList,
    checkInput,
}