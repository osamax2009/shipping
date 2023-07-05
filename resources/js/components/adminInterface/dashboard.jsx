import { useState } from "react";
import { useEffect } from "react";
import { BsListCheck } from "react-icons/bs";
import { getWithAxios } from "../api/axios";
import { FaClipboardList } from "react-icons/fa";
import { Loading, Table } from "@nextui-org/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [dashboard, setDashboard] = useState();
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState();

    const getDashboard = async () => {
        const res = await getWithAxios("/api/dashboard-detail");
        setDashboard(res);
    };

    useEffect(() => {
        getDashboard();
    }, []);

    useEffect(() => {
        let array = [];
        dashboard?.weekly_order_count.map((d) => {
            array.push(d.day);
            return;
        });
        setLabels(array);
    }, [dashboard]);

    useEffect(() => {
        let array = [];
        dashboard?.weekly_order_count.map((d) => {
            array.push(d.total);
            return;
        });
        setData(array);
    }, [dashboard]);

    useEffect(() => {
        if (labels.length > 6 && data.length > 6) {
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: "Weekly Order Count",
                        data: data,
                        backgroundColor: [
                            "rgb(0,0,128)",
                            "rgb(54, 162, 235)",
                            "rgb(139,0,139)",
                            "rgb(255, 99, 132)",
                            "rgb(47,79,79)",
                            "rgb(72,61,139)",
                            "rgb(25, 205, 86)",
                        ],
                        hoverOffset: 4,
                    },
                ],
            });
        }
    }, [data, labels]);

    return (
        <div>
            <div>
                {dashboard ? (
                    <div>
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 justify-start gap-8">
                            <Minicard
                                title={"Total Order"}
                                value={dashboard?.total_order}
                            />
                            <Minicard
                                title={"Created Order"}
                                value={dashboard?.total_create_order}
                            />
                            <Minicard
                                title={"Assigned Order"}
                                value={dashboard?.total_courier_assigned_order}
                            />
                            <Minicard
                                title={"Accepted Order"}
                                value={dashboard?.total_active_order}
                            />
                            <Minicard
                                title={"Arrived Order"}
                                value={dashboard?.total_courier_arrived_order}
                            />
                            <Minicard
                                title={"Picked Order"}
                                value={dashboard?.total_courier_picked_up_order}
                            />
                            <Minicard
                                title={"Departed Order"}
                                value={dashboard?.total_courier_departed_order}
                            />
                            <Minicard
                                title={"Delivered Order"}
                                value={dashboard?.total_completed_order}
                            />
                            <Minicard
                                title={"Cancelled Order"}
                                value={dashboard?.total_cancelled_order}
                            />
                            <Minicard
                                title={"Total User"}
                                value={dashboard?.total_order}
                            />
                            <Minicard
                                title={"Total Delivery Person"}
                                value={dashboard?.total_order}
                            />
                        </div>
                        <div className="grid mt-4 gap-6 lg:grid-cols-2">
                            {/* <CustomPieChart chartData={chartData} /> */}
                        </div>
                        <div className="grid mt-4 gap-6 lg:grid-cols-2">
                            <div className={"border-2 rounded-xl p-4"} >
                                <div className="flex justify-between px-4 py-4 ">
                                    <div className="font-bold text-lg">
                                        Recent Order
                                    </div>
                                </div>
                                <RecentOrder dashboard={dashboard} />
                            </div>

                            <div className={"border-2 rounded-xl p-4"} >
                                <div className="flex justify-between px-4 py-4 ">
                                    <div className="font-bold text-lg">
                                        Upcomming Order
                                    </div>
                                </div>
                                <UpComingOrder dashboard={dashboard} />
                            </div>
                        </div>

                        <div className="grid mt-4 gap-6 lg:grid-cols-2">
                            <div className={"border-2 rounded-xl p-4"} >
                                <div className="flex justify-between px-4 py-4 ">
                                    <div className="font-bold text-lg">
                                        Recent User
                                    </div>
                                    <div>
                                        <Link
                                            to={"/admin/users"}
                                            className="no-underline font-bold text-lg focus:no-underline"
                                        >
                                            View All
                                        </Link>
                                    </div>
                                </div>
                                <RecentUser dashboard={dashboard} />
                            </div>

                            <div className={"border-2 rounded-xl p-4"} >
                                <div className="flex justify-between px-4 py-4 ">
                                    <div className="font-bold text-lg">
                                        Recent Delivery Person
                                    </div>
                                    <div>
                                        <Link
                                            to={"/admin/deliverypersons"}
                                            className="no-underline font-bold text-lg focus:no-underline"
                                        >
                                            View All
                                        </Link>
                                    </div>
                                </div>
                                <RecentDeliveryPerson dashboard={dashboard} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loading type="points" />
                )}
            </div>
        </div>
    );
};

export default Dashboard;

const Minicard = ({ value, title }) => {
    return (
        <div className="flex justify-between border-2 w-full rounded-xl py-2 px-4 cursor-pointer gap-8 items-center hover:bg-gray-600 hover:text-white">
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

const CustomPieChart = ({ chartData }) => {
    return   (
        <div className=" p-4 border-2 rounded-xl  w-full">
            {chartData ? <Pie data={chartData} /> : null}
        </div>
    );
};



const RecentOrder = ({ dashboard }) => {
    return (
        <Table>
            <Table.Header>
                <Table.Column> Order Id </Table.Column>
                <Table.Column> Customer Name </Table.Column>
                <Table.Column> Delivery Person </Table.Column>
                <Table.Column> Pickup Date </Table.Column>
            </Table.Header>
            <Table.Body>
                {dashboard?.recent_order.map((order, index) => (
                    <Table.Row key={index}>
                        <Table.Cell> {order.id} </Table.Cell>
                        <Table.Cell> {order.client_name} </Table.Cell>
                        <Table.Cell> {order.delivery_man_name} </Table.Cell>
                        <Table.Cell>
                            {" "}
                            {dayjs(order.pickup_point.date).format(
                                "DD-MM-YYYY; HH:mm:ss"
                            )}{" "}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

const UpComingOrder = ({ dashboard }) => {
    return (
        <Table>
            <Table.Header>
                <Table.Column> Order Id </Table.Column>
                <Table.Column> Customer Name </Table.Column>
                <Table.Column> Delivery Person </Table.Column>
                <Table.Column> Pickup Date </Table.Column>
            </Table.Header>
            <Table.Body>
                {dashboard?.upcoming_order.map((order, index) => (
                    <Table.Row key={index}>
                        <Table.Cell> {order.id} </Table.Cell>
                        <Table.Cell> {order.client_name} </Table.Cell>
                        <Table.Cell> {order.delivery_man_name} </Table.Cell>
                        <Table.Cell>
                            {" "}
                            {dayjs(order.pickup_point.date).format(
                                "DD-MM-YYYY; HH:mm:ss"
                            )}{" "}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

const RecentUser = ({ dashboard }) => {
    return (
        <Table>
            <Table.Header>
                <Table.Column> Order Id </Table.Column>
                <Table.Column> Name </Table.Column>
                <Table.Column> Email Id </Table.Column>
                <Table.Column> City </Table.Column>
            </Table.Header>
            <Table.Body>
                {dashboard?.recent_client.map((client, index) => (
                    <Table.Row key={index}>
                        <Table.Cell> {client.id} </Table.Cell>
                        <Table.Cell> {client.name} </Table.Cell>
                        <Table.Cell> {client.email} </Table.Cell>
                        <Table.Cell> {client.city_name} </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

const RecentDeliveryPerson = ({ dashboard }) => {
    return (
        <Table>
            <Table.Header>
                <Table.Column> Order Id </Table.Column>
                <Table.Column> Name </Table.Column>
                <Table.Column> Email Id </Table.Column>
                <Table.Column> City </Table.Column>
            </Table.Header>
            <Table.Body>
                {dashboard?.recent_delivery_man.map((client, index) => (
                    <Table.Row key={index}>
                        <Table.Cell> {client.id} </Table.Cell>
                        <Table.Cell> {client.name} </Table.Cell>
                        <Table.Cell> {client.email} </Table.Cell>
                        <Table.Cell> {client.city_name} </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};
