import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from './Header.module.scss'
import images from '~/assets/images'
import config from '~/config'

const cx = classNames.bind(styles)

function Header() {
    return (
        <div className={cx('wrapper')}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={6}>
                    <div className={cx('logo')}>
                        <Link to={config.routes.home}>
                            <img src={images.logoBlue} alt="FIDO" className={cx('logo-img')} />
                        </Link>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Header
