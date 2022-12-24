import { memo, useState, useEffect, useContext } from 'react'
import classNames from 'classnames/bind'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import CardCover from '@mui/joy/CardCover'
import { WorkspaceActionContext, saveToLS } from '~/pages/Workspace'
import ModalSetVideo from '~/pages/components/ModalSetVideo'
import styles from './VideoBox.module.scss'

const cx = classNames.bind(styles)

const VideoBox = memo(function VideoBox({ el }) {
    const { videoBoxState, setVideoBoxState, setBtnBoxState, setImageBoxState, setTextBoxState, setLayouts } =
        useContext(WorkspaceActionContext)
    const [curBox, setCurBox] = useState(el?.box)
    const [videoUrl, setVideoUrl] = useState(el.style?.videoUrl)
    const [isAutoPlay, setIsAutoPlay] = useState(el.style?.isAutoPlay)
    const [isLoop, setIsLoop] = useState(el.style?.isLoop)
    const [isMute, setIsMute] = useState(el.style?.isMute)
    const [videoOpacity, setVideoOpacity] = useState(el.style?.videoOpacity)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        console.log(videoBoxState)
        if (videoBoxState.box?.i === curBox.i) {
            if (videoBoxState.videoUrl !== videoUrl) {
                setVideoUrl(videoBoxState.videoUrl)
                setLayouts((prev) => {
                    let curLg = [...prev.lg]
                    curLg = curLg.map((element) => {
                        const curEl = { ...element }
                        if (curEl.box.i === curBox.i) {
                            curEl.box = { ...videoBoxState.box }
                            curEl.style.videoUrl = videoBoxState.videoUrl
                        }
                        return curEl
                    })
                    saveToLS('layouts', curLg)
                    return { lg: curLg }
                })
            }
            if (videoBoxState.isAutoPlay !== isAutoPlay) {
                setIsAutoPlay(videoBoxState.isAutoPlay)
                setLayouts((prev) => {
                    let curLg = [...prev.lg]
                    curLg = curLg.map((element) => {
                        const curEl = { ...element }
                        if (curEl.box.i === curBox.i) {
                            curEl.box = { ...videoBoxState.box }
                            curEl.style.isAutoPlay = videoBoxState.isAutoPlay
                        }
                        return curEl
                    })
                    saveToLS('layouts', curLg)
                    return { lg: curLg }
                })
            }
            if (videoBoxState.isLoop !== isLoop) {
                setIsLoop(videoBoxState.isLoop)
                setLayouts((prev) => {
                    let curLg = [...prev.lg]
                    curLg = curLg.map((element) => {
                        const curEl = { ...element }
                        if (curEl.box.i === curBox.i) {
                            curEl.box = { ...videoBoxState.box }
                            curEl.style.isLoop = videoBoxState.isLoop
                        }
                        return curEl
                    })
                    saveToLS('layouts', curLg)
                    return { lg: curLg }
                })
            }
            if (videoBoxState.isMute !== isMute) {
                setIsMute(videoBoxState.isMute)
                setLayouts((prev) => {
                    let curLg = [...prev.lg]
                    curLg = curLg.map((element) => {
                        const curEl = { ...element }
                        if (curEl.box.i === curBox.i) {
                            curEl.box = { ...videoBoxState.box }
                            curEl.style.isMute = videoBoxState.isMute
                        }
                        return curEl
                    })
                    saveToLS('layouts', curLg)
                    return { lg: curLg }
                })
            }
            if (videoBoxState.videoOpacity !== videoOpacity) {
                setVideoOpacity(videoBoxState.videoOpacity)
                setLayouts((prev) => {
                    let curLg = [...prev.lg]
                    curLg = curLg.map((element) => {
                        const curEl = { ...element }
                        if (curEl.box.i === curBox.i) {
                            curEl.box = { ...videoBoxState.box }
                            curEl.style.videoOpacity = videoBoxState.videoOpacity
                        }
                        return curEl
                    })
                    saveToLS('layouts', curLg)
                    return { lg: curLg }
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoBoxState])

    const onFocusVideoBox = (e) => {
        e.preventDefault()
        setVideoBoxState((prev) => {
            const newState = {
                ...prev,
                box: curBox,
                videoUrl,
                isAutoPlay,
                isLoop,
                isMute,
                videoOpacity,
                isFocus: true,
            }
            return newState
        })
        setBtnBoxState((prev) => {
            const newState = {
                ...prev,
                isFocus: false,
            }
            return newState
        })
        setImageBoxState((prev) => {
            const newState = {
                ...prev,
                isFocus: false,
            }
            return newState
        })
        setTextBoxState((prev) => {
            const newState = {
                ...prev,
                isFocus: false,
            }
            return newState
        })
    }

    return (
        <div className={cx('wrapper')} style={{ opacity: `${videoOpacity}%`, width: '100%', height: '100%' }}>
            <div
                className={cx('container')}
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                {videoUrl !== '' ? (
                    <div style={{ width: '100%', height: '100%' }} onMouseUp={(e) => onFocusVideoBox(e)}>
                        <Card
                            component="div"
                            sx={{ '--Card-radius': '0px', width: '100%', height: '100%', boxShadow: 'unset' }}
                        >
                            <CardCover>
                                <video
                                    style={{ width: '100%', height: '100%' }}
                                    autoPlay
                                    loop
                                    muted
                                    poster="https://assets.codepen.io/6093409/river.jpg"
                                >
                                    <source src={videoUrl} type="video/mp4" />
                                </video>
                            </CardCover>
                        </Card>
                    </div>
                ) : (
                    <Button
                        variant="solid"
                        onClick={() => {
                            console.log('here')
                            setOpenModal(true)
                        }}
                    >
                        Embed video
                    </Button>
                )}
            </div>
            <ModalSetVideo el={curBox} openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    )
})

export default VideoBox
