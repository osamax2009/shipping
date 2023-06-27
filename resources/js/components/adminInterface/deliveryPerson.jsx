import { Button, Image, Table } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios } from "../api/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeliveryPerson = () => {
    const [users, setUsers] = useState();
    const [openCreate, setOpenCreate] = useState();

    const getUsers = async () => {
        const res = await getWithAxios("/api/user-list?user_type=delivery_man");
        console.log(res.data);
        setUsers(res.data);
    };

    useEffect(() => {
        if (!openCreate) {
            getUsers();
        }
    }, [openCreate]);

    return (
        <div className="">
            <div className="font-bold py-4">Delivery Person</div>
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
                                <Table.Cell>{user.contact_number}</Table.Cell>
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
                                    <UserLine user={user} />
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
