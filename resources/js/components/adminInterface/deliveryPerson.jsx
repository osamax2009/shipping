import { Button, Image, Loading, Modal, Table } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const DeliveryPerson = () => {
    const [users, setUsers] = useState();
    const [openCreate, setOpenCreate] = useState();
    const [openStatus, setOpenStatus] = useState(false);
    const [selectedUser, setSelectedUser] = useState();

    const getUsers = async () => {
        const res = await getWithAxios("/api/user-list?user_type=delivery_man");
        setUsers(res.data);
    };

    useEffect(() => {
        if (!openCreate && !openStatus) {
            getUsers();
        }
    }, [openCreate, openStatus]);

    return (
        <div className="">
            <div className="font-bold py-4">Delivery Person</div>
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
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {" "}
                                            {user.id}{" "}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {user.name}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {user.contact_number}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {" "}
                                            <div className="truncate w-[190px]">
                                                {user.email}
                                            </div>{" "}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {" "}
                                            {user.city_name}{" "}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {" "}
                                            {user.country_name}{" "}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {" "}
                                            {dayjs(user.created_at).format(
                                                "DD-MM-YYYY; HH:mm:ss"
                                            )}{" "}
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            <Status
                                                user={user}
                                                setOpen={setOpenStatus}
                                                setSelectedUser={
                                                    setSelectedUser
                                                }
                                            />
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            <UserLine user={user} />
                                        </div>
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
            <StatusModal
                open={openStatus}
                setOpen={setOpenStatus}
                user={selectedUser}
            />
        </div>
    );
};

export default DeliveryPerson;

const UserLine = ({ user }) => {
    const navigate = useNavigate();

    const verifyDeliverPerson = () => {
        const url =
            "/admin/deliverypersondocuments/delivery_man_id/" + user?.id;
        navigate(url);
    };
    return (
        <div>
            {user?.is_verified_delivery_man == 1 ? (
                <div className="text-green-700">verified</div>
            ) : (
                <Button color={"success"} auto onPress={verifyDeliverPerson}>
                    <div className="font-bold">verify</div>
                </Button>
            )}
        </div>
    );
};

const Status = ({ setSelectedUser, setOpen, user }) => {
    const handleModal = () => {
        setSelectedUser(user);
        setOpen(true);
    };
    return (
        <div>
            {user?.status == 1 ? (
                <button onClick={handleModal}>
                    <div className="text-blue-500">Enable</div>
                </button>
            ) : (
                <button onClick={handleModal}>
                    <div className="text-red-500">Disable</div>
                </button>
            )}
        </div>
    );
};

const StatusModal = ({ open, setOpen, user }) => {
    const handleStatus = async () => {
        const dataToSend = {
            id: user?.id,
            status: user?.status == 1 ? 0 : 1,
        };

        const res = await postWithAxios("/api/update-user-status", dataToSend);
        if (res) {
            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });
        }

        setOpen(false);
    };

    return (
        <Modal open={open} closeButton onClose={() => setOpen(false)}>
            <Modal.Header>
                <div className="text-lg">
                    {user?.status == 1
                        ? "Disable Delivery Person ?"
                        : "Enable  Delivery Person ?"}
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    Do you want to {user?.status == 1 ? "disable" : "enable"}{" "}
                    this Delivery Person ?
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
                        No
                    </Button>

                    <Button
                        auto
                        color={"error"}
                        onPress={handleStatus}
                        className="text-black"
                    >
                        Yes
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};
