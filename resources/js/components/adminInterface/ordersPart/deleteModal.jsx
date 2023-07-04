import { Button, Modal } from "@nextui-org/react";
import { useState } from "react";
import { postWithAxios } from "../../api/axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const DeleteModal = ({ order, openDelete, setOpenDelete }) => {
    const [selected, setSelected] = useState(order);

    const deleteOrder = async () => {
        setOpenDelete(false);
        const url = "/api/order-delete/" + selected.id;
        const res = await postWithAxios(url);

        if (res.message) {
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }
    };

    useEffect(() => {
        setSelected(order);
    }, [order]);

    return (
        <Modal
            open={openDelete}
            closeButton
            onClose={() => setOpenDelete(false)}
        >
            <Modal.Header>
                {" "}
                <div className="text-lg font-bold text-red-800">
                    Delete order modal
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="font-bold text-black">
                    Confirm, you want to delete order{" "}
                    <span className="text-red-800">#{selected?.id} ?</span>
                    <div className="flex flex-wrap mt-4 w-full gap-6 justify-between sm:justify-end">
                        <Button
                            auto
                            css={{ backgroundColor: "Grey" }}
                            className="text-black"
                            onPress={() => setOpenDelete(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            auto
                            color={"error"}
                            onPress={deleteOrder}
                            className="text-black"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default DeleteModal