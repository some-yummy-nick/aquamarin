import ReactTooltip from 'react-tooltip'
import classnames from 'classnames'

const TooltipWrapped = props => (
  <div
    className={classnames({
      '__react_component_tooltip-styless': props.styless,
      '__react_component_tooltip-paddingless': props.paddingless,
      '__react_component_tooltip-animated': props.animated
    })}
  >
    <ReactTooltip {...props}>{props.children}</ReactTooltip>
    <style global jsx>{`
      .__react_component_tooltip {
        background: var(--color1) !important;
        z-index: 10000;
      }
      .__react_component_tooltip.place-right:before,
      .__react_component_tooltip.place-right:after {
        border-right-color: var(--color1) !important;
      }
      .__react_component_tooltip-paddingless .__react_component_tooltip {
        padding: 0 !important;
      }
      .__react_component_tooltip-styless .__react_component_tooltip {
        border-radius: 0 !important;
        background: none !important;
        color: var(--color1) !important;
      }
      .__react_component_tooltip-styless .__react_component_tooltip:before,
      .__react_component_tooltip-styless .__react_component_tooltip:after {
        display: none;
      }
      .__react_component_tooltip-animated .__react_component_tooltip .tooltip {
        opacity: 0;
        transition: 0.5s ease;
        transform: translateY(-30px);
        will-change: opacity, translateY;
      }
      .__react_component_tooltip-animated
        .__react_component_tooltip.show
        .tooltip {
        opacity: 1;
        transition: 0.5s ease;
        transform: translateY(0);
      }
      .__react_component_tooltip.show {
        opacity: 1;
      }
    `}</style>
  </div>
)

TooltipWrapped.defaultProps = {
  place: 'right',
  effect: 'solid'
}

export default TooltipWrapped
