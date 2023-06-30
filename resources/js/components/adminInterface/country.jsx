import { useEffect, useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { Button, Modal, Table } from "@nextui-org/react";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import ReactFlagsSelect from "react-flags-select";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const Country = () => {
    const [countries, setCountries] = useState();
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState();

    const getCountries = async () => {
        const res = await getWithAxios("/api/country-list");
        setCountries(res.data);
    };

    const handleOpenCreate = () => {
        setOpenCreate(true);
    };

    useEffect(() => {
        if (!openCreate && !openDelete && !openUpdate) {
            getCountries();
        }
    }, [openCreate, openUpdate, openDelete]);

    return (
        <div>
            <div className="flex justify-end py-4">
                <Button color={"success"} onPress={handleOpenCreate}>
                    new country
                </Button>
            </div>
            <Table>
                <Table.Header>
                    <Table.Column>Id</Table.Column>
                    <Table.Column>Country Name</Table.Column>
                    <Table.Column>Distance type</Table.Column>
                    <Table.Column>Weight Type</Table.Column>
                    <Table.Column>Created Date</Table.Column>
                    <Table.Column>Status</Table.Column>
                    <Table.Column>Actions</Table.Column>
                </Table.Header>
                <Table.Body>
                    {countries?.map((country, index) => (
                        <Table.Row key={index}>
                            <Table.Cell> {country?.id} </Table.Cell>
                            <Table.Cell>{country?.name}</Table.Cell>
                            <Table.Cell> {country?.distance_type} </Table.Cell>
                            <Table.Cell>{country?.weight_type}</Table.Cell>
                            <Table.Cell>{dayjs(country?.created_at).format("DD-MM-YYYY; HH:mm:ss")}</Table.Cell>
                            <Table.Cell>
                                {country?.status == 1 ? (
                                    <span className="text-appGreen">
                                        Enabled
                                    </span>
                                ) : (
                                    <span className="text-red-200">
                                        Disabled
                                    </span>
                                )}
                            </Table.Cell>

                            <Table.Cell>
                                <CountryLine
                                    country={country}
                                    setSelectedCountry={setSelectedCountry}
                                    openDelete={openDelete}
                                    setOpenDelete={setOpenDelete}
                                    openUpdate={openUpdate}
                                    setOpenUpdate={setOpenUpdate}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Pagination
                    shadow
                    noMargin
                    align="center"
                    rowsPerPage={10}
                    onPageChange={(page) => console.log({ page })}
                />
            </Table>

            <CreateModal open={openCreate} setOpen={setOpenCreate} />
            <UpdateModal
                    country={selectedCountry}
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                />
                <DeleteModal
                    country={selectedCountry}
                    open={openDelete}
                    setOpen={setOpenDelete}
                />
        </div>
    );
};
export default Country;

const CountryLine = ({
    country,
    
    setOpenUpdate,
    setSelectedCountry,
    setOpenDelete,
}) => {
    const handleOpenUpdate = () => {
        setSelectedCountry(country)
        setOpenUpdate(true);
    };


    const handleOpenDelete = () => {
        setSelectedCountry(country)
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
                
            </div>
        </div>
    );
};

const CreateModal = ({ open, setOpen }) => {
    const [selected, setSelected] = useState();
    const [distanceType, setDistanceType] = useState("km");
    const [weightType, setWeightType] = useState("kg");

    const countriesList = countryList();

    const handleCreate = async () => {
        const countryName = countriesList.getLabel(selected);
        const dataToSend = {
            name: countryName,
            code: selected,
            status: 1,
            distance_type: distanceType,
            weight_type: weightType,
            links: {},
        };

        const res = await postWithAxios("/api/country-save", dataToSend);
        if (res.message == "Country has been save successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message !== "Country has been save successfully.") {
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
                <div className="text-lg font-bold text-appGreen">
                    Create new contry{" "}
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid w-full h-72">
                    <div className="form-group w-full">
                        <label htmlFor="country name">Country Name</label>

                        <ReactFlagsSelect
                            selected={selected}
                            searchable
                            onSelect={(code) => setSelected(code)}
                        />
                    </div>
                    <div className="grid w-full gap-4 md:grid-cols-2">
                        <div className="form-group w-full">
                            <label htmlFor=""> Distance type</label>
                            <select
                                name=""
                                id=""
                                value={distanceType}
                                onChange={(e) =>
                                    setDistanceType(e.target.value)
                                }
                                className="form-control w-full"
                            >
                                <option value={"km"}>km</option>
                                <option value={"miles"}>miles</option>
                            </select>
                        </div>

                        <div className="form-group w-full">
                            <label htmlFor=""> Weight type</label>
                            <select
                                name=""
                                id=""
                                value={weightType}
                                onChange={(e) => setWeightType(e.target.value)}
                                className="form-control w-full"
                            >
                                <option value={"km"}>kg</option>
                                <option value={"pound"}>Pound</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap  w-full gap-6 justify-end">
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

const UpdateModal = ({ country, open, setOpen }) => {
    const [selected, setSelected] = useState(country?.code);
    const [distanceType, setDistanceType] = useState(country?.distance_type);
    const [weightType, setWeightType] = useState(country?.weight_type);
   
    const countriesList = countryList();

    const handleUpdate = async () => {
        const countryName = countriesList.getLabel(selected);
        const dataToSend = {
            id : country?.id,
            name: countryName,
            code: selected,
            status: 1,
            distance_type: distanceType,
            weight_type: weightType,
            links: {},
        };

        const res = await postWithAxios("/api/country-save", dataToSend);
        if (res.message == "Country has been updated successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message !== "Country has been updated successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "error",
                hideProgressBar: true,
            });
        }
    };
    useEffect(() => {
        setDistanceType(country?.distance_type)
        setWeightType(country?.weight_type)
        setSelected(country?.code)
    },[country])
    return (
        <Modal
            open={open}
            closeButton
            preventClose
            onClose={() => setOpen(false)}
        >
            <Modal.Header>
                <div className="text-lg font-bold text-appGreen">
                    Update country{" "}
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid w-full h-72">
                    <div className="form-group w-full">
                        <label htmlFor="country name">Country Name</label>

                        <ReactFlagsSelect
                            selected={selected}
                            searchable
                            onSelect={(code) => setSelected(code)}
                        />
                    </div>
                    <div className="grid gap-4 justify-center md:grid-cols-2">
                        <div className="form-group w-full">
                            <label htmlFor=""> Distance type</label>
                            <select
                                name=""
                                id=""
                                value={distanceType}
                                onChange={(e) =>
                                    setDistanceType(e.target.value)
                                }
                                className="form-control w-full"
                            >
                                <option value={"km"}>km</option>
                                <option value={"miles"}>miles</option>
                            </select>
                        </div>

                        <div className="form-group w-full">
                            <label htmlFor=""> Weight type</label>
                            <select
                                name=""
                                id=""
                                value={weightType}
                                onChange={(e) => setWeightType(e.target.value)}
                                className="form-control w-full"
                            >
                                <option value={"km"}>kg</option>
                                <option value={"pound"}>Pound</option>
                            </select>
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

                        <Button auto color={"success"} onPress={handleUpdate} className="text-black">
                            update
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const DeleteModal = ({ country, open, setOpen }) => {

    const deleteContry = async () => {
        const url = "/api/country-delete/" + country?.id

        const res = await postWithAxios(url)

        if (res.message == "Country has been deleted successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message !== "Country has been deleted successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "error",
                hideProgressBar: true,
            });
        }

        
    }
    return (
        <Modal open={open} closeButton onClose={() => setOpen(false)}>
            <Modal.Header>
                {" "}
                <div className="text-lg font-bold text-appGreen">
                    Delete country modal
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="font-bold text-black">
                    Confirm, you want to delete country{" "}
                    <span className="text-red-300">
                        {country?.name} from list of countries .
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

                        <Button auto color={"warning"} onPress={deleteContry} className="text-black">
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};
