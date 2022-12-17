import { useContext } from 'react'
import classNames from 'classnames/bind'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from './ElementBox.module.scss'
import { WorkspaceActionContext } from '~/pages/Workspace'
import useComponentDisplay from '~/hooks/useComponentDisplay'

const cx = classNames.bind(styles)

function ElementBox({ children, el }) {
    const { onRemoveItemClick } = useContext(WorkspaceActionContext)
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentDisplay(true)

    return (
        <div
            className={cx('wrapper')}
            style={{ position: 'relative', width: '100%', height: '100%' }}
            ref={ref}
            onClick={() => setIsComponentVisible(true)}
        >
            {children}
            <div
                className={cx('select-frame')}
                style={{
                    display: isComponentVisible ? 'block' : 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    WebkitBoxShadow: '0 0 0 2px #4285f4',
                    boxShadow: '0 0 0 2px #4285f4',
                    pointerEvents: 'none',
                }}
            >
                {el.box.type === 'textBox' ? (
                    <div
                        className={cx('delete-btn-text-wrapper')}
                        style={{
                            position: 'absolute',
                            right: '0%',
                            cursor: 'pointer',
                            left: '0%',
                            bottom: '0%',
                        }}
                        onClick={() => onRemoveItemClick(el.box)}
                    >
                        <DeleteIcon sx={{ color: '#096bde' }} />
                    </div>
                ) : (
                    <div
                        className={cx('delete-btn-image-wrapper')}
                        style={{
                            position: 'absolute',
                            right: '0%',
                            cursor: 'pointer',
                        }}
                        onClick={() => onRemoveItemClick(el.box)}
                    >
                        <DeleteIcon sx={{ color: '#096bde' }} />
                    </div>
                )}
                <div
                    className={cx('resize-pointer-wrapper')}
                    style={{ position: 'absolute', right: '0%', bottom: '0%' }}
                >
                    <div
                        className={cx('resize-pointer')}
                        style={{
                            width: '16px',
                            height: '16px',
                            transition: '125ms',
                            backgroundColor: '#096bde',
                            border: '2px solid #fff',
                            borderRadius: '32%',
                            pointerEvents: 'all',
                            cursor: 'se-resize',
                        }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default ElementBox
