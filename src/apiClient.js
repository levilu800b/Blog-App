import axios from 'axios'
const url = 'https://blog-express-api.herokuapp.com/'

export class ApiClient {
    constructor(tokenProvider, logoutHandler) {
        this.tokenProvider = tokenProvider
        this.logoutHandler = logoutHandler
    }

    async login(username, password) {
        return await axios({
            method: 'post',
            url: `${url}auth`,
            data: {
                username,
                password
            }

        });
    }

    autheticatedCall(method, url, data) {
        return axios({
                method,
                url,
                headers: {
                    authorization: this.tokenProvider()
                },
                data
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    this.logoutHandler();
                    return Promise.reject()
                } else {
                    throw error;
                }
            })
    }

    getAds() {
        return this.autheticatedCall('get', url)

    }

    addAd(title, Date, description,markdown) {
        return this.autheticatedCall('post', url, { title, Date, description,markdown})
    }

    removeAd(id) {
        return this.autheticatedCall('delete', `${url}${id}`)
    }

    updateAd(id, title, Date, description,markdown) {
        return this.autheticatedCall('put', `${url}${id}`, { title, Date, description,markdown })
    }

}