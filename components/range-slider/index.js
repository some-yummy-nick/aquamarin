import InputRange from 'react-input-range'
import classnames from 'classnames'
import 'react-input-range/lib/css/index.css'

const RangeSlider = props => (
  <div
    className={classnames({
      'input-range--wrap': props.wrap,
      'without-tooltip': props.disableTooltip,
      'with-gradusnik': props.showGradusnik
    })}
  >
    <InputRange {...props} />
    <style global jsx>{`
      .input-range--wrap {
        padding: 2rem 0.5rem 0.5rem;
      }
      .input-range__label--min,
      .input-range__label--max {
        display: none;
      }
      .input-range__label--value {
        width: 50px;
        top: -40px;
        left: -22px;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        color: #000;
      }
      .input-range__track {
        height: 2px;
        background: #dddddd;
      }
      .input-range__slider {
        border-width: 2px;
        border-color: #000;
        background: white;
        transform: rotate(45deg) !important;
      }
      .input-range__slider:hover {
        background: var(--color1);
        border-color: var(--color1);
      }
      .input-range__slider:active {
        transform: scale(1);
        border-color: var(--color1);
      }
      .input-range__slider-container,
      .input-range__track {
        // transition: 0.1s;
        transition: none;
      }
      .without-tooltip .input-range__label--value {
        display: none;
      }
      .with-gradusnik .input-range__track--active {
        background: var(--color1);
      }
      .input-range__label {
        font-family: inherit;
      }
      .input-range__label-container {
        left: 0;
        // display: block;
        // transform: translateX(-20%);
      }
    `}</style>
  </div>
)

RangeSlider.defaultProps = {
  onChange() {},
  allowSameValues: true,
  maxValue: 20,
  minValue: 0,
  value: 0
}

export default RangeSlider
