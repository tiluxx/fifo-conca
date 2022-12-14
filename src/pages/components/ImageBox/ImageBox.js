import { useState, useEffect, useRef, useContext } from 'react'
import classNames from 'classnames/bind'
import ImageUploading from 'react-images-uploading'
import Card from '@mui/joy/Card'
import CardCover from '@mui/joy/CardCover'
import Button from '@mui/joy/Button'
import { WorkspaceActionContext } from '~/pages/Workspace'
import ModalCropper from '~/pages/components/ModalCropper'
import styles from './ImageBox.module.scss'

const cx = classNames.bind(styles)

function ImageBox({ el }) {
    const { imageBoxState, setImageBoxState, setTextBoxState, onRemoveItem, setLayout } =
        useContext(WorkspaceActionContext)
    const [curBox, setCurBox] = useState(el)
    const [imgSrc, setImg] = useState('')
    const [imageOpacity, setImageOpacity] = useState(100)

    const imageRef = useRef()

    // const focus = () => imageRef.component.focus()

    useEffect(() => {
        if (imageBoxState.box.i === curBox.i) {
            console.log(imageBoxState.imageOpacity)
            setImageOpacity(imageBoxState.imageOpacity)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageBoxState])

    useEffect(() => {
        if (imageBoxState.box.i === curBox.i && imageBoxState.croppedImageUrl !== '') {
            setImg(imageBoxState.croppedImageUrl)
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
            }
            return newState
        })
    }

    const onFocusImage = (e) => {
        e.preventDefault()
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
        setTextBoxState((prev) => {
            const newState = {
                ...prev,
                isFocus: false,
            }
            return newState
        })
    }

    return (
        <div className={cx('wrapper')} style={{ opacity: `${imageOpacity}%` }} ref={imageRef}>
            <div className={cx('container')}>
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
            <ModalCropper el={el} />
        </div>
    )
}

export default ImageBox
