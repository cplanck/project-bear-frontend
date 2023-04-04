import CSVFileUpload from "../forms/CSVFileUpload"

export default function CSVtoDataModel(props){

    function fieldName(fieldName){
        return fieldName?.split(' ').join('').split('-').join('_').split('.').join('').toLowerCase()
    }

    function fieldType(field){
        const regex = /^-?\d+(?:\.\d+)?$/
        const onlyNumbers = regex.exec(parseFloat(field))
        if(onlyNumbers != null){
            return('number')
        }else{
           console.log(field)
            return('character')
        }
    }


    function fileUpload(formInput){

        let reader = new FileReader()
        reader.readAsText(formInput)
        reader.onload = function(e){
            props.setCsvFileName(formInput.name)
            let csvdata = e.target.result
            let headers = csvdata.split('\n')[0].split('\r')[0].split(',')
            const csvLength = headers.length

            let data = csvdata.split('\n')[1].split('\r')[0].split(',')

            let fieldDict = []
            for(let i = 0; i<csvLength; i++){
                fieldDict.push({fieldName: fieldName(headers[i]), type: fieldType(data[i]), 'required': false, 'unique': false, id:i})
            }
            props.setDataModel(fieldDict)
            }
    }

    return(
        <form id='csv-upload-form'>
            <CSVFileUpload fileUpload={fileUpload} fileName={props.csvFileName}/>
        </form>
        )
}