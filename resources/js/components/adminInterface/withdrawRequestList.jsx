import { Image, Loading, Table } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios } from "../api/axios";
import { useEffect } from "react";
import dayjs from "dayjs";

const WithdrawRequest = () => {
    const [withdrawRequests, setWithdrawRequests] = useState();
    const [openCreate, setOpenCreate] = useState();

    const getWithdrawRequests = async () => {
        const res = await getWithAxios("/api/withdrawrequest-list");

        setWithdrawRequests(res.data);
    };

    useEffect(() => {
        if (!openCreate) {
            getWithdrawRequests();
        }
    }, [openCreate]);

    return (
        <div className="">
            <div className="font-bold py-4">Withdraw Requests</div>
            <div>
                {withdrawRequests ? (
                    <Table>
                        <Table.Header>
                            <Table.Column>Id</Table.Column>
                            <Table.Column>Name</Table.Column>
                            <Table.Column>Amount</Table.Column>
                            <Table.Column>Available Balance</Table.Column>
                            <Table.Column>Created</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column>Actions</Table.Column>
                            <Table.Column>Bank Details</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {withdrawRequests?.map((withdrawRequest, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {" "}
                                            {withdrawRequest.id}{" "}
                                        </div>{" "}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {withdrawRequest.user_name}
                                        </div>{" "}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {withdrawRequest.amount}
                                        </div>{" "}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {withdrawRequest.wallet_balance}
                                        </div>{" "}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {dayjs(
                                                withdrawRequest.created_at
                                            ).format("DD-MM-YYYY; HH:mm:ss")}
                                        </div>{" "}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {withdrawRequest.status ==
                                            "requested" ? (
                                                <span className="text-purple-700">
                                                    {withdrawRequest.status}
                                                </span>
                                            ) : withdrawRequest.status ==
                                              "approved" ? (
                                                <span className="text-green-700">
                                                    {withdrawRequest.status}
                                                </span>
                                            ) : (
                                                <span className="text-red-700">
                                                    {withdrawRequest.status}
                                                </span>
                                            )}
                                        </div>{" "}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {/*  <WithdrawRequestLine withdrawRequest={withdrawRequest} /> */}
                                        </div>{" "}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {/*  <WithdrawRequestLine withdrawRequest={withdrawRequest} /> */}
                                        </div>{" "}
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
        </div>
    );
};

export default WithdrawRequest;

const ActionsLine = () => {
    return <div></div>;
};
