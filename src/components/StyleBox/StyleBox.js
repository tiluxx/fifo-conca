import classNames from 'classnames/bind'
import styles from './StyleBox.module.scss'

const cx = classNames.bind(styles)

function StyleBox({ type = 'Minimalism', font = 'f-minimalism' }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <span className={cx('style-name', font)}>{type}</span>
            </div>
        </div>
    )
}

export default StyleBox
