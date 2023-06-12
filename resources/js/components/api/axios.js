import axios from 'axios'


export const axiosInstance = () => {
  const axiosInstance = axios.create({
   // baseURL: import.meta.env.VITE_API_URL,
    params: {
      headers: {
        Accept: 'application/json',
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

export const getWithAxios = async (url) => {
  let data
  try {
    data = axiosInstance()
      .get(url)
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
  const res = await getWithAxios('/api/user')
  return res
}



export const checkLogStatus = async () => {

  const res = await getWithAxios("/api/check-log-status")
  
  if(res.status == "success")
  {
    return true;
  }
  else
  {
    return false;
  }
}