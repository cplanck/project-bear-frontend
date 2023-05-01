import AlertContext from '@/components/Context'
import { useContext, useEffect } from 'react'
import { AppContext } from '@/components/Context'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useState } from "react";
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import { useRouter } from 'next/router'
import Instruments from '@/components/dashboard/Instruments'
import Deployments from '@/components/dashboard/Deployments';
import Overview from '@/components/dashboard/Overview';
import Image from 'next/image'
import profilePic from '@/images/cam.jpeg'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { UserContext } from '@/components/Context'
import { type } from 'os';

export default function Dashboard(props) {

  const [user, setUser] = useContext(UserContext);

  // let user = {'name': 'Cameron Planck','work': 'Cryosphere Innovation', 'location': 'West Lebanon, NH' , 'title': 'CEO of Cryosphere ', 'website': 'www.cryosphereinnovation.com'}
  let userOverview = {'instruments': 3, 'deployments': 13, 'projects': 2, 'data_models': 4}

  let [userProfileDetails, setUserProfileDetails] = useState({'name': 'Cameron Planck','work': 'Cryosphere Innovation', 'location': 'West Lebanon, NH' , 'bio': 'CEO of Cryosphere ', 'website': 'www.cryosphereinnovation.com'})
  let [updatedUserProfileDetails, setUpdatedUserProfileDetails] = useState({'name': 'Cameron Planck','work': 'Cryosphere Innovation', 'location': 'West Lebanon, NH' , 'bio': 'CEO of Cryosphere ', 'website': 'www.cryosphereinnovation.com'})
  let [page, setPage] = useState('overview')
  let [profilePanelState, setProfilePanelState] = useState('')
  const [windowDimensions, setWindowDimensions] = useState('')

  const router = useRouter()

  function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,height
      };
  }

  useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      handleResize()
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  useEffect(() => {
    setPage(location.href.split('/')[4])
  })

  function updatePage(page_id){
    setPage(page_id)
    router.push('/dashboard/' + page_id)
  }

  let activePage
  if(page == 'overview'){
    activePage = <Overview />
  }
  else if (page == 'deployments'){
    activePage = <Deployments searchBar={true}/>
  }
  else if (page == 'instruments'){
    activePage = <Instruments />
  }
  else if (page == 'projects'){
    activePage = <div>Projects</div>
  }

  function saveUserProfileChanges(){
    console.log(updatedUserProfileDetails)
    let temp = JSON.parse(JSON.stringify(updatedUserProfileDetails))
    setProfilePanelState('')
    setUserProfileDetails(temp)
  }

  let temp = updatedUserProfileDetails
  function updateUserProfile(key, value){
    temp[key] = value
    setUpdatedUserProfileDetails(temp)
  }

  function ProfilePanel(props){

    let editProfileDetails = 
      <div>
        <span className='inputSelectLabel'>Name</span>
        <span className='userProfileDetails'><input className='styledInput small' defaultValue={props.userProfileDetails.name} onChange={e => {updateUserProfile('name',e.target.value)}}></input></span>
        <span className='inputSelectLabel'>Bio</span>
        <span className='userProfileDetails'><textarea className='styledTextArea' type="text" defaultValue={props.userProfileDetails.bio} onChange={e => {updateUserProfile('bio',e.target.value)}}></textarea></span>
        <span className='userProfileDetails'><LocationOnOutlinedIcon fontSize='small' className='userProfileIcon'/><input className='styledInput small' defaultValue={props.userProfileDetails.work} onChange={e => {updateUserProfile('work',e.target.value)}}></input></span>
        <span className='userProfileDetails'><BusinessOutlinedIcon fontSize='small' className='userProfileIcon'/><input className='styledInput small' defaultValue={props.userProfileDetails.location} onChange={e => {updateUserProfile('location',e.target.value)}}></input></span>
        <span className='userProfileDetails'><LanguageOutlinedIcon fontSize='small' className='userProfileIcon'/><input className='styledInput small' defaultValue={props.userProfileDetails.website} onChange={e => {updateUserProfile('website',e.target.value)}}></input></span>
        <button className='greenButton userProfileButton' onClick={() => {saveUserProfileChanges()}}>Save</button>
        <button className='greyButton userProfileButton' onClick={() => {setProfilePanelState('')}}>Cancel</button>
      </div>

    let smallProfilePanel = 
      <div className='profilePictureWrapperSmall'>
          <div className='profilePictureWrapperSmall2'>
            <Image priority={true} src={props.userProfileDetails.avatar} className={'userProfilePictureSmall'} alt="User profile picture" width={100} height={100}/>
            {profilePanelState != 'edit-profile'?
              <div className='profilePictureWrapperSmall3'>
                <h2>{props.userProfileDetails.name}</h2>
              </div>
            :''}
            </div>
            {profilePanelState != 'edit-profile'?
              <button className='greyButton userProfileButton' onClick={() => {setProfilePanelState('edit-profile')}}>Edit Profile</button>
            :
            editProfileDetails}
            <span className='userProfileDetails'><LocationOnOutlinedIcon fontSize='small' className='userProfileIcon'/>{props.userProfileDetails.work}</span>
            <span className='userProfileDetails'><BusinessOutlinedIcon fontSize='small' className='userProfileIcon'/>{props.userProfileDetails.location}</span>

        </div>

    let largeProfilePanel = 
      <div className='profilePictureWrapper'>
          <div className='profilePictureWrapper2'>
            <img src={props.userProfileDetails.avatar} 
              className={'userProfilePicture'}
              alt="User profile picture"
              width={200} 
              height={200}
            />
            {profilePanelState != 'edit-profile'?
              <div className='profilePictureWrapper3'>
                <h2>{props.userProfileDetails.full_name}</h2>
                <span className='userProfileDetails'>{props.userProfileDetails.bio}</span>
                <button className='greyButton userProfileButton' onClick={() => {setProfilePanelState('edit-profile')}}>Edit Profile</button>
                <span className='userProfileDetails'><LocationOnOutlinedIcon fontSize='small' className='userProfileIcon'/>{props.userProfileDetails.work}</span>
                <span className='userProfileDetails'><BusinessOutlinedIcon fontSize='small' className='userProfileIcon'/>{props.userProfileDetails.location}</span>
                <span className='userProfileDetails'><LanguageOutlinedIcon fontSize='small' className='userProfileIcon'/>{props.userProfileDetails.website}</span>
              </div>
            :
            editProfileDetails}
          </div>
        </div>

    let activePanel
    windowDimensions.width > 768?activePanel=largeProfilePanel:activePanel=smallProfilePanel
    return(activePanel)
  }

  return (
    <div style={{paddingTop: '20px'}}>
      <DashboardTabs page={page} updatePage={updatePage} userOverview={userOverview} className={'hideOnSmall'}/>
      <Container maxWidth="xl">
        <div style={{border: '0px solid blue', height: '100vh'}}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <ProfilePanel userProfileDetails={user}/>
              </Grid>
              <DashboardTabs page={page} updatePage={updatePage} userOverview={userOverview} className={'showOnSmall'}/>
              <Grid item xs={12} md={9}>
                <div className='activePage'>{activePage}</div>
            </Grid>
          </Grid>
          </div>
      </Container>
    </div>
  )
}