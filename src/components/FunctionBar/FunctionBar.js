import { useState, useEffect, useContext } from 'react'
import classNames from 'classnames/bind'
import { constantCase } from 'change-case'
import Divider from '@mui/joy/Divider'
import IconButton from '@mui/joy/IconButton'
import Slider from '@mui/joy/Slider'
import List from '@mui/joy/List'
import ListSubheader from '@mui/joy/ListSubheader'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import ListItemContent from '@mui/joy/ListItemContent'
import TextField from '@mui/material/TextField'

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
import Select, { selectClasses } from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'

import { WorkspaceActionContext } from '~/pages/Workspace'
import { fontListName } from '~/assets/fonts'
import styles from './FunctionBar.module.scss'
import './FunctionBar.css'
const cx = classNames.bind(styles)

function FunctionBar() {
    const { textBoxState, setTextBoxState, layout, setLayout, setCustomStyles, imageBoxState, setImageBoxState } =
        useContext(WorkspaceActionContext)
    const [openElementList, setOpenElementList] = useState(true)
    const [openAppearanceImageList, setOpenAppearanceImageList] = useState(true)
    const [openAppearanceTextBoxList, setOpenAppearanceTextBoxList] = useState(true)
    const [openCharacterList, setOpenCharacterList] = useState(true)
    const [openParagraphList, setOpenParagraphList] = useState(true)

    const onDimensionChange = (e, type) => {
        setTextBoxState((prev) => {
            const newDimension = {
                ...prev,
                box: {
                    ...prev.box,
                    [type]: Number(e.target.value),
                },
            }
            return newDimension
        })
        const newLayout = [...layout]
        newLayout.forEach((item) => {
            if (item.i === textBoxState.box.i) {
                item[type] = Number(e.target.value)
            }
        })
        setLayout(newLayout)
    }

    function onSelectFile(e) {
        setImageBoxState((prev) => {
            const newState = {
                ...prev,
                selectFile: {
                    ...prev.selectFile,
                    file: e.target.files,
                    isHavingFile: true,
                },
            }
            return newState
        })
    }

    const handleStylesChange = (e, style, type) => {
        if (style !== 'textAlignment') {
            setCustomStyles((prev) => {
                const styleName = style === 'typeFontSize' ? 'TYPE_FONT_SIZE' : 'TYPE_FONT_FAMILY'
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
            {textBoxState && (
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
            )}

            {textBoxState && <Divider />}
            {imageBoxState && imageBoxState.box.type === 'imageBox' && (
                <ListItem nested sx={{ mt: 2 }}>
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
                                <ListItemButton>
                                    <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                        <UploadIcon fontSize="medium" />
                                    </ListItemDecorator>
                                    <ListItemContent>Change Image</ListItemContent>
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <OpacityIcon fontSize="medium" />
                                </ListItemDecorator>
                                <ListItemContent>Opacity</ListItemContent>
                                <ListItemContent>
                                    <Slider valueLabelDisplay="auto" defaultValue={100} min={0} max={100} />
                                </ListItemContent>
                            </ListItem>
                        </List>
                    )}
                </ListItem>
            )}

            {textBoxState && textBoxState.box.type === 'textBox' && (
                <ListItem nested sx={{ mt: 2 }}>
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
                                <ListItemContent>Opacity</ListItemContent>
                                <ListItemContent>
                                    <Slider valueLabelDisplay="auto" defaultValue={100} min={0} max={100} />
                                </ListItemContent>
                            </ListItem>
                        </List>
                    )}
                </ListItem>
            )}

            {textBoxState && textBoxState.box.type === 'textBox' && <Divider />}
            {textBoxState && textBoxState.box.type === 'textBox' && (
                <ListItem nested sx={{ mt: 2 }}>
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
                                <ListItemContent>
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
                                        {fontListName.map((font) => (
                                            <Option
                                                key={font}
                                                value={font}
                                                onMouseUp={(e) =>
                                                    handleStylesChange(e, 'typeFontFamily', constantCase(font))
                                                }
                                            >
                                                {font}
                                            </Option>
                                        ))}
                                    </Select>
                                </ListItemContent>
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

            {textBoxState && textBoxState.box.type === 'textBox' && <Divider />}
            {textBoxState && textBoxState.box.type === 'textBox' && (
                <ListItem nested sx={{ mt: 2 }}>
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
                                    onClick={(e) => handleStylesChange(e, 'textAlignment', 'textAlignLeft')}
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
                                    onClick={(e) => handleStylesChange(e, 'textAlignment', 'textAlignCenter')}
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
                                    onClick={(e) => handleStylesChange(e, 'textAlignment', 'textAlignRight')}
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
                                    onClick={(e) => handleStylesChange(e, 'textAlignment', 'textAlignJustify')}
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
        </List>
    )
}

export default FunctionBar
