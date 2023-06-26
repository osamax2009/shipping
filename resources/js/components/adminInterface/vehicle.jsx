import { useEffect, useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { Button, Image, Modal, Radio, Table } from "@nextui-org/react";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

const Vehicle = () => {
    const [vehicles, setVehicles] = useState();
    const [openCreate, setOpenCreate] = useState(false);

    const getVehicles = async () => {
        const res = await getWithAxios("/api/vehicle-list");
        setVehicles(res.data);
    };

    const handleOpenCreate = () => {
        setOpenCreate(true);
    };

    useEffect(() => {
        if (!openCreate) {
            getVehicles();
        }
    }, [openCreate]);

    return (
        <div>
            <div className="flex justify-end py-4">
                <Button color={"success"} onPress={handleOpenCreate}>
                    add vehicle
                </Button>
            </div>
            <Table>
                <Table.Header>
                    <Table.Column>Id</Table.Column>
                    <Table.Column>Vehicle Name</Table.Column>
                    <Table.Column>Vehicle Size</Table.Column>
                    <Table.Column>Vehicle Capacity</Table.Column>
                    <Table.Column>Description</Table.Column>
                    <Table.Column>Status</Table.Column>
                    <Table.Column>Vehicle Image</Table.Column>
                    <Table.Column>Actions</Table.Column>
                </Table.Header>
                <Table.Body>
                    {vehicles?.map((vehicle, index) => (
                        <Table.Row key={index}>
                            <Table.Cell> {vehicle.id} </Table.Cell>
                            <Table.Cell>{vehicle.title}</Table.Cell>
                            <Table.Cell> {vehicle.size} </Table.Cell>
                            <Table.Cell> {vehicle.capacity} </Table.Cell>

                            <Table.Cell>{vehicle.description}</Table.Cell>
                            <Table.Cell>
                                {vehicle.status == 1 ? (
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
                                <Image
                                    src={vehicle.image}
                                    width={80}
                                    height={60}
                                />
                            </Table.Cell>

                            <Table.Cell>
                                <VehicleLine vehicle={vehicle} />
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

            <CreateModal open={openCreate} setOpen={setOpenCreate} />
        </div>
    );
};
export default Vehicle;

const VehicleLine = ({ vehicle }) => {
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
            </div>
            <div>
                <UpdateModal
                    oldVehicle={vehicle}
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                />
                <DeleteModal
                    vehicle={vehicle}
                    open={openDelete}
                    setOpen={setOpenDelete}
                />
            </div>
        </div>
    );
};

const CountryAndCity = ({ country, setCountry, city, setCity }) => {
    const [cities, setCities] = useState(null);
    const [countries, setCountries] = useState(null);

    const getCountries = async () => {
        const res = await getWithAxios("/api/country-list");
        setCountries(res.data);
    };

    const getCities = async () => {
        if (country) {
            const res = await getWithAxios("/api/city-list", {
                country_id: country,
            });
            setCities(res.data);
        } else {
            const res = await getWithAxios("/api/city-list");
            setCities(res.data);
        }
    };

    useEffect(() => {
        getCountries();
    }, []);

    useEffect(() => {
        getCities();
    }, [country]);

    return (
        <div className="grid gap-4 w-full z-40 font-bold md:grid-cols-2">
            <div className="grid">
                <div>Country</div>
                <div>
                    <div className="w-full">
                        <select
                            required
                            className="form-control"
                            value={country}
                            label="Age"
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            {countries?.map((country, index) => (
                                <option
                                    key={index}
                                    defaultChecked={
                                        country.id == 2 ? true : false
                                    }
                                    value={country.id}
                                >
                                    {" "}
                                    {country.name}{" "}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid">
                <div>City</div>
                <div>
                    <div className="w-full">
                        <select
                            required
                            className="form-control"
                            value={city}
                            label="Age"
                            onChange={(e) => setCity(e.target.value)}
                        >
                            {cities?.map((city, index) => (
                                <option
                                    key={index}
                                    defaultChecked={city.id == 1 ? true : false}
                                    value={city.id}
                                >
                                    {" "}
                                    {city.name}{" "}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CreateModal = ({ open, setOpen }) => {
    const [vehicle, setVehicle] = useState({
        title: "",
        type: "",
        city_ids: "",
        size: "",
        capacity: "",
        description: "",
        status: "",
        vehicle_image: "",
    });
    const [checked, setChecked] = useState("percentage");

    const [city, setCity] = useState();
    const [country, setCountry] = useState();

    const handleCreate = async () => {
        const dataToSend = {
            title: "",
            type: "",
            city_ids: "",
            size: "",
            capacity: "",
            description: "",
            status: "1",
            vehicle_image: "",
        };
        const res = await postWithAxios("/api/vehicle-save", dataToSend);

        if (res.message == "Vehicle has been save successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message != "Vehicle has been save successfully.") {
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
                    Add vehicle
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid w-full">
                    <div className="form-group">
                        <label htmlFor=""> Vehicle Name</label>
                        <input
                            type="text"
                            value={vehicle?.title}
                            onChange={(e) =>
                                setVehicle({
                                    ...vehicle,
                                    title: e.target.value,
                                })
                            }
                            className="form-control"
                        />
                    </div>

                    <div className="grid md:grid-cols-2">
                        <div className="form-group">
                            <label htmlFor=""> Type</label>
                            <select
                                type="text"
                                value={vehicle?.type}
                                onChange={(e) =>
                                    setVehicle({
                                        ...vehicle,
                                        type: e.target.value,
                                    })
                                }
                                className="form-control"
                            >
                                <option value={"all"}>All</option>
                                <option value={"city_wise"}>City wise</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor=""> Vehicle Capacity</label>
                            <input
                                type="text"
                                value={vehicle?.capacity}
                                onChange={(e) =>
                                    setVehicle({
                                        ...vehicle,
                                        capacity: e.target.value,
                                    })
                                }
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="form-group w-full ">
                        <label htmlFor="oldVehicle name">Vehicle Size</label>
                        <input
                            required
                            type="text"
                            className="form-control w-full"
                            value={vehicle.size}
                            onChange={(e) =>
                                setVehicle({
                                    ...vehicle,
                                    size: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="form-group w-full ">
                        <label htmlFor="oldVehicle name">Description</label>
                        <input
                            required
                            type="text"
                            className="form-control w-full"
                            value={vehicle.description}
                            onChange={(e) =>
                                setVehicle({
                                    ...vehicle,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor=""> Vehicle Image</label>
                        <input
                            type="file"
                           
                            onChange={(e) =>
                                setVehicle({
                                    ...vehicle,
                                    image: e.target.value,
                                })
                            }
                            className="form-control"
                        />
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

const UpdateModal = ({ oldVehicle, open, setOpen }) => {
    const [vehicle, setVehicle] = useState(oldVehicle);
    const [checked, setChecked] = useState("percentage");

    const [city, setCity] = useState();
    const [country, setCountry] = useState();

    const handleCreate = async () => {
        const dataToSend = {
            title: "",
            type: "",
            city_ids: "",
            size: "",
            capacity: "",
            description: "",
            status: "1",
            vehicle_image: "",
        };
        const res = await postWithAxios("/api/vehicle-save", dataToSend);

        if (res.message == "Vehicle has been save successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message != "Vehicle has been save successfully.") {
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
                    Add vehicle
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid w-full">
                    <div className="form-group">
                        <label htmlFor=""> Vehicle Name</label>
                        <input
                            type="text"
                            value={vehicle?.title}
                            onChange={(e) =>
                                setVehicle({
                                    ...vehicle,
                                    title: e.target.value,
                                })
                            }
                            className="form-control"
                        />
                    </div>

                    <div className="grid md:grid-cols-2">
                        <div className="form-group">
                            <label htmlFor=""> Type</label>
                            <select
                                type="text"
                                value={vehicle?.type}
                                onChange={(e) =>
                                    setVehicle({
                                        ...vehicle,
                                        type: e.target.value,
                                    })
                                }
                                className="form-control"
                            >
                                <option value={"all"}>All</option>
                                <option value={"city_wise"}>City wise</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor=""> Vehicle Capacity</label>
                            <input
                                type="text"
                                value={vehicle?.capacity}
                                onChange={(e) =>
                                    setVehicle({
                                        ...vehicle,
                                        capacity: e.target.value,
                                    })
                                }
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="form-group w-full ">
                        <label htmlFor="oldVehicle name">Vehicle Size</label>
                        <input
                            required
                            type="text"
                            className="form-control w-full"
                            value={vehicle.size}
                            onChange={(e) =>
                                setVehicle({
                                    ...vehicle,
                                    size: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="form-group w-full ">
                        <label htmlFor="oldVehicle name">Description</label>
                        <input
                            required
                            type="text"
                            className="form-control w-full"
                            value={vehicle.description}
                            onChange={(e) =>
                                setVehicle({
                                    ...vehicle,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor=""> Vehicle Image</label>
                        <input
                            type="file"
                       
                            onChange={(e) =>
                                setVehicle({
                                    ...vehicle,
                                    image: e.target.value,
                                })
                            }
                            className="form-control"
                        />
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

const DeleteModal = ({ vehicle, open, setOpen }) => {
    const handleDlete = async () => {
        const url = "/api/vehicle-delete" + vehicle?.id;

        const res = await postWithAxios(url);
        setOpen(false);
        toast(res.message, {
            type: "success",
            hideProgressBar: true,
        });
    };
    return (
        <Modal open={open} closeButton onClose={() => setOpen(false)}>
            <Modal.Header>
                {" "}
                <div className="text-lg font-bold text-appGreen">
                    Delete oldVehicle
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="font-bold text-black">
                    Confirm, you want to delete oldVehicle{" "}
                    <span className="text-red-300">
                        #{vehicle?.id} from list of oldVehicles .
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

                        <Button
                            auto
                            color={"warning"}
                            onPress={handleDlete}
                            className="text-black"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};
