import { Button } from "@nextui-org/react";
import { useContext } from "react";
import { BsEye, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

const OrderLine = ({ order, setOpenDelete, setSelectedOrder }) => {
    const navigate = useNavigate();
    const handleOpenDelete = () => {
        setSelectedOrder(order);
        setOpenDelete(true);
        const { user, setUser } = useContext(UserContext);
    };

    const handleOpenDetails = () => {
        const url =
            "/" + user?.user_type + "/orderdetail/order_Id/" + order?.id;
        navigate(url);
    };

    return (
        <div className="flex gap-4">
            <Button
                auto
                onPress={handleOpenDetails}
                color={"success"}
                icon={<BsEye />}
            ></Button>

            {user?.user_type == "admin" && (
                <Button
                    auto
                    onPress={handleOpenDelete}
                    color={"error"}
                    icon={<BsTrash />}
                ></Button>
            )}
        </div>
    );
};

export default OrderLine;
