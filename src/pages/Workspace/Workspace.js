import { Fragment, useState, createContext } from 'react'
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
import Footer from '~/pages/components/Footer'
import ModalCropper from '~/pages/components/ModalCropper'
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
        saveToLS('layouts', newLays)
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
                    ) : (
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
                    )}
                </div>
            )
        })
    }

    const onAddItem = ({ textBox = false, imageBox = false, btnBox = false } = {}) => {
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
                        order: curLg.length,
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
                        order: curLg.length,
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
                        order: curLg.length,
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
            }

            return { lg: curLg }
        })
    }

    const onRemoveItem = (e, l) => {
        if (e.keyCode === 46) {
            setLayouts((prev) => {
                let curLg = [...prev.lg]
                let newLg = []
                newLg = curLg.filter((el) => el.i !== l.i)
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
                const curOrder = boxState.box.order
                switch (type) {
                    case 'forward':
                        ;[curLg[curOrder], curLg[curOrder + 1]] = [curLg[curOrder + 1], curLg[curOrder]]
                        curLg[curOrder]['order'] = curOrder
                        curLg[curOrder + 1]['order'] = curOrder + 1
                        break
                    case 'backward':
                        ;[curLg[curOrder], curLg[curOrder - 1]] = [curLg[curOrder - 1], curLg[curOrder]]
                        curLg[curOrder]['order'] = curOrder
                        curLg[curOrder - 1]['order'] = curOrder - 1
                        break
                    case 'to-front':
                        ;[curLg[curOrder], curLg[curLg.length - 1]] = [curLg[curLg.length - 1], curLg[curOrder]]
                        curLg[curOrder]['order'] = curOrder
                        curLg[curLg.length - 1]['order'] = curLg.length - 1
                        break
                    case 'to-back':
                        ;[curLg[curOrder], curLg[0]] = [curLg[0], curLg[curOrder]]
                        curLg[curOrder]['order'] = curOrder
                        curLg[0]['order'] = 0
                        break
                    default:
                        break
                }
                curLg.sort((a, b) => (a.order > b.order ? 1 : b.order > a.order ? -1 : 0))
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
        const portfolio = document.getElementById('main-art-board')
        let outerHtml = portfolio.outerHTML
        const icon = new ICONPortfolio()
        await icon.authenticate('tiluxx')
        await icon.createRepository()
        await icon.uploadFileToRepository(
            'index.html',
            `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Portfolio</title>
        </head>
        <body>
            ${outerHtml}
        </body>
        </html>
        `,
        )
        await icon.createGithubPage()
        console.log(portfolio)
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
                footer,
                setFooter,
                setLayouts,
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
                                <IconButton
                                    size="sm"
                                    variant="solid"
                                    sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                                >
                                    <FindInPageRoundedIcon />
                                </IconButton>
                                <Typography component="h1" fontWeight="xl">
                                    FIFO
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
                                <Button
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
                                style={{ backgroundColor: globalStyles.backgroundColor }}
                            >
                                {globalStyles.backgroundImage.croppedImageUrl !== '' && (
                                    <div className={cx('art-board-background-wrapper')}>
                                        <div
                                            className={backgroundClasses}
                                            style={{
                                                backgroundImage: `url(${globalStyles.backgroundImage.croppedImageUrl})`,
                                            }}
                                        ></div>
                                    </div>
                                )}

                                {footer.isHaving && (
                                    <div className={cx('footer-wrapper')}>
                                        <Footer />
                                    </div>
                                )}
                                <ModalCropper />

                                <ResponsiveReactGridLayout
                                    className={cx('art-board')}
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
                    </Root>
                </CssVarsProvider>
            </StyledEngineProvider>
        </WorkspaceActionContext.Provider>
    )
}

export default Workspace
export { WorkspaceActionContext, saveToLS }
