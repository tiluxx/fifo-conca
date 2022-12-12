import { useContext } from 'react'
import classNames from 'classnames/bind'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from './ElementBox.module.scss'
import { WorkspaceActionContext } from '~/pages/Workspace'

const cx = classNames.bind(styles)

function ElementBox({ children, el }) {
    const { onRemoveItemClick } = useContext(WorkspaceActionContext)
    return (
        <div className={cx('wrapper')}>
            {children}
            <div className={cx('select-frame')}>
                {el.type === 'textBox' ? (
                    <div className={cx('delete-btn-text-wrapper')} onClick={() => onRemoveItemClick(el)}>
                        <DeleteIcon sx={{ color: '#096bde' }} />
                    </div>
                ) : (
                    <div className={cx('delete-btn-image-wrapper')} onClick={() => onRemoveItemClick(el)}>
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
