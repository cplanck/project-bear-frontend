import React from 'react'
import Tag from './Tag'

describe('<Tag />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    let props = {name: 'Active', color: '#050000'}
    cy.mount(<Tag name={props.name} color={props.color}/>)
  })
})