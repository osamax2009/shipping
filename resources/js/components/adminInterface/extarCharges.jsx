import { useEffect, useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { Button, Modal, Radio, Table } from "@nextui-org/react";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import dayjs from "dayjs";


const ExtraCharges = () => {
    const [extraCharges, setExtraCharges] = useState();
    const [openCreate, setOpenCreate] = useState(false);

    const getExtraCharges = async () => {
        const res = await getWithAxios("/api/extracharge-list");
        setExtraCharges(res.data);
    };

    const handleOpenCreate = () => {
        setOpenCreate(true);
    };

    useEffect(() => {
        if (!openCreate) {
            getExtraCharges();
        }
    }, [openCreate]);

    return (
        <div>
            <div className="flex justify-end py-4">
                <Button color={"success"} onPress={handleOpenCreate}>
                    Add Extra Charge
                </Button>
            </div>
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
                            <Table.Cell> {extraCharge.id} </Table.Cell>
                            <Table.Cell>{extraCharge.title}</Table.Cell>
                            <Table.Cell>
                                {" "}
                                {extraCharge.country_name}{" "}
                            </Table.Cell>
                            <Table.Cell> {extraCharge.city_name} </Table.Cell>

                            <Table.Cell>{extraCharge.charges}</Table.Cell>
                            <Table.Cell>{dayjs(extraCharge?.created_at).format("DD-MM-YYYY; HH:mm:ss")}</Table.Cell>
                            <Table.Cell>
                                {extraCharge.status == 1 ? (
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
                                <ExtraChargeLine extraCharge={extraCharge} />
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
export default ExtraCharges;

const ExtraChargeLine = ({ extraCharge }) => {
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
                    oldExtraCharge={extraCharge}
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                />
                <DeleteModal
                    extraCharge={extraCharge}
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
            title: extraCharge.title,
            charges_type: checked,
            charges: extraCharge.charge,
            country_id: country,
            city_id: city,
            status: "1",
        };
        const res = await postWithAxios("/api/extracharge-save", dataToSend);

        console.log(res.message)

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
                        <label htmlFor="ExtraCharge name">
                            Title {extraCharge.title}{" "}
                        </label>
                        <input
                            required
                            type="text"
                            className="form-control w-full"
                            value={extraCharge.title}
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
                            value={extraCharge.charge}
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
    const [extraCharge, setExtraCharge] = useState({
        title: oldExtraCharge?.title,
        charge_type: oldExtraCharge?.charges_type,
        charge: oldExtraCharge?.charges,
    });
    const [city, setCity] = useState(oldExtraCharge?.city_id);
    const [country, setCountry] = useState(oldExtraCharge?.country_id);
    const [checked, setChecked] = useState(oldExtraCharge?.charges_type);

    const handleCreate = async () => {
        const dataToSend = {
            title: extraCharge.title,
            charges_type: checked,
            charges: extraCharge.charge,
            country_id: country,
            city_id: city,
            status: "1",
        };
        const res = await postWithAxios("/api/extracharge-save", dataToSend);

        if (res.message == "Static Data has been save successfully.") {
            setOpen(false);
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message !== "Static Data has been save successfully.") {
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
                        <label htmlFor="ExtraCharge name">Title</label>
                        <input
                            required
                            type="text"
                            className="form-control w-full"
                            value={extraCharge.title}
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
                            value={extraCharge.charge}
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

const DeleteModal = ({ extraCharge, open, setOpen }) => {

    const handleDlete = async () => {
        const url = "/api/extracharge-delete/" + extraCharge?.id
        const res = await postWithAxios(url)
        setOpen(false)
        toast(res.message, {
            type : "success",
            hideProgressBar : true
        })
    }
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

                        <Button auto color={"warning"} onPress={handleDlete} className="text-black">
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};
