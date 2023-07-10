import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getWithAxios } from "../../api/axios";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MonthOrderCount = () => {
    const [dashboard, setDashboard] = useState();

    const getDashboard = async () => {
        const res = await getWithAxios("/api/dashboard-detail");
        setDashboard(res);
    };

    useEffect(() => {
        getDashboard();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: false,
                text: "Chart.js Bar Chart",
            },
        },
    };

    const barLabels = dashboard?.monthly_order_count.map((e) => e.date);
    const barvalues = dashboard?.monthly_order_count.map((e) => e.total);
    const barData = {
        labels: barLabels,
        datasets: [
            {
                label: "Monthly Order Count",
                data: barvalues,
                backgroundColor: [
                    "rgb(0,0,128)",
                    "rgb(54, 162, 235)",
                    "rgb(139,0,139)",
                    "rgb(255, 99, 132)",
                    "rgb(47,79,79)",
                    "rgb(72,61,139)",
                    "rgb(25, 205, 86)",
                ],
                //  hoverOffset: 4,
            },
        ],
    };

    return (
        <div className=" relative w-11/12 h-11/12 p-4 border-2 rounded-xl  ">
            <div className="flex w-full justify-between">
                <div className="text-lg font-bold py-4">
                    {" "}
                    Monthly Order Count{" "}
                </div>
                <div>
                    {/* <DateCalendar
                       // defaultValue={dayjs("now")}
                        views={["month", "year"]}
                       // openTo="month"
                    /> */}
                </div>
            </div>
            {barData ? <Bar options={options} data={barData} /> : null}
        </div>
    );
};

export default MonthOrderCount;
