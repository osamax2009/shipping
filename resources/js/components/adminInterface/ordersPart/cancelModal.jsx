import { Button, Modal } from "@nextui-org/react";
import { useContext, useState } from "react";
import { postWithAxios } from "../../api/axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { UserContext } from "../../contexts/userContext";

const CancelModal = ({ order, openCancel, setOpenCancel }) => {
    const [selected, setSelected] = useState(order);
    const [reason, setReason] = useState();
    const {user, setUser} = useContext(UserContext)

    const handleCancelOrder = async () => {

        if (order?.status == "active") {
           
            const dataToSend = {
                status: "cancelled",
                delivery_man_id : user?.id,
                cancelled_delivery_man_ids : [user?.id],
                reason : reason

            };

            const url = "/api/order-update/" + order?.id

            const res = await postWithAxios(url, dataToSend);

            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });

            setOpenCancel(false)
        }
    };


    useEffect(() => {
        setSelected(order);
    }, [order]);

    return (
        <Modal
            open={openCancel}
            closeButton
            onClose={() => setOpenCancel(false)}
        >
            <Modal.Header>
                {" "}
                <div className="text-lg font-bold text-red-800">
                    Cancel Order
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid gap-4">
                    <div className="font-bold text-black">
                        Confirm, you want to cancel order{" "}
                        <span className="text-red-800">#{selected?.id} ?</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Cancel reason</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={2}
                            className="form-control resize-none"
                        ></textarea>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex flex-wrap mt-4 w-full gap-6 justify-between sm:justify-end">
                    <Button
                        auto
                        css={{ backgroundColor: "Grey" }}
                        className="text-black"
                        onPress={() => setOpenCancel(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        auto
                        color={"error"}
                        onPress={handleCancelOrder}
                        className="text-black"
                    >
                        Send
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default CancelModal;
