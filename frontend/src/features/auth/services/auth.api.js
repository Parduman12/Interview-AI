import axios from 'axios';

export const register = async({username, email, password})=>{
    const url = `${process.env.BACKEND_URL}/api/auth/register`;
    console.log(url);
    try {
        const response = await axios.post(url,{
            username, email, password
        },{
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        console.error(error)
    }
}


export const login = async ({email, password})=>{
    const url = `${process.env.BACKEND_URL}/api/auth/login`;
    console.log(url);
    try {
        const response = await axios.post(url,{
            email, password
        },{
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        console.error("Error while logging in",error)
    }
}

export const logout = async()=>{
    const url = `${process.env.BACKEND_URL}/api/auth/logout`;
    try {
        const response = await axios.get(url,
            {
                withCredentials:true
            }
        )
        return response.data;
    } catch (error) {
        console.error("Error while logging out.", error);
    }
}


export const getMe = async ()=>{
    const url = `${process.env.BACKEND_URL}/api/auth/get-me`;
    try {
        const response = await axios.get(url, {
            withCredentials:true
        })
        if(response) return response.data
        else return null
    } catch (error) {
        console.log("Cannot get user details", error);
    }
}