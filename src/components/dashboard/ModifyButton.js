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
import dbstyles from './Dashboard.module.css'
import styles from '@/components/instrument/Instrument.module.css'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useContext } from 'react';
import { InstrumentContext, DeploymentContext, DataAvailableContext } from '@/components/Context'
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import dayjs from 'dayjs';


export default function ModifyButton(props) {
  let [instruments, setInstruments] = useContext(InstrumentContext);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if(event.target.id=='star'){
      const tempInstrumentArray = instruments.filter(instrument=>instrument.id!=props.instrument.id)
      const isStarred = props.instrument.starred
      const tempInstrument = structuredClone(props.instrument)
      tempInstrument.starred = !isStarred
      !isStarred?tempInstrument.starred_date = dayjs().format():tempInstrument.starred_date=''
      tempInstrumentArray.push(tempInstrument)
      setInstruments(tempInstrumentArray)
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
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
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className={['greyButton', dbstyles.modifyButton].join(" ")}
        >
          Modify
          <KeyboardArrowDownOutlinedIcon fontSize='small'/>
        </Button>
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
                    onKeyDown={handleListKeyDown}
                  >
                  <MenuItem id='star' className={styles.modifyButtonMenu} onClick={handleClose}>
                    <StarHalfOutlinedIcon fontSize={'small'} className={'me-3'}/>{props.instrument.starred?'Unstar':'Star'}
                  </MenuItem>
                    <Link href={'/instrument/edit/' + props.instrument.id} className='removeLinkFormatting'>
                      <MenuItem className={styles.modifyButtonMenu} onClick={handleClose}><EditOutlinedIcon fontSize={'small'} className={'me-3'}/>Edit</MenuItem>
                    </Link>
                    <MenuItem id='deploy' className={styles.modifyButtonMenu} onClick={handleClose}><ArrowForwardOutlinedIcon fontSize={'small'} className={'me-3'}/>Deploy</MenuItem>
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
