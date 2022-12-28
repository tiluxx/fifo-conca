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

import { WorkspaceActionContext } from '~/pages/Workspace'
import styles from './ModalButtonEditor.module.scss'

const cx = classNames.bind(styles)

function ModalButtonEditor({ el, name = '', link = '', isOpen = false }) {
    const { setBtnBoxState } = useContext(WorkspaceActionContext)
    const [open, setOpen] = useState(isOpen)
    const [curBox, setCurBox] = useState(el)
    const [btnName, setBtnName] = useState(name)
    const [btnLink, setBtnLink] = useState(link)
    const [btnVariant, setBtnVariant] = useState('solid')

    const handleEditButton = () => {
        setBtnBoxState((prev) => {
            const newState = {
                ...prev,
                box: curBox,
                btnName,
                btnLink,
                borderColor: '',
                variant: btnVariant,
                isFocus: true,
                isOpenModal: false,
            }
            return newState
        })
    }

    return (
        <Fragment>
            <Modal open={open} onClose={() => setOpen(false)}>
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
                            setOpen(false)
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
                                <div style={{ marginBottom: '4px', color: '#73738c' }}>Name</div>
                                <TextField
                                    id="btn-name-input"
                                    type="text"
                                    step="0.1"
                                    value={btnName}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setBtnName(e.target.value)}
                                />
                            </div>

                            <div className={cx('input-wrapper')} style={{ fontSize: '1.2rem', lineHeight: '1.2rem' }}>
                                <div style={{ marginBottom: '4px', color: '#73738c' }}>Link</div>
                                <TextField
                                    id="btn-link-input"
                                    type="url"
                                    value={btnLink}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setBtnLink(e.target.value)}
                                />
                            </div>

                            <div className={cx('select-wrapper')}>
                                <div>Style</div>
                                <Select
                                    placeholder="Select a style"
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
                                    <Option value="solid" onMouseUp={() => setBtnVariant('solid')}>
                                        Solid
                                    </Option>
                                    <Option value="soft" onMouseUp={() => setBtnVariant('soft')}>
                                        Soft
                                    </Option>
                                    <Option value="outlined" onMouseUp={() => setBtnVariant('outlined')}>
                                        Outlined
                                    </Option>
                                    <Option value="plain" onMouseUp={() => setBtnVariant('plain')}>
                                        Plain
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

export default ModalButtonEditor
