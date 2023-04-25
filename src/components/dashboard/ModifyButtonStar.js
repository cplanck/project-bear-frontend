import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import dbstyles from '@/components/dashboard/Dashboard.module.css'
import Divider from '@mui/material/Divider';
import styles from '@/components/instrument/Instrument.module.css'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useContext } from 'react';
import { InstrumentContext, DeploymentContext, DataAvailableContext } from '@/components/Context'
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import dayjs from 'dayjs';


export default function ModifyButtonStar(props) {
  const [instruments, setInstruments] = useContext(InstrumentContext);
  const [deployments, setDeployments] = useContext(DeploymentContext);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if(event.target.id=='star'){
      if(props.type == 'instrument'){
        const tempInstrumentArray = instruments.filter(instrument=>instrument.id!=props.item.id)
        const isStarred = props.item.starred
        const tempInstrument = structuredClone(props.item)
        tempInstrument.starred = !isStarred
        !isStarred?tempInstrument.starred_date = dayjs().format():tempInstrument.starred_date=''
        tempInstrumentArray.push(tempInstrument)
        setInstruments(tempInstrumentArray)
      }
      else if(type == 'deployment'){
        const tempDeploymentArray = deployments.filter(deployment=>deployment.id!=props.item.id)
        const isStarred = props.item.starred
        const tempDeployment = structuredClone(props.item)
        tempDeployment.starred = !isStarred
        !isStarred?tempDeployment.starred_date = dayjs().format():tempDeployment.starred_date=''
        tempDeploymentArray.push(tempDeployment)
        setDeployments(tempDeploymentArray)
      }
    }
    setOpen(false);
  };

  const handleStarredClick = () =>{
    if(props.type == 'instrument'){
      const tempInstrumentArray = instruments.filter(instrument=>instrument.id!=props.item.id)
      const isStarred = props.item.starred
      const tempInstrument = structuredClone(props.item)
      tempInstrument.starred = !isStarred
      !isStarred?tempInstrument.starred_date = dayjs().format():tempInstrument.starred_date=''
      tempInstrumentArray.push(tempInstrument)
      setInstruments(tempInstrumentArray)
      setOpen(false);
    }
    else if(props.type == 'deployment'){
      const tempDeploymentArray = deployments.filter(deployment=>deployment.id!=props.item.id)
      const isStarred = props.item.starred
      const tempDeployment = structuredClone(props.item)
      tempDeployment.starred = !isStarred
      !isStarred?tempDeployment.starred_date = dayjs().format():tempDeployment.starred_date=''
      tempDeploymentArray.push(tempDeployment)
      setDeployments(tempDeploymentArray)
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div className={'splitButton'}>
        <button onClick={handleStarredClick} className={'splitButtonLeft'}>
        {props.item.starred?
          <><StarOutlinedIcon className='me-3 orangeText' fontSize='small'/>Starred</>:
          <><StarBorderOutlinedIcon className='me-3 greyText3' fontSize='small'/>Star</>}
        </button>
        <button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className={'splitButtonRight'}
        >
          <KeyboardArrowDownOutlinedIcon fontSize='small'/>
        </button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          className={styles.modifyButtonPaper}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                  >
                    {props.type == 'instrument'?
                    <>
                    <Link href={'/instrument/edit/' + props.item.id} className='removeLinkFormatting'>
                      <MenuItem className={styles.modifyButtonMenu} onClick={handleClose}><EditOutlinedIcon fontSize={'small'} className={'me-3'}/>Edit</MenuItem>
                    </Link>
                    <Link href={{pathname: '/deployment/add', query: {instrument: props.item.id}}} className='removeLinkFormatting'>
                      <MenuItem id='deploy' className={styles.modifyButtonMenu} onClick={handleClose}><ArrowForwardOutlinedIcon fontSize={'small'} className={'me-3'}/>Deploy</MenuItem>
                    </Link>
                    {/* <hr className='hr'></hr> */}
                    <Link href={'/deployment/edit/' + props.item.id} className='removeLinkFormatting'>
                      <hr className='hr'></hr>
                      <MenuItem style={{color: 'var(--dark-theme-red-text)'}} className={[styles.modifyButtonMenu].join(' ')} onClick={handleClose}><DeleteOutlineIcon fontSize={'small'} className={'me-3 redText'}/>Delete</MenuItem>
                    </Link>
                    </>
                    :
                    <>
                    <Link href={'/deployment/edit/' + props.item.id} className='removeLinkFormatting'>
                      <MenuItem className={styles.modifyButtonMenu} onClick={handleClose}><EditOutlinedIcon fontSize={'small'} className={'me-3'}/>Edit</MenuItem>
                    </Link>
                    <Link href={'/deployment/edit/' + props.item.id} className='removeLinkFormatting redText'>
                      <hr className='hr'></hr>
                      <MenuItem style={{color: 'var(--dark-theme-red-text)'}} className={[styles.modifyButtonMenu].join(' ')} onClick={handleClose}><DeleteOutlineIcon fontSize={'small'} className={'me-3 redText'}/>Delete</MenuItem>
                    </Link>
                   </>
                    }

                   
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
