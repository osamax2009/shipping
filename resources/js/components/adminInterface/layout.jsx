import { useContext, useEffect } from "react"
import DashboardLayout from "../dashboardComponents/dashbboardLayout"
import { UserContext } from "../contexts/userContext"
import { Outlet, useNavigate } from "react-router-dom"
import { getUserFromAPI } from "../api/axios"

const AdminDashboardLayout = () => {
 
    const navigate = useNavigate()

    const checkUser = async () => {

        const res = await getUserFromAPI()
     

        if(res == false)
        {
            navigate("/account/sign-in")
        }

        if(res.data.user_type != "admin")
        {
            navigate(-1)

        }

      
    }

    useEffect(() => {
        checkUser()
    },[])
    return(
        <DashboardLayout>
            <Outlet/>
        </DashboardLayout>
    )
}

export default AdminDashboardLayout