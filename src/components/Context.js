import { createContext, useContext } from 'react';
import React, { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useRouter } from 'next/router';
import MUITheme from '@/MUITheme'

export const AppContext = createContext();
export const InstrumentContext = createContext();
export const DeploymentContext = createContext();
export const DataAvailableContext = createContext();
export const UserLoggedInContext = createContext();
export const UserContext = createContext();
export const PageLoaderContext = createContext();


export const blankInstrumentObject = {name: '',id: '', serial_number:'', description: '',notes: '' ,instrument_color: '', status: '', starred: false, starred_date: '1900-01-01T00:00:00+00:00', purchase_date: '', date_added: '', last_modified: '', template: false, data_model: {configured: false, field_num: 0, entries: 0}, active_deployment: {name: '', id: '', avatar: ''}}

export const blankDeploymentObject = {name: '', instrument_id: '', id: '', location: '' , description: '', deployment_start_date: '', deployment_end_date: '', instrument_color: '', status: '', private: true, tags: [], collaborators: [], date_added: '', last_modified: '', starred: false, starred_date: '1900-01-01T00:00:00+00:00'}

export const blankTagObject = {name: '', color: ''}

export const blankCollaboratorObject = {name:'', avatar: ''}

let instrumentList = [
  {name: 'SIMB3 2022 #1 (w/active)', id: 1, serial_number:'30043406123456789' ,description: 'Standard SIMB3 with Bruncin Temperature String', shortname: 'SIMB3', instrument_color: '#4287f5',avatar: 'https://nyc3.digitaloceanspaces.com/ci-webapp-space/static/simb3/img/simb3.png',starred: false, starred_date: '', purchase_date: '2023-03-03 17:11:43.776674', date_added: '2023-03-03 17:11:43.776674', last_modified: '2022-04-11 17:11:43.776674', template: true, data_model: {configured: false, field_num: 0, entries: 0}, active_deployment: {name: 'UAF BOEM 2023 #2', id: '1'}},

  {name: 'UpTempO 2018 #1', id: 2, serial_number:'30043406123456789', description: 'UpTempO with added snow pinger', shortname: 'UpTempO', instrument_color: '#c76626',avatar: 'https://nyc3.digitaloceanspaces.com/ci-webapp-space/static/simb3/img/simb3.png', starred: false, starred_date: '', purchase_date: '2023-04-03 17:11:43.776674', date_added: '2023-03-03 17:11:43.776674', last_modified: '2023-02-11 17:11:43.776674', template: true, data_model: {configured: true, field_num: 0, entries: 0}, active_deployment: {name: '', id: '3'}},

  {name: 'SIMB3 2019 #1 (w/active)', id: 3, serial_number:'30043406123456789', description: 'Regular UpTempO buoy. Nothing special.' ,notes: 'Standard UpTempo Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', shortname: 'UpTempO', instrument_color: '#b80606',avatar: '', starred: true, starred_date: '2023-03-03 17:11:43.776674', purchase_date: '2011-05-03 17:11:43.776674', date_added: '2023-03-03 17:11:43.776674', last_modified: '2022-04-09 17:11:43.776674', template: true, data_model: {configured: true, field_num: 0, entries: 0}, active_deployment: {name: 'BG 2022 #2', id: 4}},

  {name: 'SIMB3 2018 #1', id: 4, serial_number:'30043406123456789', description: 'Standard SIMB3 with Bruncin Temperature String', shortname: 'SIMB3', instrument_color: '#c70c92',avatar: '', starred: true, starred_date: '2019-03-03 17:11:43.776674', purchase_date: '2023-03-03 17:11:43.776674', date_added: '2023-03-03 17:11:43.776674', last_modified: '2012-04-06 17:11:43.776674', template: false, data_model: {configured: true, field_num: 0, entries: 0}, active_deployment: {name: '', id: ''}}]

let deploymentList = [
  {name: 'UAF BOEM 2023 #2', instrument_id: 1, id: 1, status: 'active', deployment_start_date: '2022-04-09 17:11:43.776674', deployment_end_date: '', location: 'Beaufort Sea' , description: 'Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water.Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water. Expected operational lifespan of 200 days.', notes: 'New notes...' ,instrument: {name: 'SIMB3 2022 #1 (w/active)', id: 1, avatar: 'https://nyc3.digitaloceanspaces.com/ci-webapp-space/static/simb3/img/simb3.png'}, instrument_color:'#1e20b0', private: false, tags: [{name: 'Retired', color: '#740303'},{name: 'NAIN', color: '#D7A700'},{name: 'Winter Deployment', 'color': '#0368FF'}], 'collaborators': [{name:'Cameron Planck', avatar: 'https://i.pravatar.cc/300'}, {name:'Don Perovich', avatar: 'https://i.pravatar.cc/300'}], date_added: '2023-03-03 17:11:43.776674', last_modified: '2022-04-09 17:11:43.776674', starred: true, starred_date: '2023-04-24 17:11:43.776674'},

  {name: 'SIDEX 2021 #1', instrument_id: 1, id: 2, status: 'inactive', deployment_start_date: '2022-04-09 17:11:43.776674', deployment_end_date: '2022-04-10 17:11:43.776674', location: 'Antarctica', description: 'Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water. Expected operational lifespan of 200 days.', instrument: {name: 'UpTempO 2018 #1', id: 1, avatar: ''}, instrument_color:'#ffea00', private: true,  tags: [{'name': 'Active', 'color': '#740303'},{'name': 'Beaufort Sea', 'color': '#D7A700'},{'name': 'Winter Deployment', 'color': '#0368FF'}], 'collaborators': [{'name':'Cameron Planck', 'avatar': 'https://i.pravatar.cc/300'}, {'name':'Don Perovich', 'avatar': 'https://i.pravatar.cc/300'}], date_added: '2023-03-03 17:11:43.776674', last_modified: '2022-04-09 17:11:43.776674', starred: false, starred_date: '2022-04-04 17:11:43.776674'},

  {name: 'MOSAiC 2019 #2', instrument_id: 2, id: 3, status: 'inactive', deployment_start_date: '2022-04-09 17:11:43.776674', deployment_end_date: '', location: 'Chuchki Sea', instrument: {name: 'UpTempO 2018 #1', id: 2, avatar: ''}, instrument_color:'#1e20b0', private: false, date_added: '2023-03-03 17:11:43.776674', last_modified: '2022-04-09 17:11:43.776674', starred: false, starred_date: '2022-04-09 17:11:43.776674'},

  {name: 'BG 2022 #2', instrument_id: 3, id: 4, status: 'active', location: 'Nain Community Center', description: 'Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water. Expected operational lifespan of 200 days.', instrument: {name: 'SIMB3 2019 #1 (w/active)', id: 3, avatar: 'https://nyc3.digitaloceanspaces.com/ci-webapp-space/static/simb3/img/simb3.png'}, instrument_color:'#1e20b0', private: false,  tags: [{'name': 'Retired', 'color': '#740303'},{'name': 'NAIN', 'color': '#D7A700'},{'name': 'Winter Deployment', 'color': '#0368FF'}], 'collaborators': [{'name':'Cameron Planck', 'avatar': 'https://i.pravatar.cc/300'}, {'name':'Don Perovich', 'avatar': 'https://i.pravatar.cc/300'}], date_added: '2023-03-03 17:11:43.776674', last_modified: '2022-04-09 17:11:43.776674', starred: true, starred_date: '2023-04-24 17:11:43.776674'}]

  // deploymentList = []
  // instrumentList = []

export function ContextWrapper({ children }) {  

  let [context, setContext] = useState({alert: {status: false, type: '', message: 'success', text: 'Your account has been approved!'}, snackbar: {status: false, type: '', message: 'success', text: 'Your account has been approved!'}})
  let [instruments, setInstruments] = useState(instrumentList)
  let [deployments, setDeployments] = useState(deploymentList)
  let [dataAvailable, setDataAvailable] = useState(false)
  let [userLoggedIn, setUserLoggedIn] = useState(false)
  let [user, setUser] = useState({})
  let [loadingPage, setLoadingPage] = useState(true)

  const router = useRouter()

  const fetchUserDetails = (token)=>{
    const url = 'http://localhost:8000/users/profile'
    fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
    .then(response => response.json())
    .then(data => {
      console.log(data[0])
      setUser(data[0])
      setUserLoggedIn(true)
      setLoadingPage(false)
      router.push('/dashboard/overview')
    })
    .catch(error => {
        console.error('Error:', error);
});
}

const fetchUserInstruments = ()=>{
  const url = 'http://localhost:8000/api/instruments'
  fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  .then(response => response.json())
  .then(data => {
   console.log(data)
   setInstruments(data)
  })
  .catch(error => {
      console.error('Error:', error);
});
}

  function RefreshToken(refreshToken){
    fetch('http://localhost:8000/auth/token/refresh/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({refresh: refreshToken})
      })
      .then(response => {
        response.json().then(response=>{
            console.log(response)
            const accessCode = response['access']
            console.log(accessCode)
            localStorage.setItem('access_token', accessCode)
        })
      })
      .catch(error => {
        console.log('THERE WAS AN ERROR GETTING THE TOKEN')
      });
  }

  const checkAuthentication = ()=>{

    console.log('Checking login credentials....');
    let accessToken = localStorage.getItem('access_token')
    let refreshToken = localStorage.getItem('refresh_token')

    // take care of undefined tokens
    accessToken = accessToken != 'undefined'?accessToken:null
    refreshToken = refreshToken != 'undefined'?refreshToken:null

    // if both tokens are present, check them
    if(refreshToken && accessToken){
      console.log('ACCESS AND REFRESH TOKENS FOUND')
      const refreshParts = refreshToken.split(".");
      const refreshPayload = JSON.parse(atob(refreshParts[1]));
      const refreshTokenExpirationTime = refreshPayload['exp']
      const currentTime = Date.now()/1000;

        if(refreshTokenExpirationTime < currentTime){ 
          // refresh token is expired and user needs to relogin
          console.log('REFRESH TOKEN IS EXPIRED')
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          handleAlerts('alert', 'warning', 'You\'ve been logged out for security purposes. Please log back in to continue.')
          return false
        }
        else if(refreshPayload['exp'] > currentTime){
          // refresh token is valid, now checking access_token
          console.log('REFRESH TOKEN IS VALID, CHECKING ACCESS TOKEN...')
          const accessParts = accessToken.split(".");
          const accessPayload = JSON.parse(atob(accessParts[1]));
          const accessTokenExpirationTime = accessPayload['exp']

            if(accessTokenExpirationTime + 12 < currentTime){ 
              // access token is expired, but refresh token is good so we can exchange it for a new one
              // modified -- access token is about to expire, so get a new one
              console.log('ACCESS TOKEN INVALID, GETTING A NEW ONE FROM API')
              RefreshToken(refreshToken)
              return true
            }
            else{
              // user has a good access_token and refresh_token. Good to go. 
              return true
            }
        }
    }
    else{
      // no acces tokens present, user == false
      console.log('NO ACCESS TOKENS FOUND')
      return false
    }

  }

  useEffect(() => {

    // do some more checks here to handle when user first logs on
    // when user is logged in and navigates to a protected page
    const authenticatedUser = checkAuthentication()

    if(authenticatedUser){
      console.log('USER LOGGED IN AND THIS RAN')
      fetchUserDetails(localStorage.getItem('access_token'))
      fetchUserInstruments()
    }
    else{
      setUserLoggedIn(false)
      setLoadingPage(false)
    }

    const intervalId = setInterval(() => {
      const authenticatedUser = checkAuthentication()
      if(!authenticatedUser){
        setUserLoggedIn(false)
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
  <ThemeProvider theme={MUITheme}>
    <CssBaseline/>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PageLoaderContext.Provider value={[loadingPage, setLoadingPage]}>
        <UserLoggedInContext.Provider value={[userLoggedIn, setUserLoggedIn]}>
          <UserContext.Provider value={[user, setUser]}>
            <DataAvailableContext.Provider value={[dataAvailable, setDataAvailable]}>
              <InstrumentContext.Provider value={[instruments, setInstruments]}>
                <DeploymentContext.Provider value={[deployments, setDeployments]}>
                  <AppContext.Provider value={[context, setContext]}>
                    {children}
                  </AppContext.Provider>
                </DeploymentContext.Provider>
              </InstrumentContext.Provider>
            </DataAvailableContext.Provider>
          </UserContext.Provider>
        </UserLoggedInContext.Provider>
      </PageLoaderContext.Provider >
    </LocalizationProvider>
  </ThemeProvider>
  );

}