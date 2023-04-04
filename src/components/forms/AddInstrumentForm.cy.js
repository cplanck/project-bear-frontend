import React from 'react'
import AddInstrumentForm from './AddInstrumentForm'
import { useContext, useState } from 'react';
import {ContextWrapper} from '@/components/Context'
import MockRouter from '@/testing/MockRouter'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import '@/styles/style.css'
import fr from './FormRestrictions';
import 'cypress-react-selector';


let instrumentList = [
  {'name': 'SIMB3 2022 #1','id': '1', 'serial_number':'30043406123456789' ,'data-model': 'Standard SIMB3' ,'description': 'Standard SIMB3 with Bruncin Temperature String', 'shortname': 'SIMB3', 'instrument_color': '#4287f5','avatar': 'https://nyc3.digitaloceanspaces.com/ci-webapp-space/static/simb3/img/simb3.png', 'status': 'deployed','starred': false, 'starred_date': '', 'purchase_date': '2023-03-03 17:11:43.776674', 'template': true},
  {'name': 'UpTempO 2018 #1','id': '2', 'serial_number':'30043406123456789', 'data-model': 'UpTempO With Snow Pinger', 'description': 'UpTempO with added snow pinger', 'shortname': 'UpTempO', 'instrument_color': '#c76626','avatar': 'https://nyc3.digitaloceanspaces.com/ci-webapp-space/static/simb3/img/simb3.png', 'status': 'deployed','starred': false, 'starred_date': '', 'purchase_date': '2012-04-03 17:11:43.776674', 'template': true},
  {'name': 'SIMB3 2019 #1','id': '3', 'serial_number':'30043406123456789', 'data-model': 'Standard UpTempO', 'description': 'Regular UpTempO buoy. Nothing special.' ,'notes': 'Standard UpTempo Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'shortname': 'UpTempO', 'instrument_color': '#b80606','avatar': '', 'status': 'undeployed','starred': true, 'starred_date': '2023-03-03 17:11:43.776674', 'purchase_date': '2011-05-03 17:11:43.776674', 'template': true},
  {'name': 'SIMB3 2018 #1','id': '4', 'serial_number':'30043406123456789', 'data-model': 'Standard SIMB3', 'description': 'Standard SIMB3 with Bruncin Temperature String', 'shortname': 'SIMB3', 'instrument_color': '#c70c92','avatar': '', 'status': 'retired','starred': true, 'starred_date': '2019-03-03 17:11:43.776674', 'purchase_date': '2023-03-03 17:11:43.776674', 'template': false}]

let userDataModels = [{'name': 'Standard with Bruncin String', 'id': '1'},{'name': 'UpTempO Regular', 'id': '2'},{'name': 'UpTempO with Seabird Salinity', 'id': '3'},{'name': 'Custom Data logger', 'id': '4'}]

describe('<AddInstrumentForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
        <MockRouter>
          <ContextWrapper>
            <AddInstrumentForm userDataModels={userDataModels} instruments={instrumentList}/>
          </ContextWrapper>
        </MockRouter>
    )

    cy.get('input[id="name"]').type('a'.repeat(fr.instrumentName.maxLength.val + 2)).blur().get('span[id="nameError"]').contains(fr.instrumentName.maxLength.error)
    cy.get('input[id="name"]').clear()
    cy.get('input[id="name"]').type('a'.repeat(fr.instrumentName.minLength.val - 2)).blur().get('span[id="nameError"]').contains(fr.instrumentName.minLength.error)

    cy.get('input[id="serialNumber"]').type('a'.repeat(fr.instrumentSerialNumber.maxLength.val + 2)).blur().get('span[id="serialNumberError"]').contains(fr.instrumentSerialNumber.maxLength.error)
    cy.get('input[id="serialNumber"]').clear()
    cy.get('input[id="serialNumber"]').type('a'.repeat(fr.instrumentSerialNumber.minLength.val - 2)).blur().get('span[id="serialNumberError"]').contains(fr.instrumentSerialNumber.minLength.error)

    cy.get('textarea[id="description"]').type('a'.repeat(fr.instrumentDescription.maxLength.val + 2)).blur().get('span[id="descriptionError"]').contains(fr.instrumentDescription.maxLength.error)
    
    cy.get('textarea[id="notes"]').type('a'.repeat(fr.instrumentNotes.maxLength.val + 1), { delay: 0}).blur().get('span[id="notesError"]').contains(fr.instrumentNotes.maxLength.error)
  })
})