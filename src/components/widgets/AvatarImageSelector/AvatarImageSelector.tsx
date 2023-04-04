import React, { useState, useRef } from 'react'
import styles from '../../../components/instrument/Instrument.module.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';
import cropstyles from './ImageCropper.module.css'

import ReactCrop, { centerCrop,makeAspectCrop, Crop,PixelCrop } from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'

import 'react-image-crop/dist/ReactCrop.css'

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

interface MyComponentProps {
  age: number;
  setAvatarUploadOpen: () => void
  setImageBlob: () => void
}

export default function ReactCropImage({age, setAvatarUploadOpen, setImageBlob}:MyComponentProps){
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [uploadedFileName, setUploadedFileName] = useState(age)
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null)
  const blobUrlRef = useRef('')
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(1 / 1)

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    setUploadedFileName(e.target.value.split('\\')[2])
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  function onDownloadCropClick(e) {
    e.preventDefault()
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist')
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create blob')
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
      blobUrlRef.current = URL.createObjectURL(blob)
      // console.log(URL.createObjectURL(blob))
      hiddenAnchorRef.current!.href = blobUrlRef.current
      console.log(hiddenAnchorRef.current!.href)
      console.log
      // hiddenAnchorRef.current!.click()
      setImageBlob(hiddenAnchorRef.current!)
      setAvatarUploadOpen(false)
    })
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  return (
    <div className={[styles.editModalWrapper, cropstyles.cropperWrapper].join(' ')}>
      <div className={styles.editModalHeader}>
        <span>Upload an Instrument Avatar</span>
        <button className='iconButton' onClick={() => {setAvatarUploadOpen(false)}}><CloseOutlinedIcon fontSize={'small'} className='iconButton'/></button>
      </div>
      <div className={[styles.editModalBody, cropstyles.cropperBody].join(' ')}>
      {!!imgSrc && (
        <ReactCrop
          crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)} onComplete={(c) => setCompletedCrop(c)} aspect={aspect}
          >
          <div style={{border: '0px solid purple', width: '100%'}}>
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)`, height: '300px', minWidth: '100%', border: '0px solid pink', borderRadius: '6px' }}
              onLoad={onImageLoad}
            />
          </div>
        </ReactCrop>
      )}

      {!completedCrop?
        <div className={cropstyles.avatarImagePlaceholderWrapper}>
            <label className={cropstyles.avatarOriginalImagePlaceholder}>
              <ImageOutlinedIcon fontSize='large'/>Select Image
              <input id='file-upload' type="file"  accept="image/*" onChange={onSelectFile} />
            </label>
           <div className={cropstyles.avatarCroppedImagePlaceholder}><CropFreeOutlinedIcon fontSize='large'/>Avatar</div>
        </div>
      :''}

      {!!completedCrop && (
        <div className={cropstyles.cropperBody}>
          <span className='my-3'>Avatar</span>
         
          <div className={cropstyles.avatarPreview}>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '0px solid green',
                objectFit: 'contain',
                width: '200px', //completedCrop.width,
                // height: completedCrop.height,
                height: '200px', //completedCrop.width,
                borderRadius: '50%',
              }}
            />
          </div>
        </div>
      )}
    </div>
    <div className={styles.editModalFooter}>
        <button onClick={(e)=>onDownloadCropClick(e)} className={'greenButton'}>Select</button>
        <button onClick={() => {setAvatarUploadOpen(false)}} className={'textButton'}>Close</button>
        <a ref={hiddenAnchorRef} download style={{ position: 'absolute', top: '-200vh', visibility: 'hidden',}}></a>
    </div>
    </div>
  )
}
