import * as React from "react";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import PhotoAlbum from "react-photo-album";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { RenderPhoto} from "react-photo-album";
import styles from './Image.module.css'


import Lightbox from "yet-another-react-lightbox";
import photos from "./Photos";
import { advancedSlides } from "./Slides";
import { flexbox } from "@mui/system";

export default function PhotoGallery() {
  const [index, setIndex] = React.useState(-1);
  const [animationDuration, setAnimationDuration] = React.useState(500);
  const [maxZoomPixelRatio, setMaxZoomPixelRatio] = React.useState(1);
  const [zoomInMultiplier, setZoomInMultiplier] = React.useState(2);
  const [doubleTapDelay, setDoubleTapDelay] = React.useState(300);
  const [doubleClickDelay, setDoubleClickDelay] = React.useState(300);
  const [doubleClickMaxStops, setDoubleClickMaxStops] = React.useState(2);
  const [keyboardMoveDistance, setKeyboardMoveDistance] = React.useState(50);
  const [wheelZoomDistanceFactor, setWheelZoomDistanceFactor] = React.useState(
    100
  );
  const [pinchZoomDistanceFactor, setPinchZoomDistanceFactor] = React.useState(
    100
  );
  const [scrollToZoom, setScrollToZoom] = React.useState(false);


  const renderPhoto = ({
    layout,
    layoutOptions,
    imageProps: { alt, style, ...restImageProps }
  }) => (
    <div
      style={{
        borderRadius: "4px",
        boxSizing: "content-box",
        alignItems: "center",
        width: style?.width,
        padding: `${layoutOptions.padding - 2}px`,
        paddingBottom: 0,
        display: 'flex',
        position: 'relative',
      }}
      className={styles.image}
    >
      <div className={styles.imageButtonGroup}>
        <button onClick={()=>{console.log('THIS GOT CLICKED')}} className={styles.settingsButton}>
          <ModeEditOutlineOutlinedIcon/>
        </button>
        <button onClick={()=>{console.log('THIS GOT CLICKED')}} className={styles.settingsButton}>
          <DeleteOutlineOutlinedIcon/>
        </button>
      </div>

      <img
        alt={alt}
        style={{ ...style, width: "100%", padding: 0 }}
        {...restImageProps}
      />
    </div>
  );

  return (
    <>
      <PhotoAlbum
        layout="rows"
        photos={photos}
        targetRowHeight={230}
        onClick={({ index }) => setIndex(index)}
        renderPhoto={renderPhoto}
      />

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={advancedSlides}
        plugins={[Captions, Zoom]}
        animation={{ zoom: animationDuration }}
        zoom={{
          maxZoomPixelRatio,
          zoomInMultiplier,
          doubleTapDelay,
          doubleClickDelay,
          doubleClickMaxStops,
          keyboardMoveDistance,
          wheelZoomDistanceFactor,
          pinchZoomDistanceFactor,
          scrollToZoom
        }}
      />
    </>
  );
}