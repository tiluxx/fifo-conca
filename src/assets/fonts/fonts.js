const fontList = {
    google: {
        families: [
            'Lato',
            'Roboto',
            'Playfair Display',
            'Public Sans',
            'Montserrat',
            'Raleway',
            'Inter',
            'Josefin Sans',
            'Pacifico',
            'Lobster',
            'IBM Plex Serif',
            'Amatic SC',
            'Corinthia',
            'Bangers',
            'Poppins',
            'Lora',
            'Comfortaa',
        ],
    },
    custom: {
        families: ['Brand', 'Brown Sugar', 'Natural', 'Pandyra'],
        urls: ['./CustomFonts/CustomFonts.css'],
    },
}

const fontListName = [...fontList.google.families, ...fontList.custom.families]

export default fontList
export { fontListName }
