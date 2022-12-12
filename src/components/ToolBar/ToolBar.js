import { useState, useContext } from 'react'
import classNames from 'classnames/bind'
import Divider from '@mui/joy/Divider'
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
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

import StyleBox from '~/components/StyleBox'
import TemplateBox from '~/components/TemplateBox'
import { WorkspaceActionContext } from '~/pages/Workspace'
import images from '~/assets/images'
import styles from './ToolBar.module.scss'
import './ToolBar.css'

const cx = classNames.bind(styles)

function ToolBar() {
    const { onAddItem } = useContext(WorkspaceActionContext)
    const [openElementList, setOpenElementList] = useState(true)
    const [openStyleList, setOpenStyleList] = useState(true)
    const [openContentBoxList, setOpenContentBoxList] = useState(true)

    return (
        <List size="sm" sx={{ '--List-item-radius': '8px', '--List-gap': '4px' }}>
            <ListItem nested>
                <ListSubheader>
                    <h3 className={cx('section-title')}>Elements</h3>
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
                        }}
                    >
                        <ListItem>
                            <ListItemButton onClick={() => onAddItem({ textBox: true, imageBox: false })}>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <TextFieldsIcon fontSize="medium" />
                                </ListItemDecorator>
                                <ListItemContent>Text box</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => onAddItem({ textBox: false, imageBox: true })}>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <PhotoIcon fontSize="medium" />
                                </ListItemDecorator>
                                <ListItemContent>Image</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <ListItemDecorator sx={{ color: 'neutral.500' }}>
                                    <SmartButtonIcon fontSize="medium" />
                                </ListItemDecorator>
                                <ListItemContent>Button</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    </List>
                )}
            </ListItem>

            <Divider />
            <ListItem nested sx={{ mt: 2 }}>
                <ListSubheader>
                    <h3 className={cx('section-title')}>Styles</h3>
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
                            <ListItemButton>
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
                            <ListItemButton>
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
                            <ListItemButton>
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
                            <ListItemButton>
                                <ListItemContent>
                                    <StyleBox type="Hand writing" font="f-hand-writing" />
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    </List>
                )}
            </ListItem>

            <Divider />
            <ListItem nested sx={{ mt: 2 }}>
                <ListSubheader>
                    <h3 className={cx('section-title')}>Template boxes</h3>
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
            </ListItem>
        </List>
    )
}

export default ToolBar
