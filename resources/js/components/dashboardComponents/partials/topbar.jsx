import { useContext } from "react"
import { UserContext } from "../../contexts/userContext"
import { getWithAxios, postWithAxios } from "../../api/axios"
import { useNavigate } from "react-router-dom"
import {BsPersonCircle, BsSearch} from 'react-icons/bs'

const Topbar = () => {
    const {user,setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = async() => {

        try {
            const data = await getWithAxios("/api/logout")
            console.log("logout response",data)
            if(data.message == "Logout successfully")
            {
                navigate("/")
                setUser(null)
            }

        } catch (error) {
            console.log(error.response)
        }
  
       

       
        
       

    }


    return(
<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    
    {/* Sidebar Toggle (Topbar) */}
    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="fa fa-bars"></i>
    </button>

    {/* Topbar Search */}
    <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
            <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
            <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm"></i>
                </button>
            </div>
        </div>
    </form>

    {/* Topbar Navbar */}
    <ul className="navbar-nav ml-auto">

        {/* Nav Item - Search Dropdown (Visible Only XS) */}
        <li className="nav-item dropdown no-arrow d-sm-none">
            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <BsSearch className="text-white text-xl"/>
            </a>
           
            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                <form className="form-inline mr-auto w-100 navbar-search">
                    <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <BsSearch className="!text-white text-xl"/>  
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </li>

     

        <div className="topbar-divider d-none d-sm-block">
            
        </div>

     

        {/* Nav Item - User Information */}
        <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user?.name}</span>
                <BsPersonCircle className="text-2xl" />
            </a>
            {/* Dropdown - User Information */}
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a className="dropdown-item" href="#">
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Profile
                </a>
                <a className="dropdown-item" href="#">
                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Settings
                </a>
                <a className="dropdown-item" href="#">
                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                    Activity Log
                </a>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item " onClick={handleLogout} data-toggle="modal" data-target="#logoutModal">
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                </button>
            </div>
        </li>

    </ul>

</nav>
    )
}

export default Topbar