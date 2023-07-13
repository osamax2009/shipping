import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

const ThemeSwitcher = () => {
    // const { theme, setTheme } = useTheme()

    const [theme, setTheme] = useState('');

    useEffect(() => {
       
        if (localStorage.getItem("theme")) {
            setTheme(localStorage.getItem("theme"));
        }else{
          setTheme("light")
        }
    }, []);

    useEffect(() => {
        document.body.className =
            theme +
            " hold-transition font-sans font-nunito overflow-x-hidden bg-[#f4f6f9]";
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div>
            <Switch
                color={"warning"}
                size={"lg"}
                checked={theme == "dark" ? true : false}
                onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
                iconOn={<BsMoon className="dark:text-black" />}
                iconOff={<BsSun className="text-black" />}
            />
        </div>
    );
};

export default ThemeSwitcher;
