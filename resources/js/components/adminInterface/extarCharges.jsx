import { useEffect, useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { Button, Loading, Modal, Radio, Table } from "@nextui-org/react";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const ExtraCharges = () => {
    const [extraCharges, setExtraCharges] = useState();
    const [selectedExtraCharges, setSelectedExtraCharges] = useState();
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const getExtraCharges = async () => {
        const res = await getWithAxios("/api/extracharge-list");
        setExtraCharges(res.data);
    };

    const handleOpenCreate = () => {
        setOpenCreate(true);
    };

    useEffect(() => {
        if (!openCreate && !openUpdate && !openDelete) {
            getExtraCharges();
        }
    }, [openCreate, openUpdate, openDelete]);

    return (
        <div>
            <div className="flex justify-end py-4">
                <Button color={"success"} onPress={handleOpenCreate}>
                    Add Extra Charge
                </Button>
            </div>
            {extraCharges ? (
                <Table>
                    <Table.Header>
                        <Table.Column>Id</Table.Column>
                        <Table.Column>Title</Table.Column>
                        <Table.Column>Country Name</Table.Column>
                        <Table.Column>City Name</Table.Column>
                        <Table.Column>Charge</Table.Column>
                        <Table.Column>Created</Table.Column>
                        <Table.Column>Status</Table.Column>
                        <Table.Column>Actions</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {extraCharges?.map((extraCharge, index) => (
                            <Table.Row key={index}>
                                <Table.Cell> {extraCharge?.id} </Table.Cell>
                                <Table.Cell>{extraCharge?.title}</Table.Cell>
                                <Table.Cell>
                                    {" "}
                                    {extraCharge?.country_name}{" "}
                                </Table.Cell>
                                <Table.Cell>
                                    {" "}
                                    {extraCharge?.city_name}{" "}
                                </Table.Cell>

                                <Table.Cell>
                                    {extraCharge?.charges}{" "}
                                    {extraCharge?.charges_type == "fixed"
                                        ? null
                                        : "%"}
                                </Table.Cell>
                                <Table.Cell>
                                    {dayjs(extraCharge?.created_at).format(
                                        "DD-MM-YYYY; HH:mm:ss"
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    {extraCharge?.status == 1 ? (
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
                                    <ExtraChargeLine
                                        extraCharge={extraCharge}
                                        setOpenDelete={setOpenDelete}
                                        setOpenUpdate={setOpenUpdate}
                                        setSelectedExtraCharges={
                                            setSelectedExtraCharges
                                        }
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
                oldExtraCharge={selectedExtraCharges}
                open={openUpdate}
                setOpen={setOpenUpdate}
            />
            <DeleteModal
                extraCharge={selectedExtraCharges}
                open={openDelete}
                setOpen={setOpenDelete}
            />
        </div>
    );
};
export default ExtraCharges;

const ExtraChargeLine = ({
    setOpenUpdate,
    setOpenDelete,
    setSelectedExtraCharges,
    extraCharge,
}) => {
    const handleOpenUpdate = () => {
        setOpenUpdate(true);
        setSelectedExtraCharges(extraCharge);
    };

    const handleOpenDelete = () => {
        setOpenDelete(true);
        setSelectedExtraCharges(extraCharge);
    };

    return (
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
    );
};

const CountryAndCity = ({ country, setCountry, city, setCity }) => {
    const [cities, setCities] = useState(null);
    const [countries, setCountries] = useState(null);

    const getCountries = async () => {
        const res = await getWithAxios("/api/country-list");
        setCountries(res.data);

        if (!country) {
            setCountry(res.data[0].id);
        }
    };

    const getCities = async () => {
        if (country) {
            const res = await getWithAxios("/api/city-list", {
                country_id: country,
            });
            setCities(res.data);
            if (!city) {
                setCity(res.data[0].id);
            } else {
                res.data.match((e) => {
                    if (e.id == city) {
                        setCity(e.id);
                    } else {
                        setCity(res.data[0].id);
                    }
                });
            }
        } else {
            const res = await getWithAxios("/api/city-list");
            setCities(res.data);
            setCity(res.data[0].id)

        }
    };

    useEffect(() => {
        getCountries();
    }, []);

    /*  useEffect(() => {
        if (countries) {
            setCountry(countries[0]);
        }
    }, [countries]); */

    /* useEffect(() => {
       console.log(country)
    }, [country]); */

    /*   useEffect(() => {
        console.log(city)
     }, [city]); */

    useEffect(() => {
        getCities();
    }, [country]);

    /*  useEffect(() => {
        if (cities) {
            setCity(cities[0]);
        }
    }, [cities]); */

    return (
        <div className="grid gap-4 w-full z-40 font-bold md:grid-cols-2">
            <div className="grid">
                <div>Country </div>
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
                                <option key={index} value={country.id}>
                                    {" "}
                                    {country.name}{" "}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid">
                <div>City </div>
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
                                <option key={index} value={city.id}>
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
    const [extraCharge, setExtraCharge] = useState({
        title: "",
        charge_type: "",
        charge: "",
    });
    const [checked, setChecked] = useState("percentage");

    const [city, setCity] = useState();
    const [country, setCountry] = useState();

    const handleCreate = async () => {
        const dataToSend = {
            title: extraCharge?.title,
            charges_type: checked,
            charges: extraCharge?.charge,
            country_id: country,
            city_id: city,
            status: "1",
        };
        const res = await postWithAxios("/api/extracharge-save", dataToSend);

        console.log(res.message);

        if (res.message == "Extra charge has been save successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message != "Extra charge has been save successfully.") {
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
                    Add Extra charge
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid w-full">
                    <CountryAndCity
                        city={city}
                        setCity={setCity}
                        country={country}
                        setCountry={setCountry}
                    />

                    <div className="form-group w-full ">
                        <label htmlFor="ExtraCharge name">Title </label>
                        <input
                            required
                            type="text"
                            className="form-control w-full"
                            value={extraCharge?.title}
                            onChange={(e) =>
                                setExtraCharge({
                                    ...extraCharge,
                                    title: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="form-group w-full ">
                        <label htmlFor="ExtraCharge name">Charge</label>
                        <input
                            required
                            type="text"
                            className="form-control w-full"
                            value={extraCharge?.charge}
                            onChange={(e) =>
                                setExtraCharge({
                                    ...extraCharge,
                                    charge: e.target.value,
                                })
                            }
                        />
                    </div>

                    <Radio.Group
                        isRequired
                        value={checked}
                        onChange={setChecked}
                    >
                        <Radio value="fixed">Fixed</Radio>
                        <Radio value="percentage">Percentage</Radio>
                    </Radio.Group>
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

const UpdateModal = ({ oldExtraCharge, open, setOpen }) => {
    const [extraCharge, setExtraCharge] = useState({ oldExtraCharge });

    const [city, setCity] = useState(oldExtraCharge?.city_id);
    const [country, setCountry] = useState(oldExtraCharge?.country_id);
    const [checked, setChecked] = useState(oldExtraCharge?.charges_type);

    const handleCreate = async () => {
        const dataToSend = {
            id: extraCharge?.id,
            title: extraCharge?.title,
            charges_type: extraCharge?.charges_type,
            charges: extraCharge?.charges,
            country_id: country,
            city_id: city,
            status: "1",
        };
        const res = await postWithAxios("/api/extracharge-save", dataToSend);

        if (res.message == "Extra charge has been updated successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message !== "Extra charge has been updated successfully.") {
            toast(res.message, {
                type: "error",
                hideProgressBar: true,
            });
        }
    };

    useEffect(() => {
        setExtraCharge(oldExtraCharge);
        setCountry(oldExtraCharge?.country_id);
        setCity(oldExtraCharge?.city_id);
    }, [oldExtraCharge]);

    return (
        <Modal
            open={open}
            closeButton
            preventClose
            onClose={() => setOpen(false)}
        >
            <Modal.Header>
                <div className="text-lg font-bold text-appGreen">
                    Update Extra charge
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid w-full">
                    <CountryAndCity
                        city={city}
                        setCity={setCity}
                        country={country}
                        setCountry={setCountry}
                    />

                    <div className="form-group w-full py-4 ">
                        <label htmlFor="ExtraCharge name">Title</label>
                        <input
                            required
                            type="text"
                            className="form-control w-full"
                            value={extraCharge?.title}
                            onChange={(e) =>
                                setExtraCharge({
                                    ...extraCharge,
                                    title: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="form-group w-full ">
                        <label htmlFor="ExtraCharge name">Charge</label>
                        <input
                            required
                            type="text"
                            className="form-control w-full"
                            value={extraCharge?.charges}
                            onChange={(e) =>
                                setExtraCharge({
                                    ...extraCharge,
                                    charges: e.target.value,
                                })
                            }
                        />
                    </div>
                    <Radio.Group
                        isRequired
                        value={extraCharge?.charges_type}
                        onChange={(e) =>
                            setExtraCharge({ ...extraCharge, charges_type: e })
                        }
                    >
                        <Radio value="fixed">Fixed</Radio>
                        <Radio value="percentage">Percentage</Radio>
                    </Radio.Group>
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
                            Update
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const DeleteModal = ({ extraCharge, open, setOpen }) => {
    const handleDlete = async () => {
        const url = "/api/extracharge-delete/" + extraCharge?.id;
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
                    Delete ExtraCharge
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="font-bold text-black">
                    Confirm, you want to delete ExtraCharge{" "}
                    <span className="text-red-300">
                        #{extraCharge?.id} from list of ExtraCharges .
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
