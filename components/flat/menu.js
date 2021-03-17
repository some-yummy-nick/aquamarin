import keymirror from 'keymirror'
import ButtonPrint from '@/components/button/print'
import ButtonShare from '@/components/button/share'
import ButtonCompare from '@/components/button/compare'
import Spacer from '@/components/typo/spacer'
import { copyToClipboard } from '@/helpers'

const FlatMenu = ({ onClick, hasFavourite }) => {
  return (
    <div className="menu">
      <Spacer vSpace={25}>
        <ButtonCompare
          text={
            hasFavourite ? 'удалить из<br>сравнения' : 'добавить к<br>сравнению'
          }
          hasFavourite={hasFavourite}
          onClick={() => onClick(FlatMenu.buttons.compare)}
        />
      </Spacer>
      <Spacer vSpace={25}>
        <ButtonPrint onClick={() => onClick(FlatMenu.buttons.print)} />
      </Spacer>
      <Spacer vSpace={25}>
        <ButtonShare
          disabled
          onClick={() => copyToClipboard(window.location)}
        />
      </Spacer>
    </div>
  )
}

FlatMenu.defaultProps = {
  onClick() {},
  onEnter() {},
  onLeave() {},
  hasFavourite: false
}

FlatMenu.buttons = keymirror({
  excursion: null,
  compare: null,
  calc: null,
  print: null,
  share: null
})

export default FlatMenu
