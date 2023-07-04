import { useState } from "react";
import { useEffect } from "react";
import { BsListCheck } from "react-icons/bs";
import { getWithAxios } from "../api/axios";
import { FaClipboardList } from "react-icons/fa";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState([]);
   



    const getDashboard = async () => {   
        const res = await getWithAxios("/api/dashboard-detail");
        setDashboard(res);
    };


    useEffect(() => {
        getDashboard()
    },[])


    return (
        <div>
            <div className="flex flex-wrap gap-8">
                <Minicard title={'Total Order'} value={dashboard?.total_order} />
                <Minicard title={'Created Order'} value={dashboard?.total_create_order} />
                <Minicard title={'Assigned Order'} value={dashboard?.total_courier_assigned_order} />
                <Minicard title={'Accepted Order'} value={dashboard?.total_active_order} />
                <Minicard title={'Arrived Order'} value={dashboard?.total_courier_arrived_order} />
                <Minicard title={'Picked Order'} value={dashboard?.total_courier_picked_up_order} />
                <Minicard title={'Departed Order'} value={dashboard?.total_courier_departed_order} />
                <Minicard title={'Delivered Order'} value={dashboard?.total_completed_order} />
                <Minicard title={'Cancelled Order'} value={dashboard?.total_cancelled_order} />
                <Minicard title={'Total User'} value={dashboard?.total_order} />
                <Minicard title={'Total Delivery Person'} value={dashboard?.total_order} />
            </div>
        </div>
    );
};

export default Dashboard;

const Minicard = ({ value, title }) => {
    return (
        <div className="flex justify-between border-2 rounded-xl py-2 px-4 cursor-pointer gap-8 items-center hover:bg-gray-600 hover:text-white">
            <div>
                <div className="font-bold text-lg py-2">{value}</div>
                <div>{title}</div>
            </div>
            <div className="p-4 bg-appGreen rounded-xl text-white text-2xl">
                <FaClipboardList />
            </div>
        </div>
    );
};
