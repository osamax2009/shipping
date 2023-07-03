import { FormControl, MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Button } from "@nextui-org/react";
import { OrderStatus } from "../../shared/constancy";


const Filter = ({ filter, setFilter }) => {
    return (
        <div className="flex flex-wrap gap-4 justify-between py-4">
            <div>
                <div className="flex items-center gap-3">
                    <div className="font-bold">Status </div>
                    <div className="py-4 font-bold">
                        <div className="w-full">
                            <FormControl sx={{ m: 1 }} className="w-full">
                                <Select
                                    inputProps={{
                                        "aria-label": "Without label",
                                    }}
                                    value={filter.status}
                                    displayEmpty
                                    onChange={(e) =>
                                        setFilter({
                                            ...filter,
                                            status: e.target.value,
                                        })
                                    }
                                >
                                    {/*  <MenuItem
                                               
                                                defaultChecked
                                                value={""}
                                            >
                                                All
                                            </MenuItem> */}
                                    {OrderStatus?.map((status, index) => (
                                        <MenuItem
                                            key={index}
                                            value={status.value}
                                        >
                                            {status.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <div className="font-bold">Date </div>
                <div className="flex items-center gap-6">
                    <DatePicker
                        label={"from"}
                        value={filter.from_date}
                        onChange={(e) => setFilter({ ...filter, from_date: e })}
                    />
                    <DatePicker
                        label={"to"}
                        value={filter.to_date}
                        onChange={(e) => setFilter({ ...filter, to_date: e })}
                    />
                </div>
                <Button auto color={"success"}>
                    Apply
                </Button>
            </div>
        </div>
    );
};

export default Filter