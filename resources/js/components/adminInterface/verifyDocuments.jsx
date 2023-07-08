import { useParams } from "react-router-dom";
import { getWithAxios } from "../api/axios";
import { Loading, Table } from "@nextui-org/react";
import { useState } from "react";
import { useEffect } from "react";

const VerifyDocuments = () => {
    const [documents, setDocuments] = useState();
    const params = useParams();
    const delivery_man_id = params.delivery_man_id;

    const getDeliveryPerson = async () => {
        
        const res = await getWithAxios("/api/delivery-man-document-list", {
            delivery_man_id: delivery_man_id,
        });

        setDocuments(res.data);
        console.log(res)
    };

    useEffect(() => {
        getDeliveryPerson();
    }, []);

    return (
        <div className="h-full w-full flex items-center justify-center">
            {documents ? (
                <div>
                    <Table>
                        <Table.Header>
                            <Table.Column> Id </Table.Column>
                            <Table.Column> Delivery person Name </Table.Column>
                            <Table.Column> Document Name </Table.Column>
                            <Table.Column> Document </Table.Column>
                            <Table.Column> Created </Table.Column>
                            <Table.Column> Actions </Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {documents?.map((document, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell> {document?.id} </Table.Cell>
                                    <Table.Cell> {document?.id} </Table.Cell>
                                    <Table.Cell> {document?.id} </Table.Cell>
                                    <Table.Cell> {document?.id} </Table.Cell>
                                    <Table.Cell> {document?.id} </Table.Cell>
                                    <Table.Cell> {document?.id} </Table.Cell>
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
            ) : (
                <Loading type="points" />
            )}
        </div>
    );
};

export default VerifyDocuments;
