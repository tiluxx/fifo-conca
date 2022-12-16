import { useState, useRef, useCallback, useContext } from 'react'
import { constantCase } from 'change-case'
import ImageUploading from 'react-images-uploading'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import classNames from 'classnames/bind'
import Card from '@mui/joy/Card'
import Divider from '@mui/joy/Divider'
import IconButton from '@mui/joy/IconButton'
import Slider from '@mui/joy/Slider'
import List from '@mui/joy/List'
import ListSubheader from '@mui/joy/ListSubheader'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import ListItemContent from '@mui/joy/ListItemContent'
import Select, { selectClasses } from '@mui/joy/Select'
import Option from '@mui/joy/Option'
// import TextField from '@mui/material/TextField'

// Icon
import UploadIcon from '@mui/icons-material/Upload'
import OpacityIcon from '@mui/icons-material/Opacity'
import FontDownloadIcon from '@mui/icons-material/FontDownload'
import TextFormatIcon from '@mui/icons-material/TextFormat'
import FormatClearIcon from '@mui/icons-material/FormatClear'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import FormatSizeIcon from '@mui/icons-material/FormatSize'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import LastPageIcon from '@mui/icons-material/LastPage'

import { WorkspaceActionContext } from '~/pages/Workspace'
import { fontListName } from '~/assets/fonts'
import useClickOutside from '~/hooks/useClickOutside'
import styles from './FunctionBar.module.scss'
import './FunctionBar.css'

const cx = classNames.bind(styles)

function FunctionBar() {
    const {
        textBoxState,
        setTextBoxState,
        btnBoxState,
        setBtnBoxState,
        setCustomStyles,
        imageBoxState,
        setImageBoxState,
        onRearrangeOrder,
    } = useContext(WorkspaceActionContext)
    const [openElementList, setOpenElementList] = useState(true)
    const [openAppearanceImageList, setOpenAppearanceImageList] = useState(true)
    const [openAppearanceTextBoxList, setOpenAppearanceTextBoxList] = useState(true)
    const [openAppearanceBtnBoxList, setOpenAppearanceBtnBoxList] = useState(true)
    const [openCharacterList, setOpenCharacterList] = useState(true)
    const [openParagraphList, setOpenParagraphList] = useState(true)
    const [openPositionList, setOpenPositionList] = useState(true)
    const [openColorPopover, setOpenColorPopover] = useState(false)
    const [openBtnTextColorPopover, setBtnTextOpenColorPopover] = useState(false)
    const [openBtnBgColorPopover, setBtnBgOpenColorPopover] = useState(false)

    const colorPickerPopover = useRef()
    const btnTextColorPickerPopover = useRef()
    const btnBgColorPickerPopover = useRef()

    const close = useCallback(() => setOpenColorPopover(false), [])
    const closeBtnTextColor = useCallback(() => setBtnTextOpenColorPopover(false), [])
    const closeBtnBgColor = useCallback(() => setBtnBgOpenColorPopover(false), [])
    useClickOutside(colorPickerPopover, close)
    useClickOutside(btnTextColorPickerPopover, closeBtnTextColor)
    useClickOutside(btnBgColorPickerPopover, closeBtnBgColor)

    // const onDimensionChange = (e, type) => {
    //     setTextBoxState((prev) => {
    //         const newDimension = {
    //             ...prev,
    //             box: {
    //                 ...prev.box,
    //                 [type]: Number(e.target.value),
    //             },
    //         }
    //         return newDimension
    //     })
    //     const newLayout = [...layout]
    //     newLayout.forEach((item) => {
    //         if (item.i === textBoxState.box.i) {
    //             item[type] = Number(e.target.value)
    //         }
    //     })
    //     setLayout(newLayout)
    // }

    const onChangeFile = (imageList, addUpdateIndex) => {
        setImageBoxState((prev) => {
            const newState = {
                ...prev,
                selectFile: {
                    ...prev.selectFile,
                    file: imageList[0].data_url,
                    isHavingFile: true,
                },
                isFocus: true,
            }
            return newState
        })
    }

    const onTextColorChange = (color) => {
        setTextBoxState((prev) => {
            const newState = { ...prev, textColor: color }
            return newState
        })
    }

    const onBtnBgColorChange = (color) => {
        setBtnBoxState((prev) => {
            const newState = { ...prev, bgColor: color }
            return newState
        })
    }

    const onBtnTextColorChange = (color) => {
        setBtnBoxState((prev) => {
            const newState = { ...prev, textColor: color }
            return newState
        })
    }

    const handleRearrangeOrder = (e, typeBox, rearrangeType) => {
        let newState = {}
        if (typeBox === 'textBox') {
            newState = { ...textBoxState }
        } else if (typeBox === 'imageBox') {
            newState = { ...imageBoxState }
        } else {
            newState = { ...btnBoxState }
        }
        onRearrangeOrder(newState, rearrangeType)
    }

    const handleTextOpacityChange = (e, value) => {
        setTextBoxState((prev) => {
            const newState = { ...prev, textOpacity: Number(value) }
            return newState
        })
    }

    const handleImageOpacityChange = (e, value) => {
        setImageBoxState((prev) => {
            const newState = { ...prev, imageOpacity: Number(value) }
            return newState
        })
    }

    const handleBtnOpacityChange = (e, value) => {
        setBtnBoxState((prev) => {
            const newState = { ...prev, btnOpacity: Number(value) }
            return newState
        })
    }

    const handleStylesChange = (e, style, type) => {
        if (style !== 'textAlignment') {
            setCustomStyles((prev) => {
                let styleName = ''
                if (style === 'typeFontSize') {
                    styleName = 'TYPE_FONT_SIZE'
                } else if (style === 'typeFontFamily') {
                    styleName = 'TYPE_FONT_FAMILY'
                } else {
                    styleName = 'TYPE_TEXT_ALIGN'
                }
                const newCustomStyles = { ...prev }
                newCustomStyles['styleType']['styleNameConstant'] = styleName
                newCustomStyles['styleType']['typeName'] = type
                return newCustomStyles
            })
        } else {
            setCustomStyles((prev) => {
                const newCustomStyles = { ...prev }
                newCustomStyles[style][type] = !newCustomStyles[style][type]
                return newCustomStyles
            })
        }
    }

    return (
        <List size="sm" sx={{ '--List-item-radius': '8px', '--List-gap': '4px' }}>
            {/* {textBoxState && (
                <ListItem nested>
                    <ListSubheader>
                        <h3 className={cx('section-title')}>Transform</h3>
                        <IconButton
                            size="sm"
                            variant="plain"
                            color="primary"
                            sx={{ '--IconButton-size': '2.4rem', ml: 'auto' }}
                            onClick={() => setOpenElementList(!openElementList)}
                        >
                            {openElementList ? (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(-180deg)',
                                        transform: 'rotatez(-180deg)',
                                    }}
                                />
                            ) : (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(0deg)',
                                        transform: 'rotatez(0deg)',
                                    }}
                                />
                            )}
                        </IconButton>
                    </ListSubheader>
                    {openElementList && (
                        <List
                            aria-labelledby="nav-list-browse"
                            sx={{
                                '& .JoyListItemButton-root': { p: '8px' },
                                '--List-decorator-size': '32px',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                        >
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '50%',
                                    marginBottom: '12px',
                                }}
                            >
                                <ListItemContent
                                    sx={{
                                        marginRight: '12px',
                                    }}
                                >
                                    X:
                                </ListItemContent>
                                <ListItemContent>
                                    <TextField
                                        id="dimension-x"
                                        fullWidth
                                        variant="outlined"
                                        value={textBoxState.box.x}
                                        onChange={(e) => onDimensionChange(e, 'x')}
                                    />
                                </ListItemContent>
                            </ListItem>
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '50%',
                                    marginBottom: '12px',
                                }}
                            >
                                <ListItemContent
                                    sx={{
                                        marginRight: '12px',
                                    }}
                                >
                                    Y:
                                </ListItemContent>
                                <ListItemContent>
                                    <TextField
                                        id="dimension-y"
                                        fullWidth
                                        variant="outlined"
                                        value={textBoxState.box.y}
                                        onChange={(e) => onDimensionChange(e, 'y')}
                                    />
                                </ListItemContent>
                            </ListItem>
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '50%',
                                    marginBottom: '12px',
                                }}
                            >
                                <ListItemContent
                                    sx={{
                                        marginRight: '12px',
                                    }}
                                >
                                    W:
                                </ListItemContent>
                                <ListItemContent>
                                    <TextField
                                        id="dimension-w"
                                        fullWidth
                                        variant="outlined"
                                        value={textBoxState.box.w}
                                        onChange={(e) => onDimensionChange(e, 'w')}
                                    />
                                </ListItemContent>
                            </ListItem>
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '50%',
                                    marginBottom: '12px',
                                }}
                            >
                                <ListItemContent
                                    sx={{
                                        marginRight: '12px',
                                    }}
                                >
                                    H:
                                </ListItemContent>
                                <ListItemContent>
                                    <TextField
                                        id="dimension-h"
                                        fullWidth
                                        variant="outlined"
                                        value={textBoxState.box.h}
                                        onChange={(e) => onDimensionChange(e, 'h')}
                                    />
                                </ListItemContent>
                            </ListItem>
                        </List>
                    )}
                </ListItem>
            )} */}

            {imageBoxState && imageBoxState.isFocus && (
                <ListItem nested sx={{ mb: '12px' }}>
                    <ListSubheader>
                        <h3 className={cx('section-title')}>Appearance</h3>
                        <IconButton
                            size="sm"
                            variant="plain"
                            color="primary"
                            sx={{ '--IconButton-size': '2.4rem', ml: 'auto' }}
                            onClick={() => setOpenAppearanceImageList(!openAppearanceImageList)}
                        >
                            {openAppearanceImageList ? (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(-180deg)',
                                        transform: 'rotatez(-180deg)',
                                    }}
                                />
                            ) : (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(0deg)',
                                        transform: 'rotatez(0deg)',
                                    }}
                                />
                            )}
                        </IconButton>
                    </ListSubheader>
                    {openAppearanceImageList && (
                        <List
                            aria-labelledby="nav-list-tags"
                            size="sm"
                            sx={{
                                '--List-decorator-size': '32px',
                            }}
                        >
                            <ListItem>
                                <ImageUploading
                                    // value={images}
                                    onChange={onChangeFile}
                                    dataURLKey="data_url"
                                >
                                    {({ onImageUpload, dragProps }) => (
                                        <ListItemButton onMouseUp={onImageUpload} {...dragProps}>
                                            <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                                <UploadIcon fontSize="medium" />
                                            </ListItemDecorator>
                                            <ListItemContent>Change image</ListItemContent>
                                        </ListItemButton>
                                    )}
                                </ImageUploading>
                            </ListItem>
                            <ListItem>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <OpacityIcon fontSize="medium" />
                                </ListItemDecorator>
                                <ListItemContent>Opacity</ListItemContent>
                                <ListItemContent>
                                    <Slider
                                        valueLabelDisplay="auto"
                                        defaultValue={100}
                                        onChangeCommitted={(e, value) => handleImageOpacityChange(e, value)}
                                        min={0}
                                        max={100}
                                    />
                                </ListItemContent>
                            </ListItem>
                        </List>
                    )}
                </ListItem>
            )}

            {imageBoxState && imageBoxState.isFocus && <Divider />}
            {imageBoxState && imageBoxState.isFocus && (
                <ListItem nested sx={{ mb: '12px' }}>
                    <ListSubheader>
                        <h3 className={cx('section-title')}>Position</h3>
                        <IconButton
                            size="sm"
                            variant="plain"
                            color="primary"
                            sx={{ '--IconButton-size': '2.4rem', ml: 'auto' }}
                            onClick={() => setOpenParagraphList(!openParagraphList)}
                        >
                            {openParagraphList ? (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(-180deg)',
                                        transform: 'rotatez(-180deg)',
                                    }}
                                />
                            ) : (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(0deg)',
                                        transform: 'rotatez(0deg)',
                                    }}
                                />
                            )}
                        </IconButton>
                    </ListSubheader>
                    {openParagraphList && (
                        <List
                            aria-labelledby="nav-list-tags"
                            size="sm"
                            sx={{
                                '--List-decorator-size': '32px',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                        >
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '50%',
                                }}
                            >
                                <ListItemButton
                                    sx={{ textAlign: 'center', alignItems: 'center' }}
                                    onMouseUp={(e) => handleRearrangeOrder(e, 'imageBox', 'forward')}
                                >
                                    <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                        <KeyboardArrowUpIcon fontSize="medium" />
                                    </ListItemDecorator>
                                    <ListItemContent sx={{ color: 'neutral.500' }}>Forward</ListItemContent>
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '50%',
                                }}
                            >
                                <ListItemButton
                                    sx={{ textAlign: 'center', alignItems: 'center' }}
                                    onMouseUp={(e) => handleRearrangeOrder(e, 'imageBox', 'backward')}
                                >
                                    <ListItemDecorator sx={{ color: 'neutral.500', rotate: '180deg' }}>
                                        <KeyboardArrowUpIcon fontSize="medium" />
                                    </ListItemDecorator>
                                    <ListItemContent sx={{ color: 'neutral.500' }}>Backward</ListItemContent>
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '50%',
                                }}
                            >
                                <ListItemButton
                                    sx={{ textAlign: 'center', alignItems: 'center' }}
                                    onMouseUp={(e) => handleRearrangeOrder(e, 'imageBox', 'to-front')}
                                >
                                    <ListItemDecorator
                                        sx={{ color: 'neutral.500', rotate: '-90deg', display: 'unset' }}
                                    >
                                        <LastPageIcon fontSize="medium" />
                                    </ListItemDecorator>
                                    <ListItemContent sx={{ color: 'neutral.500' }}>To front</ListItemContent>
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '50%',
                                }}
                            >
                                <ListItemButton
                                    sx={{ textAlign: 'center', alignItems: 'center' }}
                                    onMouseUp={(e) => handleRearrangeOrder(e, 'imageBox', 'to-back')}
                                >
                                    <ListItemDecorator sx={{ color: 'neutral.500', rotate: '90deg', display: 'unset' }}>
                                        <LastPageIcon fontSize="medium" />
                                    </ListItemDecorator>
                                    <ListItemContent sx={{ color: 'neutral.500' }}>To back</ListItemContent>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    )}
                </ListItem>
            )}

            {btnBoxState && btnBoxState.isFocus && (
                <ListItem nested sx={{ mb: '12px' }}>
                    <ListSubheader>
                        <h3 className={cx('section-title')}>Appearance</h3>
                        <IconButton
                            size="sm"
                            variant="plain"
                            color="primary"
                            sx={{ '--IconButton-size': '2.4rem', ml: 'auto' }}
                            onClick={() => setOpenAppearanceBtnBoxList(!openAppearanceBtnBoxList)}
                        >
                            {openAppearanceBtnBoxList ? (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(-180deg)',
                                        transform: 'rotatez(-180deg)',
                                    }}
                                />
                            ) : (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(0deg)',
                                        transform: 'rotatez(0deg)',
                                    }}
                                />
                            )}
                        </IconButton>
                    </ListSubheader>
                    {openAppearanceBtnBoxList && (
                        <List
                            aria-labelledby="nav-list-tags"
                            size="sm"
                            sx={{
                                '--List-decorator-size': '32px',
                            }}
                        >
                            <ListItem>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <OpacityIcon fontSize="medium" />
                                </ListItemDecorator>
                                <ListItemContent sx={{ color: 'neutral.500' }}>Opacity</ListItemContent>
                                <ListItemContent>
                                    <Slider
                                        valueLabelDisplay="auto"
                                        defaultValue={100}
                                        onChangeCommitted={(e, value) => handleBtnOpacityChange(e, value)}
                                        min={0}
                                        max={100}
                                    />
                                </ListItemContent>
                            </ListItem>

                            {/* Bg color */}
                            <ListItem>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <FormatColorFillIcon fontSize="medium" />
                                </ListItemDecorator>
                                <ListItemContent sx={{ color: 'neutral.500' }}>Bg color</ListItemContent>
                                <ListItemContent sx={{ position: 'relative' }}>
                                    <div
                                        className={cx('swatch')}
                                        style={{ backgroundColor: btnBoxState.bgColor }}
                                        onClick={() => setBtnBgOpenColorPopover(true)}
                                    />

                                    {openBtnBgColorPopover && (
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                position: 'absolute',
                                                right: 0,
                                                width: '-moz-fit-content',
                                                // eslint-disable-next-line no-dupe-keys
                                                width: 'fit-content',
                                                'z-index': 1,
                                            }}
                                        >
                                            <div className={cx('popover')} ref={btnBgColorPickerPopover}>
                                                <HexColorPicker
                                                    className={cx('color-picker')}
                                                    color={btnBoxState.bgColor}
                                                    onChange={onBtnBgColorChange}
                                                />
                                                <HexColorInput
                                                    className={cx('color-input')}
                                                    color={btnBoxState.bgColor}
                                                    onChange={onBtnBgColorChange}
                                                />
                                            </div>
                                        </Card>
                                    )}
                                </ListItemContent>
                            </ListItem>

                            {/* Text color */}
                            <ListItem>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <FormatColorFillIcon fontSize="medium" />
                                </ListItemDecorator>
                                <ListItemContent sx={{ color: 'neutral.500' }}>Text color</ListItemContent>
                                <ListItemContent sx={{ position: 'relative' }}>
                                    <div
                                        className={cx('swatch')}
                                        style={{ backgroundColor: btnBoxState.textColor }}
                                        onClick={() => setBtnTextOpenColorPopover(true)}
                                    />

                                    {openBtnTextColorPopover && (
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                position: 'absolute',
                                                right: 0,
                                                width: '-moz-fit-content',
                                                // eslint-disable-next-line no-dupe-keys
                                                width: 'fit-content',
                                                'z-index': 1,
                                            }}
                                        >
                                            <div className={cx('popover')} ref={btnTextColorPickerPopover}>
                                                <HexColorPicker
                                                    className={cx('color-picker')}
                                                    color={btnBoxState.textColor}
                                                    onChange={onBtnTextColorChange}
                                                />
                                                <HexColorInput
                                                    className={cx('color-input')}
                                                    color={btnBoxState.textColor}
                                                    onChange={onBtnTextColorChange}
                                                />
                                            </div>
                                        </Card>
                                    )}
                                </ListItemContent>
                            </ListItem>
                        </List>
                    )}
                </ListItem>
            )}

            {btnBoxState && btnBoxState.isFocus && (
                <ListItem nested sx={{ mb: '12px' }}>
                    <ListSubheader>
                        <h3 className={cx('section-title')}>Position</h3>
                        <IconButton
                            size="sm"
                            variant="plain"
                            color="primary"
                            sx={{ '--IconButton-size': '2.4rem', ml: 'auto' }}
                            onClick={() => setOpenParagraphList(!openParagraphList)}
                        >
                            {openParagraphList ? (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(-180deg)',
                                        transform: 'rotatez(-180deg)',
                                    }}
                                />
                            ) : (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(0deg)',
                                        transform: 'rotatez(0deg)',
                                    }}
                                />
                            )}
                        </IconButton>
                    </ListSubheader>
                    {openParagraphList && (
                        <List
                            aria-labelledby="nav-list-tags"
                            size="sm"
                            sx={{
                                '--List-decorator-size': '32px',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                        >
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '50%',
                                }}
                            >
                                <ListItemButton
                                    sx={{ textAlign: 'center', alignItems: 'center' }}
                                    onMouseUp={(e) => handleRearrangeOrder(e, 'btnBox', 'forward')}
                                >
                                    <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                        <KeyboardArrowUpIcon fontSize="medium" />
                                    </ListItemDecorator>
                                    <ListItemContent sx={{ color: 'neutral.500' }}>Forward</ListItemContent>
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '50%',
                                }}
                            >
                                <ListItemButton
                                    sx={{ textAlign: 'center', alignItems: 'center' }}
                                    onMouseUp={(e) => handleRearrangeOrder(e, 'btnBox', 'backward')}
                                >
                                    <ListItemDecorator sx={{ color: 'neutral.500', rotate: '180deg' }}>
                                        <KeyboardArrowUpIcon fontSize="medium" />
                                    </ListItemDecorator>
                                    <ListItemContent sx={{ color: 'neutral.500' }}>Backward</ListItemContent>
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '50%',
                                }}
                            >
                                <ListItemButton
                                    sx={{ textAlign: 'center', alignItems: 'center' }}
                                    onMouseUp={(e) => handleRearrangeOrder(e, 'btnBox', 'to-front')}
                                >
                                    <ListItemDecorator
                                        sx={{ color: 'neutral.500', rotate: '-90deg', display: 'unset' }}
                                    >
                                        <LastPageIcon fontSize="medium" />
                                    </ListItemDecorator>
                                    <ListItemContent sx={{ color: 'neutral.500' }}>To front</ListItemContent>
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '50%',
                                }}
                            >
                                <ListItemButton
                                    sx={{ textAlign: 'center', alignItems: 'center' }}
                                    onMouseUp={(e) => handleRearrangeOrder(e, 'btnBox', 'to-back')}
                                >
                                    <ListItemDecorator sx={{ color: 'neutral.500', rotate: '180deg' }}>
                                        <KeyboardArrowUpIcon fontSize="medium" />
                                    </ListItemDecorator>
                                    <ListItemContent sx={{ color: 'neutral.500' }}>To back</ListItemContent>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    )}
                </ListItem>
            )}

            {textBoxState && textBoxState.isFocus && (
                <ListItem nested sx={{ mb: '12px' }}>
                    <ListSubheader>
                        <h3 className={cx('section-title')}>Appearance</h3>
                        <IconButton
                            size="sm"
                            variant="plain"
                            color="primary"
                            sx={{ '--IconButton-size': '2.4rem', ml: 'auto' }}
                            onClick={() => setOpenAppearanceTextBoxList(!openAppearanceTextBoxList)}
                        >
                            {openAppearanceTextBoxList ? (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(-180deg)',
                                        transform: 'rotatez(-180deg)',
                                    }}
                                />
                            ) : (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(0deg)',
                                        transform: 'rotatez(0deg)',
                                    }}
                                />
                            )}
                        </IconButton>
                    </ListSubheader>
                    {openAppearanceTextBoxList && (
                        <List
                            aria-labelledby="nav-list-tags"
                            size="sm"
                            sx={{
                                '--List-decorator-size': '32px',
                            }}
                        >
                            <ListItem>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <OpacityIcon fontSize="medium" />
                                </ListItemDecorator>
                                <ListItemContent sx={{ color: 'neutral.500' }}>Opacity</ListItemContent>
                                <ListItemContent>
                                    <Slider
                                        valueLabelDisplay="auto"
                                        defaultValue={100}
                                        onChangeCommitted={(e, value) => handleTextOpacityChange(e, value)}
                                        min={0}
                                        max={100}
                                    />
                                </ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <FormatColorFillIcon fontSize="medium" />
                                </ListItemDecorator>
                                <ListItemContent sx={{ color: 'neutral.500' }}>Color</ListItemContent>
                                <ListItemContent sx={{ position: 'relative' }}>
                                    <div
                                        className={cx('swatch')}
                                        style={{ backgroundColor: textBoxState.textColor }}
                                        onClick={() => setOpenColorPopover(true)}
                                    />

                                    {openColorPopover && (
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                position: 'absolute',
                                                right: 0,
                                                width: '-moz-fit-content',
                                                // eslint-disable-next-line no-dupe-keys
                                                width: 'fit-content',
                                                'z-index': 1,
                                            }}
                                        >
                                            <div className={cx('popover')} ref={colorPickerPopover}>
                                                <HexColorPicker
                                                    className={cx('color-picker')}
                                                    color={textBoxState.textColor}
                                                    onChange={onTextColorChange}
                                                />
                                                <HexColorInput
                                                    className={cx('color-input')}
                                                    color={textBoxState.textColor}
                                                    onChange={onTextColorChange}
                                                />
                                            </div>
                                        </Card>
                                    )}
                                </ListItemContent>
                            </ListItem>
                        </List>
                    )}
                </ListItem>
            )}

            {textBoxState && textBoxState.isFocus && <Divider />}
            {textBoxState && textBoxState.isFocus && (
                <ListItem nested sx={{ mb: '12px' }}>
                    <ListSubheader>
                        <h3 className={cx('section-title')}>Character</h3>
                        <IconButton
                            size="sm"
                            variant="plain"
                            color="primary"
                            sx={{ '--IconButton-size': '2.4rem', ml: 'auto' }}
                            onClick={() => setOpenCharacterList(!openCharacterList)}
                        >
                            {openCharacterList ? (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(-180deg)',
                                        transform: 'rotatez(-180deg)',
                                    }}
                                />
                            ) : (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(0deg)',
                                        transform: 'rotatez(0deg)',
                                    }}
                                />
                            )}
                        </IconButton>
                    </ListSubheader>
                    {openCharacterList && (
                        <List
                            aria-labelledby="nav-list-tags"
                            size="sm"
                            sx={{
                                '--List-decorator-size': '32px',
                            }}
                        >
                            <ListItem>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <FontDownloadIcon fontSize="medium" />
                                </ListItemDecorator>
                                {/* <ListItemContent> */}
                                <Select
                                    placeholder="Select a font"
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
                                    <List
                                        sx={{
                                            maxHeight: 200,
                                            overflow: 'auto',
                                        }}
                                    >
                                        {fontListName.map((font) => (
                                            <ListItem key={font}>
                                                <Option
                                                    key={font}
                                                    value={font}
                                                    onMouseUp={(e) =>
                                                        handleStylesChange(e, 'typeFontFamily', constantCase(font))
                                                    }
                                                >
                                                    {font}
                                                </Option>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Select>
                                {/* </ListItemContent> */}
                            </ListItem>
                            <ListItem>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <TextFormatIcon fontSize="medium" />
                                </ListItemDecorator>
                                <ListItemContent>
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
                                        <Option value="NORMAL" onMouseUp={() => textBoxState.changeStyles(null)}>
                                            <ListItemDecorator>
                                                <FormatClearIcon fontSize="medium" />
                                            </ListItemDecorator>
                                            Normal
                                        </Option>
                                        <Option value="BOLD" onMouseUp={() => textBoxState.changeStyles('BOLD')}>
                                            <ListItemDecorator>
                                                <FormatBoldIcon fontSize="medium" />
                                            </ListItemDecorator>
                                            Bold
                                        </Option>
                                        <Option value="ITALIC" onMouseUp={() => textBoxState.changeStyles('ITALIC')}>
                                            <ListItemDecorator>
                                                <FormatItalicIcon fontSize="medium" />
                                            </ListItemDecorator>
                                            Italic
                                        </Option>
                                        <Option
                                            value="UNDERLINE"
                                            onMouseUp={() => textBoxState.changeStyles('UNDERLINE')}
                                        >
                                            <ListItemDecorator>
                                                <FormatUnderlinedIcon fontSize="medium" />
                                            </ListItemDecorator>
                                            Underlined
                                        </Option>
                                    </Select>
                                </ListItemContent>
                            </ListItem>
                            <ListItem sx={{ marginBottom: '12px' }}>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <FormatSizeIcon fontSize="medium" />
                                </ListItemDecorator>
                                <ListItemContent>
                                    <Select
                                        placeholder="Select a size"
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
                                        <Option
                                            value="TITLE"
                                            onMouseUp={(e) => handleStylesChange(e, 'typeFontSize', 'TITLE')}
                                        >
                                            Title
                                        </Option>
                                        <Option
                                            value="SUB_TITLE"
                                            onMouseUp={(e) => handleStylesChange(e, 'typeFontSize', 'SUB_TITLE')}
                                        >
                                            Subtitle
                                        </Option>
                                        <Option
                                            value="HEADING"
                                            onMouseUp={(e) => handleStylesChange(e, 'typeFontSize', 'HEADING')}
                                        >
                                            Heading
                                        </Option>
                                        <Option
                                            value="SUB_HEADING"
                                            onMouseUp={(e) => handleStylesChange(e, 'typeFontSize', 'SUB_HEADING')}
                                        >
                                            Subheading
                                        </Option>
                                        <Option
                                            value="CONTENT"
                                            onMouseUp={(e) => handleStylesChange(e, 'typeFontSize', 'CONTENT')}
                                        >
                                            Content
                                        </Option>
                                        <Option
                                            value="SMALL_CONTENT"
                                            onMouseUp={(e) => handleStylesChange(e, 'typeFontSize', 'SMALL_CONTENT')}
                                        >
                                            Small content
                                        </Option>
                                    </Select>
                                </ListItemContent>
                            </ListItem>
                        </List>
                    )}
                </ListItem>
            )}

            {textBoxState && textBoxState.isFocus && <Divider />}
            {textBoxState && textBoxState.isFocus && (
                <ListItem nested sx={{ mb: '12px' }}>
                    <ListSubheader>
                        <h3 className={cx('section-title')}>Paragraph</h3>
                        <IconButton
                            size="sm"
                            variant="plain"
                            color="primary"
                            sx={{ '--IconButton-size': '2.4rem', ml: 'auto' }}
                            onClick={() => setOpenParagraphList(!openParagraphList)}
                        >
                            {openParagraphList ? (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(-180deg)',
                                        transform: 'rotatez(-180deg)',
                                    }}
                                />
                            ) : (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(0deg)',
                                        transform: 'rotatez(0deg)',
                                    }}
                                />
                            )}
                        </IconButton>
                    </ListSubheader>
                    {openParagraphList && (
                        <List
                            aria-labelledby="nav-list-tags"
                            size="sm"
                            sx={{
                                '--List-decorator-size': '32px',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                        >
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '25%',
                                }}
                            >
                                <ListItemButton
                                    sx={{ textAlign: 'center', alignItems: 'center' }}
                                    onMouseUp={(e) => handleStylesChange(e, 'typeTextAlign', 'left')}
                                >
                                    <ListItemContent sx={{ color: 'neutral.500' }}>
                                        <FormatAlignLeftIcon fontSize="medium" />
                                    </ListItemContent>
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '25%',
                                }}
                            >
                                <ListItemButton
                                    sx={{ textAlign: 'center', alignItems: 'center' }}
                                    onMouseUp={(e) => handleStylesChange(e, 'typeTextAlign', 'center')}
                                >
                                    <ListItemContent sx={{ color: 'neutral.500' }}>
                                        <FormatAlignCenterIcon fontSize="medium" />
                                    </ListItemContent>
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '25%',
                                }}
                            >
                                <ListItemButton
                                    sx={{ textAlign: 'center', alignItems: 'center' }}
                                    onMouseUp={(e) => handleStylesChange(e, 'typeTextAlign', 'right')}
                                >
                                    <ListItemContent sx={{ color: 'neutral.500' }}>
                                        <FormatAlignRightIcon fontSize="medium" />
                                    </ListItemContent>
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '25%',
                                }}
                            >
                                <ListItemButton
                                    sx={{ textAlign: 'center', alignItems: 'center' }}
                                    onMouseUp={(e) => handleStylesChange(e, 'typeTextAlign', 'justify')}
                                >
                                    <ListItemContent sx={{ color: 'neutral.500' }}>
                                        <FormatAlignJustifyIcon fontSize="medium" />
                                    </ListItemContent>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    )}
                </ListItem>
            )}

            {textBoxState && textBoxState.isFocus && <Divider />}
            {textBoxState && textBoxState.isFocus && (
                <ListItem nested sx={{ mb: '12px' }}>
                    <ListSubheader>
                        <h3 className={cx('section-title')}>Position</h3>
                        <IconButton
                            size="sm"
                            variant="plain"
                            color="primary"
                            sx={{ '--IconButton-size': '2.4rem', ml: 'auto' }}
                            onClick={() => setOpenPositionList(!openPositionList)}
                        >
                            {openPositionList ? (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(-180deg)',
                                        transform: 'rotatez(-180deg)',
                                    }}
                                />
                            ) : (
                                <KeyboardArrowDownRoundedIcon
                                    fontSize="medium"
                                    color="primary"
                                    sx={{
                                        WebkitTransition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        transition: 'transform 250ms cubic-bezier(0,0,0.2,1)',
                                        WebkitTransform: 'rotatez(0deg)',
                                        transform: 'rotatez(0deg)',
                                    }}
                                />
                            )}
                        </IconButton>
                    </ListSubheader>
                    {openPositionList && (
                        <List
                            aria-labelledby="nav-list-tags"
                            size="sm"
                            sx={{
                                '--List-decorator-size': '32px',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                        >
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '50%',
                                }}
                            >
                                <ListItemButton
                                    sx={{ textAlign: 'center', alignItems: 'center' }}
                                    onMouseUp={(e) => handleRearrangeOrder(e, 'textBox', 'forward')}
                                >
                                    <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                        <KeyboardArrowUpIcon fontSize="medium" />
                                    </ListItemDecorator>
                                    <ListItemContent sx={{ color: 'neutral.500' }}>Forward</ListItemContent>
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '50%',
                                }}
                            >
                                <ListItemButton
                                    sx={{ textAlign: 'center', alignItems: 'center' }}
                                    onMouseUp={(e) => handleRearrangeOrder(e, 'textBox', 'backward')}
                                >
                                    <ListItemDecorator sx={{ color: 'neutral.500', rotate: '180deg' }}>
                                        <KeyboardArrowUpIcon fontSize="medium" />
                                    </ListItemDecorator>
                                    <ListItemContent sx={{ color: 'neutral.500' }}>Backward</ListItemContent>
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '50%',
                                }}
                            >
                                <ListItemButton
                                    sx={{ textAlign: 'center', alignItems: 'center' }}
                                    onMouseUp={(e) => handleRearrangeOrder(e, 'textBox', 'to-front')}
                                >
                                    <ListItemDecorator
                                        sx={{ color: 'neutral.500', rotate: '-90deg', display: 'unset' }}
                                    >
                                        <LastPageIcon fontSize="medium" />
                                    </ListItemDecorator>
                                    <ListItemContent sx={{ color: 'neutral.500' }}>To front</ListItemContent>
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                sx={{
                                    '--List-decorator-size': '32px',
                                    width: '50%',
                                }}
                            >
                                <ListItemButton
                                    sx={{ textAlign: 'center', alignItems: 'center' }}
                                    onMouseUp={(e) => handleRearrangeOrder(e, 'textBox', 'to-back')}
                                >
                                    <ListItemDecorator sx={{ color: 'neutral.500', rotate: '180deg' }}>
                                        <KeyboardArrowUpIcon fontSize="medium" />
                                    </ListItemDecorator>
                                    <ListItemContent sx={{ color: 'neutral.500' }}>To back</ListItemContent>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    )}
                </ListItem>
            )}
        </List>
    )
}

export default FunctionBar
