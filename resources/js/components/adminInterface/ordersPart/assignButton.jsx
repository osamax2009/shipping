import { Button } from "@nextui-org/react";
import { postWithAxios } from "../../api/axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

const AssignButton = ({ order, deliverManId, setOpen }) => {
    const { user, setUser } = useContext(UserContext);
    
    const handleAssignOrder = async () => {

        if (order?.status == "create"  || order?.status == "draft" ) {
           
            const dataToSend = {
                id: order?.id,
                type: "courier_assigned",
                delivery_man_id: deliverManId,
                status: "courier_assigned",
            };

           

            const res = await postWithAxios("/api/order-action", dataToSend);
            /* console.log("create", res); */

            setOpen(false);
            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });

            if (res.message == "Order has been assigned successfully.") {
            }

            // setOpen(false)
        }

        if (order?.status == "courier_assigned") {
            const dataToSend = {
                id: order?.id,
                type: "courier_assigned",
                delivery_man_id: deliverManId,
                status: "courier_assigned",
            };

            const res = await postWithAxios("/api/order-action", dataToSend);

            setOpen(false);
            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });

            // setOpen(false)
        }
    };
    return (
        <div>
            <Button auto color={"success"} onPress={handleAssignOrder}>
                {order?.status == "create" || order?.status == "draft"
                    ? "Assign Order"
                    : "Transfer Order"}
            </Button>
        </div>
    );
};

export default AssignButton;
