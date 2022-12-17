import { Fragment, useContext } from 'react'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Typography from '@mui/joy/Typography'
import Sheet from '@mui/joy/Sheet'
import { WorkspaceActionContext } from '~/pages/Workspace'

function ModalPublishUrl() {
    const { publishUrl, setPublishUrl } = useContext(WorkspaceActionContext)

    return (
        <Fragment>
            <Modal
                aria-labelledby="modal-title-publish-url"
                aria-describedby="modal-desc-publish-url"
                open={publishUrl.open}
                onClose={() => setPublishUrl({ url: '', open: false })}
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
                        id="modal-title-publish-url"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        This is your portfolio repository
                    </Typography>
                    <Typography id="modal-desc-publish-url" textColor="text.tertiary">
                        <a href={publishUrl.url}>{publishUrl.url}</a>
                    </Typography>
                </Sheet>
            </Modal>
        </Fragment>
    )
}

export default ModalPublishUrl
