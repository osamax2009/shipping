import { Image, table } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { useEffect } from "react";
import { Switch } from "@mui/material";
import { toast } from "react-toastify";

const AppSettings = () => {
    const [appSettings, setAppSettings] = useState();
    const [openCreate, setOpenCreate] = useState("false");

    const getAppSettingss = async () => {
        const res = await getWithAxios("/api/get-appsetting");
        setAppSettings(res);
        console.log(res);
    };

    const updateAppSettings = async () => {
        const res = await postWithAxios("/api/update-appsetting", appSettings);

        if (res.message) {
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }
    };

    useEffect(() => {
        getAppSettingss();
    }, []);

    useEffect(() => {
        if (openCreate == "true") {
            updateAppSettings();
        }
    }, [appSettings]);

    return (
        <div className="">
            <div className="font-bold py-4">App Settings</div>
            <div className="grid gap-8 md:grid-cols-2">
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
                            {appSettings
                                ? Object.keys(appSettings.notification_settings)?.map((setting) => (
                                      <tr key={setting}>
                                          <td> {setting} </td>

                                          <td>
                                              <div className="flex justify-center">
                                                  <input
                                                      type="checkbox"
                                                      className="form-checkbox"
                                                      checked={
                                                          appSettings.notification_settings[setting]
                                                              .IS_ONESIGNAL_NOTIFICATION ==
                                                          1
                                                              ? true
                                                              : false
                                                      }
                                                      value={
                                                          appSettings.notification_settings[setting]
                                                              .IS_ONESIGNAL_NOTIFICATION
                                                      }
                                                  />
                                              </div>
                                          </td>
                                          <td>
                                              <div className="flex justify-center">
                                                  <input
                                                      type="checkbox"
                                                      className="form-checkbox"
                                                      checked={
                                                          appSettings.notification_settings[setting]
                                                              .IS_FIREBASE_NOTIFICATION ==
                                                          1
                                                              ? true
                                                              : false
                                                      }
                                                      value={
                                                          appSettings.notification_settings[setting]
                                                              .IS_FIREBASE_NOTIFICATION
                                                      }
                                                  />
                                              </div>
                                          </td>
                                      </tr>
                                  ))
                                : null}
                        </tbody>
                    </table>
                </div>
                <div className="grid gap-4">
                    <div>
                        <div className="grid gap-6 p-4 border">
                            <div className="flex w-full font-bold justify-between">
                                <div className="">Order Auto Assign</div>
                                {appSettings?.auto_assign == 1 ? (
                                    <Switch
                                        defaultChecked
                                        onChange={(e) =>
                                            setAppSettings({
                                                ...appSettings,
                                                auto_assign: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <Switch
                                        defaultChecked
                                        onChange={(e) =>
                                            setAppSettings({
                                                ...appSettings,
                                                auto_assign: e.target.value,
                                            })
                                        }
                                    />
                                )}
                            </div>

                            <div className="flex w-full justify-between">
                                <div>
                                    Otp verification on Pickup and Delivery
                                    Location
                                </div>
                                {appSettings?.otp_verify_on_pickup_delivery ==
                                1 ? (
                                    <Switch
                                        defaultChecked
                                        onChange={(e) =>
                                            setAppSettings({
                                                ...appSettings,
                                                otp_verify_on_pickup_delivery:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <Switch
                                        onChange={(e) =>
                                            setAppSettings({
                                                ...appSettings,
                                                otp_verify_on_pickup_delivery:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                )}
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
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between w-full gap-6 p-4 border font-bold">
                            <div>Vehicle</div>
                            {appSettings?.is_vehicle_in_order == 1 ? (
                                <Switch
                                    defaultChecked
                                    onChange={(e) =>
                                        setAppSettings({
                                            ...appSettings,
                                            is_vehicle_in_order: e.target.value,
                                        })
                                    }
                                />
                            ) : (
                                <Switch
                                    onChange={(e) =>
                                        setAppSettings({
                                            ...appSettings,
                                            is_vehicle_in_order: e.target.value,
                                        })
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppSettings;
