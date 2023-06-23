import { useContext, useEffect } from "react";
import Sidebar from "./partials/sidebar";
import Topbar from "./partials/topbar";
import { UserContext } from "../contexts/userContext";
import { checkLogStatus, getUserFromAPI } from "../api/axios";
import { useNavigate } from "react-router-dom";
import AskQuestion from "../partials/askQuestion";
import { ToastContainer } from "react-toastify";

const DashboardLayout = ({ children }) => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const checkUserStatus = async () => {
        const res = await getUserFromAPI();

        if (res == false) {
            navigate("/account/sign-in");
        }
    };

    useEffect(() => {
        checkUserStatus();
    }, []);
    return (
        <div className="wrapper">
           
            <Sidebar />
            <div className="content-wrapper">
            <Topbar />
                <div className="content">
               
                    <div className="container-fluid">
                        <div className="col-12 min-h-screen pt-[40px] mt-[10px]">
                        {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
