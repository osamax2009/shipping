import { Image, Table } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios } from "../api/axios";
import { useEffect } from "react";

const Document = () => {
    const [documents, setDocuments] = useState();
    const [openCreate, setOpenCreate] = useState();

    const getDocuments = async () => {
        const res = await getWithAxios("/api/document-list");
        setDocuments(res.data);
        
    };

    useEffect(() => {
        if (!openCreate) {
            getDocuments();
        }
    }, [openCreate]);

    return (
        <div className="">
            <div className="font-bold py-4 text-appGreen text-lg">Document</div>
            <div>
                <Table>
                    <Table.Header>
                        <Table.Column>Id</Table.Column>
                        <Table.Column>Name</Table.Column>
                        <Table.Column>Required</Table.Column>
                        <Table.Column>Created</Table.Column>
                        <Table.Column>Status</Table.Column>
                        <Table.Column>Actions</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {documents?.map((document, index) => (
                            <Table.Row key={index}>
                                <Table.Cell> {document.id} </Table.Cell>
                                <Table.Cell>{document.name}</Table.Cell>
                                <Table.Cell>
                                {document.required == 1 ? 'Yes' : "No"}
                                </Table.Cell>
                                <Table.Cell> {document.created_at} </Table.Cell>

                                <Table.Cell>
                                    {document.status == 1 ? (
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
                                    {/*  <documentLine document={document} /> */}
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

export default Document;
