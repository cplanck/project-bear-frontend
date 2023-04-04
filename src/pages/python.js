import AlertContext from '../components/Context'
import { useContext, useCallback, useState, useEffect } from 'react'
import { AppContext } from '../components/Context'
import Head from 'next/head'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { materialDark, materialDarkInit, materialLight, materialLightInit } from '@uiw/codemirror-theme-material';
// import {axios} from 'axios';



export default function Python() {

  const [context, setContext] = useContext(AppContext)
  let [pythonCode, setPythonCode] = useState('')
  let [pythonResponse, setPythonResponse] = useState('')
  let [pythonPrints, setPythonPrints] = useState([])

  let initialScript  = ''
  useEffect(()=>{
    if(localStorage.getItem('script')){
        initialScript = localStorage.getItem('script')
        setPythonCode({script: initialScript})
    }else{
        initialScript = "def data_processing_layer(bytes):"
    }
  }
  ,[])

  function handleAlerts(alertType, alertSeverity, alertMessage){
    let newContext = context
    newContext[alertType].status = true
    newContext[alertType].type = alertSeverity
    newContext[alertType].message = alertMessage
    setContext( JSON.parse(JSON.stringify(newContext)))
  }

  const onChange = useCallback((value, viewUpdate) => {
    setPythonCode({script: value})
    localStorage.setItem('script', value)
  }, []);


  async function submitCode(){
    setPythonResponse('')
    let response = await fetch('http://localhost:8000/api/python/' ,{method: 'POST', body: JSON.stringify(pythonCode)})
    let body =  await response.json()
    console.log(body)
    setPythonResponse(body.output)
    setPythonPrints(body.print_statements.split('\n'))
  }

  let pyPrints = []
  for(let i = 0; i < pythonPrints.length; i++){
      pyPrints.push(<p>{pythonPrints[i]}</p>)
  }

  return (
    <div className='codeMirrorWrapper'>
     <CodeMirror
     className='codeMirror'
      value={pythonCode.script}
      height="600px"
      extensions={[python()]}
      theme={materialDarkInit({
        settings: {
          caret: '#c6c6c6',
          fontFamily: 'monospace',
        }
      })
        }
        onChange={onChange}
    />
    <button onClick={submitCode}>Test Code</button>
    {pythonResponse}
    <div>{pyPrints}</div>
    </div>
  )
}