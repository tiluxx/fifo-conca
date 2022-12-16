import { useState, useEffect, useContext } from 'react'
import classNames from 'classnames/bind'
import Button from '@mui/joy/Button'
import styles from './ButtonBox.module.scss'
import { WorkspaceActionContext, saveToLS } from '~/pages/Workspace'
import ModalButtonEditor from '~/pages/components/ModalButtonEditor'

const cx = classNames.bind(styles)

function ButtonBox({ el }) {
    const { btnBoxState, setBtnBoxState, setImageBoxState, setTextBoxState, setLayouts } =
        useContext(WorkspaceActionContext)
    const [curBox, setCurBox] = useState(el.box)
    const [btnName, setBtnName] = useState(el.style?.btnName)
    const [btnLink, setBtnLink] = useState(el.style?.btnLink)
    const [bgColor, setBgColor] = useState(el.style?.bgColor)
    const [textColor, setTextColor] = useState(el.style?.textColor)
    const [btnVariant, setBtnVariant] = useState(el.style?.variant)
    const [btnOpacity, setBtnOpacity] = useState(el.style?.btnOpacity)

    useEffect(() => {
        if (btnBoxState.box?.i === curBox.i) {
            if (btnBoxState.btnName !== btnName) {
                setBtnName(btnBoxState.btnName)
                setLayouts((prev) => {
                    let curLg = [...prev.lg]
                    curLg = curLg.map((element) => {
                        const curEl = { ...element }
                        if (curEl.box.i === curBox.i) {
                            curEl.box = { ...btnBoxState.box }
                            curEl.style.btnName = btnBoxState.btnName
                        }
                        return curEl
                    })
                    saveToLS('layouts', curLg)
                    return { lg: curLg }
                })
            }
            if (btnBoxState.btnLink !== btnLink) {
                setBtnLink(btnBoxState.btnLink)
                setLayouts((prev) => {
                    let curLg = [...prev.lg]
                    curLg = curLg.map((element) => {
                        const curEl = { ...element }
                        if (curEl.box.i === curBox.i) {
                            curEl.box = { ...btnBoxState.box }
                            curEl.style.btnLink = btnBoxState.btnLink
                        }
                        return curEl
                    })
                    saveToLS('layouts', curLg)
                    return { lg: curLg }
                })
            }
            if (btnBoxState.textColor !== textColor) {
                setTextColor(btnBoxState.textColor)
                setLayouts((prev) => {
                    let curLg = [...prev.lg]
                    curLg = curLg.map((element) => {
                        const curEl = { ...element }
                        if (curEl.box.i === curBox.i) {
                            curEl.box = { ...btnBoxState.box }
                            curEl.style.textColor = btnBoxState.textColor
                        }
                        return curEl
                    })
                    saveToLS('layouts', curLg)
                    return { lg: curLg }
                })
            }
            if (btnBoxState.bgColor !== bgColor) {
                setBgColor(btnBoxState.bgColor)
                setLayouts((prev) => {
                    let curLg = [...prev.lg]
                    curLg = curLg.map((element) => {
                        const curEl = { ...element }
                        if (curEl.box.i === curBox.i) {
                            curEl.box = { ...btnBoxState.box }
                            curEl.style.bgColor = btnBoxState.bgColor
                        }
                        return curEl
                    })
                    saveToLS('layouts', curLg)
                    return { lg: curLg }
                })
            }
            if (btnBoxState.variant !== btnVariant) {
                setBtnVariant(btnBoxState.variant)
                setLayouts((prev) => {
                    let curLg = [...prev.lg]
                    curLg = curLg.map((element) => {
                        const curEl = { ...element }
                        if (curEl.box.i === curBox.i) {
                            curEl.box = { ...btnBoxState.box }
                            curEl.style.variant = btnBoxState.variant
                        }
                        return curEl
                    })
                    saveToLS('layouts', curLg)
                    return { lg: curLg }
                })
            }
            if (btnBoxState.btnOpacity !== btnOpacity) {
                setBtnOpacity(btnBoxState.btnOpacity)
                setLayouts((prev) => {
                    let curLg = [...prev.lg]
                    curLg = curLg.map((element) => {
                        const curEl = { ...element }
                        if (curEl.box.i === curBox.i) {
                            curEl.box = { ...btnBoxState.box }
                            curEl.style.btnOpacity = btnBoxState.btnOpacity
                        }
                        return curEl
                    })
                    saveToLS('layouts', curLg)
                    return { lg: curLg }
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [btnBoxState])

    const onFocusBtnBox = (e) => {
        e.preventDefault()
        setBtnBoxState((prev) => {
            const newState = {
                ...prev,
                box: curBox,
                btnName,
                btnLink,
                bgColor,
                textColor,
                variant: btnVariant,
                isFocus: true,
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
        <div className={cx('wrapper')} style={{ opacity: `${btnOpacity}%` }} onMouseUp={(e) => onFocusBtnBox(e)}>
            <div className={cx('container')}>
                <Button
                    component="a"
                    href={btnLink}
                    variant={btnVariant}
                    sx={{ backgroundColor: bgColor, color: textColor }}
                >
                    {btnName}
                </Button>
            </div>
            <ModalButtonEditor el={el.box} isOpen={true} name={btnName} link={btnLink} />
        </div>
    )
}

export default ButtonBox
