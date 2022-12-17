import { useState, useRef, useCallback, useContext } from 'react'
import classNames from 'classnames/bind'
import ImageUploading from 'react-images-uploading'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import Card from '@mui/joy/Card'
import Divider from '@mui/joy/Divider'
import Select, { selectClasses } from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'

import IconButton from '@mui/joy/IconButton'
import List from '@mui/joy/List'
import ListSubheader from '@mui/joy/ListSubheader'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import ListItemContent from '@mui/joy/ListItemContent'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import PhotoIcon from '@mui/icons-material/Photo'
import SmartButtonIcon from '@mui/icons-material/SmartButton'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'
import WallpaperIcon from '@mui/icons-material/Wallpaper'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import PhotoSizeSelectLargeIcon from '@mui/icons-material/PhotoSizeSelectLarge'
import AddBoxIcon from '@mui/icons-material/AddBox'
import LayersClearIcon from '@mui/icons-material/LayersClear'

// import TemplateBox from '~/components/TemplateBox'
// import images from '~/assets/images'
import StyleBox from '~/components/StyleBox'
import { WorkspaceActionContext } from '~/pages/Workspace'
import styles from './ToolBar.module.scss'
import useClickOutside from '~/hooks/useClickOutside'
import './ToolBar.css'

const cx = classNames.bind(styles)

function ToolBar() {
    const { onAddItem, globalStyles, setGlobalStyles, setFooter } = useContext(WorkspaceActionContext)
    const [openElementList, setOpenElementList] = useState(true)
    const [openStyleList, setOpenStyleList] = useState(true)
    const [openBackgroundEditor, setOpenBackgroundEditor] = useState(true)
    const [openColorPopover, setOpenColorPopover] = useState(false)
    // const [openContentBoxList, setOpenContentBoxList] = useState(true)

    const colorPickerPopover = useRef()

    const close = useCallback(() => setOpenColorPopover(false), [])
    useClickOutside(colorPickerPopover, close)

    const onBackgroundColorChange = (color) => {
        setGlobalStyles((prev) => {
            const newState = { ...prev, backgroundColor: color }
            return newState
        })
    }

    const onFooterColorChange = (color) => {
        setFooter((prev) => {
            const newState = {
                ...prev,
                backgroundColor: color,
            }
            return newState
        })
    }

    const onSelectFile = (imageList, addUpdateIndex) => {
        setGlobalStyles((prev) => {
            const newState = {
                ...prev,
                backgroundImage: {
                    ...prev.backgroundImage,
                    file: imageList[0].data_url,
                    isFocus: true,
                },
            }
            return newState
        })
    }

    const onRemoveBgImage = () => {
        setGlobalStyles((prev) => {
            const newState = {
                ...prev,
                backgroundImage: {
                    ...prev.backgroundImage,
                    file: '',
                    croppedImageUrl: '',
                    isFocus: false,
                },
            }
            return newState
        })
    }

    const onSelectFooterImage = (imageList, addUpdateIndex) => {
        setFooter((prev) => {
            const newState = {
                ...prev,
                backgroundImage: {
                    ...prev.backgroundImage,
                    imageUrl: imageList[0].data_url,
                },
            }
            return newState
        })
    }

    const onRemoveFooterImage = () => {
        setFooter((prev) => {
            const newState = {
                ...prev,
                backgroundImage: {
                    ...prev.backgroundImage,
                    imageUrl: '',
                },
            }
            return newState
        })
    }

    const handleResizeBgImage = (size) => {
        setGlobalStyles((prev) => {
            const newState = {
                ...prev,
                backgroundImage: {
                    ...prev.backgroundImage,
                    bgSize: {
                        ...prev.backgroundImage.bgSize,
                        cover: size === 'cover' ? true : false,
                        banner: size === 'banner' ? true : false,
                        smallBanner: size === 'smallBanner' ? true : false,
                    },
                    isFocus: false,
                },
            }
            return newState
        })
    }

    const handleAddRemoveFooter = (type) => {
        setFooter((prev) => {
            const newState = {
                ...prev,
                backgroundImage: {
                    ...prev.backgroundImage,
                    imageUrl: '',
                },
                backgroundColor: '#fff',
                isHaving: type === 'add' ? true : false,
            }
            return newState
        })
    }

    return (
        <List size="sm" sx={{ '--List-item-radius': '8px', '--List-gap': '4px' }}>
            <ListItem nested sx={{ marginBottom: '10px' }}>
                <ListSubheader>
                    <h3
                        className={cx('section-title')}
                        style={{ fontSize: '1.2rem', lineHeight: '1.2rem', fontWeight: 500 }}
                    >
                        Elements
                    </h3>
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
                        aria-labelledby="nav-list-function-button"
                        sx={{
                            '& .JoyListItemButton-root': { p: '8px' },
                        }}
                    >
                        <ListItem>
                            <ListItemButton onClick={() => onAddItem({ textBox: true })}>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <TextFieldsIcon fontSize="medium" />
                                </ListItemDecorator>
                                <ListItemContent sx={{ color: 'neutral.500' }}>Text box</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => onAddItem({ imageBox: true })}>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <PhotoIcon fontSize="medium" />
                                </ListItemDecorator>
                                <ListItemContent sx={{ color: 'neutral.500' }}>Image</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => onAddItem({ btnBox: true })}>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <SmartButtonIcon fontSize="medium" />
                                </ListItemDecorator>
                                <ListItemContent sx={{ color: 'neutral.500' }}>Button</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    </List>
                )}
            </ListItem>

            <Divider />
            <ListItem nested sx={{ marginBottom: '10px' }}>
                <ListSubheader>
                    <h3
                        className={cx('section-title')}
                        style={{ fontSize: '1.2rem', lineHeight: '1.2rem', fontWeight: 500 }}
                    >
                        Background & Footer
                    </h3>
                    <IconButton
                        size="sm"
                        variant="plain"
                        color="primary"
                        sx={{ '--IconButton-size': '2.4rem', ml: 'auto' }}
                        onClick={() => setOpenBackgroundEditor(!openBackgroundEditor)}
                    >
                        {openBackgroundEditor ? (
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
                {openBackgroundEditor && (
                    <List
                        aria-labelledby="nav-list-background-footer"
                        sx={{
                            '& .JoyListItemButton-root': { p: '8px' },
                        }}
                    >
                        <Tabs aria-label="Background Footer Tabs" defaultValue={0} sx={{ borderRadius: 'lg' }}>
                            <TabList>
                                <Tab>Background</Tab>
                                <Tab>Footer</Tab>
                            </TabList>

                            {/* Background */}
                            <TabPanel value={0}>
                                <ListItem>
                                    <ImageUploading
                                        // value={images}
                                        onChange={onSelectFile}
                                        dataURLKey="data_url"
                                    >
                                        {({ onImageUpload, dragProps }) => (
                                            <ListItemButton onMouseUp={onImageUpload} {...dragProps}>
                                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                                    <WallpaperIcon fontSize="medium" />
                                                </ListItemDecorator>
                                                <ListItemContent sx={{ color: 'neutral.500' }}>
                                                    Background image
                                                </ListItemContent>
                                            </ListItemButton>
                                        )}
                                    </ImageUploading>
                                </ListItem>

                                <ListItem>
                                    <ListItemButton onMouseUp={onRemoveBgImage}>
                                        <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                            <DeleteIcon fontSize="medium" />
                                        </ListItemDecorator>
                                        <ListItemContent sx={{ color: 'neutral.500' }}>Delete image</ListItemContent>
                                    </ListItemButton>
                                </ListItem>

                                <ListItem>
                                    <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                        <PhotoSizeSelectLargeIcon fontSize="medium" />
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
                                            <Option value="cover" onMouseUp={(e) => handleResizeBgImage('cover')}>
                                                Cover
                                            </Option>
                                            <Option value="banner" onMouseUp={(e) => handleResizeBgImage('banner')}>
                                                Banner
                                            </Option>
                                            <Option
                                                value="smallBanner"
                                                onMouseUp={(e) => handleResizeBgImage('smallBanner')}
                                            >
                                                Small banner
                                            </Option>
                                        </Select>
                                    </ListItemContent>
                                </ListItem>

                                <ListItem
                                    sx={{
                                        marginBottom: '12px',
                                    }}
                                >
                                    <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                        <FormatColorFillIcon fontSize="medium" />
                                    </ListItemDecorator>
                                    <ListItemContent sx={{ color: 'neutral.500' }}>Color</ListItemContent>
                                    <ListItemContent sx={{ position: 'relative' }}>
                                        <div
                                            className={cx('swatch')}
                                            style={{ backgroundColor: globalStyles.backgroundColor }}
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
                                                        color={globalStyles.backgroundColor}
                                                        onChange={onBackgroundColorChange}
                                                    />
                                                    <HexColorInput
                                                        className={cx('color-input')}
                                                        color={globalStyles.backgroundColor}
                                                        onChange={onBackgroundColorChange}
                                                    />
                                                </div>
                                            </Card>
                                        )}
                                    </ListItemContent>
                                </ListItem>
                            </TabPanel>

                            {/* Footer */}
                            <TabPanel value={1}>
                                <ListItem>
                                    <ListItemButton onMouseUp={() => handleAddRemoveFooter('add')}>
                                        <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                            <AddBoxIcon fontSize="medium" />
                                        </ListItemDecorator>
                                        <ListItemContent sx={{ color: 'neutral.500' }}>Add footer</ListItemContent>
                                    </ListItemButton>
                                </ListItem>

                                <ListItem>
                                    <ListItemButton onMouseUp={() => handleAddRemoveFooter('remove')}>
                                        <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                            <LayersClearIcon fontSize="medium" />
                                        </ListItemDecorator>
                                        <ListItemContent sx={{ color: 'neutral.500' }}>Remove footer</ListItemContent>
                                    </ListItemButton>
                                </ListItem>

                                <ListItem>
                                    <ImageUploading
                                        // value={images}
                                        onChange={onSelectFooterImage}
                                        dataURLKey="data_url"
                                    >
                                        {({ onImageUpload, dragProps }) => (
                                            <ListItemButton onMouseUp={onImageUpload} {...dragProps}>
                                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                                    <WallpaperIcon fontSize="medium" />
                                                </ListItemDecorator>
                                                <ListItemContent sx={{ color: 'neutral.500' }}>
                                                    Add logo
                                                </ListItemContent>
                                            </ListItemButton>
                                        )}
                                    </ImageUploading>
                                </ListItem>

                                <ListItem>
                                    <ListItemButton onMouseUp={onRemoveFooterImage}>
                                        <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                            <DeleteIcon fontSize="medium" />
                                        </ListItemDecorator>
                                        <ListItemContent sx={{ color: 'neutral.500' }}>Delete image</ListItemContent>
                                    </ListItemButton>
                                </ListItem>

                                <ListItem
                                    sx={{
                                        marginBottom: '12px',
                                    }}
                                >
                                    <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                        <FormatColorFillIcon fontSize="medium" />
                                    </ListItemDecorator>
                                    <ListItemContent sx={{ color: 'neutral.500' }}>Color</ListItemContent>
                                    <ListItemContent sx={{ position: 'relative' }}>
                                        <div
                                            className={cx('swatch')}
                                            style={{ backgroundColor: globalStyles.backgroundColor }}
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
                                                        color={globalStyles.backgroundColor}
                                                        onChange={onFooterColorChange}
                                                    />
                                                    <HexColorInput
                                                        className={cx('color-input')}
                                                        color={globalStyles.backgroundColor}
                                                        onChange={onFooterColorChange}
                                                    />
                                                </div>
                                            </Card>
                                        )}
                                    </ListItemContent>
                                </ListItem>
                            </TabPanel>
                        </Tabs>
                    </List>
                )}
            </ListItem>

            <Divider />
            <ListItem nested sx={{ mt: 2, marginBottom: '10px' }}>
                <ListSubheader>
                    <h3
                        className={cx('section-title')}
                        style={{ fontSize: '1.2rem', lineHeight: '1.2rem', fontWeight: 500 }}
                    >
                        Styles
                    </h3>
                    <IconButton
                        size="sm"
                        variant="plain"
                        color="primary"
                        sx={{ '--IconButton-size': '2.4rem', ml: 'auto' }}
                        onClick={() => setOpenStyleList(!openStyleList)}
                    >
                        {openStyleList ? (
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
                {openStyleList && (
                    <List
                        aria-labelledby="nav-list-tags"
                        size="sm"
                        sx={{
                            '--List-decorator-size': '32px',
                        }}
                    >
                        <ListItem
                            sx={{
                                marginBottom: '12px',
                            }}
                        >
                            <ListItemButton onMouseUp={() => setGlobalStyles('Roboto')}>
                                <ListItemContent>
                                    <StyleBox type="Minimalism" font="f-minimalism" />
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            sx={{
                                marginBottom: '12px',
                            }}
                        >
                            <ListItemButton onMouseUp={() => setGlobalStyles('Pandyra')}>
                                <ListItemContent>
                                    <StyleBox type="Elegance" font="f-elegant" />
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            sx={{
                                marginBottom: '12px',
                            }}
                        >
                            <ListItemButton onMouseUp={() => setGlobalStyles('Brand')}>
                                <ListItemContent>
                                    <StyleBox type="Luxury" font="f-luxury" />
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            sx={{
                                marginBottom: '12px',
                            }}
                        >
                            <ListItemButton onMouseUp={() => setGlobalStyles('Natural')}>
                                <ListItemContent>
                                    <StyleBox type="Hand writing" font="f-hand-writing" />
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    </List>
                )}
            </ListItem>

            {/*<Divider />
             <ListItem nested sx={{ mt: 2 }}>
                <ListSubheader>
                    <h3
                            className={cx('section-title')}
                            style={{ fontSize: '1.2rem', lineHeight: '1.2rem', fontWeight: 500 }}
                        >Template boxes</h3>
                    <IconButton
                        size="sm"
                        variant="plain"
                        color="primary"
                        sx={{ '--IconButton-size': '2.4rem', ml: 'auto' }}
                        onClick={() => setOpenContentBoxList(!openContentBoxList)}
                    >
                        {openContentBoxList ? (
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
                {openContentBoxList && (
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
                            <ListItemButton>
                                <ListItemContent>
                                    <TemplateBox srcImage={images.template1} name="Template 1" />
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            sx={{
                                '--List-decorator-size': '32px',
                                width: '50%',
                            }}
                        >
                            <ListItemButton>
                                <ListItemContent>
                                    <TemplateBox srcImage={images.template1} name="Template 1" />
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            sx={{
                                '--List-decorator-size': '32px',
                                width: '50%',
                            }}
                        >
                            <ListItemButton>
                                <ListItemContent>
                                    <TemplateBox srcImage={images.template1} name="Template 1" />
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            sx={{
                                '--List-decorator-size': '32px',
                                width: '50%',
                            }}
                        >
                            <ListItemButton>
                                <ListItemContent>
                                    <TemplateBox srcImage={images.template1} name="Template 1" />
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    </List>
                )}
            </ListItem> */}
        </List>
    )
}

export default ToolBar
