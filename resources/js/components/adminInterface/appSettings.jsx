import { Button, Image, Radio, table } from "@nextui-org/react";
import { useRef, useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { useEffect } from "react";
import { Switch } from "@mui/material";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppSettingsContext } from "../contexts/appSettings";

const AppSettings = () => {
    const { appSettings, setAppSettings } = useContext(AppSettingsContext);

    const [openCreate, setOpenCreate] = useState("false");

    const UpdateSettings = async () => {
        const res = await postWithAxios("/api/update-appsetting", appSettings);

        if (res.message) {
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }
    };

    /*  useEffect(() => {
        if (isFirst.current) {
            UpdateSettings();
        }
    }, [appSettings]); */

    useEffect(() => {
        if (openCreate == "charged" && appSettings) {
            setOpenCreate("true");
        }
    }, [appSettings]);

    return (
        <div className="">
            <div className="font-bold py-4">App Settings </div>
            <div className="flex w-full px-4 py-2 justify-end">
                <Button auto onPress={UpdateSettings}>
                    <div className="font-bold text-lg">Save</div>
                </Button>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
                <div className="grid gap-4">
                    <div className="px-6 font-bold border">
                        <div className="py-4 ">Notification settings</div>
                        <table className="table table-striped table-bordered text-black">
                            <thead>
                                <tr>
                                    <th>
                                        {" "}
                                        <span className="text-black font-bold">
                                            {" "}
                                            Type
                                        </span>{" "}
                                    </th>
                                    <th>
                                        {" "}
                                        <span className="text-black font-bold">
                                            {" "}
                                            ONE SIGNAL
                                        </span>{" "}
                                    </th>
                                    <th>
                                        {" "}
                                        <span className="text-black font-bold">
                                            {" "}
                                            FIREBASE (For admin)
                                        </span>{" "}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <NotificationLine
                                    title="Active"
                                    label={"active"}
                                />
                                <NotificationLine
                                    title="Cancelled"
                                    label={"cancelled"}
                                />{" "}
                                <NotificationLine
                                    title="Completed"
                                    label={"completed"}
                                />
                                <NotificationLine
                                    title="Courier Assigned"
                                    label={"courier_assigned"}
                                />
                                <NotificationLine
                                    title="Courier Departed"
                                    label={"courier_departed"}
                                />
                                <NotificationLine
                                    title="Courier Picked Up"
                                    label={"courier_picked_up"}
                                />
                                <NotificationLine
                                    title="Courier Transfer"
                                    label={"courier_transfer"}
                                />
                                <NotificationLine
                                    title="Create"
                                    label={"create"}
                                />
                                <NotificationLine
                                    title="Delayed"
                                    label={"delayed"}
                                />
                                <NotificationLine
                                    title="Failed"
                                    label={"failed"}
                                />
                                <NotificationLine
                                    title="Payment Status message"
                                    label={"payment_status_message"}
                                />
                                {/*  {appSettings
                                ? Object.keys(
                                      appSettings?.notification_settings
                                  )?.map((key, index) => (
                                      <NotificationLine
                                          key={key}
                                          index = {index}
                                         
                                      />
                                  ))
                                : null} */}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 font-bold border">
                        <div className="py-4 ">Invoice settings</div>

                        <div className="form-group">
                            <label htmlFor=""> Company Name</label>
                            <input
                                type="text"
                                value={appSettings?.site_name}
                                onChange={(e) =>
                                    setAppSettings({
                                        ...appSettings,
                                        site_name: e.target.value,
                                    })
                                }
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor=""> Company Contact Number</label>
                            <input
                                type="text"
                                value={appSettings?.support_number}
                                onChange={(e) =>
                                    setAppSettings({
                                        ...appSettings,
                                        support_number: e.target.value,
                                    })
                                }
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor=""> Company Address </label>
                            <input
                                type="text"
                                value={appSettings?.site_address}
                                onChange={(e) =>
                                    setAppSettings({
                                        ...appSettings,
                                        site_address: e.target.value,
                                    })
                                }
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <div className="grid gap-6 p-4 border">
                            <div className="flex w-full font-bold justify-between">
                                <div className="">Order Auto Assign</div>
                                <Switch
                                    checked={
                                        appSettings?.auto_assign == 1
                                            ? true
                                            : false
                                    }
                                    value={
                                        appSettings?.auto_assign == 1 ? 0 : 1
                                    }
                                    onChange={(e) =>
                                        setAppSettings({
                                            ...appSettings,
                                            auto_assign: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="grid gap-6 p-4 ">
                                <div className="form-group">
                                    <label htmlFor=""> Distance</label>
                                    <input
                                        className="form-control"
                                        // value={appSettings?.distance}
                                        defaultValue={appSettings?.distance}
                                        onBlur={(e) =>
                                            setAppSettings({
                                                ...appSettings,
                                                distance: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor=""> Distance Unit </label>
                                    <div className="flex">
                                        <Radio.Group
                                            orientation="horizontal"
                                            value={appSettings?.distance_unit}
                                            onChange={(e) =>
                                                setAppSettings({
                                                    ...appSettings,
                                                    distance_unit: e,
                                                })
                                            }
                                        >
                                            <Radio value="km">
                                                <div className="pl-6">km</div>
                                            </Radio>
                                            <Radio value="mile">
                                                <div className="pl-6">Mile</div>
                                            </Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full justify-between">
                                <div>
                                    Otp verification on Pickup and Delivery
                                    Location
                                </div>
                                <Switch
                                    checked={
                                        appSettings?.otp_verify_on_pickup_delivery ==
                                        1
                                            ? true
                                            : false
                                    }
                                    value={
                                        appSettings?.otp_verify_on_pickup_delivery ==
                                        1
                                            ? 0
                                            : 1
                                    }
                                    onChange={(e) =>
                                        setAppSettings({
                                            ...appSettings,
                                            otp_verify_on_pickup_delivery:
                                                e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="grid gap-6 p-4 border ">
                            <div className="py-2 font-bold">Weight Setting</div>
                            <div className="form-group">
                                <label htmlFor=""> Weight</label>
                                <select
                                    className="form-control"
                                    value={appSettings?.weight}
                                    defaultValue={appSettings?.weight}
                                    onChange={(e) =>
                                        setAppSettings({
                                            ...appSettings,
                                            weight: e.target.value,
                                        })
                                    }
                                >
                                    <option value="kg">KG</option>
                                    <option value="lbs">LBS</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="grid gap-6 p-4 border ">
                            <div className="py-4 font-bold">
                                Currency Setting
                            </div>
                            <div className="form-group">
                                <label htmlFor=""> Currency Position</label>
                                <select
                                    className="form-control"
                                    value={appSettings?.currency_position}
                                    defaultValue={
                                        appSettings?.currency_position
                                    }
                                    onChange={(e) =>
                                        setAppSettings({
                                            ...appSettings,
                                            currency_position: e.target.value,
                                        })
                                    }
                                >
                                    <option value="left">Left</option>
                                    <option value="right">Right</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor=""> Currency Symbol</label>
                                <input
                                    className="form-control"
                                    value={appSettings?.currency}
                                    onChange={(e) =>
                                        setAppSettings({
                                            ...appSettings,
                                            currency: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""> Currency Code</label>
                                <input
                                    className="form-control"
                                    value={appSettings?.currency_code}
                                    onChange={(e) =>
                                        setAppSettings({
                                            ...appSettings,
                                            currency_code: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between w-full gap-6 p-4 border font-bold">
                            <div>Vehicle</div>
                            <Switch
                                checked={
                                    appSettings?.is_vehicle_in_order == 1
                                        ? true
                                        : false
                                }
                                value={
                                    appSettings?.is_vehicle_in_order == 1
                                        ? 0
                                        : 1
                                }
                                onChange={(e) =>
                                    setAppSettings({
                                        ...appSettings,
                                        is_vehicle_in_order: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-6 font-bold border mt-4">
                <div className="py-4 "> </div>

                <div className="form-group">
                    <label htmlFor=""> Privacy Policy</label>
                    <textarea
                        rows={10}
                        type="text"
                        value={appSettings?.privacy_policy}
                        onChange={(e) =>
                            setAppSettings({
                                ...appSettings,
                                privacy_policy: e.target.value,
                            })
                        }
                        className="form-control resize-none"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="">Term & Condition</label>
                    <textarea
                        rows={10}
                        type="text"
                        value={appSettings?.term_and_condition}
                        onChange={(e) =>
                            setAppSettings({
                                ...appSettings,
                                term_and_condition: e.target.value,
                            })
                        }
                        className="form-control resize-none"
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default AppSettings;

const NotificationLine = ({ label, title }) => {
    const { appSettings, setAppSettings } = useContext(AppSettingsContext);
    const [settings, setSettings] = useState(appSettings);
    const [checked, setChecked] = useState(true);
    const [checkedF, setCheckedF] = useState(true);

    const handleFirebaseChange = () => {
        if (checkedF) {
            const notifications = appSettings?.notification_settings;
            notifications[label].IS_FIREBASE_NOTIFICATION = 0;
            // console.log(notifications)

            setAppSettings({
                ...appSettings,
                notification_settings: notifications,
            });
            // console.log(appSettings)
        } else {
            const notifications = appSettings?.notification_settings;
            notifications[label].IS_FIREBASE_NOTIFICATION = 1;
            // console.log(notifications)
            setAppSettings({
                ...appSettings,
                notification_settings: notifications,
            });
            //  console.log(appSettings)
        }

        setChecked(!checkedF);
    };

    const handleOnesignalChange = () => {
        if (checked) {
            const notifications = appSettings?.notification_settings;
            notifications[label].IS_ONESIGNAL_NOTIFICATION = 0;
            // console.log(notifications)

            setAppSettings({
                ...appSettings,
                notification_settings: notifications,
            });
            // console.log(appSettings)
        } else {
            const notifications = appSettings?.notification_settings;
            notifications[label].IS_ONESIGNAL_NOTIFICATION = 1;
            // console.log(notifications)
            setAppSettings({
                ...appSettings,
                notification_settings: notifications,
            });
            //  console.log(appSettings)
        }

        setChecked(!checked);
    };

    useEffect(() => {
        setSettings(appSettings);
    }, [appSettings]);

    useEffect(() => {
        if (
            appSettings?.notification_settings[label]
                .IS_ONESIGNAL_NOTIFICATION == 1
        ) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [appSettings]);

    useEffect(() => {
        if (
            appSettings?.notification_settings[label]
                .IS_FIREBASE_NOTIFICATION == 1
        ) {
            setCheckedF(true);
        } else {
            setCheckedF(false);
        }
    }, [appSettings]);

    return (
        <tr>
            <td> {title} </td>

            <td>
                <div className="flex justify-center">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={checked}
                        value={checked}
                        onChange={handleOnesignalChange}
                    />
                </div>
            </td>
            <td>
                <div className="flex justify-center">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={checkedF}
                        value={checkedF}
                        onChange={handleFirebaseChange}
                    />
                </div>
            </td>
        </tr>
    );
};
