const { default: axios } = require("axios")

const SendEmail = (data) => {
    console.log(data)
   return axios.post('/api/send', data);
}


export default{
    SendEmail
}