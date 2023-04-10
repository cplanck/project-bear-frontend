const getOccurrence = (array, value) => {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

const checkDuplicateFieldNames = (fieldList, fieldName, occuranceNum) => {
    console.log('is this running?!')
    let existingFieldNames = fieldList.map(row=>row.fieldName)
    if(getOccurrence(existingFieldNames,fieldName) > occuranceNum){return true}
    else{return false}
}

const sanitizeUserInput = (userInput) => {
        if(userInput.length > 0){
        const regex = /^[0-9a-z_]+$/
        const isSanitized = regex.exec(userInput)
        return(isSanitized?true:false)
    }
    return(true)
}

export default function validateInput(dataModel, userInput, itemNum){

    if(checkDuplicateFieldNames(dataModel, userInput, itemNum)){
        return('This field name already exists')
    }
    else if(!sanitizeUserInput(userInput)){
        return('Field names can only have lowercase a-z letters, numbers or underscores')
    }
    else if(userInput.length < 2){
        return('Field names must have at least 2 letters')
    }
    else if(userInput.length > 50){
        return('Field names must be less than 50 characters long')
    }
    else{
       return('')
    }
}