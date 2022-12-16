import { constantCase } from 'change-case'
import { fontListName } from '~/assets/fonts'

const fontList = {}
fontListName.forEach((font) => {
    fontList[constantCase(font)] = {
        fontFamily: `${font}, sans-serif`,
    }
})

const styleList = {
    TYPE_FONT_SIZE: {
        TITLE: {
            fontSize: '6.5rem',
            lineHeight: '6.5rem',
        },
        SUB_TITLE: {
            fontSize: '4.2rem',
            lineHeight: '4.2rem',
        },
        HEADING: {
            fontSize: '2.8rem',
            lineHeight: '23px',
        },
        SUB_HEADING: {
            fontSize: '2.2rem',
            lineHeight: '17px',
        },
        CONTENT: {
            fontSize: '1.4rem',
            lineHeight: '14px',
        },
        SMALL_CONTENT: {
            fontSize: '1.1rem',
            lineHeight: '11px',
        },
    },

    TYPE_FONT_FAMILY: {
        ...fontList,
    },
}

export default styleList
