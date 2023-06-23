import { useEffect, useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { Button, Modal, Table } from "@nextui-org/react";
import { BsPencilFill, BsTrash } from "react-icons/bs";

import { toast } from "react-toastify";

const ParcelTypes = () => {
    const [parcelTypes, setParcelTypes] = useState();
    const [openCreate, setOpenCreate] = useState(false);

    const getParcelTypes = async () => {
        const res = await getWithAxios("/api/staticdata-list?type=parcel_type");
        setParcelTypes(res.data);
    };

    const handleOpenCreate = () => {
        setOpenCreate(true);
    };

    useEffect(() => {
        getParcelTypes();
    }, []);

    return (
        <div>
            <div className="flex justify-end py-4">
                <Button color={"success"} onPress={handleOpenCreate}>
                    new Parcel Type
                </Button>
            </div>
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
                            <Table.Cell> {parcel.id} </Table.Cell>
                            <Table.Cell>{parcel.label}</Table.Cell>
                            <Table.Cell> {parcel.value} </Table.Cell>
                            <Table.Cell>{parcel.created_at}</Table.Cell>
                            <Table.Cell>
                                <ParcelLine parcel={parcel} />
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

            <CreateModal open={openCreate} setOpen={setOpenCreate} />
        </div>
    );
};
export default ParcelTypes;

const ParcelLine = ({ parcel }) => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleOpenUpdate = () => {
        setOpenUpdate(true);
    };

    const handleOpenDelete = () => {
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
            <div>
                <UpdateModal
                    parcel={parcel}
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                />
                <DeleteModal
                    parcel={parcel}
                    open={openDelete}
                    setOpen={setOpenDelete}
                />
            </div>
        </div>
    );
};

const CreateModal = ({ open, setOpen }) => {
    const [parcelValue, setParcelValue] = useState("");
    const [parcelLabel, setParcelLabel] = useState("");

    const handleCreate = async () => {
        const dataToSend = {
            id: "",
            type: "parcel_type",
            label: parcelLabel,
            value: parcelValue,
        };

        const res = await postWithAxios("/api/staticdata-save", dataToSend);
        
        if (res.message == "Static Data has been save successfully") {
            setOpen(false);
            window.location.reload();
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message !== "Static Data has been save successfully") {
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
                    Create new parcel type{" "}
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid w-full h-72">
                    <div className="form-group w-full ">
                        <label htmlFor="parcel name">Parcel Label</label>
                        <input
                            type="text"
                            className="form-control w-full"
                            value={parcelLabel}
                            onChange={(e) => setParcelLabel(e.target.value)}
                        />
                    </div>
                    <div className="form-group w-full">
                        <label htmlFor=""> Value</label>
                        <input
                            type="text"
                            className="form-control w-full"
                            value={parcelValue}
                            onChange={(e) => setParcelValue(e.target.value)}
                        />
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

const UpdateModal = ({ parcel, open, setOpen }) => {
    const [parcelValue, setParcelValue] = useState(parcel.value);
    const [parcelLabel, setParcelLabel] = useState(parcel.label);

    const handleCreate = async () => {
        const dataToSend = {
            id: parcel.id,
            type: "parcel_type",
            label: parcelLabel,
            value: parcelValue,
        };

        const res = await postWithAxios("/api/staticdata-save", dataToSend);
        
        if (res.message == "Static Data has been save successfully") {
            setOpen(false);
            window.location.reload();
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message !== "Static Data has been save successfully") {
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
                    Update parcel type{" "}
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid w-full h-72">
                    <div className="form-group w-full ">
                        <label htmlFor="parcel name">Parcel Label</label>
                        <input
                            type="text"
                            className="form-control w-full"
                            value={parcelLabel}
                            onChange={(e) => setParcelLabel(e.target.value)}
                        />
                    </div>
                    <div className="form-group w-full">
                        <label htmlFor=""> Value</label>
                        <input
                            type="text"
                            className="form-control w-full"
                            value={parcelValue}
                            onChange={(e) => setParcelValue(e.target.value)}
                        />
                    </div>

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
                </div>
            </Modal.Body>
        </Modal>
    );
};

const DeleteModal = ({ parcel, open, setOpen }) => {
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
                        {parcel.name} from list of ParcelTypes .
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

                        <Button auto color={"warning"} className="text-black">
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};