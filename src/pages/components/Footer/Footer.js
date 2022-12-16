import { useState, useEffect, useContext } from 'react'
import classNames from 'classnames/bind'
import Grid from '@mui/material/Grid'
import logo from './iconFinal.png'
import styles from './Footer.module.scss'
import { WorkspaceActionContext } from '~/pages/Workspace'

const cx = classNames.bind(styles)

function Footer() {
    const { footer } = useContext(WorkspaceActionContext)
    const [imgSrc, setImgSrc] = useState(logo)

    useEffect(() => {
        if (footer.backgroundImage.imageUrl !== '') {
            setImgSrc(footer.backgroundImage.imageUrl)
        }
    }, [footer.backgroundImage.imageUrl])

    return (
        <footer className={cx('wrapper')} style={{ backgroundColor: footer.backgroundColor }}>
            <div className={cx('container')}></div>
            <Grid
                container
                spacing={{ xs: 3, md: 0 }}
                sx={{
                    '@media (min-width: 0) and (max-width: 599px)': {
                        alignItems: 'center',
                        textAlign: 'center',
                    },
                }}
            >
                <Grid item sm={6} xs={12}>
                    <div className={cx('logo')}>
                        {footer.backgroundImage.imageUrl !== '' && (
                            <img src={imgSrc} alt="ICON Academic Club" className={cx('logo-img')} />
                        )}
                    </div>
                </Grid>
                <Grid item xs={12} sx={{ alignItems: 'center', textAlign: 'center' }}>
                    <div className={cx('team-info')}>
                        <img src={logo} alt="ICON Academic Club" style={{ width: '8vh' }} />
                        <span className={cx('my-team')}>Con cá</span>
                    </div>
                </Grid>
            </Grid>
        </footer>
    )
}

export default Footer
