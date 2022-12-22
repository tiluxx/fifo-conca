import classNames from 'classnames/bind'
import styles from './WorkspaceLayout.module.scss'

const cx = classNames.bind(styles)

function WorkspaceLayout({ children }) {
    return <div className={cx('wrapper')}>{children}</div>
}

export default WorkspaceLayout
