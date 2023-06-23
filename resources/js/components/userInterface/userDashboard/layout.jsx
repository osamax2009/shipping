import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import DashboardLayout from "../../dashboardComponents/dashbboardLayout"
import { getUserFromAPI } from "../../api/axios"

const UserDashboardLayout = () => {
 
    const navigate = useNavigate()

    const checkUser = async () => {

        const res = await getUserFromAPI()
     

        if(res == false)
        {
            navigate("/account/sign-in")
        }

        if(res.data.user_type != "client")
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

export default UserDashboardLayout