import { Button, Image, Table } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { useEffect } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const DeliveryManDocument = () => {
    const [deliveryManDocuments, setDeliveryManDocuments] = useState();
    const [openCreate, setOpenCreate] = useState();

    const getDeliveryManDocuments = async () => {
        const res = await getWithAxios("/api/delivery-man-document-list");
        setDeliveryManDocuments(res.data);
        console.log(res.data);
    };

    useEffect(() => {
        if (!openCreate) {
            getDeliveryManDocuments();
        }
    }, [openCreate]);

    return (
        <div className=" ">
            <div className="font-bold py-4">Delivery Man Documents</div>
            <div>
                <Table>
                    <Table.Header>
                        <Table.Column>Id</Table.Column>
                        <Table.Column>Delivery Person Name</Table.Column>
                        <Table.Column>Document Name</Table.Column>
                        <Table.Column>Document</Table.Column>
                        <Table.Column>Created</Table.Column>
                        <Table.Column>Actions</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {deliveryManDocuments?.map(
                            (deliveryManDocument, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>
                                        {" "}
                                        #{deliveryManDocument.id}{" "}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {deliveryManDocument.delivery_man_name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {deliveryManDocument.document_name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {" "}
                                        <Image
                                            src={
                                                deliveryManDocument.delivery_man_document
                                            }
                                            width={80}
                                            height={60}
                                        />
                                    </Table.Cell>

                                    <Table.Cell>
                                        {dayjs(
                                            deliveryManDocument.created_at
                                        ).format("DD-MM-YYYY; HH:mm:ss")}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <DeliveryManDocumentLine
                                            document={deliveryManDocument}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            )
                        )}
                    </Table.Body>
                    <Table.Pagination
                        shadow
                        noMargin
                        align="center"
                        rowsPerPage={6}
                        onPageChange={(page) => console.log({ page })}
                    />
                </Table>
            </div>
        </div>
    );
};

export default DeliveryManDocument;

const DeliveryManDocumentLine = ({ document }) => {
    const [doc, setDoc] = useState();
    const {user, setUser} = useContext(UserContext)

    const handleStatus = async () => {
        setDoc({ ...doc, status: e.target.value });

        const data = {
            id : doc?.id,
            status : doc?.status,
            is_verified : 1,
            delivery_man_id : user?.id

        }

        const res = await postWithAxios("/api/delivery-man-document-save", data);

        toast(res.message, {
            type: "info",
            hideProgressBar: true,
        });
    };

    useEffect(() => {
        setDoc(document);
        console.log(doc)
    }, [document]);

    return (
        <div className="flex gap-4">
            <select
                name=""
                id=""
                className="form-control w-fit"
                value={doc?.status}
                onChange={handleStatus}
            >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">rejected</option>
            </select>

            <Button auto color={"secondary"} >
               <div className="font-bold">
               verify
               </div>
            </Button>
        </div>
    );
};
