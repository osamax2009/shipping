import { Button, Image, Modal, Table } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { BsPencilFill, BsTrash } from "react-icons/bs";

const Document = () => {
    const [documents, setDocuments] = useState();
    const [selected, setSelected] = useState();
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const handleOpenCreate = () => {
        setOpenCreate(true);
    };

    const getDocuments = async () => {
        const res = await getWithAxios("/api/document-list");
        setDocuments(res.data);
    };

    useEffect(() => {
        if (!openCreate && !openDelete && !openUpdate) {
            getDocuments();
        }
    }, [openCreate, openDelete, openUpdate]);

    return (
        <div className="">
            <div className="font-bold py-4 text-appGreen text-lg">Document</div>

            <div className="flex justify-end py-4">
                <Button color={"success"} onPress={handleOpenCreate}>
                    Add Document
                </Button>
            </div>
            <div>
                <Table>
                    <Table.Header>
                        <Table.Column>Id</Table.Column>
                        <Table.Column>Name</Table.Column>
                        <Table.Column>Required</Table.Column>
                        <Table.Column>Created</Table.Column>
                        <Table.Column>Status</Table.Column>
                        <Table.Column>Actions</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {documents?.map((document, index) => (
                            <Table.Row key={index}>
                                <Table.Cell> {document.id} </Table.Cell>
                                <Table.Cell>{document.name}</Table.Cell>
                                <Table.Cell>
                                    {document.is_required == 1 ? "Yes" : "No"}
                                </Table.Cell>
                                <Table.Cell> {document.created_at} </Table.Cell>

                                <Table.Cell>
                                    {document.status == 1 ? (
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
                                    <DocumentLine
                                        document={document}
                                        setOpenUpdate={setOpenUpdate}
                                        setOpenDelete={setOpenDelete}
                                        setSelected={setSelected}
                                    />
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
            <CreateModal open={openCreate} setOpen={setOpenCreate} />
            <UpdateModal
                oldDocument={selected}
                open={openUpdate}
                setOpen={setOpenUpdate}
            />

            <DeleteModal
                document={selected}
                open={openDelete}
                setOpen={setOpenDelete}
            />
        </div>
    );
};

export default Document;

const DocumentLine = ({
    document,
    setSelected,
    setOpenDelete,
    setOpenUpdate,
}) => {
    const handleOpenUpdate = () => {
        setOpenUpdate(true);
        setSelected(document);
    };

    const handleOpenDelete = () => {
        setOpenDelete(true);
        setSelected(document);
    };

    return (
        <div>
            <div className="flex flex-wrap gap-4">
                <Button
                    auto
                    onPress={handleOpenUpdate}
                    color={"success"}
                    icon={<BsPencilFill />}
                ></Button>
                <Button
                    auto
                    onPress={handleOpenDelete}
                    color={"error"}
                    icon={<BsTrash />}
                ></Button>
            </div>
            <div></div>
        </div>
    );
};

const CreateModal = ({ open, setOpen }) => {
    const [document, setDocument] = useState({
        name: "",
        status: "1",
        is_required: 1,
    });

    const handleCreate = async () => {
        const res = await postWithAxios("/api/document-save", document);

        if (res.message == "Document has been save successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message != "Document has been save successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "error",
                hideProgressBar: true,
            });
        }
    };
    return (
        <Modal
            open={open}
            closeButton
            preventClose
            onClose={() => setOpen(false)}
        >
            <Modal.Header>
                <div className="text-lg font-bold text-appGreen">
                    Add Document
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid w-full">
                    <div className="form-group">
                        <label htmlFor=""> Name</label>
                        <input
                            type="text"
                            value={document?.name}
                            onChange={(e) =>
                                setDocument({
                                    ...document,
                                    name: e.target.value,
                                })
                            }
                            className="form-control"
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="form-group">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                value={document.is_required}
                                onChange={(e) =>
                                    setDocument({
                                        ...document,
                                        is_required: e.target.value,
                                    })
                                }
                            />
                            <label className="px-2" htmlFor="">
                                {" "}
                                Is required
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-wrap  w-full gap-6 justify-between sm:justify-end">
                        <Button
                            auto
                            css={{ backgroundColor: "Grey" }}
                            className="text-black"
                            onPress={() => setOpen(false)}
                        >
                            cancel
                        </Button>

                        <Button
                            auto
                            color={"success"}
                            onPress={handleCreate}
                            className="text-black"
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const UpdateModal = ({ open, setOpen, oldDocument }) => {
    const [document, setDocument] = useState(oldDocument);

    const handleCreate = async () => {
        const res = await postWithAxios("/api/document-save", document);

        if (res.message == "Document has been updated successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message != "Document has been updated successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "error",
                hideProgressBar: true,
            });
        }
    };

    useEffect(() => {
        setDocument(oldDocument);
    }, [oldDocument]);
    return (
        <Modal
            open={open}
            closeButton
            preventClose
            onClose={() => setOpen(false)}
        >
            <Modal.Header>
                <div className="text-lg font-bold text-appGreen">
                    Update Document
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid w-full">
                    <div className="form-group">
                        <label htmlFor=""> Name</label>
                        <input
                            type="text"
                            value={document?.name}
                            onChange={(e) =>
                                setDocument({
                                    ...document,
                                    name: e.target.value,
                                })
                            }
                            className="form-control"
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="form-group">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                defaultChecked={document?.is_required == 1 ? true : false}
                                value={document?.is_required == 1 ? 0 : 1}
                                onChange={(e) =>
                                    setDocument({
                                        ...document,
                                        is_required: e.target.value,
                                    })
                                }
                            />
                            <label htmlFor="" className="px-2">
                                {" "}
                                Is required
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-wrap  w-full gap-6 justify-between sm:justify-end">
                        <Button
                            auto
                            css={{ backgroundColor: "Grey" }}
                            className="text-black"
                            onPress={() => setOpen(false)}
                        >
                            cancel
                        </Button>

                        <Button
                            auto
                            color={"success"}
                            onPress={handleCreate}
                            className="text-black"
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const DeleteModal = ({ document, open, setOpen }) => {
    const handleDlete = async () => {
        const url = "/api/document-delete/" + document?.id;

        const res = await postWithAxios(url);
        setOpen(false);

        toast(res.message, {
            type: "success",
            hideProgressBar: true,
        });
    };
    return (
        <Modal open={open} closeButton onClose={() => setOpen(false)}>
            <Modal.Header>
                {" "}
                <div className="text-lg font-bold text-appGreen">
                    Delete DOcument
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="font-bold text-black">
                    Confirm, you want to delete document{" "}
                    <span className="text-red-300">
                        #{document?.id} from list of Documents .
                    </span>
                    <div className="flex flex-wrap  w-full gap-6 justify-between sm:justify-end">
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
                            color={"warning"}
                            onPress={handleDlete}
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
