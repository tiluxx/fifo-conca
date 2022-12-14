import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import AspectRatio from '@mui/joy/AspectRatio'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'
import classNames from 'classnames/bind'

import styles from './TemplatePortfolio.module.scss'
import Header from '~/layouts/Header'
import config from '~/config'
import { templateObj } from './templateArchi'

const cx = classNames.bind(styles)

function TemplatePortfolio() {
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
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography
                                    level="h1"
                                    fontSize="lg"
                                    sx={{ mb: 0.5, fontSize: '2rem', lineHeight: '2rem' }}
                                >
                                    Choose a template or create a new one
                                </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Card variant="outlined" sx={{ width: 320, margin: 'auto' }}>
                                    <Typography
                                        level="h2"
                                        fontSize="md"
                                        sx={{ mb: 0.5, fontSize: '1.6rem', lineHeight: '1.6rem' }}
                                    >
                                        3D Renders portfolio
                                    </Typography>
                                    <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
                                        <img
                                            src="https://images.unsplash.com/photo-1670582379294-b534a8e6528e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                            srcSet="https://images.unsplash.com/photo-1670582379294-b534a8e6528e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </AspectRatio>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Button
                                            variant="plain"
                                            size="sm"
                                            color="primary"
                                            aria-label="preview-portfolio"
                                            sx={{ fontSize: '1.4rem', lineHeight: '1.4rem' }}
                                            component="a"
                                            href="https://tiluxx.github.io/ICON-Web-Portfolio---3D-Renders-Portfolio-Display-Preview/"
                                        >
                                            Preview
                                        </Button>
                                        <Link
                                            to={config.routes.workspace}
                                            onClick={() => {
                                                if (global.localStorage) {
                                                    global.localStorage.setItem(
                                                        'rgl-7',
                                                        JSON.stringify({
                                                            layouts: [...templateObj.layouts],
                                                        }),
                                                    )
                                                }
                                            }}
                                        >
                                            <div className={cx('register-wrapper')}>
                                                <h5
                                                    className={cx('item-title')}
                                                    style={{
                                                        fontSize: '1.4rem',
                                                        lineHeight: '1.4rem',
                                                        fontFamily: 'Public Sans',
                                                    }}
                                                >
                                                    Choose
                                                </h5>
                                            </div>
                                        </Link>
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        height: '279px',
                                        width: 320,
                                        margin: 'auto',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%',
                                        }}
                                    >
                                        <Link to={config.routes.workspace}>
                                            <div className={cx('register-wrapper')}>
                                                <h5
                                                    className={cx('item-title')}
                                                    style={{
                                                        fontFamily: 'Public Sans',
                                                        fontSize: '1.4rem',
                                                        lineHeight: '1.4rem',
                                                    }}
                                                >
                                                    Create your own
                                                </h5>
                                            </div>
                                        </Link>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TemplatePortfolio
