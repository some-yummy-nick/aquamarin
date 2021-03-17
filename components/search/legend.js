import keymirror from 'keymirror'
import statuses from '@/enums/statuses'

const Legend = props => (
  <div className="flex legend justify-center">
    {props.elements.includes(Legend.elements.sold) && !props.showReservOnly && (
      <div className="item flex items-center">
        <span
          className="marker"
          style={{ background: statuses.getColor(statuses.sold) }}
        />
        <div className="text">{statuses.getName(statuses.sold)}</div>
      </div>
    )}
    {props.elements.includes(Legend.elements.reserved) && (
      <div className="item flex items-center">
        <span
          className="marker"
          style={{ background: statuses.getColor(statuses.reserved) }}
        />
        <div className="text">{statuses.getName(statuses.reserved)}</div>
      </div>
    )}
    {props.elements.includes(Legend.elements.sale) && !props.showReservOnly && (
      <div className="item flex items-center">
        <span
          className="marker sale"
          style={{ background: statuses.getColor(statuses.sale) }}
        />
        <div className="text">{statuses.getName(statuses.sale)}</div>
      </div>
    )}
    <style jsx>{`
      .marker {
        width: 10px;
        height: 10px;
        margin-right: 5px;
        position: relative;
        border-radius: 50%;
        display: inline-block;
        border: solid 1px transparent;
      }
      .text {
        font-size: 14px;
        color: #333333;
        :global(.is-mobile) & {
          font-size: 10px;
        }
      }
      .item + .item {
        margin-left: 1rem;
      }
      .sale {
        border-color: black;
      }
    `}</style>
  </div>
)

Legend.elements = keymirror({
  sold: null,
  reserved: null,
  sale: null
})

Legend.defaultProps = {
  elements: [
    Legend.elements.sold,
    Legend.elements.reserved,
    Legend.elements.sale
  ]
}

export default Legend
