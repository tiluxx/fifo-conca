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
    const { imageBoxState, setImageBoxState, onRemoveItem, setLayout } = useContext(WorkspaceActionContext)
    const [imgSrc, setImg] = useState('')

    const imageRef = useRef()

    // const focus = () => imageRef.component.focus()

    useEffect(() => {
        if (imageBoxState.box.i === el.i && imageBoxState.croppedImageUrl !== '') {
            setImg(imageBoxState.croppedImageUrl)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageBoxState])

    const onSelectFile = (imageList, addUpdateIndex) => {
        setImageBoxState((prev) => {
            const newState = {
                ...prev,
                box: el,
                selectFile: {
                    ...prev.selectFile,
                    file: imageList[0].data_url,
                    isHavingFile: true,
                },
            }
            return newState
        })
    }

    return (
        <div className={cx('wrapper')} ref={imageRef}>
            <div className={cx('container')}>
                {imgSrc !== '' ? (
                    <Card component="div" sx={{ '--Card-radius': '0px', width: '100%', height: '100%' }}>
                        <CardCover>
                            <img alt="Crop" style={{ width: '100%', height: '100%' }} src={imgSrc} loading="lazy" />
                        </CardCover>
                    </Card>
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
