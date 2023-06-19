import { useEffect, useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { Button, Modal, Table } from "@nextui-org/react";
import { BsEye, BsPencilFill, BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

const City = () => {
    const [cities, setCities] = useState();
    const [openCreate, setOpenCreate] = useState(false);

    const getCities = async () => {
        const res = await getWithAxios("/api/city-list");
        setCities(res.data);
    };

    const handleOpenCreate = () => {
        setOpenCreate(true);
    };

    useEffect(() => {
        getCities();
    }, []);

    return (
        <div>
            <div className="flex justify-end py-4">
                <Button color={"success"} onPress={handleOpenCreate}>
                    new city
                </Button>
            </div>
            <Table>
                <Table.Header>
                    <Table.Column>Id</Table.Column>
                    <Table.Column>city Name</Table.Column>
                    <Table.Column>Distance type</Table.Column>
                    <Table.Column>Created Date</Table.Column>
                    <Table.Column>Status</Table.Column>
                    <Table.Column>Actions</Table.Column>
                </Table.Header>
                <Table.Body>
                    {cities?.map((city, index) => (
                        <Table.Row key={index}>
                            <Table.Cell> {city.id} </Table.Cell>
                            <Table.Cell>{city.name}</Table.Cell>
                            <Table.Cell> {city.country_name} </Table.Cell>
                            <Table.Cell>{city.created_at}</Table.Cell>
                            <Table.Cell>
                                {city.status == 1 ? (
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
                                <cityLine city={city} />
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
        </div>
    );
};
export default City;

const cityLine = ({ city }) => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleOpenUpdate = () => {
        setOpenUpdate(true);
    };

    const handleOpenDelete = () => {
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
                <Button
                    auto
                    onPress={handleOpenUpdate}
                    color={"success"}
                    icon={<BsEye />}
                ></Button>
            </div>
            <div>
                <UpdateModal
                    city={city}
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                />
                <DeleteModal
                    city={city}
                    open={openDelete}
                    setOpen={setOpenDelete}
                />
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
        const cityName = countriesList.getLabel(selected);
        const dataToSend = {
            name: cityName,
            status: 1,
            distance_type: distanceType,
            weight_type: weightType,
            links: {},
        };

        const res = await postWithAxios("/api/city-save", dataToSend);
        if (res.message == "city has been save successfully.") {
            setOpen(false);
            window.location.reload();
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message !== "city has been save successfully.") {
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
                <div className="grid justify-between h-72">
                    <div className="form-group ">
                        <label htmlFor="city name">city Name</label>

                        <ReactFlagsSelect
                            selected={selected}
                            searchable
                            onSelect={(code) => setSelected(code)}
                        />
                    </div>
                    <div className="grid  justify-center md:grid-cols-2">
                        <div className="form-group">
                            <label htmlFor=""> Distance type</label>
                            <select
                                name=""
                                id=""
                                value={distanceType}
                                onChange={(e) =>
                                    setDistanceType(e.target.value)
                                }
                                className="from-control"
                            >
                                <option value={"km"}>km</option>
                                <option value={"miles"}>miles</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor=""> Weight type</label>
                            <select
                                name=""
                                id=""
                                value={weightType}
                                onChange={(e) => setWeightType(e.target.value)}
                                className="from-control"
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

const UpdateModal = ({ city, open, setOpen }) => {
    const [selected, setSelected] = useState(city.code);
    const [distanceType, setDistanceType] = useState(city.distance_type);
    const [weightType, setWeightType] = useState(city.weight_type);

    const handleUpdate = async () => {};
    return (
        <Modal
            open={open}
            closeButton
            preventClose
            onClose={() => setOpen(false)}
        >
            <Modal.Header>
                <div className="text-lg font-bold text-appGreen">
                    Update city{" "}
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid justify-between h-72">
                    <div className="form-group ">
                        <label htmlFor="city name">city Name</label>

                        <ReactFlagsSelect
                            selected={selected}
                            searchable
                            onSelect={(code) => setSelected(code)}
                        />
                    </div>
                    <div className="grid  justify-center md:grid-cols-2">
                        <div className="form-group">
                            <label htmlFor=""> Distance type</label>
                            <select
                                name=""
                                id=""
                                value={distanceType}
                                onChange={(e) =>
                                    setDistanceType(e.target.value)
                                }
                                className="from-control"
                            >
                                <option value={"km"}>km</option>
                                <option value={"miles"}>miles</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor=""> Weight type</label>
                            <select
                                name=""
                                id=""
                                value={weightType}
                                onChange={(e) => setWeightType(e.target.value)}
                                className="from-control"
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

                        <Button auto color={"success"} className="text-black">
                            update
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const DeleteModal = ({ city, open, setOpen }) => {
    return (
        <Modal open={open} closeButton onClose={() => setOpen(false)}>
            <Modal.Header>
                {" "}
                <div className="text-lg font-bold text-appGreen">
                    Delete city modal
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="font-bold text-black">
                    Confirm, you want to delete city{" "}
                    <span className="text-red-300">
                        {city.name} from list of countries .
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

                        <Button auto color={"warning"} className="text-black">
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};
