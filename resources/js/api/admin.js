const admin = {
    getUsers(cb, errorCB) {
        axios
        .get(window.API_URL+'admin/getUsers')
        .then(resp => {
        
            if (resp.status == 200) {
                cb(resp.data)
            }
        })
        .catch(err => {
            errorCB(err.response.data)
        })
    },
    getFeedbacks(cb, errorCB) {
        axios
        .get(window.API_URL+'admin/getFeedbacks')
        .then(resp => {
        
            if (resp.status == 200) {
                cb(resp.data)
            }
        })
        .catch(err => {
            errorCB(err.response.data)
        })
    },
    getComments(cb, errorCB) {
        axios
        .get(window.API_URL+'admin/getComments')
        .then(resp => {
        
            if (resp.status == 200) {
                cb(resp.data)
            }
        })
        .catch(err => {
            errorCB(err.response.data)
        })
    },
    getCategories(cb, errorCB) {
        axios
        .get(window.API_URL+'admin/getCategories')
        .then(resp => {
        
            if (resp.status == 200) {
                cb(resp.data)
            }
        })
        .catch(err => {
            errorCB(err.response.data)
        })
    },
    createFeedback(data, cb, errorCB) {
        axios
        .post(window.API_URL+'admin/createFeedback', data)
        .then(resp => {
        
            if (resp.status == 200) {
                cb(resp.data)
            }
        })
        .catch(err => {
            errorCB(err.response.data)
        })
    },
    addComment(data, cb, errorCB){
        axios
        .post(window.API_URL+'admin/addComment', data)
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
}

export default admin
