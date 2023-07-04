import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { getWithAxios } from "../api/axios";
import { useEffect } from "react";

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
        if (cities?.length > 0) {
            setCity(cities[0]);
        }
    }, [country]);

    return (
        <div className="grid gap-4 font-bold md:grid-cols-2 lg:grid-cols-3">
            <div className="grid">
                <div>Country</div>
                <div>
                    <FormControl sx={{ m: 1 }} className="w-full">
                        <Select
                            inputProps={{ "aria-label": "Without label" }}
                            value={country}
                            label="Age"
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            {countries?.map((country, index) => (
                                <MenuItem
                                    key={index}
                                    defaultChecked={
                                        country.id == 2 ? true : false
                                    }
                                    value={country.id}
                                >
                                    {" "}
                                    {country.name}{" "}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="grid">
                <div>City</div>
                <div>
                    <FormControl sx={{ m: 1 }} className="w-full">
                        <Select
                            inputProps={{ "aria-label": "Without label" }}
                            value={city}
                            label="Age"
                            onChange={(e) => setCity(e.target.value)}
                        >
                            {cities?.map((city, index) => (
                                <MenuItem key={index} value={city}>
                                    {" "}
                                    {city.name}{" "}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    );
};

export default CountryAndCity