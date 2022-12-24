import { memo, useState, useEffect, useRef, useContext } from 'react'
import classNames from 'classnames/bind'
import ImageUploading from 'react-images-uploading'
import Card from '@mui/joy/Card'
import CardCover from '@mui/joy/CardCover'
import Button from '@mui/joy/Button'
import { WorkspaceActionContext, saveToLS } from '~/pages/Workspace'
import ModalCropper from '~/pages/components/ModalCropper'
import styles from './ImageBox.module.scss'

const cx = classNames.bind(styles)

const ImageBox = memo(function ImageBox({ el }) {
    const { imageBoxState, setImageBoxState, setVideoBoxState, setBtnBoxState, setTextBoxState, setLayouts } =
        useContext(WorkspaceActionContext)
    const [curBox, setCurBox] = useState(el.box)
    const [imgSrc, setImg] = useState(el.style?.croppedImageUrl)
    const [imageOpacity, setImageOpacity] = useState(el.style?.imageOpacity)

    const imageRef = useRef()

    useEffect(() => {
        if (imageBoxState.box.i === curBox.i) {
            setImageOpacity(imageBoxState.imageOpacity)
            setLayouts((prev) => {
                let curLg = [...prev.lg]
                curLg = curLg.map((element) => {
                    const curEl = { ...element }
                    if (curEl.i === curBox.i) {
                        curEl.box = { ...imageBoxState.box }
                        curEl.style.imageOpacity = imageBoxState.imageOpacity
                    }
                    return curEl
                })
                saveToLS('layouts', curLg)
                return { lg: curLg }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageBoxState])

    useEffect(() => {
        if (imageBoxState.box.i === curBox.i && imageBoxState.croppedImageUrl !== '') {
            setImg(imageBoxState.croppedImageUrl)
            setLayouts((prev) => {
                let curLg = [...prev.lg]
                curLg = curLg.map((element) => {
                    const curEl = { ...element }
                    if (curEl.box.i === curBox.i) {
                        curEl.box = { ...imageBoxState.box }
                        curEl.style.croppedImageUrl = imageBoxState.croppedImageUrl
                    }
                    return curEl
                })
                saveToLS('layouts', curLg)
                return { lg: curLg }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageBoxState, imageBoxState.croppedImageUrl])

    const onSelectFile = (imageList, addUpdateIndex) => {
        setImageBoxState((prev) => {
            const newState = {
                ...prev,
                box: curBox,
                selectFile: {
                    ...prev.selectFile,
                    file: imageList[0].data_url,
                    isHavingFile: true,
                },
                isFocus: true,
            }
            return newState
        })
    }

    const onFocusImage = (e) => {
        e.preventDefault()
        console.log('clicked')
        console.log(curBox)
        setImageBoxState((prev) => {
            const newState = {
                ...prev,
                box: curBox,
                croppedImageUrl: imgSrc,
                imageOpacity,
                selectFile: {
                    file: [],
                    isHavingFile: false,
                },
                isFocus: true,
            }
            return newState
        })
        setBtnBoxState((prev) => {
            const newState = {
                ...prev,
                isFocus: false,
            }
            return newState
        })
        setTextBoxState((prev) => {
            const newState = {
                ...prev,
                isFocus: false,
            }
            return newState
        })
        setVideoBoxState((prev) => {
            const newState = {
                ...prev,
                isFocus: false,
            }
            return newState
        })
    }

    return (
        <div
            className={cx('wrapper')}
            style={{ opacity: `${imageOpacity}%`, width: '100%', height: '100%' }}
            ref={imageRef}
        >
            <div
                className={cx('container')}
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                {imgSrc !== '' ? (
                    <div style={{ width: '100%', height: '100%' }} onClick={onFocusImage}>
                        <Card
                            component="div"
                            sx={{ '--Card-radius': '0px', width: '100%', height: '100%', boxShadow: 'unset' }}
                        >
                            <CardCover>
                                <img alt="Crop" style={{ width: '100%', height: '100%' }} src={imgSrc} loading="lazy" />
                            </CardCover>
                        </Card>
                    </div>
                ) : (
                    <ImageUploading
                        // value={images}
                        onChange={onSelectFile}
                        dataURLKey="data_url"
                    >
                        {({ onImageUpload, dragProps }) => (
                            <Button variant="solid" onClick={onImageUpload} {...dragProps}>
                                Add image
                            </Button>
                        )}
                    </ImageUploading>
                )}
            </div>
            <ModalCropper el={el.box} />
        </div>
    )
})

export default ImageBox
