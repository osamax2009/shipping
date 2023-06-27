
import { Image, Table } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios } from "../api/axios";
import { useEffect } from "react";

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
            <div className="font-bold py-4">Delivery Man Documents</div>
            <div>
                <Table>
                    <Table.Header>
                        <Table.Column>Id</Table.Column>
                        <Table.Column>WithdrawRequest Method</Table.Column>
                        <Table.Column>Image</Table.Column>
                        <Table.Column>Mode</Table.Column>
                        <Table.Column>Status</Table.Column>
                        <Table.Column>Actions</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {withdrawRequests?.map((withdrawRequest, index) => (
                            <Table.Row key={index}>
                                <Table.Cell> {withdrawRequest.id} </Table.Cell>
                                <Table.Cell>{WithdrawRequest.type == "stripe"  ? "Visa/Master Card" : null}</Table.Cell>
                                <Table.Cell>
                                    <Image
                                        src={WithdrawRequest.gateway_logo}
                                        width={80}
                                        height={60}
                                    />
                                </Table.Cell>
                                <Table.Cell> {withdrawRequest.is_test == 1 ? "Test" : "live"} </Table.Cell>

                                <Table.Cell>
                                    {withdrawRequest.status == 1 ? (
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
                                    {/*  <WithdrawRequestLine withdrawRequest={withdrawRequest} /> */}
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

export default WithdrawRequest;
