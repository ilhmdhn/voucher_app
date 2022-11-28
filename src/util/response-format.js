const response = (state, data, message = "succes") =>{
    return {
        state: state,
        message: message,
        data: data
    }
}

module.exports = {response}