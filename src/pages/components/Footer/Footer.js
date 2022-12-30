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
        <footer
            className={cx('wrapper')}
            style={{
                backgroundColor: footer.backgroundColor,
                padding: '50px 40px',
                width: '100%',
                color: 'var(--snow)',
            }}
        >
            <div
                className={cx('container')}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: 'bold',
                }}
            ></div>
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
                    <div
                        className={cx('logo')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        {footer.backgroundImage.imageUrl !== '' && (
                            <img
                                src={imgSrc}
                                alt="ICON Academic Club"
                                className={cx('logo-img')}
                                style={{ width: '25%' }}
                            />
                        )}
                    </div>
                </Grid>
                <Grid item xs={12} sx={{ alignItems: 'center', textAlign: 'center' }}>
                    <div
                        className={cx('team-info')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src="https://i.ibb.co/sR7ZWLf/icon-Final.png"
                            alt="ICON Academic Club"
                            style={{ width: '8vh' }}
                        />
                        <span
                            className={cx('my-team')}
                            style={{
                                fontSize: '1.4rem',
                                lineHeight: '1.6rem',
                                fontWeight: '300',
                            }}
                        >
                            Con cá
                        </span>
                    </div>
                </Grid>
            </Grid>
        </footer>
    )
}

export default Footer
