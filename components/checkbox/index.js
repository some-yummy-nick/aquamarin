import withColors from '@/components/hocs/with-colors'
import Round from './round'

const Checkbox = props => (
  <div className="checkbox" onClick={props.onClick}>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" stroke="white" strokeWidth="2" />
      {!!props.checked && <circle cx="9" cy="9" r="7" fill="#FFB600" />}
    </svg>

    <style jsx>{`
      .checkbox {
        display: inline-block;
        cursor: pointer;
      }
      img {
        display: block;
      }
    `}</style>
  </div>
)

Checkbox.defaultProps = {
  onClick() {},
  checked: false
}

export default withColors(Checkbox)
export { Round as RoundCheckbox }
