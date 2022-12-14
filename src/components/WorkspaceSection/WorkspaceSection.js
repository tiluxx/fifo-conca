import * as React from 'react'
import classNames from 'classnames/bind'
import Box from '@mui/joy/Box'
import styles from './WorkspaceSection.module.scss'

const cx = classNames.bind(styles)

export function Root(props) {
    return (
        <Box
            {...props}
            sx={[
                {
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
                        md: 'minmax(160px, 300px) minmax(300px, 500px) minmax(500px, 1fr)',
                    },
                    gridTemplateRows: '64px 1fr',
                    minHeight: '100vh',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
    )
}

export function Header(props) {
    return (
        <Box
            component="header"
            className={cx('Header')}
            {...props}
            sx={[
                {
                    p: 2,
                    gap: 2,
                    bgcolor: 'background.surface',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gridColumn: '1 / -1',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1100,
                },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
    )
}

export function SideNav(props) {
    return (
        <Box
            component="nav"
            className={cx('Navigation')}
            {...props}
            sx={[
                {
                    p: 2,
                    bgcolor: 'background.surface',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
    )
}

export function Main(props) {
    return (
        <Box
            component="div"
            className={cx('Main')}
            {...props}
            sx={[{ p: 2 }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
        />
    )
}
