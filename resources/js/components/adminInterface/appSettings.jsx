import { Image, table } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { useEffect } from "react";
import { Switch } from "@mui/material";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppSettingsContext } from "../contexts/appSettings";

const AppSettings = () => {
    const { appSettings, setAppSettings } = useContext(AppSettingsContext);

    const [active, setactive] = useState(
        appSettings?.notification_settings.active
    );
    const [failed, setfailed] = useState(
        appSettings?.notification_settings.failed
    );
    const [delayed, setdelayed] = useState(
        appSettings?.notification_settings.delayed
    );
    const [cancelled, setcancelled] = useState(
        appSettings?.notification_settings.cancelled
    );
    const [completed, setcompleted] = useState(
        appSettings?.notification_settings.completed
    );
    const [courier_arrived, setcourier_arrived] = useState(
        appSettings?.notification_settings.courier_arrived
    );
    const [courier_assigned, setcourier_assigned] = useState(
        appSettings?.notification_settings.courier_assigned
    );
    const [courier_departed, setcourier_departed] = useState(
        appSettings?.notification_settings.courier_departed
    );
    const [courier_transfer, setcourier_transfer] = useState(
        appSettings?.notification_settings.courier_transfer
    );
    const [courier_picked_up, setcourier_picked_up] = useState(
        appSettings?.notification_settings.courier_picked_up
    );
    const [payment_status_message, setpayment_status_message] = useState(
        appSettings?.notification_settings.payment_status_message
    );

    const [openCreate, setOpenCreate] = useState("false");

    const getAppSettingss = async () => {
        
        if (openCreate == "true") {
            const res = await postWithAxios(
                "/api/update-appsetting",
                appSettings
            );

            if (res.message) {
                toast(res.message, {
                    type: "success",
                    hideProgressBar: true,
                });
            }
        }

        if (openCreate == "false") {
            const res = await getWithAxios("/api/get-appsetting");
            setAppSettings(res);
            setOpenCreate("charged")

        }
        // console.log(res);
    };

    const updateAppSettings = async () => {};

    useEffect(() => {
        getAppSettingss();
    }, [appSettings]);

    useEffect(() => {
        if (openCreate == "charged" && appSettings) {
            setOpenCreate("true");
        }

    }, [appSettings]);

    return (
        <div className="">
            <div className="font-bold py-4">App Settings {openCreate} </div>
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
                            {/*  <tr>
                                <td> Active </td>

                                <td>
                                    <div className="flex justify-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox"
                                            checked={
                                                active.IS_ONESIGNAL_NOTIFICATION ==
                                                1
                                                    ? true
                                                    : false
                                            }
                                            value={
                                                active.IS_ONESIGNAL_NOTIFICATION ==
                                                1
                                                    ? 0
                                                    : 1
                                            }
                                            onChange={(e) =>
                                                setactive({
                                                    ...active,
                                                    IS_ONESIGNAL_NOTIFICATION:
                                                        e.target.value,
                                                })
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
                                                active.IS_FIREBASE_NOTIFICATION ==
                                                1
                                                    ? true
                                                    : false
                                            }
                                            value={
                                                active.IS_FIREBASE_NOTIFICATION ==
                                                1
                                                    ? 0
                                                    : 1
                                            }
                                            onChange={(e) =>
                                                setactive({
                                                    ...active,
                                                    IS_FIREBASE_NOTIFICATION:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </td>
                            </tr> */}
                            {appSettings
                                ? Object.keys(
                                      appSettings.notification_settings
                                  )?.map((setting) => (
                                      <tr key={setting}>
                                          <td> {setting} </td>

                                          <td>
                                              <div className="flex justify-center">
                                                  <input
                                                      type="checkbox"
                                                      className="form-checkbox"
                                                      checked={
                                                          appSettings
                                                              .notification_settings[
                                                              setting
                                                          ]
                                                              .IS_ONESIGNAL_NOTIFICATION ==
                                                          1
                                                              ? true
                                                              : false
                                                      }
                                                      value={
                                                          appSettings
                                                              .notification_settings[
                                                              setting
                                                          ]
                                                              .IS_ONESIGNAL_NOTIFICATION ==
                                                          1
                                                              ? 0
                                                              : 1
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
                                                          appSettings
                                                              .notification_settings[
                                                              setting
                                                          ]
                                                              .IS_FIREBASE_NOTIFICATION ==
                                                          1
                                                              ? true
                                                              : false
                                                      }
                                                      value={
                                                          appSettings
                                                              .notification_settings[
                                                              setting
                                                          ]
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
        </div>
    );
};

export default AppSettings;
