import { useEffect, useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { Button, Loading, Modal, Table } from "@nextui-org/react";
import { BsPencilFill, BsTrash } from "react-icons/bs";

import { toast } from "react-toastify";
import dayjs from "dayjs";

const ParcelTypes = () => {
    const [parcelTypes, setParcelTypes] = useState();
    const [selectedParcel, setSelectedParcel] = useState();
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const getParcelTypes = async () => {
        const res = await getWithAxios("/api/staticdata-list?type=parcel_type");
        setParcelTypes(res.data);
    };

    const handleOpenCreate = () => {
        setOpenCreate(true);
    };

    useEffect(() => {
        if (!openCreate && !openUpdate && !openDelete) {
            getParcelTypes();
        }
    }, [openCreate, openUpdate, openDelete]);

    return (
        <div>
            <div className="flex justify-end py-4">
                <Button color={"success"} onPress={handleOpenCreate}>
                    Add Parcel Type
                </Button>
            </div>
            {parcelTypes ? (
                <Table>
                    <Table.Header>
                        <Table.Column>Id</Table.Column>
                        <Table.Column>Label</Table.Column>
                        <Table.Column>Value</Table.Column>
                        <Table.Column>Created</Table.Column>
                        <Table.Column>Actions</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {parcelTypes?.map((parcel, index) => (
                            <Table.Row key={index}>
                                <Table.Cell> {parcel?.id} </Table.Cell>
                                <Table.Cell>{parcel?.label}</Table.Cell>
                                <Table.Cell> {parcel?.value} </Table.Cell>
                                <Table.Cell>
                                    {dayjs(parcel?.created_at).format(
                                        "DD-MM-YYYY; HH:mm:ss"
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <ParcelLine
                                        parcel={parcel}
                                        setSelectedParcel={setSelectedParcel}
                                        setOpenUpdate={setOpenUpdate}
                                        setOpenDelete={setOpenDelete}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                    <Table.Pagination
                        shadow
                        noMargin
                        align="center"
                        rowsPerPage={8}
                        onPageChange={(page) => console.log({ page })}
                    />
                </Table>
            ) : (
                <Loading type="points" />
            )}

            <CreateModal open={openCreate} setOpen={setOpenCreate} />
            <UpdateModal
                parcel={selectedParcel}
                open={openUpdate}
                setOpen={setOpenUpdate}
            />
            <DeleteModal
                parcel={selectedParcel}
                open={openDelete}
                setOpen={setOpenDelete}
            />
        </div>
    );
};
export default ParcelTypes;

const ParcelLine = ({
    parcel,
    setSelectedParcel,
    setOpenUpdate,
    setOpenDelete,
}) => {
    const handleOpenUpdate = () => {
        setSelectedParcel(parcel);
        setOpenUpdate(true);
    };

    const handleOpenDelete = () => {
        setSelectedParcel(parcel);
        setOpenDelete(true);
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2">
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
    const [parcelLabel, setParcelLabel] = useState("");

    const handleCreate = async () => {
        const dataToSend = {
            id: "",
            type: "parcel_type",
            label: parcelLabel,
        };

        const res = await postWithAxios("/api/staticdata-save", dataToSend);

        if (res.message == "Static Data has been save successfully.") {
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message !== "Static Data has been save successfully.") {
            toast(res.message, {
                type: "error",
                hideProgressBar: true,
            });
        }

        setOpen(false);
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
                    Create new parcel type{" "}
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid w-full">
                    <div className="form-group w-full ">
                        <label htmlFor="parcel name">Parcel Label</label>
                        <input
                            type="text"
                            className="form-control w-full"
                            value={parcelLabel}
                            onChange={(e) => setParcelLabel(e.target.value)}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
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
            </Modal.Footer>
        </Modal>
    );
};

const UpdateModal = ({ parcel, open, setOpen }) => {
    const [parcelLabel, setParcelLabel] = useState(parcel?.value);

    const handleCreate = async () => {
        const dataToSend = {
            id: parcel?.id,
            type: "parcel_type",
            label: parcelLabel,
        };

        const res = await postWithAxios("/api/staticdata-save", dataToSend);

        if (res.message == "Static Data has been updated successfully.") {
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message !== "Static Data has been updated successfully.") {
            toast(res.message, {
                type: "error",
                hideProgressBar: true,
            });
        }

        setOpen(false);
    };

    useEffect(() => {
        setParcelLabel(parcel?.label);
    }, [parcel]);

    return (
        <Modal
            open={open}
            closeButton
            preventClose
            onClose={() => setOpen(false)}
        >
            <Modal.Header>
                <div className="text-lg font-bold text-appGreen">
                    Update parcel type{" "}
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid w-full">
                    <div className="form-group w-full ">
                        <label htmlFor="parcel name">Parcel Label</label>
                        <input
                            type="text"
                            className="form-control w-full"
                            value={parcelLabel}
                            onChange={(e) => setParcelLabel(e.target.value)}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex flex-wrap w-full gap-6 justify-end">
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
                        Update
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

const DeleteModal = ({ parcel, open, setOpen }) => {
    const deleteParcel = async () => {
        const url = "/api/staticdata-delete/" + parcel?.id;

        const res = await postWithAxios(url);

        if (res.message) {
            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });

            setOpen(false);
        }
    };

    return (
        <Modal open={open} closeButton onClose={() => setOpen(false)}>
            <Modal.Header>
                {" "}
                <div className="text-lg font-bold text-appGreen">
                    Delete parcel modal
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="font-bold text-black">
                    Confirm, you want to delete parcel{" "}
                    <span className="text-red-300">
                        {parcel?.label} from list of ParcelTypes .
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
                            onPress={deleteParcel}
                            color={"warning"}
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
