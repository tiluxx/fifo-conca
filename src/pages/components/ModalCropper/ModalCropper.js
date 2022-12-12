import { Fragment, useState, useEffect, useRef, useContext } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop, Crop } from 'react-image-crop'
import Button from '@mui/joy/Button'
import TextField from '@mui/material/TextField'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import 'react-image-crop/dist/ReactCrop.css'

import { WorkspaceActionContext } from '~/pages/Workspace'

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
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

const TO_RADIANS = Math.PI / 180

function ModalCropper({ el }) {
    const { imageBoxState, setImageBoxState } = useContext(WorkspaceActionContext)
    const [open, setOpen] = useState(false)
    const [imgSrc, setImgSrc] = useState('')
    const imgRef = useRef(null)
    const [crop, setCrop] = useState(Crop)
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState(undefined)
    // const [croppedImageUrl, setCroppedImageUrl] = useState('')

    useEffect(() => {
        if (imageBoxState.box.i === el.i && imageBoxState.selectFile.isHavingFile) {
            setOpen(true)
            const targetFile = imageBoxState.selectFile.file
            if (targetFile) {
                setCrop(undefined)
                setImgSrc(targetFile || '')
                // const reader = new FileReader()
                // reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''))
                // reader.readAsDataURL(targetFile)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageBoxState])

    function onImageLoad(e) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    const handleCropComplete = (c) => {
        makeClientCrop(c)
    }

    const makeClientCrop = async (crop) => {
        if (imgRef.current && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(imgRef.current, crop, `${el.i}.jpeg`)
            setImageBoxState({
                box: el,
                croppedImageUrl: croppedImageUrl,
                selectFile: {
                    file: [],
                    isHavingFile: false,
                },
            })
        }
    }

    const getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement('canvas')
        const pixelRatio = window.devicePixelRatio
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        const ctx = canvas.getContext('2d')

        canvas.width = Math.floor(crop.width * pixelRatio * scaleX)
        canvas.height = Math.floor(crop.height * pixelRatio * scaleY)

        ctx.scale(pixelRatio, pixelRatio)
        ctx.imageSmoothingQuality = 'high'

        const cropX = crop.x * scaleX
        const cropY = crop.y * scaleY

        const rotateRads = rotate * TO_RADIANS
        const centerX = image.naturalWidth / 2
        const centerY = image.naturalHeight / 2

        ctx.save()
        ctx.translate(-cropX, -cropY)
        ctx.translate(centerX, centerY)
        ctx.rotate(rotateRads)
        ctx.scale(scale, scale)
        ctx.translate(-centerX, -centerY)

        ctx.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
        )

        ctx.restore()

        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        //reject(new Error('Canvas is empty'));
                        console.error('Canvas is empty')
                        return
                    }
                    blob.name = fileName
                    let fileUrl = ''
                    window.URL.revokeObjectURL(fileUrl)
                    fileUrl = window.URL.createObjectURL(blob)
                    console.log(fileUrl)
                    resolve(fileUrl)
                },
                'image/*',
                1,
            )
        })
    }

    return (
        <Fragment>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    aria-labelledby="modal-dialog-cropper"
                    aria-describedby="modal-dialog-cropper-description"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            setOpen(false)
                        }}
                    >
                        <Stack spacing={2}>
                            <div>
                                <span>Scale</span>
                                <TextField
                                    id="scale-input"
                                    type="number"
                                    step="0.1"
                                    value={rotate}
                                    disabled={!imgSrc}
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e) => setScale(Number(e.target.value))}
                                />
                            </div>
                            <div>
                                <span>Rotate</span>
                                <TextField
                                    id="rotate-input"
                                    type="number"
                                    value={rotate}
                                    disabled={!imgSrc}
                                    onChange={(e) => setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))}
                                />
                            </div>
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => handleCropComplete(c)}
                                aspect={aspect}
                                ruleOfThirds
                            >
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    src={imgSrc}
                                    style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                                    onLoad={onImageLoad}
                                />
                            </ReactCrop>

                            <Button type="submit">Done</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </Fragment>
    )
}

export default ModalCropper
