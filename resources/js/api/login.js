const login = {
    getUserInfo(data, cb, errorCB) {
        axios
            .post(window.API_URL+'login', data)
            .then(resp => {
            
                if (resp.status == 200) {
                    cb(resp.data)
                }
            })
            .catch(err => {
                errorCB(err.response.data)
            })
    },
    logout(cb, errorCB) {
        axios
            .post(window.API_URL+'logout')
            .then(resp => {
            
                if (resp.status == 200) {
                    cb(resp.data)
                }
            })
            .catch(err => {
                errorCB(err.response.data)
            })
    },
    
    add_user(data, cb, errorCB) {
        axios
            .post(API_URL + 'add_user', data)
            .then(resp => {
                if (resp.status == 200) {
                    cb(resp.data)
                }
            })
            .catch(err => {
                errorCB(err.response.data)
            })
    },
}

export default login
