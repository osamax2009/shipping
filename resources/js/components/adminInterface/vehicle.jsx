import { useEffect, useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { Button, Image, Loading, Modal, Radio, Table } from "@nextui-org/react";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import ImageUploader from "../partials/imageUploader";
import { data } from "jquery";

const Vehicle = () => {
    const [vehicles, setVehicles] = useState();
    const [selected, setSelected] = useState();
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const getVehicles = async () => {
        const res = await getWithAxios("/api/vehicle-list");
        setVehicles(res.data);
    };

    const handleOpenCreate = () => {
        setOpenCreate(true);
    };

    useEffect(() => {
        if (!openCreate && !openDelete && !openUpdate) {
            getVehicles();
        }
    }, [openCreate, openDelete, openUpdate]);

    return (
        <div>
            <div className="flex justify-end py-4">
                <Button color={"success"} onPress={handleOpenCreate}>
                    Add Vehicles
                </Button>
            </div>
            {vehicles ? (
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
                                    <div className="flex justify-start w-full">
                                        <Image
                                            src={
                                                vehicle.vehicle_image
                                            }
                                            width={80}
                                            height={60}
                                            alt={"vehicle image"}
                                        />
                                    </div>
                                </Table.Cell>

                                <Table.Cell>
                                    <VehicleLine
                                        setOpenDelete={setOpenDelete}
                                        setOpenUpdate={setOpenUpdate}
                                        setSelected={setSelected}
                                        vehicle={vehicle}
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
            ) : (
                <Loading type="points" />
            )}

            <CreateModal open={openCreate} setOpen={setOpenCreate} />
            <UpdateModal
                oldVehicle={selected}
                open={openUpdate}
                setOpen={setOpenUpdate}
            />
            <DeleteModal
                vehicle={selected}
                open={openDelete}
                setOpen={setOpenDelete}
            />
        </div>
    );
};
export default Vehicle;

const VehicleLine = ({
    vehicle,
    setSelected,
    setOpenDelete,
    setOpenUpdate,
}) => {
    const handleOpenUpdate = () => {
        setOpenUpdate(true);
        setSelected(vehicle);
    };

    const handleOpenDelete = () => {
        setOpenDelete(true);
        setSelected(vehicle);
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
        type: "all",
        city_ids: "",
        size: "",
        capacity: "",
        description: "",
        status: "1",
        vehicle_image: "",
    });
    const [images, setImages] = useState([]);

    const handleCreate = async () => {
        var data = new FormData();
        data.append("title", vehicle?.title);
        data.append("type", vehicle?.type);
        data.append("city_ids", vehicle?.city_ids);
        data.append("size", vehicle?.size);
        data.append("capacity", vehicle?.capacity);
        data.append("status", vehicle?.status);
        data.append("vehicle_image", images[0]);

        const res = await postWithAxios("/api/vehicle-save", data);

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

                    <div className="grid gap-4 md:grid-cols-2">
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

                    <div>
                        <ImageUploader
                            images={images}
                            setImages={setImages}
                            oldImagePath={null}
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
    const [images, setImages] = useState([]);

    const handleCreate = async () => {
        var data = new FormData();
        data.append("id", vehicle?.id);
        data.append("title", vehicle?.title);
        data.append("type", vehicle?.type);
        data.append("city_ids", vehicle?.city_ids);
        data.append("size", vehicle?.size);
        data.append("capacity", vehicle?.capacity);
        data.append("status", vehicle?.status);

        if (images?.length > 0) {
            data.append("vehicle_image", images[0]);
        }

        const res = await postWithAxios("/api/vehicle-save", data);

        if (res.message == "Vehicle has been save successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message != "Vehicle has been save successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });
        }
    };

    useEffect(() => {
        setVehicle(oldVehicle);
    }, [oldVehicle]);
    return (
        <Modal
            open={open}
            closeButton
            preventClose
            onClose={() => setOpen(false)}
        >
            <Modal.Header>
                <div className="text-lg font-bold text-appGreen">
                    Update vehicle
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

                    <div className="grid gap-4 md:grid-cols-2">
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
                            value={vehicle?.size}
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
                            value={vehicle?.description}
                            onChange={(e) =>
                                setVehicle({
                                    ...vehicle,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <ImageUploader
                            images={images}
                            setImages={setImages}
                            oldImagePath={vehicle?.vehicle_image}
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
        const url = "/api/vehicle-delete/" + vehicle?.id;

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
                    Delete Vehicle
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="font-bold text-black">
                    Confirm, you want to delete vehicle{" "}
                    <span className="text-red-300">
                        #{vehicle?.id} from list of Vehicles .
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
