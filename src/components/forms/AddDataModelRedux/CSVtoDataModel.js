import FileUploadWidget from "./FileUploadWidget"

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

            let fieldDict = props.dataModel
            let starting_index
            fieldDict.length==0?starting_index=0:starting_index = Math.max(...props.dataModel.map(dm=>dm.id)) + 1

            for(let i = 0; i<csvLength; i++){
                fieldDict.push({fieldName: fieldName(headers[i]),rawFieldName: fieldName(headers[i]),type: fieldType(data[i]), 'required': false, 'unique': false, id:i + starting_index})
            }
            props.setDataModel(fieldDict)
            }
    }

    return(
        <form id='csv-upload-form'>
            <FileUploadWidget fileUpload={fileUpload} fileName={props.csvFileName}/>
        </form>
        )
}