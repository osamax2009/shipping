import { Button, Image, Loading, Modal, Table } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { useEffect } from "react";
import { BsEye, BsEyeSlash, BsPencilFill, BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { PhoneInput } from "react-contact-number-input";

const Users = () => {
    const [users, setUsers] = useState();
    const [selected, setSelected] = useState();
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const handleOpenCreate = () => {
        setOpenCreate(true);
    };

    const getUsers = async () => {
        const res = await getWithAxios("/api/user-list");
        setUsers(res.data);
    };

    useEffect(() => {
        if (!openCreate && !openDelete && !openUpdate) {
            getUsers();
        }
    }, [openCreate, openDelete, openUpdate]);

    return (
        <div className="">
            <div className="font-bold py-4">Users</div>
            <div className="flex justify-end py-4">
                <Button color={"success"} onPress={handleOpenCreate}>
                    Add User
                </Button>
            </div>
            <div>
                {users ? (
                    <Table>
                        <Table.Header>
                            <Table.Column>Id</Table.Column>
                            <Table.Column> Name</Table.Column>
                            <Table.Column>Contact Number</Table.Column>
                            <Table.Column>Email</Table.Column>
                            <Table.Column>City</Table.Column>
                            <Table.Column>Country</Table.Column>
                            <Table.Column>Register Date</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column>Actions</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {users?.map((user, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell> {user.id} </Table.Cell>
                                    <Table.Cell>{user.name}</Table.Cell>
                                    <Table.Cell>
                                        {user.contact_number}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="truncate w-[170px]">
                                            {user.email}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell> {user.city_name} </Table.Cell>
                                    <Table.Cell>{user.country_name}</Table.Cell>
                                    <Table.Cell>
                                        {dayjs(user.created_at).format(
                                            "DD-MM-YYYY; HH:mm:ss"
                                        )}
                                    </Table.Cell>

                                    <Table.Cell>
                                        {user.status == 1 ? (
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
                                        <UserLine
                                            user={user}
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
                ) : (
                    <Loading type="points" />
                )}
            </div>
            <CreateModal open={openCreate} setOpen={setOpenCreate} />

            <UpdateModal
                oldUser={selected}
                open={openUpdate}
                setOpen={setOpenUpdate}
            />

            <DeleteModal
                user={selected}
                open={openDelete}
                setOpen={setOpenDelete}
            />
        </div>
    );
};

export default Users;

const UserLine = ({ user, setSelected, setOpenDelete, setOpenUpdate }) => {
    const handleOpenUpdate = () => {
        setOpenUpdate(true);
        setSelected(user);
    };

    const handleOpenDelete = () => {
        setOpenDelete(true);
        setSelected(user);
    };

    return (
        <div>
            <div className="flex gap-4 px-4">
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
    const [passType, setPassType] = useState("password");

    const [user, setUser] = useState({});

    const handlePassHidden = () => {
        passType == "password" ? setPassType("text") : setPassType("password");
    };

    const handleCreate = async () => {
        const dataToSend = {
            name: "test",
            username: "test",
            email: "test@demo.com",
            password: "12345678",
            user_type: "user",
            contact_number: "4564552664",
            country_id: "",
            city: "",
            address: "",
        };

        const res = await postWithAxios("/api/update-profile", document);

        if (res.message == "Client has been save successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message != "Client has been save successfully.") {
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
                <div className="text-lg font-bold text-appGreen">Add User</div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid w-full">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="form-group">
                            <label htmlFor=""> Email</label>
                            <input
                                type="text"
                                value={user?.email}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        email: e.target.value,
                                    })
                                }
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor=""> Username</label>
                            <input
                                type="text"
                                value={user?.username}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        username: e.target.value,
                                    })
                                }
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="grid  gap-4 md:grid-cols-2">
                        <div className="form-group">
                            <label htmlFor="">Name</label>
                            <input
                                type="text"
                                value={user?.name}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        name: e.target.value,
                                    })
                                }
                                className="form-control"
                            />
                        </div>
                        <div className="form-group relative">
                            <label htmlFor="">Password</label>
                            <div className="relative flex items-center">
                            <input
                                type={passType}
                                value={user?.name}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        password: e.target.value,
                                    })
                                }
                                className="form-control"
                            />
                            <div
                                onMouseDown={handlePassHidden}
                                className="absolute right-0 top-0 mt-3 mr-3 cursor-pointer"
                            >
                                {passType == "password" ? (
                                    <BsEyeSlash />
                                ) : (
                                    <BsEye />
                                )}
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="form-group">
                            <label className="px-2" htmlFor="">
                                Contact Number
                            </label>

                            <PhoneInput
                                countryCode={"ca"}
                                value={user?.contact_number}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        contact_number: e.phoneNumber,
                                    })
                                }
                                className="form-control"
                            />
                        </div>
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

const UpdateModal = ({ open, setOpen, oldUser }) => {
    const [user, setUser] = useState(oldUser);

    const handleCreate = async () => {
        const dataToSend = {
            id: user?.id,
            email: user?.email,
            name: user?.name,
            username: user?.username,
            contact_number: user?.contact_number,
        };
        const res = await postWithAxios("/api/update-profile", dataToSend);

        if (res.message == "updated successfully") {
            setOpen(false);
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message != "updated successfully") {
            setOpen(false);
            toast(res.message, {
                type: "error",
                hideProgressBar: true,
            });
        }
    };

    useEffect(() => {
        setUser(oldUser);
    }, [oldUser]);
    return (
        <Modal
            open={open}
            closeButton
            preventClose
            onClose={() => setOpen(false)}
        >
            <Modal.Header>
                <div className="text-lg font-bold text-appGreen">Add User</div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid w-full">
                    <div className="grid">
                        <div className="form-group">
                            <label htmlFor=""> Email</label>
                            <input
                                type="text"
                                value={user?.email}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        email: e.target.value,
                                    })
                                }
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor=""> Username</label>
                            <input
                                type="text"
                                value={user?.username}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        username: e.target.value,
                                    })
                                }
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            value={user?.name}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    name: e.target.value,
                                })
                            }
                            className="form-control"
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="form-group">
                            <label className="px-2" htmlFor="">
                                Contact Number
                            </label>

                            <input
                                type="text"
                                value={user?.contact_number}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        contact_number: e,
                                    })
                                }
                                className="form-control"
                            />
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
                            Update
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const DeleteModal = ({ user, open, setOpen }) => {
    const handleDelete = async () => {
        const dataToSend = {
            id: user.id,
        };

        const res = await postWithAxios("/api/delete-user", dataToSend);

        setOpen(false);

        console.log(res);

        toast(res.message, {
            type: "success",
            hideProgressBar: true,
        });
    };
    return (
        <Modal open={open} closeButton onClose={() => setOpen(false)}>
            <Modal.Header>
                <div className="text-lg font-bold text-appGreen">
                    Delete User
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="font-bold text-black">
                    Confirm, you want to delete user
                    <span className="text-red-300">
                        #{user?.id} from list of Users .
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
                            onPress={handleDelete}
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
