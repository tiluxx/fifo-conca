import { Fragment, useState } from 'react'
import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Typography from '@mui/joy/Typography'
import Sheet from '@mui/joy/Sheet'

function ModelWelcome({ isOpen }) {
    const [open, setOpen] = useState(true)

    return (
        <Fragment>
            <Modal
                aria-labelledby="modal-title-welcome"
                aria-describedby="modal-desc-welcome"
                open={open}
                onClose={() => setOpen(!open)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
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
                    <Typography
                        component="h2"
                        id="modal-title-welcome"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                        sx={{ fontSize: '1.6rem' }}
                    >
                        Welcome
                    </Typography>
                    <Typography id="modal-desc-welcome" textColor="text.tertiary" sx={{ fontSize: '1.4rem' }}>
                        If you choose a template, please click button bellow to load your workspace, and then close the
                        modal; otherwise, close the modal
                    </Typography>
                    <Button
                        variant="solid"
                        onClick={() => {
                            setOpen(!open)
                            window.location.reload()
                        }}
                        sx={{ fontSize: '1.2rem' }}
                    >
                        Click here to load your workspace
                    </Button>
                </Sheet>
            </Modal>
        </Fragment>
    )
}

export default ModelWelcome
