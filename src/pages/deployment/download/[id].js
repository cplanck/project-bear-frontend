import AlertContext from '@/components/Context'
import { useContext, useEffect } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useState } from "react";
import DeploymentDetails from '@/components/deployment/DeploymentDetails';
import SideNav from '@/components/instrument/SideNav';
import { useRouter } from 'next/router'
import InstrumentAvatar from '@/components/instrument/InstrumentAvatar';
import { DeploymentContext, InstrumentContext, DataAvailableContext } from '@/components/Context'
import styles from '@/components/instrument/Instrument.module.css'
import { CSVLink, CSVDownload } from "react-csv";


export default function Download(props) {

// let pageId = router.query.id

const data = [
  {
    name: 'John',
    lastName: 'Doe',
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
    id: 10
  },
  {
      name: 'Jane',
      lastName: 'Doe',
      address: '769 Dominic Grove',
      city: 'Columbus',
      state: 'Ohio',
      id: 11
  },
  {
    name: 'Joe',
    lastName: 'Doe',
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
    id: 12
  },
  {
    name: 'Kevin',
    lastName: 'Vandy',
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
    id: 13
  },
  {
    name:'Joshua',
    lastName: 'Rolluffs',
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
    id: 14
  },
];

return (<CSVDownload filename={'instrument' + '.csv'} data={data}></CSVDownload>)
}