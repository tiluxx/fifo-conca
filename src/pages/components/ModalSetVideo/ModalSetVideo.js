import { Fragment, useState, useContext } from 'react'
import classNames from 'classnames/bind'
import Button from '@mui/joy/Button'
import TextField from '@mui/joy/TextField'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Select, { selectClasses } from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import FileUploadIcon from '@mui/icons-material/FileUpload'

import { WorkspaceActionContext } from '~/pages/Workspace'
import styles from './ModalSetVideo.module.scss'

const cx = classNames.bind(styles)

function ModalSetVideo({ el, openModal, setOpenModal }) {
    const { setVideoBoxState } = useContext(WorkspaceActionContext)
    const [curBox, setCurBox] = useState(el)
    const [videoUrl, setVideoUrl] = useState(el.style?.videoUrl)
    const [loop, setLoop] = useState(el.style?.isLoop)
    const [mute, setMute] = useState(el.style?.isMute)
    const [autoplay, setAutoplay] = useState(el.style?.isAutoPlay)
    const [type, setType] = useState('youtube')

    const handleEditButton = () => {
        setVideoBoxState((prev) => {
            const newState = {
                ...prev,
                box: curBox,
                videoUrl,
                isAutoPlay: autoplay,
                isLoop: loop,
                isMute: mute,
                isFocus: true,
                type,
            }
            return newState
        })
    }

    const handleVideoSrcChange = (e) => {
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setType('file')
        setVideoUrl(url)
    }

    return (
        <Fragment>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <ModalDialog
                    aria-labelledby="modal-dialog-btn-editor"
                    aria-describedby="modal-dialog-btn-editor-description"
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
                            setOpenModal(false)
                            handleEditButton()
                        }}
                        className={cx('form-wrapper')}
                        style={{ maxHeight: '100%' }}
                    >
                        <Stack
                            spacing={2}
                            sx={{
                                maxHeight: '100%',
                            }}
                        >
                            <div className={cx('input-wrapper')} style={{ fontSize: '1.2rem', lineHeight: '1.2rem' }}>
                                <div>Video source</div>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}
                                >
                                    <Button component="label" startDecorator={<FileUploadIcon />}>
                                        Upload your video
                                        <input
                                            hidden
                                            accept="video/mp4,video/x-m4v,video/*"
                                            type="file"
                                            onChange={handleVideoSrcChange}
                                        />
                                    </Button>
                                    <span> or </span>
                                </div>
                                <TextField
                                    id="video-link-input"
                                    placeholder="Enter video link"
                                    type="text"
                                    step="0.1"
                                    value={videoUrl}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                />
                            </div>

                            <div className={cx('select-wrapper')}>
                                <div>Autoplay</div>
                                <Select
                                    placeholder="Select a option"
                                    indicator={<KeyboardArrowDown />}
                                    sx={{
                                        width: 240,
                                        [`& .${selectClasses.indicator}`]: {
                                            transition: '0.2s',
                                            [`&.${selectClasses.expanded}`]: {
                                                transform: 'rotate(-180deg)',
                                            },
                                        },
                                    }}
                                >
                                    <Option value="true" onMouseUp={() => setAutoplay(true)}>
                                        Yes
                                    </Option>
                                    <Option value="false" onMouseUp={() => setAutoplay(false)}>
                                        No
                                    </Option>
                                </Select>
                            </div>

                            <div className={cx('select-wrapper')}>
                                <div>Loop</div>
                                <Select
                                    placeholder="Select a option"
                                    indicator={<KeyboardArrowDown />}
                                    sx={{
                                        width: 240,
                                        [`& .${selectClasses.indicator}`]: {
                                            transition: '0.2s',
                                            [`&.${selectClasses.expanded}`]: {
                                                transform: 'rotate(-180deg)',
                                            },
                                        },
                                    }}
                                >
                                    <Option value="true" onMouseUp={() => setLoop(true)}>
                                        Yes
                                    </Option>
                                    <Option value="false" onMouseUp={() => setLoop(false)}>
                                        No
                                    </Option>
                                </Select>
                            </div>

                            <div className={cx('select-wrapper')}>
                                <div>Mute</div>
                                <Select
                                    placeholder="Select a option"
                                    indicator={<KeyboardArrowDown />}
                                    sx={{
                                        width: 240,
                                        [`& .${selectClasses.indicator}`]: {
                                            transition: '0.2s',
                                            [`&.${selectClasses.expanded}`]: {
                                                transform: 'rotate(-180deg)',
                                            },
                                        },
                                    }}
                                >
                                    <Option value="true" onMouseUp={() => setMute(true)}>
                                        Yes
                                    </Option>
                                    <Option value="false" onMouseUp={() => setMute(false)}>
                                        No
                                    </Option>
                                </Select>
                            </div>

                            <Button type="submit">Done</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </Fragment>
    )
}

export default ModalSetVideo
