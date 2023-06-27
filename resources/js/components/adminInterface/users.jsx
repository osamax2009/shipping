
import { Image, Table } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios } from "../api/axios";
import { useEffect } from "react";

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
            <div className="font-bold py-4">Delivery Man Documents</div>
            <div className="flex justify-end py-4">
                <Button color={"success"} onPress={handleOpenCreate}>
                    Add Document
                </Button>
            </div>
            <div>
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
                                <Table.Cell> {user.email} </Table.Cell>
                                <Table.Cell> {user.city_name} </Table.Cell>
                                <Table.Cell> {user.country_name} </Table.Cell>
                                <Table.Cell> {user.created_at} </Table.Cell>

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
            </div>
        </div>
    );
};

export default Users;

const UserLine = ({
    user,
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