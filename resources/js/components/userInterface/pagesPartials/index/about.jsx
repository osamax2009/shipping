import { Image } from "@nextui-org/react";
import { getWithAxios } from "../../../api/axios";
import { useEffect, useState } from "react";
import { FaLanguage, FaUserCheck, FaUserPlus } from "react-icons/fa";

const About = () => {
    const [users, setUsers] = useState([])
    const [employees, setEmployees] = useState([])

    const getUsers = async() => {
        const dataToSend = {
            user_type : "client"
        }
        const res = await getWithAxios("/api/user-list", dataToSend)
        setUsers(res.data)
       

    }

    const getEmployees = async() => {
        const dataToSend = {
            user_type : "delivery_man"
        }
        const res = await getWithAxios("/api/user-list", dataToSend)
        setEmployees(res.data)
       

    }

    useEffect(() => {
        getUsers()
    },[])

    useEffect(() => {
        getEmployees()
    },[])
    return (
       <div className="px-4 py-8 bg-blue-100/50 md:px-8">
        <div className="grid md:grid-cols-4">
        <div className="text-appGreen uppercase text-xln font-bold p-6">
                About us
            </div>
            <div className="col-span-3 w-full grid gap-6 md:grid-cols-3">
                <div className="text-xl w-full">
                    <div className="text-4xl text-appGreen/75">
                        <FaUserPlus />
                    </div>
                    <div>
                        <div className="text-xl font-bold">
                            {users.length}
                        </div>
                        <div className="text-md font-bold">
                        registerd users +
                        </div>
                    </div>
                </div>

                <div className="text-xl w-full">
                    <div className="text-4xl text-appGreen/75">
                        <FaLanguage />
                    </div>
                    <div>
                        <div className="text-xl font-bold">
                            {employees.length}
                        </div>
                        <div className="text-md font-bold">
                        languages 
                        </div>
                    </div>
                </div>

                <div className="text-xl w-full">
                    <div className="text-4xl text-appGreen/75">
                        <FaUserCheck />
                    </div>
                    <div>
                        <div className="text-xl font-bold">
                            {employees.length}
                        </div>
                        <div className="text-md font-bold">
                        Employees +
                        </div>
                    </div>
                </div>
            </div>

       </div>
       </div>
    );
};

export default About;
