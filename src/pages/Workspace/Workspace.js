import { useState } from 'react'
import classNames from 'classnames/bind'
import { CssVarsProvider } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import IconButton from '@mui/joy/IconButton'
import Divider from '@mui/joy/Divider'
import Sheet from '@mui/joy/Sheet'
import { StyledEngineProvider } from '@mui/joy/styles'

import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded'
import BookRoundedIcon from '@mui/icons-material/BookRounded'

import { Root, Header, SideNav, Main } from '~/components/WorkspaceSection'
import Navigation from '~/components/Navigation'
import styles from './Workspace.module.scss'

const cx = classNames.bind(styles)

function Workspace() {
    return (
        <StyledEngineProvider injectFirst>
            <CssVarsProvider disableTransitionOnChange>
                <Root
                    sx={{
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
                            md: 'minmax(160px, 300px) minmax(700px, 2fr) minmax(160px, 300px)',
                        },
                    }}
                >
                    {/* <div> */}
                    <Header>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 1.5,
                            }}
                        >
                            <IconButton size="sm" variant="solid" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                                <FindInPageRoundedIcon />
                            </IconButton>
                            <Typography component="h1" fontWeight="xl">
                                Files
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
                            <IconButton
                                size="sm"
                                variant="outlined"
                                color="primary"
                                component="a"
                                href="/blog/first-look-at-joy/"
                            >
                                <BookRoundedIcon />
                            </IconButton>
                        </Box>
                    </Header>
                    <SideNav>
                        <Navigation />
                    </SideNav>
                    <Main></Main>
                    <Sheet
                        sx={{
                            display: { xs: 'none', sm: 'initial' },
                            borderLeft: '1px solid',
                            borderColor: 'neutral.outlinedBorder',
                        }}
                    ></Sheet>
                    {/* </div> */}
                </Root>
            </CssVarsProvider>
        </StyledEngineProvider>
    )
}

export default Workspace
