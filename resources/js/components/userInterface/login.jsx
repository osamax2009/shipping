import { useContext, useEffect, useRef, useState } from "react";
import { postWithAxios, getCsrfToken, checkLogStatus, getUserFromAPI } from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { ToastContainer, toast } from "react-toastify";
import { appName } from "../shared/constancy";

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setpassword] = useState("")
    const [errors, setErrors] = useState({})
    const passInput = useRef(null)
    const emailInput = useRef(null)
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
         await getCsrfToken()
       
        const dataToSend = {
            email : email,
            password : password
        }
        const data = await postWithAxios("/api/login", dataToSend)

        console.log('login response',data)

        if(data.message)
        {
            toast(data.message,{
                type : "error",
                hideProgressBar : true
            })
            setErrors(data)
        }

        if(data.data.email)
        {
            setUser(data.data)

            if(data.data.user_type == "client")
            {
                toast('connected successfully',{
                    type : "success",
                    hideProgressBar : true
                })
                navigate("/")
                
            }

            if(data.data.user_type == "admin")
            {
                toast('connected successfully',{
                    type : "success",
                    hideProgressBar : true
                })
                navigate("/account/admin/dashboard")
                
            }
        }

        
    }


    const checkUserStatus = async () => {
        const isConnected = await getUserFromAPI()

        console.log("stauts from login", isConnected)

        if(isConnected.email)
        {
            navigate(-1)
        }

      
    }

    useEffect(() => {
        document.title = appName + " - Login page";
    }, []);

    useEffect(() => {
        checkUserStatus()
    }, [])

    useEffect(()=>{
        if(errors.email)
        {
            emailInput.current.classList.add("is-invalid")
        }
        else
        {
            emailInput.current.classList.remove("is-invalid") 
        }
    },[errors])

    
    useEffect(()=>{
        if(errors.password)
        {
            passInput.current.classList.add("is-invalid")
        }
        else
        {
            passInput.current.classList.remove("is-invalid") 
        }
    },[errors])

    return (
        <div className="container min-h-screen">
            {/* Outer Row  */}
            <div className="row h-full justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* Nested Row within Card Body  */}
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">
                                                Welcome Back!
                                            </h1>
                                        </div>
                                        <form className="user" onSubmit={handleLogin}>
                                            <div className="form-group">
                                                <input
                                                ref={emailInput}
                                                    type="email"
                                                    className="form-control form-control-user"
                                                    id="exampleInputEmail"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..."
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    required
                                                />
                                                <span className="text-danger">
                                                    {errors?.email}
                                                </span>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                ref={passInput}
                                                    type="password"
                                                    className="form-control form-control-user"
                                                    id="exampleInputPassword"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={e => setpassword(e.target.value)}
                                                    required
                                                />
                                                <span className="text-danger text-center py-4">
                                                    {errors?.password}
                                                </span>
                                            </div>
                                            {/* <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck"
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="customCheck"
                                                    >
                                                        Remember Me
                                                    </label>
                                                </div>
                                            </div> */}
                                            <span className="text-danger py-2 text-center">
                                                    {errors?.message}
                                                </span>
                                            <button
                                                
                                                className="btn btn-primary btn-user btn-block"
                                            >
                                                Login
                                            </button>
                                           {/*  <hr />
                                            <a
                                                href="index.html"
                                                className="btn btn-google btn-user btn-block"
                                            >
                                                <i className="fab fa-google fa-fw"></i>{" "}
                                                Login with Google
                                            </a>
                                            <a
                                                href="index.html"
                                                className="btn btn-facebook btn-user btn-block"
                                            >
                                                <i className="fab fa-facebook-f fa-fw"></i>{" "}
                                                Login with Facebook
                                            </a> */}
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <Link
                                                className="small"
                                               to={"/"}
                                            >
                                                Forgot Password?
                                            </Link>
                                        </div>
                                        <div className="text-center">
                                            <Link
                                                className="small"
                                                to={'/account/register'}
                                            >
                                                Create an Account!
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default Login
