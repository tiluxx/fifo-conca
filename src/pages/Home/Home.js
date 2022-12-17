import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import Grid from '@mui/material/Grid'

import styles from './Home.module.scss'
import images from '~/assets/images'
import config from '~/config'
import Header from '~/layouts/Header'

const cx = classNames.bind(styles)

function Home() {
    return (
        <div className={cx('container')}>
            <Header />
            <div className={cx('content')}>
                <div className={cx('content-wrapper')}>
                    <div className={cx('initial-home-part')}>
                        <Grid
                            container
                            spacing={3}
                            sx={{
                                '@media (min-width: 0) and (max-width: 599px)': {
                                    alignItems: 'center',
                                },
                            }}
                        >
                            <Grid item lg={6} xs={12}>
                                <div className={cx('home__text-wrapper')}>
                                    <h1 className={cx('home__main-title')}>Where you hang out with your deadlines</h1>
                                    <h4 className={cx('home__sub-title')}>
                                        Your tasks look a mess, don't they? Let's FIFO and chill
                                    </h4>
                                    <Link to={config.routes.template}>
                                        <div className={cx('register-wrapper')}>
                                            <h5 className={cx('item-title')}>Get started</h5>
                                        </div>
                                    </Link>
                                </div>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <div className={cx('home__illustration-wrapper')}>
                                    <img
                                        src={images.multitasking}
                                        alt="multitasking"
                                        className={cx('home__illustration-img')}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
