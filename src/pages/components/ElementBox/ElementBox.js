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
        <div className={cx('wrapper')} ref={ref} onClick={() => setIsComponentVisible(true)}>
            {children}
            <div className={cx('select-frame')} style={{ display: isComponentVisible ? 'block' : 'none' }}>
                {el.box.type === 'textBox' ? (
                    <div className={cx('delete-btn-text-wrapper')} onClick={() => onRemoveItemClick(el.box)}>
                        <DeleteIcon sx={{ color: '#096bde' }} />
                    </div>
                ) : (
                    <div className={cx('delete-btn-image-wrapper')} onClick={() => onRemoveItemClick(el.box)}>
                        <DeleteIcon sx={{ color: '#096bde' }} />
                    </div>
                )}
                <div className={cx('resize-pointer-wrapper')}>
                    <div className={cx('resize-pointer')}></div>
                </div>
            </div>
        </div>
    )
}

export default ElementBox
