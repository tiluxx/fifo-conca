import classNames from 'classnames/bind'
import styles from './TemplateBox.module.scss'

const cx = classNames.bind(styles)

function TemplateBox({ srcImage, name }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('img-container')}>
                <img src={srcImage} alt={name} />
            </div>
        </div>
    )
}

export default TemplateBox
