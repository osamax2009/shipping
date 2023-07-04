import { Avatar, Modal, Table } from "@nextui-org/react";
import { useEffect } from "react";
import { getWithAxios } from "../../api/axios";
import { useState } from "react";
import AssignButton from "./assignButton";

const UpdateModal = ({ order, open, setOpen }) => {
    const [delivers, setDelivers] = useState();
    const [deliverId, setDeliverId] = useState();

    const getDelivers = async () => {
        const dataToSend = {
            user_type: "delivery_man",
        };

        const res = await getWithAxios("/api/user-list", dataToSend);

        setDelivers(res.data);
        //  console.log(res.data);
    };

    useEffect(() => {
        getDelivers();
    }, []);

    return (
        <Modal
            open={open}
            closeButton
            preventClose
            width="70vw"
            onClose={() => setOpen(false)}
        >
            <Modal.Header>
                <div className="text-lg font-bold text-appGreen">
                    {order?.status == "create" || order?.status == "draft" 
                        ? "Assign order"
                        : "Transfer order"}
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="h-[80vh]">
                    <Table>
                        <Table.Header>
                            <Table.Column> Id </Table.Column>
                            <Table.Column>Delivery Person </Table.Column>
                            <Table.Column> City Name </Table.Column>
                            <Table.Column>Assign</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {delivers?.map((deliver, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>
                                        <div>#{deliver?.id}</div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div>{deliver.name}</div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div>{deliver?.city_name}</div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <AssignButton
                                            deliverManId={deliver.id}
                                            order={order}
                                            setOpen={setOpen}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateModal;
