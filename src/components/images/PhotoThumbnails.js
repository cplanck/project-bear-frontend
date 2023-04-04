export default function PhotoThumbnails(props){
    
    let thumbnails = []

    function openPhoto(key){
        console.log('THIS WORKED!')
        console.log(key)
        props.setIndex(key)
    }
    for(let i = 0; i < props.photos.length; i++){
        console.log(props.photos[i]['key'])
        thumbnails.push(<button onClick={()=>{openPhoto(props.photos[i]['key'])}}>{props.photos[i]['key']}</button>)
    }
    
    return(
        <div>
            {thumbnails}
        </div>
    )
}