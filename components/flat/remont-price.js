import FlatPrice from '@/components/flat/price'
import classnames from 'classnames'
import Spacer from '@/components/typo/spacer'

const FlatLink = ({ flat }) => (
  <div>
    <div className="flat" onClick={() => window.open(`/flat/${flat}`)}>
      Посмотреть квартиру
    </div>
    <style jsx>{`
      .flat {
        font-size: 12px;
        color: var(--color2);
        text-decoration: underline;
        cursor: pointer;
      }
    `}</style>
  </div>
)

const PrintButton = props => (
  <td title="Распечатать">
    <div {...props}>
      <svg width="20" height="18" viewBox="0 0 25 23" fill="none">
        <path
          d="M6.01672 18.0498V22.5623H18.0501V18.0498V15.0415H6.01672V18.0498ZM7.52089 16.5457H16.5459V18.0498H7.52089V16.5457ZM7.52089 19.554H16.5459V21.0582H7.52089V19.554Z"
          fill="currentColor"
        />
        <path
          d="M18.0501 4.5125V0H6.01672V4.5125V7.52083H18.0501V4.5125Z"
          fill="currentColor"
        />
        <path
          d="M21.0583 4.5127H19.5542V7.52103V9.0252H4.5125V7.52103V4.5127H3.00833C1.50417 4.5127 0 6.01686 0 7.52103V15.0419C0 16.546 1.50417 18.0502 3.00833 18.0502H4.5125V15.0419V13.5377H19.5542V15.0419V18.0502H21.0583C22.5625 18.0502 24.0667 16.546 24.0667 15.0419V7.52103C24.0667 6.01686 22.5625 4.5127 21.0583 4.5127Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <style jsx>{`
      td {
        vertical-align: middle;
        text-align: center;
        cursor: pointer;
      }
      svg {
        display: block;
      }
    `}</style>
  </td>
)

export default ({
  prices,
  whiteBox = false,
  standart = false,
  comfort = false,
  onClick = () => {},
  onClickPrint = () => {},
  borderless = false,
  hasPrintButton = false
}) => {
  return (
    <>
      {/* <Spacer bSpace={10}> */}
      {/*   <FlatLink flat={prices.apartment_ui} /> */}
      {/* </Spacer> */}
      <table className={classnames({ borderless })}>
        <tbody>
          {prices.cost_standart_wb > 0 && (
            <tr
              className={classnames({ active: whiteBox && standart })}
              onClick={() => onClick({ whiteBox: true, standart: true })}
            >
              <td>
                <FlatPrice price={prices.cost_standart_wb} size={20} />
              </td>
              <td className="desc">стандарт + обои под покраску</td>
              {hasPrintButton && (
                <PrintButton
                  onClick={ev => {
                    ev.stopPropagation()
                    onClickPrint('cost_standart_wb')
                  }}
                />
              )}
            </tr>
          )}
          {prices.cost_standart > 0 && (
            <tr
              className={classnames({ active: !whiteBox && standart })}
              onClick={() => onClick({ whiteBox: false, standart: true })}
            >
              <td>
                <FlatPrice price={prices.cost_standart} size={20} />
              </td>
              <td className="desc">стандарт + окрашенные стены</td>
              {hasPrintButton && (
                <PrintButton
                  onClick={ev => {
                    ev.stopPropagation()
                    onClickPrint('cost_standart')
                  }}
                />
              )}
            </tr>
          )}
          {prices.cost_comfort_wb > 0 && (
            <tr
              className={classnames({ active: whiteBox && comfort })}
              onClick={() => onClick({ whiteBox: true, comfort: true })}
            >
              <td>
                <FlatPrice price={prices.cost_comfort_wb} size={20} />
              </td>
              <td className="desc">комфорт + обои под покраску</td>
              {hasPrintButton && (
                <PrintButton
                  onClick={ev => {
                    ev.stopPropagation()
                    onClickPrint('cost_comfort_wb')
                  }}
                />
              )}
            </tr>
          )}
          {prices.cost_comfort > 0 && (
            <tr
              className={classnames({ active: !whiteBox && comfort })}
              onClick={() => onClick({ whiteBox: false, comfort: true })}
            >
              <td>
                <FlatPrice price={prices.cost_comfort} size={20} />
              </td>
              <td className="desc">комфорт + окрашенные стены</td>
              {hasPrintButton && (
                <PrintButton
                  onClick={ev => {
                    ev.stopPropagation()
                    onClickPrint('cost_comfort')
                  }}
                />
              )}
            </tr>
          )}
          {prices.cost > 0 && (
            <tr className="no-action">
              <td>
                <FlatPrice price={prices.cost} size={20} />
              </td>
              <td className="desc">без отделки</td>
              {hasPrintButton && (
                <PrintButton
                  onClick={ev => {
                    ev.stopPropagation()
                    onClickPrint('cost_default')
                  }}
                />
              )}
            </tr>
          )}
        </tbody>
        <style jsx>{`
          table {
            width: 100%;
            border-collapse: collapse;
            border: solid 1px #717271;
          }
          td,
          table :global(td) {
            color: #262729;
            font-weight: 500;
            min-height: 40px;
            padding: 7px 14px;
            vertical-align: middle;
            border: solid 1px #717271;
          }
          .desc {
            font-weight: 500;
            font-size: 12px;
            line-height: 130%;
            text-transform: uppercase;
          }
          tr.active td,
          tr.active :global(td) {
            color: var(--color2);
            :global(.price) {
              color: var(--color2);
            }
          }
          td :global(.price) {
            font-size: 20px;
            color: #262729;
          }
          tr {
            cursor: pointer;
          }
          tr:hover td,
          tr:hover :global(td) {
            background: #f8f8f8;
          }
          .no-action {
            cursor: default;
          }
          .borderless,
          .borderless td {
            border: 0;
          }
        `}</style>
      </table>
    </>
  )
}
