import { useState, useEffect, useRef, useContext } from 'react'
import classNames from 'classnames/bind'
import { Editor, EditorState, RichUtils, Modifier, getDefaultKeyBinding } from 'draft-js'
import { WorkspaceActionContext } from '~/pages/Workspace'
import styles from './TextBox.module.scss'
import styleList from './styleList'
import 'draft-js/dist/Draft.css'
import './TextBox.css'

const cx = classNames.bind(styles)

function TextBox({ id, el }) {
    const { textBoxState, setTextBoxState, setImageBoxState, customStyles, setLayout } =
        useContext(WorkspaceActionContext)
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [curBox, setCurBox] = useState(el)
    const [placeholder, setPlaceholder] = useState(false)
    const [textColor, setTextColor] = useState(textBoxState.textColor)
    const [textOpacity, setTextOpacity] = useState(100)
    const [textAlign, setTextAlign] = useState('left')

    const editorRef = useRef()

    useEffect(() => {
        if (textBoxState.box?.i === curBox.i && textBoxState.editorState !== null) {
            setEditorState(textBoxState.editorState)
            setTextColor(textBoxState.textColor)
            setTextOpacity(textBoxState.textOpacity)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textBoxState])

    const onToggleStaticMode = (e, type) => {
        e.preventDefault()
        setLayout((prev) => {
            const newLayout = [...prev]
            newLayout.forEach((item) => {
                if (item.i === curBox.i) {
                    item.static = type === 'static' ? true : false
                }
            })
            return newLayout
        })
    }

    const focus = () => {
        editorRef.current.focus()
        setTextBoxState((prev) => {
            const newState = {
                ...prev,
                box: curBox,
                editorState,
                isFocus: true,
            }
            return newState
        })
        setImageBoxState((prev) => {
            const newState = {
                ...prev,
                selectFile: {
                    ...prev.selectFile,
                },
                isFocus: false,
            }
            return newState
        })
        setTextColor((prev) => prev)
    }

    const onChangeEditorState = (editorState) => {
        setEditorState(editorState)
        setTextBoxState((prev) => {
            const newState = {
                ...prev,
                box: curBox,
                editorState,
                textColor: textColor,
                changeStyles: onChangeStyles,
            }
            return newState
        })
    }

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            onChangeEditorState(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    const mapKeyToEditorCommand = (e) => {
        if (e.keyCode === 9) {
            const newEditorState = RichUtils.onTab(e, editorState, 4)
            if (newEditorState !== editorState) {
                this.onChange(newEditorState)
            }
            return
        }
        return getDefaultKeyBinding(e)
    }

    const onChangeStyles = (style) => {
        onChangeEditorState(RichUtils.toggleInlineStyle(editorState, style))
    }

    const onChangeBlockStyles = (blockType) => {
        onChangeEditorState(RichUtils.toggleBlockType(editorState, blockType))
    }

    const getBlockStyle = (block) => {
        switch (block.getType()) {
            case 'blockquote':
                return styles['blockStyle-blockquote']
            default:
                return null
        }
    }

    let editTorClasses = cx('editor-wrapper', {
        [styles['editor-hide-placeholder']]: placeholder,
    })

    useEffect(() => {
        let contentState = editorState.getCurrentContent()
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                setPlaceholder(true)
            }
        }
    }, [editorState])

    const styleMap = {
        ...styleList.TYPE_FONT_SIZE,
        ...styleList.TYPE_TEXT_ALIGN,
        ...styleList.TYPE_FONT_FAMILY,
    }

    useEffect(() => {
        if (customStyles.styleType.typeName !== '') {
            if (textBoxState.box?.i === curBox.i) {
                if (customStyles.styleType.styleNameConstant === 'TYPE_TEXT_ALIGN') {
                    setTextAlign(customStyles.styleType.typeName)
                } else {
                    const selection = editorState.getSelection()
                    const currentStyle = editorState.getCurrentInlineStyle()

                    const nextContentState = Object.keys(styleList[customStyles.styleType.styleNameConstant]).reduce(
                        (contentState, type) => {
                            return Modifier.removeInlineStyle(contentState, selection, type)
                        },
                        editorState.getCurrentContent(),
                    )

                    let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style')
                    if (selection.isCollapsed()) {
                        nextEditorState = currentStyle.reduce((state, type) => {
                            return RichUtils.toggleInlineStyle(state, type)
                        }, nextEditorState)
                    }

                    if (!currentStyle.has(customStyles.styleType.typeName)) {
                        nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, customStyles.styleType.typeName)
                    }
                    onChangeEditorState(nextEditorState)
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customStyles])

    return (
        <div
            className={editTorClasses}
            onClick={(e) => {
                focus()
                onToggleStaticMode(e, 'static')
            }}
            onBlur={(e) => onToggleStaticMode(e, 'non-static')}
            style={{ color: textColor, opacity: `${textOpacity}%` }}
        >
            <Editor
                editorKey={curBox.i}
                customStyleMap={styleMap}
                blockStyleFn={getBlockStyle}
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={mapKeyToEditorCommand}
                textAlignment={textAlign}
                placeholder="Your word"
                editorRef={editorRef}
                onChange={onChangeEditorState}
            />
        </div>
    )
}

export default TextBox
