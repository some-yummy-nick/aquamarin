import themes from '@/enums/themes'
import { createContext } from 'react'

const ThemeContext = createContext(themes.default)

export { ThemeContext }
