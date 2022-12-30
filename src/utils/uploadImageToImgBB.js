import axios from 'axios'

const uploadImageToImgBB = async (img) => {
    let body = new FormData()
    body.set('key', 'bce2eb376c355dde91edf100ad01c8ad')
    body.append('image', img)

    return axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload',
        data: body,
    })
}

export default uploadImageToImgBB
