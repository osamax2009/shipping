import { useContext, useEffect } from "react"
import Sidebar from "./partials/sidebar"
import Topbar from "./partials/topbar"
import { UserContext } from "../contexts/userContext"
import { checkLogStatus } from "../api/axios"
import { useNavigate } from "react-router-dom"


const DashboardLayout = ({children}) => {
    const{user,setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const checkUserStatus = async () => {
        const isConnected = await checkLogStatus()

        if(!isConnected)
        {
            navigate("/")
        }

      
    }

    useEffect(() => {
        checkUserStatus()
    },[])
    return (
        <div id="wrapper">
            <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar/>
                    <div>
                        {children}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default DashboardLayout