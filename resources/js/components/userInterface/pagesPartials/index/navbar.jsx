import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsMenuApp, BsMenuButton } from 'react-icons/bs';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5'
import { Button, Image } from "@nextui-org/react";


const Navbar = () => {

   const [color, setColor] = useState(false);
  const [hidden, setHidden] = useState(true);
  const navigate = useNavigate()

  const handleColor = () => {
    if (window.scrollY >= 100) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  const handleMobileMenu = () => {
    hidden ? setHidden(false) : setHidden(true);
  };

  const handleLogin = () => {
    navigate("/account/register")
  }

  const menu = [
    {
      title: 'Link',
      paths: [
        {
          path: 'subLink',
          to: '/',
        },

        {
          path: 'subLink',
          to: '/',
        },

        {
          path: 'subLink',
          to: '/',
        },

      
      ],
    },

  ];

  useEffect(() => {
    window.addEventListener('scroll', handleColor);
  }, []);

  return (
    <>
      <div className="fixed z-30 w-screen transition ease-in">
        <div
          className={
            !color
              ? 'flex gap-24 items-center bg-[#4caf50] px-8 w-full h-[90px]'
              : 'flex gap-24 items-center bg-white px-8 w-full h-[90px] drop-shadow-lg'
          }
        >
          <Link href={'/'}>
            <div>
              {!color ? (
                <Image src={ '/images/ic_app_logo_color.png'} className="h-8" alt="Logo" />
              ) : (
                <Image
                  src="/images/ic_app_logo_color.png"
                  className="h-8  transition ease-in"
                  alt="Logo"
                />
              )}
            </div>
          </Link>
          {/* Desktop menu */}
          <div className="hidden md:flex justify-end items-center w-full gap-8 h-24">
          <div>
            <Button css={{ background : "#ff5722" }} className="text-black" auto  onPress={handleLogin}>
              create account
            </Button>
          </div>

          <div>
            <Link css={{ background : "#ffffff" }} className={!color ? "text-white" : "text-black"} auto to={"/account/sign-in"}>
              Log in
            </Link>
          </div>

            <div>
              <Link href={'/'}>
                <p className="text-white text-[15px] px-[15px] tracking-[3px] uppercase  font-prompt font-[600]"></p>
              </Link>
            </div>
          </div>
          {/* Mobile menu */}
          <div className="w-full md:hidden">
            <div className="flex justify-end">
              <button onClick={handleMobileMenu}>
                {hidden ? <HiBars3CenterLeft
                  className={
                    !color ? 'text-4xl text-white' : 'text-4xl text-[#DB8E8E]'
                  }
                /> : <IoClose
                className={
                  !color ? 'text-4xl text-white' : 'text-4xl text-[#DB8E8E]'
                }
              />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          hidden
            ? 'hidden'
            : 'fixed top-0 left-0 bottom-0 w-[50vw] z-40 animate-slideInLeft shadow-lg bg-white text-black md:hidden'
        }
      >
        Mobile menu
      </div>
    </>
    );
};

export default Navbar;
