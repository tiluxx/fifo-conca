import { Fragment, useState, createContext } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import { deepmerge } from '@mui/utils'
import { experimental_extendTheme as extendMuiTheme } from '@mui/material/styles'
import colors from '@mui/joy/colors'
import { extendTheme as extendJoyTheme, CssVarsProvider, StyledEngineProvider } from '@mui/joy/styles'
import { Box, Typography, IconButton } from '@mui/joy'
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded'
import { Responsive, WidthProvider } from 'react-grid-layout'
import Button from '@mui/joy/Button'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import styles from './Workspace.module.scss'
import { Root, Header, SideNav, Main } from '~/components/WorkspaceSection'
import ToolBar from '~/components/ToolBar'
import FunctionBar from '~/components/FunctionBar'
import ElementBox from '~/pages/components/ElementBox'
import TextBox from '~/pages/components/TextBox'
import ImageBox from '~/pages/components/ImageBox'
import ButtonBox from '~/pages/components/ButtonBox'
import VideoBox from '~/pages/components/VideoBox'
import Footer from '~/pages/components/Footer'
import ModalCropper from '~/pages/components/ModalCropper'
import ModalPublishUrl from '~/pages/components/ModalPublishUrl'
import ModelWelcome from '~/pages/components/ModelWelcome'
import config from '~/config'
import './Workspace.css'
import ICONPortfolio from '~/utils/ICONPortfolio'

const ResponsiveReactGridLayout = WidthProvider(Responsive)
const WorkspaceActionContext = createContext()

const cx = classNames.bind(styles)

const muiTheme = extendMuiTheme({
    cssVarPrefix: 'joy',
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: colors.blue[500],
                },
                grey: colors.grey,
                error: {
                    main: colors.red[500],
                },
                info: {
                    main: colors.purple[500],
                },
                success: {
                    main: colors.green[500],
                },
                warning: {
                    main: colors.yellow[200],
                },
                common: {
                    white: '#FFF',
                    black: '#09090D',
                },
                divider: colors.grey[200],
                text: {
                    primary: colors.grey[800],
                    secondary: colors.grey[600],
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: colors.blue[600],
                },
                grey: colors.grey,
                error: {
                    main: colors.red[600],
                },
                info: {
                    main: colors.purple[600],
                },
                success: {
                    main: colors.green[600],
                },
                warning: {
                    main: colors.yellow[300],
                },
                common: {
                    white: '#FFF',
                    black: '#09090D',
                },
                divider: colors.grey[800],
                text: {
                    primary: colors.grey[100],
                    secondary: colors.grey[300],
                },
            },
        },
    },
})

const joyTheme = extendJoyTheme()

const theme = deepmerge(muiTheme, joyTheme)

function getFromLS(key) {
    let ls = {}
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem('rgl-7')) || {}
        } catch (e) {
            /*Ignore*/
        }
    }
    return ls[key]
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(
            'rgl-7',
            JSON.stringify({
                [key]: value,
            }),
        )
    }
}
const originalLayout = getFromLS('layouts') || []

function Workspace({ rowHeight = 30, cols = { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 } }) {
    const [layout, setLayout] = useState([])
    const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
    const [mounted, setMounted] = useState(false)
    const [layouts, setLayouts] = useState({ lg: JSON.parse(JSON.stringify(originalLayout)) })
    const [isLoading, setIsLoading] = useState(false)
    const [publishUrl, setPublishUrl] = useState({
        url: '',
        open: false,
    })
    const [textBoxState, setTextBoxState] = useState({
        box: {},
        editorState: null,
        changeStyles: () => {},
        textColor: '#1c1c1c',
        textOpacity: 100,
        isFocus: false,
    })
    const [imageBoxState, setImageBoxState] = useState({
        box: {},
        croppedImageUrl: '',
        selectFile: {
            file: [],
            isHavingFile: false,
        },
        imageOpacity: 100,
        isFocus: false,
    })
    const [btnBoxState, setBtnBoxState] = useState({
        box: {},
        btnName: '',
        btnLink: '',
        bgColor: '',
        textColor: '',
        variant: 'solid',
        btnOpacity: 100,
        isFocus: false,
        isOpenModal: false,
    })
    const [videoBoxState, setVideoBoxState] = useState({
        box: {},
        videoUrl: '',
        isAutoPlay: false,
        isLoop: false,
        isMute: false,
        videoOpacity: 100,
        isFocus: false,
    })
    const [customStyles, setCustomStyles] = useState({
        styleType: {
            styleNameConstant: '',
            typeName: '',
        },
    })
    const [globalStyles, setGlobalStyles] = useState({
        fontFamily: 'inherit',
        backgroundColor: '#fff',
        backgroundImage: {
            file: '',
            croppedImageUrl: '',
            bgSize: {
                cover: false,
                banner: true,
                smallBanner: false,
            },
            isFocus: false,
        },
    })
    const [footer, setFooter] = useState({
        fontFamily: 'inherit',
        backgroundColor: '#fff',
        backgroundImage: {
            imageUrl: '',
        },
        isHaving: false,
    })

    const onLayoutChange = (layout) => {
        const newLays = layouts.lg.map((el) => {
            const newLayout = { ...el }
            layout.forEach((l) => {
                if (l.i === el.box.i) {
                    newLayout.box.x = l.x
                    newLayout.box.y = l.y
                    newLayout.box.w = l.w
                    newLayout.box.h = l.h
                }
            })
            return newLayout
        })
        setLayouts({ lg: newLays })
        // saveToLS('layouts', newLays)
        setLayout(layout)
    }

    const componentDidMount = () => {
        setMounted(true)
    }

    const generateDOM = () => {
        return _.map(layouts.lg, function (l) {
            return (
                <div key={l.box.i} data-grid={l.box}>
                    {l.box.type === 'textBox' ? (
                        <Fragment>
                            <ElementBox id={l.box.i} el={l}>
                                <TextBox id={l.box.i} el={l} />
                            </ElementBox>
                            <span
                                style={{
                                    position: 'absolute',
                                    width: '20px',
                                    height: '20px',
                                    left: '2px',
                                    bottom: 0,
                                    cursor: 'pointer',
                                }}
                                onClick={() => onRemoveItemClick(l.box)}
                            />
                        </Fragment>
                    ) : l.box.type === 'imageBox' ? (
                        <Fragment>
                            <ElementBox id={l.box.i} el={l}>
                                <ImageBox id={l.box.i} el={l} />
                            </ElementBox>
                            <span
                                style={{
                                    position: 'absolute',
                                    width: '20px',
                                    height: '20px',
                                    right: '2px',
                                    top: 0,
                                    cursor: 'pointer',
                                }}
                                onClick={() => onRemoveItemClick(l.box)}
                            />
                        </Fragment>
                    ) : l.box.type === 'btnBox' ? (
                        <Fragment>
                            <ElementBox id={l.box.i} el={l}>
                                <ButtonBox id={l.box.i} el={l} />
                            </ElementBox>
                            <span
                                style={{
                                    position: 'absolute',
                                    width: '20px',
                                    height: '20px',
                                    right: '2px',
                                    top: 0,
                                    cursor: 'pointer',
                                }}
                                onClick={() => onRemoveItemClick(l.box)}
                            />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <ElementBox id={l.box.i} el={l}>
                                <VideoBox id={l.box.i} el={l} />
                            </ElementBox>
                            <span
                                style={{
                                    position: 'absolute',
                                    width: '20px',
                                    height: '20px',
                                    right: '2px',
                                    top: 0,
                                    cursor: 'pointer',
                                }}
                                onClick={() => onRemoveItemClick(l.box)}
                            />
                        </Fragment>
                    )}
                </div>
            )
        })
    }

    const onAddItem = ({ textBox = false, imageBox = false, btnBox = false, videoBox = false } = {}) => {
        setLayouts((prev) => {
            let curLg = [...prev.lg]
            if (textBox) {
                curLg = curLg.concat({
                    box: {
                        x: 0,
                        y: 0,
                        w: 2,
                        h: 6,
                        i: uuidv4(),
                        static: false,
                        type: 'textBox',
                    },
                    style: {
                        content: '',
                        editorState: null,
                        changeStyles: () => {},
                        textColor: '#1c1c1c',
                        textOpacity: 100,
                        textAlign: 'left',
                        fontSize: '',
                        lineHeight: '',
                        fontFamily: '',
                        isFocus: false,
                    },
                })
            } else if (imageBox) {
                curLg = curLg.concat({
                    box: {
                        x: 0,
                        y: 0,
                        w: 2,
                        h: 6,
                        i: uuidv4(),
                        static: false,
                        type: 'imageBox',
                    },
                    style: {
                        croppedImageUrl: '',
                        selectFile: {
                            file: [],
                            isHavingFile: false,
                        },
                        imageOpacity: 100,
                        isFocus: false,
                    },
                })
            } else if (btnBox) {
                curLg = curLg.concat({
                    box: {
                        x: 0,
                        y: 0,
                        w: 2,
                        h: 6,
                        i: uuidv4(),
                        static: false,
                        type: 'btnBox',
                    },
                    style: {
                        btnName: '',
                        btnLink: '',
                        bgColor: '',
                        textColor: '',
                        variant: 'solid',
                        btnOpacity: 100,
                        isFocus: false,
                        isOpenModal: false,
                    },
                })
            } else if (videoBox) {
                curLg = curLg.concat({
                    box: {
                        x: 0,
                        y: 0,
                        w: 2,
                        h: 6,
                        i: uuidv4(),
                        static: false,
                        type: 'videoBox',
                    },
                    style: {
                        videoUrl: '',
                        isAutoPlay: false,
                        isLoop: false,
                        isMute: false,
                        videoOpacity: 100,
                    },
                })
            }

            return { lg: curLg }
        })
    }

    const onRemoveItem = (e, l) => {
        if (e.keyCode === 46) {
            setLayouts((prev) => {
                let curLg = [...prev.lg]
                let newLg = []
                newLg = curLg.filter((el) => el.box.i !== l.i)
                saveToLS('layouts', newLg)
                return { lg: newLg }
            })
            setTextBoxState({ box: {}, editorState: null, changeStyles: () => {} })
            setImageBoxState({
                box: {},
                croppedImageUrl: '',
                selectFile: {
                    file: [],
                    isHavingFile: false,
                },
            })
        }
    }

    const onRemoveItemClick = (l) => {
        setLayouts((prev) => {
            let curLg = [...prev.lg]
            let newLg = []
            newLg = curLg.filter((el) => el.box.i !== l.i)
            saveToLS('layouts', newLg)
            return { lg: newLg }
        })
        setTextBoxState((prev) => {
            const newState = {
                ...prev,
                box: {},
                editorState: null,
                changeStyles: () => {},
            }
            return newState
        })
        setImageBoxState((prev) => {
            const newState = {
                ...prev,
                box: {},
                croppedImageUrl: '',
                selectFile: {
                    file: [],
                    isHavingFile: false,
                },
            }
            return newState
        })
    }

    const onRearrangeOrder = (boxState, type) => {
        if (layouts.lg.length > 1) {
            setLayouts((prev) => {
                let curLg = [...prev.lg]
                let curIdx = curLg.findIndex((el) => el.box.i === boxState.box.i)
                switch (type) {
                    case 'forward':
                        if (curIdx !== -1) {
                            curLg.splice(curIdx + 1, 0, curLg.splice(curIdx, 1)[0])
                        }
                        break
                    case 'backward':
                        if (curIdx !== -1) {
                            curLg.splice(curIdx - 1, 0, curLg.splice(curIdx, 1)[0])
                        }
                        break
                    case 'to-front':
                        if (curIdx !== -1) {
                            curLg.splice(curLg.length - 1, 0, curLg.splice(curIdx, 1)[0])
                        }
                        break
                    case 'to-back':
                        if (curIdx !== -1) {
                            curLg.splice(0, 0, curLg.splice(curIdx, 1)[0])
                        }
                        break
                    default:
                        break
                }
                saveToLS('layouts', curLg)

                return { lg: curLg }
            })
        }
    }

    const onBreakpointChange = (breakpoint) => {
        setCurrentBreakpoint(breakpoint)
    }

    const backgroundClasses = cx('art-board-background', {
        [styles['art-board-background--cover']]: globalStyles.backgroundImage.bgSize.cover,
        [styles['art-board-background--banner']]: globalStyles.backgroundImage.bgSize.banner,
        [styles['art-board-background--small-banner']]: globalStyles.backgroundImage.bgSize.smallBanner,
    })

    const handlePublishPortfolio = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const portfolio = document.getElementById('main-art-board')
            let outerHtml = portfolio.outerHTML
            const icon = new ICONPortfolio()
            await icon.authenticate('tiluxx')
            await icon.createRepository()
            await icon.uploadFileToRepository(
                'index.html',
                `
                <html lang="en" style="font-size: 62.5%;">
                <head>
                    <meta charset="utf-8" />
                    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
                    <link rel="apple-touch-icon" sizes="180x180" href="%PUBLIC_URL%/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon-16x16.png" />
    
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="#000000" />
                    <meta
                    name="description"
                    content="Portfolio creator by Con Ca"
                    />
                    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
                    <title>FIFO - Portfolio</title>
                </head>
                <body style="margin: 0;">
                    <noscript>You need to enable JavaScript to run this app.</noscript>
                    <div id="root">
                        ${outerHtml}
                    </div>
                </body>
                </html>
            `,
            )
            const publishURL = await icon.createGithubPage()
            setPublishUrl({
                url: `https://github.com/tiluxx/${publishURL}`,
                open: true,
            })
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    return (
        <WorkspaceActionContext.Provider
            value={{
                onAddItem,
                onRemoveItem,
                textBoxState,
                setTextBoxState,
                layout,
                setLayout,
                customStyles,
                setCustomStyles,
                imageBoxState,
                setImageBoxState,
                onRemoveItemClick,
                onRearrangeOrder,
                setGlobalStyles,
                globalStyles,
                btnBoxState,
                setBtnBoxState,
                videoBoxState,
                setVideoBoxState,
                footer,
                setFooter,
                setLayouts,
                publishUrl,
                setPublishUrl,
            }}
        >
            <StyledEngineProvider injectFirst>
                <CssVarsProvider disableTransitionOnChange theme={theme}>
                    <Root
                        sx={{
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
                                md: 'minmax(160px, 270px) minmax(700px, 2fr) minmax(160px, 270px)',
                            },
                        }}
                    >
                        <Header>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 1.5,
                                }}
                            >
                                <Link to={config.routes.home}>
                                    <IconButton
                                        size="sm"
                                        variant="solid"
                                        sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                                    >
                                        <FindInPageRoundedIcon />
                                    </IconButton>
                                </Link>
                                <Typography component="h1" fontWeight="xl">
                                    FIFO
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
                                <Button
                                    loading={isLoading}
                                    size="lg"
                                    variant="solid"
                                    color="primary"
                                    onClick={(e) => handlePublishPortfolio(e)}
                                >
                                    Publish
                                </Button>
                            </Box>
                        </Header>
                        <SideNav>
                            <ToolBar />
                        </SideNav>
                        <Main className={cx('art-board-wrapper')}>
                            <div
                                id="main-art-board"
                                className={cx('art-board-container')}
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    backgroundColor: globalStyles.backgroundColor,
                                }}
                            >
                                {globalStyles.backgroundImage.croppedImageUrl !== '' && (
                                    <div
                                        className={cx('art-board-background-wrapper')}
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                        }}
                                    >
                                        <div
                                            className={backgroundClasses}
                                            style={{
                                                backgroundImage: `url(${globalStyles.backgroundImage.croppedImageUrl})`,
                                                backgroundPosition: 'center center',
                                                backgroundSize: 'cover',
                                                width: '100%',
                                                WebkitTransition: 'opacity 255ms',
                                                transition: 'opacity 255ms',
                                                height: '-webkit-calc(100vh - 64px)',
                                                height: 'calc(100vh - 64px)',
                                            }}
                                        ></div>
                                    </div>
                                )}

                                {footer.isHaving && (
                                    <div
                                        className={cx('footer-wrapper')}
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                        }}
                                    >
                                        <Footer />
                                    </div>
                                )}
                                <ModalCropper />

                                <ResponsiveReactGridLayout
                                    className={cx('art-board')}
                                    style={{
                                        width: '100%',
                                        minHeight: '100vh',
                                        backgroundColor: 'transparent',
                                    }}
                                    // layouts={layouts}
                                    cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
                                    rowHeight={30}
                                    onBreakpointChange={onBreakpointChange}
                                    onLayoutChange={(layout) => onLayoutChange(layout)}
                                    measureBeforeMount={false}
                                    useCSSTransforms={mounted}
                                    allowOverlap={true}
                                >
                                    {generateDOM()}
                                </ResponsiveReactGridLayout>
                            </div>
                        </Main>
                        <SideNav
                            sx={{
                                borderLeft: '1px solid',
                                borderRight: 'transparent',
                                borderColor: 'divider',
                            }}
                        >
                            <FunctionBar />
                        </SideNav>
                        <ModalPublishUrl />
                        <ModelWelcome isOpen={false} />
                    </Root>
                </CssVarsProvider>
            </StyledEngineProvider>
        </WorkspaceActionContext.Provider>
    )
}

export default Workspace
export { WorkspaceActionContext, saveToLS }
