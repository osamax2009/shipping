import { useEffect, useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { Button, Loading, Modal, Table } from "@nextui-org/react";
import { BsEye, BsPencilFill, BsTrash } from "react-icons/bs";
import ReactFlagsSelect from "react-flags-select";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import dayjs, { Dayjs } from "dayjs";
import { useContext } from "react";
import { AppSettingsContext } from "../contexts/appSettings";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const City = () => {
    const [cities, setCities] = useState();
    const [countries, setCountries] = useState();
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openSee, setOpenSee] = useState(false);
    const [selectedCity, setSelectedCity] = useState();

    const getCities = async () => {
        const res = await getWithAxios("/api/city-list");
        setCities(res.data);
    };

    const getCountries = async () => {
        const res = await getWithAxios("/api/country-list");
        setCountries(res.data);
    };

    const handleOpenCreate = () => {
        setOpenCreate(true);
    };

    useEffect(() => {
        if (!openCreate && !openDelete && !openUpdate && !openSee) {
            getCities();
        }
    }, [openCreate, openDelete, openUpdate, openSee]);

    useEffect(() => {
        getCountries();
    }, []);

    return (
        <div>
            <div className="flex justify-end py-4">
                <Button color={"success"} onPress={handleOpenCreate}>
                    new city
                </Button>
            </div>
            {cities ? (
                <Table>
                    <Table.Header>
                        <Table.Column>Id</Table.Column>
                        <Table.Column>City Name</Table.Column>
                        <Table.Column>Distance type</Table.Column>
                        <Table.Column>Created Date</Table.Column>
                        <Table.Column>Status</Table.Column>
                        <Table.Column>Actions</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {cities?.map((city, index) => (
                            <Table.Row key={index}>
                                <Table.Cell> {city?.id} </Table.Cell>
                                <Table.Cell>{city?.name}</Table.Cell>
                                <Table.Cell> {city?.country_name} </Table.Cell>
                                <Table.Cell>
                                    {dayjs(city?.created_at).format(
                                        "DD-MM-YYYY; HH:mm:ss"
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    {city?.status == 1 ? (
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
                                    <CityLine
                                        city={city}
                                        setSelectedCity={setSelectedCity}
                                        setOpenDelete={setOpenDelete}
                                        setOpenUpdate={setOpenUpdate}
                                        setOpenSee={setOpenSee}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                    <Table.Pagination
                        shadow
                        noMargin
                        align="center"
                        rowsPerPage={8}
                        onPageChange={(page) => console.log({ page })}
                    />
                </Table>
            ) : (
                <Loading type="points" />
            )}

            <CreateModal
                open={openCreate}
                setOpen={setOpenCreate}
                countries={countries}
            />

            <UpdateModal
                city={selectedCity}
                open={openUpdate}
                setOpen={setOpenUpdate}
                countries={countries}
            />
            <DeleteModal
                city={selectedCity}
                open={openDelete}
                setOpen={setOpenDelete}
            />

            <SeeModal city={selectedCity} open={openSee} setOpen={setOpenSee} />
        </div>
    );
};
export default City;

const CityLine = ({
    city,
    setOpenDelete,
    setOpenUpdate,
    setSelectedCity,
    setOpenSee,
}) => {
    const handleOpenUpdate = () => {
        const value = city;
        setSelectedCity(value);

        setOpenUpdate(true);
    };

    const handleOpenDelete = () => {
        setSelectedCity(city);
        setOpenDelete(true);
    };

    const handleOpenSee = () => {
        setSelectedCity(city);
        setOpenSee(true);
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
                <Button
                    auto
                    onPress={handleOpenSee}
                    color={"primary"}
                    icon={<BsEye />}
                ></Button>
            </div>
        </div>
    );
};

const CreateModal = ({ open, setOpen, countries }) => {
    const [cityInfos, setCityInfos] = useState();
    const { appSettings, setAppSettings } = useContext(AppSettingsContext);
    const [country, setCountry] = useState();
    const [countrycodes, setCountryCodes] = useState([]);

    const getCityId = () => {
        countries?.map((e) => {
            if (e.name == country) {
                 setCityInfos({
                    ...cityInfos,
                    country_id: e.id,
                });
                return;
            }
        });
    };

    const createCity = async () => {

        const res = await postWithAxios("/api/city-save", cityInfos);
        if (res.message) {
            setOpen(false);
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }
    };

    useEffect(() => {
        countries?.map((c) => {
            return setCountryCodes([...countrycodes, c?.code]);
        });
    }, [countries]);

    useEffect(() => {
        getCityId();
        
    }, [country]);



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
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="form-group ">
                        <label htmlFor="city name">city Name </label>

                        <RegionDropdown
                            country={country}
                            classes="form-control"
                            value={cityInfos?.name}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    name: e,
                                })
                            }
                        />
                    </div>
                    <div className="form-group ">
                        <label htmlFor="city name">Select Country Name</label>

                        <CountryDropdown
                            value={country}
                            onChange={(val) => setCountry(val)}
                            whitelist={countrycodes}
                            classes="form-control"
                        />

                        {/*   <select
                            type="text"
                            className="form-control"
                            value={cityInfos?.country_id}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    country_id: e.target.value,
                                })
                            }
                        >
                            {countries?.map((country, index) => (
                                <option key={index} value={country?.id}>
                                    {country?.name}
                                </option>
                            ))}
                        </select> */}
                    </div>

                    <div className="form-group">
                        <label htmlFor=""> Fixed charges</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cityInfos?.ficed_charges}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    fixed_charges: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor=""> Cancel charges</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cityInfos?.cancel_charges}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    cancel_charges: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">
                            {" "}
                            Minimum Distance ({appSettings?.distance_unit}){" "}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={cityInfos?.min_distance}
                            defaultValue={10}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    min_distance: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">
                            {" "}
                            Minimum Weight ({appSettings?.weight}){" "}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={cityInfos?.min_weight}
                            defaultValue={1}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    min_weight: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor=""> Per Distance Charges</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cityInfos?.per_distance_charges}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    per_distance_charges: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor=""> Per Weight Charges</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cityInfos?.per_weight_charges}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    per_weight_charges: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor=""> Commision Type</label>
                        <select
                            type="text"
                            className="form-control"
                            value={cityInfos?.per_weight_charges}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    per_weight_charges: e.target.value,
                                })
                            }
                        >
                            <option value="percentage"> Percentage</option>
                            <option value="fixed"> Fixed</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor=""> Admin Commission</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cityInfos?.admin_commission}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    admin_commission: e.target.value,
                                })
                            }
                        />
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
                        onPress={createCity}
                        className="text-black"
                    >
                        Create
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const UpdateModal = ({ city, open, setOpen, countries }) => {
    const [cityInfos, setCityInfos] = useState(city);
    const [country, setCountry] = useState();
    const [countrycodes, setCountryCodes] = useState([]);

    const updateCity = async () => {
        const res = await postWithAxios("/api/city-save", cityInfos);
        if (res.message) {
            setOpen(false);
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }
    };

    useEffect(() => {
        countries?.map((c) => {
            return setCountryCodes([...countrycodes, c?.code]);
        });
    }, [countries]);

    useEffect(() => {
        setCityInfos(city);
    }, [city]);

    useEffect(() => {
        setCountry(city?.country_name)
    },[city])
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
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="form-group ">
                        <label htmlFor="city name">city Name</label>

                        <RegionDropdown
                            country={country}
                            classes="form-control"
                            value={cityInfos?.name}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    name: e,
                                })
                            }
                        />
                    </div>
                    <div className="form-group ">
                        <label htmlFor="city name">Select Country Name</label>

                        <CountryDropdown
                            value={country}
                            
                            onChange={(val) => setCountry(val)}
                            whitelist={countrycodes}
                            classes="form-control"
                        />

                    </div>

                    <div className="form-group">
                        <label htmlFor=""> Fixed charges</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cityInfos?.fixed_charges}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    fixed_charges: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor=""> Cancel charges</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cityInfos?.cancel_charges}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    cancel_charges: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor=""> Minimum Distance</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cityInfos?.min_distance}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    min_distance: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor=""> Minimum Distance</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cityInfos?.min_weight}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    min_weight: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor=""> Per Distance Charges</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cityInfos?.per_distance_charges}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    per_distance_charges: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor=""> Per Weight Charges</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cityInfos?.per_weight_charges}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    per_weight_charges: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor=""> Commision Type</label>
                        <select
                            type="text"
                            className="form-control"
                            value={cityInfos?.per_weight_charges}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    per_weight_charges: e.target.value,
                                })
                            }
                        >
                            <option value="percentage"> Percentage</option>
                            <option value="fixed"> Fixed</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor=""> Admin Commission</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cityInfos?.admin_commission}
                            onChange={(e) =>
                                setCityInfos({
                                    ...cityInfos,
                                    admin_commission: e.target.value,
                                })
                            }
                        />
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
                        onPress={updateCity}
                        className="text-black"
                    >
                        update
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const DeleteModal = ({ city, open, setOpen }) => {
    const [cityInfos, setCityInfos] = useState(city);

    const deleteCity = async () => {
        const url = "/api/city-delete/" + cityInfos.id;

        const res = await postWithAxios(url);
        setOpen(false);
        toast(res.message, {
            type: "success",
            hideProgressBar: true,
        });
    };
    useEffect(() => {
        setCityInfos(city);
    }, [city]);
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
                    <span className="text-red-700">
                        {cityInfos?.name} from list of cities .
                    </span>
                    <div className="flex flex-wrap pt-4 w-full gap-6 justify-between sm:justify-end">
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
                            onPress={deleteCity}
                            color={"error"}
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

const SeeModal = ({ city, open, setOpen }) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)} closeButton>
            <Modal.Header>
                <div className="text-lg">{city?.name}</div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid gap-2 pr-8 ">
                    <div className="grid grid-cols-2 gap-4 text-start">
                        <div className="font-bold">City Id</div>
                        <div>{city?.id}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-start">
                        <div className="font-bold">Country Name</div>
                        <div>{city?.country_name}</div>
                    </div>
                    <hr />
                    <div className="grid grid-cols-2 gap-4 text-start">
                        <div className="font-bold">Minimum Distance (km)</div>
                        <div>{city?.min_distance}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-start">
                        <div className="font-bold">Minimum Weight (Kg)</div>
                        <div>{city?.min_weight}</div>
                    </div>
                    <hr />
                    <div className="grid grid-cols-2 gap-4 text-start">
                        <div className="font-bold">Fixed Charge</div>
                        <div>{city?.fixed_charges}</div>
                    </div>{" "}
                    <div className="grid grid-cols-2 gap-4 text-start">
                        <div className="font-bold">Cancel Charge</div>
                        <div>{city?.cancel_charges}</div>
                    </div>{" "}
                    <div className="grid grid-cols-2 gap-4 text-start">
                        <div className="font-bold">Per Distance Charge</div>
                        <div>{city?.per_distance_charges}</div>
                    </div>{" "}
                    <div className="grid grid-cols-2 gap-4 text-start">
                        <div className="font-bold">Per weight Charge</div>
                        <div>{city?.per_weight_charges}</div>
                    </div>{" "}
                    <div className="grid grid-cols-2 gap-4 text-start">
                        <div className="font-bold">Admin Commission</div>
                        <div>{city?.admin_commission}</div>
                    </div>
                    <hr />
                    <div className="grid grid-cols-2 gap-4 text-start">
                        <div className="font-bold">Created Date</div>
                        <div>{dayjs(city?.created_at).format("DD-MM-YYYY; HH:mm:ss")}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-start">
                        <div className="font-bold">Updated Date</div>
                        <div>{dayjs(city?.updated_at).format("DD-MM-YYYY; HH:mm:ss")}</div>

                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};
