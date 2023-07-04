import axios from 'axios'


export const axiosInstance = () => {
  const axiosInstance = axios.create({
   // baseURL: import.meta.env.VITE_API_URL,
    params: {
      headers: {
        Accept: 'application/json',
        "X-Requested-With" : "XMLHttpRequest",
        "Authorization" : 'Bearer ' + localStorage.getItem('api_token'),
        'Content-Type': 'multipart/form-data'
      },
      
    },
    withCredentials : true
     /* timeout: 5000, */
  })

 // axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
  
  return axiosInstance
}



export const getCsrfToken = async () => {
  try {
    const res = await axiosInstance().get('/sanctum/csrf-cookie')
   
    return res
  } catch (err) {
    return err
  }
}

export const getWithAxios = async (url,dataToSend=null) => {
  let data
  const params = {
    params : dataToSend
  }
  try {
    data = axiosInstance()
      .get(url,params)
      .then((response) => {
        return response.data
      })
  } catch (err) {
    return err
  }

  return data
}

export const postWithAxios = async (url, dataToSend) => {
 
  try {
    const { data } = await axiosInstance().post(url, dataToSend)
    return data
  } catch (error) {
    return error.response.data
  }
}

export const putWithAxios = async (url, dataToSend) => {
 
  try {
    const { data } = await axiosInstance().put(url, dataToSend)
    return data
  } catch (error) {
    return error.response.data
  }
}

export const getUserFromAPI = async () => {

  const {user} = await getWithAxios('/api/user')
  
  return user

 /*  try {
    const {user} = await getWithAxios('/api/user')
    return user
  } catch (error) {
    return 'an error occured'
  } */
 
  
 
}



export const checkLogStatus = async () => {

  try {
    const res = await getUserFromAPI()
    console.log("status check response", res)
    if(res !== 'false')
    {
      return true
    }
  } catch (error) {
    return false
  }

}