import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, logout, getMe, register } from "../Services/auth.api.js";

export const useAuth = ()=>{
    const {user, setUser, loading, setLoading} = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async()=>{
            
            try {
                const data = await getMe();
                if(data) setUser(data.user);                
            } catch (error) {
                console.error(error)
            }
            finally{
                setLoading(false);
            }
        }
        fetchUser();
      
    }, [])
    

    const handleLogin = async({email, password})=>{
        try {
            setLoading(true);
            const data = await login({email, password});
            setUser(data.user);
            
        } catch (error) {
            console.error("There is some error while posting login", error)
        }
        finally{
            setLoading(false);
        }

    }
    const handleRegister = async({username, email, password}) => {
        try {
            setLoading(true);
            const data = await register({username, email, password});
            setUser(data.user);
            
        } catch (error) {
            
        }
        finally{
            setLoading(false);
        }
    }
    const handleLogout = async() => {
        try {
            setLoading(true);
            const data = await logout();
            setUser(null);            
        } catch (error) {
            
        }
        finally{
            setLoading(false);
        }
    }
    return {user, loading, handleLogin, handleLogout, handleRegister};
    
}
