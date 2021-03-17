import statuses from '@/enums/statuses'
import NumberFormat from 'react-number-format'
import Button from '@/components/button'
import Spacer from '@/components/typo/spacer'

const FlatTooltip = props => {
  return (
    <div className="tooltip" onClick={props.onClick}>
      <div className="tooltip-inner">
        <div
          className="status"
          style={{ color: statuses.getTextColor(props.flat.sold_status) }}
        >
          {statuses.getName(props.flat.sold_status)}
        </div>
        <div className="square">
          {props.flat.square || props.flat.apart_square} м
          <small>
            <sup>2</sup>
          </small>
        </div>
        <div className="label">
          {props.flat.apartment_type} № {props.flat.apart_number}
        </div>
        {props.flat.rooms_count > 0 && (
          <div className="label">{props.flat.rooms_count}х-комнатная</div>
        )}
        {props.flat.apartment_cost && (
          <div className="cost">
            <NumberFormat
              value={props.flat.apartment_cost}
              displayType={'text'}
              thousandSeparator={' '}
            />{' '}
            ₽
          </div>
        )}
        {props.onTooltipClick && (
          <Spacer tSpace={15}>
            <Button
              block
              active
              primary
              onClick={ev => {
                ev.stopPropagation()
                props.onTooltipClick(props.flat)
              }}
            >
              Смотреть
            </Button>
          </Spacer>
        )}
        <div className="triangle">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M17.7942 5.5L10 19L2.20577 5.5L17.7942 5.5Z"
              stroke="#B4B4B4"
              fill="white"
            />
            <rect x="1" y="5" width="18" height="1" fill="white" />
          </svg>
        </div>
      </div>
      <style jsx>{`
        .tooltip {
          opacity: 1;
          cursor: pointer;
          background: white;
          padding: 15px 30px;
          border-radius: 0;
          z-index: 10000;
          border: solid 1px #b4b4b4;
          :global(.is-mobile) & {
            padding: 15px;
          }
        }
        .triangle {
          bottom: -17px;
          left: 50%;
          position: absolute;
          transform: translateX(-50%);
        }
        .status {
          font-size: 24px;
          font-weight: 600;
          color: var(--color1);
          text-transform: uppercase;
          :global(.is-mobile) & {
            font-size: 26px;
          }
        }
        .square {
          font-size: 24px;
          font-weight: 600;
          color: #aac800;
          text-transform: uppercase;
          :global(.is-mobile) & {
            font-size: 18px;
          }
        }
        .label,
        .cost {
          margin: 2px 0;
          color: #000;
          font-size: 14px;
        }
        .cost {
        }
      `}</style>
    </div>
  )
}

export default FlatTooltip
