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
            fontSize: '4rem',
            lineHeight: '40px',
        },
        SUB_TITLE: {
            fontSize: '3.2rem',
            lineHeight: '32px',
        },
        HEADING: {
            fontSize: '2.3rem',
            lineHeight: '23px',
        },
        SUB_HEADING: {
            fontSize: '1.7rem',
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
