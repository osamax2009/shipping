import { Image, Table, Button } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios } from "../api/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsPencilFill } from "react-icons/bs";

const PaymentGateway = () => {
    const [payments, setPayments] = useState();
    const [openCreate, setOpenCreate] = useState();
    const navigate = useNavigate()

    const getPayments = async () => {
        const res = await getWithAxios("/api/paymentgateway-list");
        setPayments(res.data);
        console.log(res.data);
    };

    const goToSetup = () => {
        navigate('/admin/paymentsetup')
    } 

    useEffect(() => {
        if (!openCreate) {
            getPayments();
        }
    }, [openCreate]);

    return (
        <div className="">
            <div className="font-bold py-4">Payment Gateway</div>
            <div className="flex justify-end py-4">
                <Button color={"success"} onPress={goToSetup}>
                   Setup
                </Button>
            </div>
            <div>
                <Table>
                    <Table.Header>
                        <Table.Column>Id</Table.Column>
                        <Table.Column>Payment Method</Table.Column>
                        <Table.Column>Image</Table.Column>
                        <Table.Column>Mode</Table.Column>
                        <Table.Column>Status</Table.Column>
                        <Table.Column>Actions</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {payments?.map((payment, index) => (
                            <Table.Row key={index}>
                                <Table.Cell> {payment.id} </Table.Cell>
                                <Table.Cell>
                                    {payment.type == "stripe"
                                        ? "Visa/Master Card"
                                        : null}
                                </Table.Cell>
                                <Table.Cell>
                                    <Image
                                        src={payment.gateway_logo}
                                        width={80}
                                        height={60}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    {" "}
                                    {payment.is_test == 1
                                        ? "Test"
                                        : "live"}{" "}
                                </Table.Cell>

                                <Table.Cell>
                                    {payment.status == 1 ? (
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
                                     <PaymentLine payment={payment} />
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

export default PaymentGateway;

const PaymentLine = ({ payment }) => {
    const navigate = useNavigate();

    const handleOpenUpdate = () => {
        navigate("/admin/paymentsetup");
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
            </div>
        </div>
    );
};
