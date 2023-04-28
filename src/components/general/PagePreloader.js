import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function PagePreloader(){
    return(
        <div className='pagePreloaderWrapper'>
            
                {/* <CircularProgress color="secondary" />
                <CircularProgress color="success" /> */}
                <CircularProgress size={20} color="inherit" /> <span className='ms-3'>Good things coming...</span>       
        </div>
    )
}
