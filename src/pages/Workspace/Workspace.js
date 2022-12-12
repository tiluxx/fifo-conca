import { Fragment, useState, createContext } from 'react'
import classNames from 'classnames/bind'
import { deepmerge } from '@mui/utils'
import { experimental_extendTheme as extendMuiTheme } from '@mui/material/styles'
import colors from '@mui/joy/colors'
import { extendTheme as extendJoyTheme, useColorScheme, CssVarsProvider, StyledEngineProvider } from '@mui/joy/styles'
import { Box, Typography, IconButton } from '@mui/joy'
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded'
import BookRoundedIcon from '@mui/icons-material/BookRounded'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import styles from './Workspace.module.scss'
import { Root, Header, SideNav, Main } from '~/components/WorkspaceSection'
import ToolBar from '~/components/ToolBar'
import FunctionBar from '~/components/FunctionBar'
import ElementBox from '~/pages/components/ElementBox'
import TextBox from '~/pages/components/TextBox'
import ImageBox from '~/pages/components/ImageBox'
import './Workspace.css'

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

function Workspace({ rowHeight = 30, cols = { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 } }) {
    const [layout, setLayout] = useState([])
    const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
    const [mounted, setMounted] = useState(false)
    const [layouts, setLayouts] = useState({ lg: [] })
    const [textBoxState, setTextBoxState] = useState({ box: {}, editorState: null, changeStyles: () => {} })
    const [customStyles, setCustomStyles] = useState({
        textAlignment: { textAlignLeft: false, textAlignCenter: false, textAlignRight: false, textAlignJustify: false },
        styleType: {
            styleNameConstant: '',
            typeName: '',
        },
    })
    const [imageBoxState, setImageBoxState] = useState({
        box: {},
        croppedImageUrl: '',
        selectFile: {
            file: [],
            isHavingFile: false,
        },
    })

    const onLayoutChange = (layout) => {
        setLayout(layout)
    }

    const componentDidMount = () => {
        setMounted(true)
    }

    const generateDOM = () => {
        return _.map(layouts.lg, function (l, i) {
            return (
                <div key={l.i} data-grid={l} onKeyDown={(e) => onRemoveItem(e, l)}>
                    {l.type === 'textBox' ? (
                        <Fragment>
                            <ElementBox el={l}>
                                <TextBox el={l} />
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
                                onClick={() => onRemoveItemClick(l)}
                            />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <ElementBox el={l}>
                                <ImageBox el={l} />
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
                                onClick={() => onRemoveItemClick(l)}
                            />
                        </Fragment>
                    )}
                </div>
            )
        })
    }

    const onAddItem = ({ textBox = false, imageBox = false } = {}) => {
        setLayouts((prev) => {
            let curLg = [...prev.lg]
            if (textBox) {
                curLg = curLg.concat({
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 6,
                    i: uuidv4(),
                    static: false,
                    type: 'textBox',
                })
            }

            if (imageBox) {
                curLg = curLg.concat({
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 6,
                    i: uuidv4(),
                    static: false,
                    type: 'imageBox',
                })
            }

            return { lg: curLg }
        })
    }

    const onRemoveItem = (e, l) => {
        if (e.keyCode === 46 || e.keyCode === 8) {
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

    const onBreakpointChange = (breakpoint) => {
        setCurrentBreakpoint(breakpoint)
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
                            <ToolBar />
                        </SideNav>
                        <Main className={cx('art-board-wrapper')}>
                            <div>
                                <ResponsiveReactGridLayout
                                    className={cx('art-board-container')}
                                    // layouts={layouts}
                                    cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
                                    rowHeight={30}
                                    onBreakpointChange={onBreakpointChange}
                                    onLayoutChange={(layout) => onLayoutChange(layout)}
                                    measureBeforeMount={false}
                                    useCSSTransforms={mounted}
                                    allowOverlap={true}
                                    // onDragStop={() => handleDragAndResizeItem('stop')}
                                    // onResizeStop={() => handleDragAndResizeItem('stop')}
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
export { WorkspaceActionContext }
