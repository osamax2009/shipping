import { useContext, useEffect, useRef, useState } from "react";
import { postWithAxios, getCsrfToken, checkLogStatus } from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const Register = () => {
    const [email,setEmail] = useState("")
    const [password,setpassword] = useState("")
    const [passConfirm,setPassConfirm] = useState("")
    const [name,setName] = useState("")
    const [username,setUsername] = useState("")
    const [errors, setErrors] = useState({})
    const passInput = useRef(null)
    const emailInput = useRef(null)
    const nameInput = useRef(null)
    const userNameInput = useRef(null)
    const passConfirmInput = useRef(null)
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        const token = await getCsrfToken()
       
        const dataToSend = {
            email : email,
            password : password

        }
        const data = await postWithAxios("/api/register", dataToSend)

        console.log(data)

        if(data.errors)
        {
            setErrors(data.errors)
        }

        if(data.status== "success")
        {
            setUser(data.user)

            if(data.user.user_type == "user")
            {
                navigate("/account/dashboard/place-new-order")
                document.location.reload()
            }

            if(data.user.user_type == "admin")
            {
                navigate("/account/dashboard")
                document.location.reload()
            }
           
        }

        console.log(data)
        
    }


    const checkUserStatus = async () => {
        const isConnected = await checkLogStatus()

        if(isConnected)
        {
            navigate("/")
        }

      
    }

    useEffect(() =>{
        document.title = "Eurosender - Register page"
    },[])

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
        <div className="container">

        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
                 {/* Nested Row within Card Body */}
                <div className="row">
                    <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                    <div className="col-lg-7">
                        <div className="p-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                            </div>
                            <form onSubmit={handleRegister} className="user">
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input ref={nameInput} value={name} onChange={e => setName(e.target.value)} type="text" className="form-control form-control-user"  placeholder="name"/>
                                    </div>
                                    <div className="col-sm-6">
                                        <input ref={userNameInput} onChange={e => setUsername(e.target.value)}  type="text" className="form-control form-control-user"  placeholder="username"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="email" ref={emailInput} value={email} onChange={e => setEmail(e.target.value)} className="form-control form-control-user" placeholder="Email Address"/>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" ref={passInput} onChange={e => setpassword(e.target.value)} className="form-control form-control-user" id="exampleInputPassword" placeholder="Password"/>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="password" ref={passConfirmInput} onChange={e => setPassConfirm(e.target.value)} className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password"/>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-user btn-block">
                                    Register Account
                                </button>
                                <hr/>
                                <a href="index.html" className="btn btn-google btn-user btn-block">
                                    <i className="fab fa-google fa-fw"></i> Register with Google
                                </a>
                                <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                    <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                                </a>
                            </form>
                            <hr />
                            <div className="text-center">
                                <Link className="small" >Forgot Password?</Link>
                            </div>
                            <div className="text-center">
                                <Link className="small" to={"/account/sign-in"} >Already have an account? Login!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    );
};

export default Register;
