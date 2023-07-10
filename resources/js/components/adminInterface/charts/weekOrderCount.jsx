import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { getWithAxios } from "../../api/axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";



ChartJS.register(ArcElement, Tooltip, Legend);

const CustomPieChart = () => {

    const [dashboard, setDashboard] = useState();
  

    const getDashboard = async () => {
        const res = await getWithAxios("/api/dashboard-detail");
        setDashboard(res);
    };

    useEffect(() => {
        getDashboard();
    }, []);

  
    const pieLabels = dashboard?.weekly_order_count.map((e) => e.day);
    const pievalues = dashboard?.weekly_order_count.map((e) => e.total);
    const pieData = {
        labels: pieLabels,
        datasets: [
            {
                label: "Weekly Order Count",
                data: pievalues,
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
            <div className="text-lg font-bold py-4 text-center"> Weekly Order Count </div>
            {pieData ? <Pie data={pieData} /> : null}
        </div>
    );
};


export default CustomPieChart