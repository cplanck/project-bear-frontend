import { createContext, useContext } from 'react';
import React, { useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import MUITheme from '@/MUITheme'

export const AppContext = createContext();
export const InstrumentContext = createContext();
export const DeploymentContext = createContext();
export const DataAvailableContext = createContext();

let instrumentList = [
  {'name': 'SIMB3 2022 #1','id': '1', 'serial_number':'30043406123456789' ,'description': 'Standard SIMB3 with Bruncin Temperature String', 'shortname': 'SIMB3', 'instrument_color': '#4287f5','avatar': 'https://nyc3.digitaloceanspaces.com/ci-webapp-space/static/simb3/img/simb3.png', 'status': 'deployed','starred': false, 'starred_date': '', 'purchase_date': '2023-03-03 17:11:43.776674', 'template': true, data_model: {configured: false, field_num: 0, entries: 0}},
  {'name': 'UpTempO 2018 #1','id': '2', 'serial_number':'30043406123456789', 'description': 'UpTempO with added snow pinger', 'shortname': 'UpTempO', 'instrument_color': '#c76626','avatar': 'https://nyc3.digitaloceanspaces.com/ci-webapp-space/static/simb3/img/simb3.png', 'status': 'deployed','starred': false, 'starred_date': '', 'purchase_date': '2012-04-03 17:11:43.776674', 'template': true, data_model: {configured: true, field_num: 0, entries: 0}},
  {'name': 'SIMB3 2019 #1','id': '3', 'serial_number':'30043406123456789', 'description': 'Regular UpTempO buoy. Nothing special.' ,'notes': 'Standard UpTempo Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'shortname': 'UpTempO', 'instrument_color': '#b80606','avatar': '', 'status': 'undeployed','starred': true, 'starred_date': '2023-03-03 17:11:43.776674', 'purchase_date': '2011-05-03 17:11:43.776674', 'template': true, data_model: {configured: true, field_num: 0, entries: 0}},
  {'name': 'SIMB3 2018 #1','id': '4', 'serial_number':'30043406123456789', 'description': 'Standard SIMB3 with Bruncin Temperature String', 'shortname': 'SIMB3', 'instrument_color': '#c70c92','avatar': '', 'status': 'retired','starred': true, 'starred_date': '2019-03-03 17:11:43.776674', 'purchase_date': '2023-03-03 17:11:43.776674', 'template': false, data_model: {configured: true, field_num: 0, entries: 0}}]

let deploymentList = [
  {'name': 'UAF BOEM 2023 #2','instrument_id': '1', 'id': '1' ,'location': 'Beaufort Sea' ,'description': 'Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water.Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water. Expected operational lifespan of 200 days.', 'instrument': 'SIMB3','instrument_color':'#1e20b0', 'status': 'active', 'privacy': 'public', 'tags': [{'name': 'Retired', 'color': '#740303'},{'name': 'NAIN', 'color': '#D7A700'},{'name': 'Winter Deployment', 'color': '#0368FF'}], 'collaborators': [{'name':'Cameron Planck', 'avatar': 'https://i.pravatar.cc/300'}, {'name':'Don Perovich', 'avatar': 'https://i.pravatar.cc/300'}]},
  {'name': 'SIDEX 2021 #1','instrument_id': '1', 'id': '2','location': 'Antarctica', 'description': 'Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water. Expected operational lifespan of 200 days.', 'instrument': 'UpTempO','instrument_color':'#ffea00', 'status': 'inactive', 'privacy': 'private',  'tags': [{'name': 'Active', 'color': '#740303'},{'name': 'Beaufort Sea', 'color': '#D7A700'},{'name': 'Winter Deployment', 'color': '#0368FF'}], 'collaborators': [{'name':'Cameron Planck', 'avatar': 'https://i.pravatar.cc/300'}, {'name':'Don Perovich', 'avatar': 'https://i.pravatar.cc/300'}]},
  {'name': 'MOSAiC 2019 #2','instrument_id': '2', 'id': '3','location': 'Chuchki Sea', 'instrument': 'SIMB3','instrument_color':'#1e20b0', 'status': 'inactive', 'privacy': 'private'},
  {'name': 'BG 2022 #2','instrument_id': '3', 'id': '4','location': 'Nain Community Center', 'description': 'Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water. Expected operational lifespan of 200 days.', 'instrument': 'SIMB3','instrument_color':'#1e20b0', 'status': 'active', 'privacy': 'public',  'tags': [{'name': 'Retired', 'color': '#740303'},{'name': 'NAIN', 'color': '#D7A700'},{'name': 'Winter Deployment', 'color': '#0368FF'}], 'collaborators': [{'name':'Cameron Planck', 'avatar': 'https://i.pravatar.cc/300'}, {'name':'Don Perovich', 'avatar': 'https://i.pravatar.cc/300'}]}]

export function ContextWrapper({ children }) {

  let [context, setContext] = useState({alert: {status: false, type: '', message: 'success', text: 'Your account has been approved!'}, snackbar: {status: false, type: '', message: 'success', text: 'Your account has been approved!'}})
  let [instruments, setInstruments] = useState(instrumentList)
  let [deployments, setDeployments] = useState(deploymentList)
  let [dataAvailable, setDataAvailable] = useState(false)


  return (
    <ThemeProvider theme={MUITheme}>
      <CssBaseline/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DataAvailableContext.Provider value={[dataAvailable, setDataAvailable]}>
          <InstrumentContext.Provider value={[instruments, setInstruments]}>
            <DeploymentContext.Provider value={[deployments, setDeployments]}>
              <AppContext.Provider value={[context, setContext]}>
                {children}
              </AppContext.Provider>
              </DeploymentContext.Provider>
          </InstrumentContext.Provider>
        </DataAvailableContext.Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );

}