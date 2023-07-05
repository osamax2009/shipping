
import { Switch } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { BsSun, BsMoon } from 'react-icons/bs'

const ThemeSwitcher = () => {
  
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div>
      <Switch
        color={'warning'}
        size={"lg"}
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        iconOn={<BsMoon className="dark:text-black" />}
        iconOff={<BsSun className="text-black" />}
      />
    </div>
  )
}

export default ThemeSwitcher