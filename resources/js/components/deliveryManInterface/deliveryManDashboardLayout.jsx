import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { getUserFromAPI } from "../api/axios"
import DashboardLayout from "../dashboardComponents/dashbboardLayout"


const DeliveryManDashboard = () => {
 
    const navigate = useNavigate()

    const checkUser = async () => {

        const res = await getUserFromAPI()
     

        if(res == false)
        {
            navigate("/account/sign-in")
        }

        if(res.data.user_type != "delivery_man")
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

export default DeliveryManDashboard