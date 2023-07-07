import { Button, Image, Table, Modal, Loading } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { useEffect } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const DeliveryManDocument = () => {
    const [deliveryManDocuments, setDeliveryManDocuments] = useState();
    const [openCreate, setOpenCreate] = useState(false);
    const [openVerify, setOpenVerify] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState();

    const getDeliveryManDocuments = async () => {
        const res = await getWithAxios("/api/delivery-man-document-list");
        setDeliveryManDocuments(res.data);
    };

    useEffect(() => {
        if (!openCreate && !openVerify) {
            getDeliveryManDocuments();
        }
    }, [openCreate, openVerify]);

    return (
        <div className=" ">
            <div className="font-bold py-4">Delivery Man Documents</div>
            <div>
                {deliveryManDocuments ? (
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
                                            {
                                                deliveryManDocument.delivery_man_name
                                            }
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
                                                setOpenVerify={setOpenVerify}
                                                openVerify={openVerify}
                                                setSelectedDocument={
                                                    setSelectedDocument
                                                }
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
                ) : (
                    <Loading type="points" />
                )}
            </div>
        </div>
    );
};

export default DeliveryManDocument;

const DeliveryManDocumentLine = ({
    document,
    setOpenVerify,
    openVerify,
    setSelectedDocument,
}) => {
    const [doc, setDoc] = useState();
    const { user, setUser } = useContext(UserContext);
    const [status, setStatus] = useState();

    const handleStatus = async (e) => {
        setOpenVerify("processing");
        setStatus(e.target.value);

        const data = {
            id: doc?.id,
            status: e.target.value,
            is_verified: 1,
            // delivery_man_id: user?.id,
        };

        const res = await postWithAxios(
            "/api/delivery-man-document-save",
            data
        );

        toast(res.message, {
            type: "info",
            hideProgressBar: true,
        });

        setOpenVerify(false);
    };

    const verifyDocument = async () => {
        setOpenVerify("processing");
        const value = "approved";
        const data = {
            id: document?.id,
            status: value,
            is_verified: 1,
            //  delivery_man_id: user?.id,
        };

        const res = await postWithAxios(
            "/api/delivery-man-document-save",
            data
        );

        toast(res.message, {
            type: "info",
            hideProgressBar: true,
        });

        setOpenVerify(false);
    };

    useEffect(() => {
        setDoc(document);
        setStatus(document?.status);
        //  console.log(document);
    }, [document, openVerify]);

    return (
        <div className="flex gap-4">
            <select
                name=""
                id=""
                className="form-control w-full"
                value={status}
                onChange={handleStatus}
            >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">rejected</option>
            </select>

            {document?.status == "approved" ? (
                <Button auto color={"success"}>
                    <div className="font-bold">verified</div>
                </Button>
            ) : document?.status == "rejected" ? (
                <Button auto color={"error"}>
                    <div className="font-bold">rejected</div>
                </Button>
            ) : (
                <Button auto color={"secondary"} onPress={verifyDocument}>
                    <div className="font-bold">verify</div>
                </Button>
            )}
        </div>
    );
};

const VerifyModal = ({ document, open, setOpen }) => {
    const { user, setUser } = useContext(UserContext);

    const verifyDocument = async () => {
        const value = "approved";
        const data = {
            id: document?.id,
            status: value,
            is_verified: 1,
            //  delivery_man_id: user?.id,
        };

        const res = await postWithAxios(
            "/api/delivery-man-document-save",
            data
        );

        toast(res.message, {
            type: "info",
            hideProgressBar: true,
        });

        setOpen(false);
    };

    return (
        <Modal>
            <Modal.Header>
                {" "}
                <div className="text-lg font-bold text-appGreen">
                    Verify Document ?
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="text-black">
                    Do you want to verify this document ?
                    <div className="flex flex-wrap  w-full gap-6 justify-between sm:justify-end">
                        <Button
                            auto
                            css={{ backgroundColor: "Grey" }}
                            className="text-black"
                            onPress={() => setOpen(false)}
                        >
                            No
                        </Button>

                        <Button
                            auto
                            color={"secondary"}
                            onPress={verifyDocument}
                            className="text-black"
                        >
                            Yes{" "}
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};
