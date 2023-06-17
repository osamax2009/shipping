import { useContext, useEffect } from "react"
import Sidebar from "./partials/sidebar"
import Topbar from "./partials/topbar"
import { UserContext } from "../contexts/userContext"
import { checkLogStatus, getUserFromAPI } from "../api/axios"
import { useNavigate } from "react-router-dom"
import AskQuestion from "../partials/askQuestion"
import { ToastContainer } from 'react-toastify';


const DashboardLayout = ({children}) => {
    const{user,setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const checkUserStatus = async () => {

        const res = await getUserFromAPI()
        console.log(res)

        if(res == "false")
        {
            navigate("/account/sign-in")
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
            {/* <AskQuestion /> */}

        </div>
    )
}

export default DashboardLayout