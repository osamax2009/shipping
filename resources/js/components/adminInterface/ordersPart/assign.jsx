import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { getWithAxios, postWithAxios } from "../../api/axios";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/react";

const Assign = ({ order, setSelectedOrder, setOpenUpdate, setOpenCancel }) => {
    const { user, setUser } = useContext(UserContext);

    const handleStatus = async () => {
        setOpenUpdate(true);
        setSelectedOrder(order);
    };

    const handleActiveOrder = async() => {
        if (order?.status == "courier_assigned") {
           
            const dataToSend = {
                status: "active",
            };
            const url = "/api/order-update/" + order?.id

            const res = await postWithAxios(url, dataToSend);

          //  setOpen(false);
            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });


            setOpenUpdate("null")
            setOpenUpdate(false)
        }
    }

    const handlePickUpOrder = async () => {

        if (order?.status == "active") {
           
            const dataToSend = {
                id: order?.id,
                type: "courier_pick_up",
                status: "courier_pick_up",
            };

            const res = await postWithAxios("/api/order-action", dataToSend);
            console.log(res)

            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });

          

            setOpenUpdate("null")
            setOpenUpdate(false)
        }
    }

    const handleDepartedOrder = async () => {
        if (order?.status == "courier_assigned") {
           
            const dataToSend = {
                id: order?.id,
                type: "courier_departed",
                status: "courier_departed",
            };

            const res = await postWithAxios("/api/order-action", dataToSend);

            setOpen(false);
            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });

          

             setOpen(false)
        }
    }

    const handleAutoAssign = async () => {
        const dataToSeend = {
            id: order?.id,
            cancelled_delivery_man_ids: [],
        };

        const res = await postWithAxios("/api/order-auto-assign", dataToSeend);

        if (res.message == "Order has been assigned successfully.") {
            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });
        }
    };

    const handleCancelModal = () => {
        setOpenCancel(true)
        setSelectedOrder(order)
    }
   

    return (
        <div>
            {user?.user_type == "admin" ? (
                order?.status == "draft" ? (
                    <Button
                        auto
                        onPress={handleStatus}
                        color={"success"}
                        className="mx-6"
                    >
                        Assign
                    </Button>
                ) : order?.status == "create" ? (
                    <Button
                        auto
                        onPress={handleStatus}
                        color={"success"}
                        className="mx-6"
                    >
                        {" "}
                        Assign
                    </Button>
                ) : order?.status == "cancelled" ? (
                    <div className="font-bold text-red-600 ">
                        Order cancelled
                    </div>
                ) : (
                    <Button
                        auto
                        onPress={handleStatus}
                        color={"secondary"}
                        className="mx-6"
                    >
                        {" "}
                        Transfer
                    </Button>
                )
            ) : null}

            {user?.user_type == "delivery_man" ? (
                order?.status == "draft" ? (
                    <div className="font-bold text-orange-600 ">Created</div>
                ) : order?.status == "create" ? (
                    <Button
                        auto
                        onPress={handleAutoAssign}
                        color={"secondary"}
                        className="mx-6"
                    >
                        {" "}
                        Assign
                    </Button>
                ) : order?.status == "courier_assigned" ? (
                    <div className="grid gap-3">
                        <Button
                            auto
                            onPress={handleActiveOrder}
                            color={"primary"}
                            className="mx-6"
                        >
                            {" "}
                                Active
                        </Button>
                    </div>
                ) :  order?.status == "courier_departed" ? (
                    <Button
                        auto
                        onPress={handleStatus}
                        color={"success"}
                        className="mx-6"
                    >
                        {" "}
                        Arrived
                    </Button>
                ) : order?.status == "active" ? (
                    <div className="flex flex-col gap-4">
                        <Button
                        auto
                        onPress={handlePickUpOrder}
                        color={"success"}
                        className="mx-6"
                    >
                        {" "}
                        Pick Up
                    </Button>

                    <Button
                        auto
                        onPress={handleCancelModal}
                        color={"error"}
                        className="mx-6"
                    >
                        {" "}
                        Cancel
                    </Button>
                    </div>
                ) : order?.status == "courier_arrived" ? (
                    <Button
                        auto
                        onPress={handleStatus}
                        color={"success"}
                        className="mx-6"
                    >
                        {" "}
                        Delivered
                    </Button>
                ) : order?.status == "courier_delivered" ? (
                    <div className="font-bold text-gray-600 ">Delivered*</div>
                ) : order?.status == "cancelled" ? (
                    <div className="text-red-600 py-2 px-4 font-bold text-center">Order cancelled</div>
                ) :                    <div className="text-red-600 py-2 px-4 font-bold text-center"> {order?.status} </div>

            ) : null}

            <div></div>
        </div>
    );
};

export default Assign