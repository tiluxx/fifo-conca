import { useState, useEffect, useRef, useContext } from 'react'
import classNames from 'classnames/bind'
import { Editor, EditorState, RichUtils, Modifier, getDefaultKeyBinding } from 'draft-js'
import { WorkspaceActionContext } from '~/pages/Workspace'
import styles from './TextBox.module.scss'
import styleList from './styleList'

const cx = classNames.bind(styles)

function TextBox({ el }) {
    const { textBoxState, setTextBoxState, customStyles, setLayout } = useContext(WorkspaceActionContext)
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [placeholder, setPlaceholder] = useState(false)

    const editorRef = useRef()

    useEffect(() => {
        if (textBoxState.editorState !== null && textBoxState.box.i === el.i) {
            setEditorState(textBoxState.editorState)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textBoxState])

    const onToggleStaticMode = (e, type) => {
        e.preventDefault()
        setLayout((prev) => {
            const newLayout = [...prev]
            newLayout.forEach((item) => {
                if (item.i === el.i) {
                    item.static = type === 'static' ? true : false
                }
            })
            return newLayout
        })
    }

    const focus = () => editorRef.current.focus()

    const onChangeEditorState = (editorState) => {
        setEditorState(editorState)
        setTextBoxState({
            box: el,
            editorState,
            changeStyles: onChangeStyles,
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
        if (e.keyCode === 9 /* TAB */) {
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
        [styles['editor-text-align--left']]: customStyles.textAlignment.textAlignLeft,
        [styles['editor-text-align--center']]: customStyles.textAlignment.textAlignCenter,
        [styles['editor-text-align--right']]: customStyles.textAlignment.textAlignRight,
        [styles['editor-text-align--justify']]: customStyles.textAlignment.textAlignJustify,
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
        ...styleList.TYPE_FONT_FAMILY,
    }

    useEffect(() => {
        console.log(styleList.TYPE_FONT_FAMILY)
        console.log(customStyles)
        if (customStyles.styleType.typeName !== '') {
            const selection = editorState.getSelection()
            const currentStyle = editorState.getCurrentInlineStyle()

            // Let's just allow one color at a time. Turn off all active colors.
            const nextContentState = Object.keys(styleList[customStyles.styleType.styleNameConstant]).reduce(
                (contentState, type) => {
                    return Modifier.removeInlineStyle(contentState, selection, type)
                },
                editorState.getCurrentContent(),
            )

            let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style')
            // Unset style override for current color.
            if (selection.isCollapsed()) {
                nextEditorState = currentStyle.reduce((state, type) => {
                    return RichUtils.toggleInlineStyle(state, type)
                }, nextEditorState)
            }

            // If the color is being toggled on, apply it.
            if (!currentStyle.has(customStyles.styleType.typeName)) {
                nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, customStyles.styleType.typeName)
            }
            onChangeEditorState(nextEditorState)
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
        >
            <Editor
                customStyleMap={styleMap}
                blockStyleFn={getBlockStyle}
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={mapKeyToEditorCommand}
                placeholder="Your word"
                ref={editorRef}
                onChange={onChangeEditorState}
            />
        </div>
    )
}

export default TextBox
