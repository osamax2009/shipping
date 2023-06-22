import { useEffect, useMemo, useState } from "react";

import { appName } from "../shared/constancy";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import { getWithAxios, postWithAxios } from "../api/axios";
import Select from 'react-select'
import AdminDashboardLayout from "./layout";

const CountriesAndCities = () => {
    const [countries, setCountries] = useState();

    const getCountries = async () => {
        const data = await getWithAxios("/api/country-list");
        console.log(data);

        if (data.status == "success") {
            setCountries(data.data.countries);
        }
    };

  

   

    useEffect(() => {
        document.title =
            appName + ": available countries and cities for our services";
    }, []);

    useEffect(() => {
        getCountries();
    }, []);
    return (
        <AdminDashboardLayout>
            <div className="px-8">
                <div className="flex flex-wrap gap-4">
                    <CreateContry />

                    <div className="card shadow ">
                        <div className="card-header bg-danger text-white">
                            Add a new city to a country
                        </div>

                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="">country</label>
                                <Select options={countries} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">city name</label>
                                <input
                                    className="form-control"
                                    placeholder="city name..."
                                />
                            </div>
                            <button className="btn btn-primary">
                                Add country
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                            countries and cities
                        </h6>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <div
                                id="dataTable_wrapper"
                                className="dataTables_wrapper dt-bootstrap4"
                            >
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <div
                                            className="dataTables_length"
                                            id="dataTable_length"
                                        >
                                            <label>
                                                Show{" "}
                                                <select
                                                    name="dataTable_length"
                                                    aria-controls="dataTable"
                                                    className="custom-select custom-select-sm form-control form-control-sm"
                                                >
                                                    <option value="10">
                                                        10
                                                    </option>
                                                    <option value="25">
                                                        25
                                                    </option>
                                                    <option value="50">
                                                        50
                                                    </option>
                                                    <option value="100">
                                                        100
                                                    </option>
                                                </select>{" "}
                                                entries
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div
                                            id="dataTable_filter"
                                            className="dataTables_filter"
                                        >
                                            <label>
                                                Search:
                                                <input
                                                    className="form-control form-control-sm"
                                                    placeholder="search..."
                                                
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12">
                                        <table
                                         
                                            className="table table-bordered dataTable"
                                            width="100%"
                                            cellSpacing="0"
                                            role="grid"
                                            aria-describedby="dataTable_info"
                                            /* style="width: 100%;" */
                                        >
                                            <thead className="border-b-4 bg-white">
                                                <tr role="row">
                                                    <th className="sorting">
                                                        Country
                                                    </th>
                                                    <th className="sorting">
                                                        Cities
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {countries?.map((country,index) => <tr key={index} className="odd">
                                                    <td>{country.name}</td>
                                                    <td>
                                                        cities
                                                    </td>
                                                </tr>)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12 col-md-5">
                                        <div
                                            className="dataTables_info"
                                            id="dataTable_info"
                                            role="status"
                                            aria-live="polite"
                                        >
                                            Showing 1 to 10 of 57 entries
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-7">
                                        <div
                                            className="dataTables_paginate paging_simple_numbers"
                                            id="dataTable_paginate"
                                        >
                                            <ul className="pagination">
                                                <li
                                                    className="paginate_button page-item previous disabled"
                                                    id="dataTable_previous"
                                                >
                                                    <a
                                                        href="#"
                                                        aria-controls="dataTable"
                                                        data-dt-idx="0"
                                                        tabIndex="0"
                                                        className="page-link"
                                                    >
                                                        Previous
                                                    </a>
                                                </li>
                                                <li className="paginate_button page-item active">
                                                    <a
                                                        href="#"
                                                        aria-controls="dataTable"
                                                        data-dt-idx="1"
                                                        tabindex="0"
                                                        className="page-link"
                                                    >
                                                        1
                                                    </a>
                                                </li>
                                                <li className="paginate_button page-item ">
                                                    <a
                                                        href="#"
                                                        aria-controls="dataTable"
                                                        data-dt-idx="2"
                                                        tabindex="0"
                                                        className="page-link"
                                                    >
                                                        2
                                                    </a>
                                                </li>
                                                <li className="paginate_button page-item ">
                                                    <a
                                                        href="#"
                                                        aria-controls="dataTable"
                                                        data-dt-idx="3"
                                                        tabindex="0"
                                                        className="page-link"
                                                    >
                                                        3
                                                    </a>
                                                </li>
                                                <li className="paginate_button page-item ">
                                                    <a
                                                        href="#"
                                                        aria-controls="dataTable"
                                                        data-dt-idx="4"
                                                        tabindex="0"
                                                        className="page-link"
                                                    >
                                                        4
                                                    </a>
                                                </li>
                                                <li className="paginate_button page-item ">
                                                    <a
                                                        href="#"
                                                        aria-controls="dataTable"
                                                        data-dt-idx="5"
                                                        tabindex="0"
                                                        className="page-link"
                                                    >
                                                        5
                                                    </a>
                                                </li>
                                                <li className="paginate_button page-item ">
                                                    <a
                                                        href="#"
                                                        aria-controls="dataTable"
                                                        data-dt-idx="6"
                                                        tabindex="0"
                                                        className="page-link"
                                                    >
                                                        6
                                                    </a>
                                                </li>
                                                <li
                                                    className="paginate_button page-item next"
                                                    id="dataTable_next"
                                                >
                                                    <a
                                                        href="#"
                                                        aria-controls="dataTable"
                                                        data-dt-idx="7"
                                                        tabindex="0"
                                                        className="page-link"
                                                    >
                                                        Next
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default CountriesAndCities;

const CreateContry = () => {
    const [country, setCountry] = useState("");

    const handleCreateCountry = async () => {
        const dataToSend = {};
        const data = await postWithAxios("/api/city-save", dataToSend);
    };

    return (
        <div className="card shadow">
            <div className="card-header bg-primary text-white">
                Add a new country
            </div>

            <div className="card-body ">
                <div>
                    <div className="form-group">
                        <label htmlFor="">country name</label>
                        <input
                            className="form-control"
                            placeholder="country name..."
                        />
                    </div>
                    <button
                        onClick={handleCreateCountry}
                        className="btn btn-primary"
                    >
                        Add country
                    </button>
                </div>
            </div>
        </div>
    );
};
