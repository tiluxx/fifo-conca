import { Fragment, useState, useContext } from 'react'
import classNames from 'classnames/bind'
import Button from '@mui/joy/Button'
import TextField from '@mui/joy/TextField'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import ModalClose from '@mui/joy/ModalClose'
import Stack from '@mui/joy/Stack'

import { WorkspaceActionContext } from '~/pages/Workspace'
import styles from './ModalPrePublishUrl.module.scss'

const cx = classNames.bind(styles)

function ModalPrePublishUrl() {
    const { prePublishUrl, setPrePublishUrl, handlePublishPortfolio } = useContext(WorkspaceActionContext)
    const [productTitle, setProductTitle] = useState('')

    return (
        <Fragment>
            <Modal open={prePublishUrl.open} onClose={() => setPrePublishUrl({ title: '', open: false })}>
                <ModalDialog
                    aria-labelledby="modal-dialog-pre-publish-title"
                    aria-describedby="modal-dialog-pre-publish-description"
                    sx={{
                        maxWidth: 500,
                        maxHeight: '70%',
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            setPrePublishUrl({ title: '', open: false })
                            handlePublishPortfolio(productTitle)
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
                                <div style={{ marginBottom: '4px', color: '#73738c' }}>Title</div>
                                <TextField
                                    id="product-title-input"
                                    type="text"
                                    step="0.1"
                                    value={productTitle}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setProductTitle(e.target.value)}
                                />
                            </div>
                            <Button type="submit">Done</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </Fragment>
    )
}

export default ModalPrePublishUrl
