import { useContext, useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { useEffect } from "react";
import { Button, Image, Modal, Table } from "@nextui-org/react";
import FileUploader from "../partials/fileUploader";
import { UserContext } from "../contexts/userContext";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const VerifyDocument = () => {
    const [deliveryDocuments, setDeliveryDocuments] = useState([]);
    const [userDocuments, setUserDocuments] = useState([]);
    const [document, setDocument] = useState({});
    const [openModal, setOpenModal] = useState(false);

    const { user, setUser } = useContext(UserContext);

    const getDocuments = async () => {
        const res = await getWithAxios("/api/document-list");
        setDeliveryDocuments(res.data);
    };

    const getUserDocuments = async () => {
        const data = {
            delivery_man_id: user?.id,
        };
        const res = await getWithAxios("/api/delivery-man-document-list", data);
        setUserDocuments(res.data);
    };

    useEffect(() => {
        if (!openModal) {
            getDocuments();
            getUserDocuments();
        }
    }, [openModal]);

    return (
        <div>
            <div className="flex gap-4">
                {deliveryDocuments?.map((doc, index) => (
                    <DocumentButton
                        doc={doc}
                        key={index}
                        documents={userDocuments}
                        setOpenModal={setOpenModal}
                        setDocument={setDocument}
                    />
                ))}
            </div>

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
                            {/*  <Table.Column>Actions</Table.Column> */}
                        </Table.Header>
                        <Table.Body>
                            {userDocuments?.map((userDocument, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {" "}
                                            #{userDocument.id}{" "}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {userDocument.delivery_man_name}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {userDocument.document_name}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            <div className="flex justify-start">
                                                <Image
                                                    src={
                                                        userDocument.delivery_man_document
                                                    }
                                                    width={80}
                                                    height={60}
                                                />
                                            </div>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {dayjs(
                                                userDocument.created_at
                                            ).format("DD-MM-YYYY; HH:mm:ss")}
                                        </div>
                                    </Table.Cell>

                                    {/*  <Table.Cell><div className="dark:text-white">
                                          <userDocumentLine userDocument={userDocument} />
                                    </div></Table.Cell> */}
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
            <DocumentModal
                document={document}
                setDocument={setDocument}
                open={openModal}
                setOpen={setOpenModal}
            />
        </div>
    );
};

export default VerifyDocument;

const DocumentButton = ({ doc, setOpenModal, setDocument, documents }) => {
    const handleDocumentUpload = () => {
        const arrayFiltered = documents?.filter((e) => {
            if (e.document_id == doc.id) {
                return e;
            }
        });

        if (arrayFiltered.length > 0) {
            setDocument({
                ...document,
                id: arrayFiltered[0].id,
                delivery_man_document: arrayFiltered[0].delivery_man_document,
                document_id: doc?.id,
                document_name: doc.name,
            });
        } else {
            setDocument({
                ...document,
                document_id: doc?.id,
                document_name: doc.name,
            });
        }

        setOpenModal(true);
    };

    /*  useEffect(() => {
    
    }, [doc]); */

    return (
        <Button color={"primary"} onPress={handleDocumentUpload}>
            Add {doc.name}
        </Button>
    );
};

const DocumentModal = ({ document, setDocument, open, setOpen }) => {
    const [files, setFiles] = useState([]);
    const { user, setUser } = useContext(UserContext);

    const uploadDocument = async () => {
        var data = new FormData();

        if (document?.id) {
            data.append("id", document?.id);
        }

        data.append("delivery_man_id", user?.id);
        data.append("document_id", document.document_id);
        data.append("is_verified", 0);
        data.append("status", "pending");

        if (files[0]) {
            data.append("delivery_man_document", files[0]);
        }

        if (files[0]) {
            const res = await postWithAxios(
                "/api/delivery-man-document-save",
                data
            );
            setOpen(false);
            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });

            setDocument({});
        } else {
            toast("Any file selected", {
                type: "error",
                hideProgressBar: true,
            });
        }
    };

    const handleClose = () => {
        setDocument({});
        setOpen(false);
    };

    return (
        <Modal open={open} onClose={handleClose} closeButton>
            <Modal.Header>
                <div className="text-lg font-bold">
                    Upload document {document?.id ? "id" : "no id"}{" "}
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="h-[65vh]">
                    <div className="form-group">
                        <input
                            type="text"
                            value={document?.document_name}
                            disabled
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Upload the File</label>
                        <FileUploader
                            files={files}
                            setFiles={setFiles}
                            oldFilePath={document?.delivery_man_document}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex flex-wrap w-full gap-6 justify-between sm:justify-end">
                    <Button
                        auto
                        css={{ backgroundColor: "Grey" }}
                        className="text-black"
                        onPress={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        auto
                        color={"primary"}
                        onPress={uploadDocument}
                        className="text-black"
                    >
                        Send
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};
