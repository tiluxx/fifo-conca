import { Fragment, useState, useEffect, useRef, useContext } from 'react'
import classNames from 'classnames/bind'
import ReactCrop, { centerCrop, makeAspectCrop, Crop } from 'react-image-crop'
import Button from '@mui/joy/Button'
import TextField from '@mui/joy/TextField'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import 'react-image-crop/dist/ReactCrop.css'

import { WorkspaceActionContext } from '~/pages/Workspace'
import styles from './ModalCropper.module.scss'

const cx = classNames.bind(styles)

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
    const { imageBoxState, setImageBoxState, globalStyles, setGlobalStyles } = useContext(WorkspaceActionContext)
    const [open, setOpen] = useState(false)
    const [imgSrc, setImgSrc] = useState('')
    const imgRef = useRef(null)
    const [crop, setCrop] = useState(Crop)
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    // eslint-disable-next-line no-unused-vars
    const [aspect, setAspect] = useState(undefined)

    useEffect(() => {
        if (el && imageBoxState.box.i === el.i && imageBoxState.selectFile.isHavingFile) {
            setOpen(true)
            const targetFile = imageBoxState.selectFile.file
            if (targetFile) {
                setCrop(undefined)
                setImgSrc(targetFile || '')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageBoxState])

    useEffect(() => {
        if (globalStyles.backgroundImage.isFocus) {
            setOpen(true)
            const targetFile = globalStyles.backgroundImage.file
            if (targetFile) {
                setCrop(undefined)
                setImgSrc(targetFile || '')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalStyles.backgroundImage.file])

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
            const imgName = el ? `${el.i}.jpeg` : 'bgImage.jpeg'
            const croppedImageUrl = await getCroppedImg(imgRef.current, crop, imgName)
            if (globalStyles.backgroundImage.isFocus || !el) {
                setGlobalStyles((prev) => {
                    const newState = {
                        ...prev,
                        backgroundImage: {
                            ...prev.backgroundImage,
                            croppedImageUrl: croppedImageUrl,
                            isFocus: false,
                        },
                    }
                    return newState
                })
            } else {
                setImageBoxState((prev) => {
                    const newState = {
                        ...prev,
                        box: el,
                        croppedImageUrl: croppedImageUrl,
                        selectFile: {
                            file: [],
                            isHavingFile: false,
                        },
                    }
                    return newState
                })
            }
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
                    if (fileUrl) {
                        URL.revokeObjectURL(fileUrl)
                    }
                    fileUrl = window.URL.createObjectURL(blob)
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
                        maxHeight: '70%',
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
                        className={cx('form-wrapper')}
                    >
                        <Stack
                            spacing={2}
                            sx={{
                                maxHeight: '100%',
                            }}
                        >
                            <div className={cx('input-wrapper')}>
                                <span>Scale</span>
                                <TextField
                                    id="scale-input"
                                    type="number"
                                    step="0.1"
                                    value={rotate}
                                    disabled={!imgSrc}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setScale(Number(e.target.value))}
                                />
                            </div>
                            <div className={cx('input-wrapper')}>
                                <span>Rotate</span>
                                <TextField
                                    id="rotate-input"
                                    type="number"
                                    value={rotate}
                                    disabled={!imgSrc}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))}
                                />
                            </div>
                            <ReactCrop
                                className={cx('cropper-wrapper')}
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
