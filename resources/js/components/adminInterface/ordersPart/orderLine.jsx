import { Button } from "@nextui-org/react";
import { BsEye, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


const OrderLine = ({ order, setOpenDelete, setSelectedOrder }) => {
    const navigate = useNavigate();
    const handleOpenDelete = () => {
        setSelectedOrder(order);
        setOpenDelete(true);
    };

    const handleOpenDetails = () => {
        const url = "/admin/orderdetail/order_Id/" + order?.id;
        navigate(url);
    };

    return (
        <div className="flex flex-wrap gap-4">
            <Button
                auto
                onPress={handleOpenDetails}
                color={"success"}
                icon={<BsEye />}
            ></Button>

            <Button
                auto
                onPress={handleOpenDelete}
                color={"error"}
                icon={<BsTrash />}
            ></Button>
        </div>
    );
};

export default OrderLine