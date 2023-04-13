const FormRestrictions = {

    'instrumentName': {
        maxLength: {val: 30, error: 'Instrument names must be less than 30 characters'}, 
        minLength: {val: 5, error: 'Instrument names must contain at least 5 characters'}
    },
    'instrumentSerialNumber': {
        maxLength: {val: 50, error: 'Instrument serial numbers must be less than 50 characters'}, 
        minLength: {val: 5, error: 'Instrument serial numbers must contain at least 5 characters'}
    },
    'instrumentDescription': {
        maxLength: {val: 500, error: 'Instrument descriptions must be less than 500 characters'}, 
        minLength: {val: 0, error: ''}
    },
    'instrumentNotes': {
        maxLength: {val: 2000, error: 'Instrument names must be less than 2000 characters'}, 
        minLength: {val: 0, error: ''}
    },
    'deploymentName': {
        maxLength: {val: 50, error: 'Deployment names must be less than 50 characters'}, 
        minLength: {val: 5, error: 'Deployment names must contain at least 5 characters'}
    },
    'deploymentLocation': {
        maxLength: {val: 50, error: 'Instrument locations must be less than 50 characters'}, 
        minLength: {val: 0, error: ''}
    },
    'deploymentDescription': {
        maxLength: {val: 500, error: 'Instrument description must be less than 500 characters'}, 
        minLength: {val: 0, error: ''}
    },
    'deploymentNotes': {
        maxLength: {val: 2000, error: 'Instrument names must be less than 2000 characters'}, 
        minLength: {val: 0, error: ''}
    },
}

export default FormRestrictions
