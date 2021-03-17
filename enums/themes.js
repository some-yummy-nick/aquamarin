import baseEnum from './base-enum'
import keymirror from 'keymirror'
export default Object.assign(
  baseEnum,
  keymirror({
    transparent: null,
    alternate: null,
    default: null,
    dark: null
  })
)
