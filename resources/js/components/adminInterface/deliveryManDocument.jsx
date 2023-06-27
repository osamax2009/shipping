
import { Image, Table } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios } from "../api/axios";
import { useEffect } from "react";

const DeliveryManDocument = () => {
    const [deliveryManDocuments, setDeliveryManDocuments] = useState();
    const [openCreate, setOpenCreate] = useState();

    const getDeliveryManDocuments = async () => {
        const res = await getWithAxios("/api/delivery-man-document-list");
        setDeliveryManDocuments(res.data);
        console.log(res.data)
        
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
                        <Table.Column>DeliveryManDocument Method</Table.Column>
                        <Table.Column>Image</Table.Column>
                        <Table.Column>Mode</Table.Column>
                        <Table.Column>Status</Table.Column>
                        <Table.Column>Actions</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {deliveryManDocuments?.map((deliveryManDocument, index) => (
                            <Table.Row key={index}>
                                <Table.Cell> {deliveryManDocument.id} </Table.Cell>
                                <Table.Cell>{DeliveryManDocument.type == "stripe"  ? "Visa/Master Card" : null}</Table.Cell>
                                <Table.Cell>
                                    <Image
                                        src={DeliveryManDocument.gateway_logo}
                                        width={80}
                                        height={60}
                                    />
                                </Table.Cell>
                                <Table.Cell> {deliveryManDocument.is_test == 1 ? "Test" : "live"} </Table.Cell>

                                <Table.Cell>
                                    {deliveryManDocument.status == 1 ? (
                                        <span className="text-green-700">
                                            Enabled
                                        </span>
                                    ) : (
                                        <span className="text-red-700">
                                            Disabled
                                        </span>
                                    )}
                                </Table.Cell>

                                <Table.Cell>
                                    {/*  <DeliveryManDocumentLine deliveryManDocument={deliveryManDocument} /> */}
                                </Table.Cell>
                            </Table.Row>
                        ))}
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
