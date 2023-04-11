import * as React from 'react';
import Modal from '@mui/material/Modal';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Container } from '@mui/system';
import { useState } from 'react';
import dbstyles from '../dashboard/Dashboard.module.css'
import styles from '../instrument/Instrument.module.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { object, string, number, date, InferType } from 'yup';
import tinycolor from "tinycolor2";
import Fuse from 'fuse.js'
import { useEffect } from 'react';

let userSchema = object({
    name: string().required(),
    age: number().required().positive().integer(),
    email: string().email(),
    website: string().url().nullable(),
    createdOn: date().default(() => new Date()),
  });

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Tag(props){
    return(
        <button onClick={()=>{props.swapTag({'name': props.name, 'color': props.color}, props.selected) }} className={dbstyles.tag} style={{backgroundColor: `${props.color}` + '80', border: `2px solid ${props.color}` + '70', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: tinycolor(props.color).lighten(35).toString()}}>
            {props.selected?<RemoveIcon style={{}} fontSize='small'/>:<AddIcon  fontSize='small'/>}
            <span className={dbstyles.tagText} style={{color: tinycolor(props.color).lighten(35).toString(), paddingLeft: '5px'}}>
                {props.name}
            </span>
        </button>
    )
}

export default function DeploymentTagsEditModal(props) {

    const [availableTagList, setAvailableTagList] = useState([{'name': 'Spring Deployment', 'color': '#123455'},{'name': 'Chuchki Sea', 'color': '#428592'}])
    let [filteredAvailableTagList, setFilteredAvailableTagList] = useState([])
    let [userTagFilterInut, setUserTagFilterInput] = useState('')


    const [selectedTagsList, setSelectedTagsList] = useState(props.updatedDeployment.tags?structuredClone(props.updatedDeployment.tags):[])

    useEffect(() =>{
        function removeItemsFromList(list, itemsToRemove) {
            return list.filter(item => !itemsToRemove.some(removeItem => item.name === removeItem.name));
          }
        
        let uniqueAvailableList = removeItemsFromList(availableTagList, selectedTagsList)
        setAvailableTagList(uniqueAvailableList)
    },[])

    let selectedTags = selectedTagsList.map((tag, i) => <Tag swapTag={swapTag} selected={true} key={tag['name']} name={tag['name']} color={tag['color']}/>)
    let availableTags = availableTagList.map((tag, i) => <Tag swapTag={swapTag} selected={false} key={tag['name']} name={tag['name']} color={tag['color']}/>)
    let filteredavailableTags = filteredAvailableTagList.map((tag) => <Tag swapTag={swapTag} selected={false} key={tag['name']} name={tag['name']} color={tag['color']}/>)


    function removeClickedTag(list, name){
        const newList = []
        for(let i  = 0; i<list.length; i++){
            list[i]['name'] != name?newList.push(list[i]):''
        }
        return newList
    }

    function swapTag(tag, selected){

        if(selected){
            setSelectedTagsList(removeClickedTag(selectedTagsList, tag['name']))
            let temp = availableTagList
            temp.push({'name': tag.name, 'color': tag.color})
            setAvailableTagList(temp)

        }else{
            setAvailableTagList(removeClickedTag(availableTagList, tag['name']))
            setFilteredAvailableTagList(removeClickedTag(filteredAvailableTagList, tag['name']))
            // setFilteredAvailableTagList(removeClickedTag(filteredAvailableTagList, tag['name']))
            let temp = selectedTagsList
            temp.push({'name': tag.name, 'color': tag.color})
            setSelectedTagsList(temp)
        }

    }

    function searchAvailableTags(searchText){
        setUserTagFilterInput(searchText.length)
        const fuzeOptions = {
            // includeScore: true,
            keys: ['name']
        }

        const fuse = new Fuse(availableTagList, fuzeOptions)
        const result = fuse.search(searchText)
        let filteredResults = result.map((item) => item.item)
        // setFilteredAvailableTagList(filteredResults)
        console.log(filteredResults)
        console.log(availableTagList)
        console.log(searchText.length)
        setFilteredAvailableTagList(searchText==0?availableTagList:filteredResults)
    }



    const handleClose = () => {props.setTagModalOpen(false)}

    function handleSubmission(){
        let temp =  structuredClone(props.updatedDeployment);
        temp['tags']=selectedTagsList
        props.setUpdatedDeployment(temp)
        props.setTagModalOpen(false)
    }

  return (
    <div>
      <Modal open={open}  aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Container className={styles.editModalWrapper} maxWidth={'md'}>
            <div className={styles.editModalHeader}>
                <span className='boldText'>Edit Tags</span>
                <button className='iconButton' onClick={() => {props.setTagModalOpen(false)}}><CloseOutlinedIcon fontSize={'small'} className='iconButton'/></button>
            </div>
            <div className={styles.editModalBody}>
                <h5>Selected Tags</h5>
                <div className={[styles.tagsList, 'styledTextArea'].join(' ')} style={{display: 'flex', alignItems: 'flex-start'}}>
                    {selectedTags}
                </div>
                <h5>Available Tags</h5>
                <input className='styledInput small' placeholder='Filter available tags' style={{marginBottom: '10px', maxWidth: '300px'}} onChange={(e)=>{searchAvailableTags(e.target.value)}}/>
                <div className={[styles.tagsList, 'styledTextArea'].join(' ')} style={{display: 'flex', alignItems: 'flex-start'}}>
                    {filteredavailableTags.length!=0?filteredavailableTags:availableTags}
                    {/* {availableTags} */}
                </div>
            </div>
            <div className={styles.editModalFooter}>
                <div className={styles.modalButtonGroup}>
                    <button className='textButton' onClick={()=>{handleClose()}}>Cancel</button>
                    <button className='greenButton' onClick={() => {handleSubmission()}}>Save Changes</button>
                </div>
            </div>
        </Container>
      </Modal>
    </div>
  );
}