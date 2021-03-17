import NumberFormat from 'react-number-format'
import statuses from '@/enums/statuses'
import classnames from 'classnames'
import { Component } from 'react'

class FlatsTable extends Component {
  static defaultProps = {
    rows: [],
    cols: [
      {
        name: 'Дом №',
        shortName: 'Дом №',
        width: '20%'
      },
      {
        name: 'Подъезд',
        shortName: 'Под.',
        width: '20%'
      },
      {
        name: 'Этаж',
        shortName: 'Этаж',
        width: '20%'
      },
      {
        name: 'Помещение №',
        shortName: 'Пом. №',
        width: '20%'
      },
      {
        name: 'Стоимость, руб',
        shortName: 'Стоимость, руб',
        alias: 'cost',
        align: 'right',
        width: '20%'
      }
    ],
    onRowClick() {},
    onRequestClick() {}
  }

  render() {
    const { rows, cols, onRowClick, onRequestClick, costShown } = this.props
    return (
      <table>
        <thead>
          <tr>
            {Object.keys(cols).map(key => {
              const row = cols[key]
              if (!costShown && row.alias === 'cost') {
                return <th key={key} />
              }
              return (
                <th
                  key={key}
                  style={{ width: row.width }}
                  className={classnames({
                    'align-right': row.align === 'right'
                  })}
                >
                  <span>{row.name}</span>
                  <span className="short-name">{row.shortName}</span>
                </th>
              )
            })}
            <th className="last" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr onClick={() => onRowClick(row)} key={index}>
              <td>{row.house}</td>
              <td>{row.section}</td>
              <td>{row.floor}</td>
              <td>{row.apart_number}</td>
              <td className="align-right">
                {costShown && (
                  <NumberFormat
                    value={row.apartment_cost}
                    displayType={'text'}
                    thousandSeparator={' '}
                  />
                )}
              </td>
              <td className="last">
                <div
                  className="marker"
                  style={{ background: statuses.getColor(row.status) }}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <style jsx>{`
          table {
            width: 100%;
            border-collapse: collapse;
            :global(.is-mobile) & {
              /* mobile tune */
              th {
                font-size: 12px;
                height: 90px;
                vertical-align: top;
                padding-bottom: 0 !important;
                span {
                  display: none;
                }
                span.short-name {
                  width: 80px;
                  transform: rotate(270deg) translatex(-100%);
                  transform-origin: top left;
                  display: block;
                  margin-right: -100px;
                }
                &:first-child {
                  padding-left: 15px !important;
                }
              }
              td {
                font-size: 12px;
              }
              th,
              td {
                &:first-child {
                  padding-left: 20px;
                }
                &:last-child {
                  padding-left: 20px;
                }
              }
            }
          }
          th {
            font-size: 14px;
            text-align: left;
            user-select: none;
            background: white;
            font-weight: 400;
            padding: 0.65rem;
          }
          td {
            font-size: 16px;
            text-align: left;
            font-weight: 400;
            cursor: pointer;
            padding: 0.75rem;
            padding-top: 16px;
            padding-bottom: 16px;
            border-bottom: solid 1px #e7e7e7;
          }
          tr:nth-child(even) td {
            // background: #fffbf6;
          }
          tr:hover td {
            background: #fffbf6;
          }
          table thead tr:nth-child(1) th {
            top: 0;
            z-index: 10;
            position: sticky;
            :global(.is-mobile) & {
              top: 80px;
            }
            &:after {
              left: 0;
              right: 0;
              bottom: 0;
              height: 1px;
              position: absolute;
              content: '';
              background: #000;
              :global(.is-mobile) & {
                height: 2px;
                background: #000;
              }
            }
          }
          .marker {
            width: 10px;
            height: 10px;
            margin-right: 10px;
            margin-left: 10px;
            position: relative;
            border-radius: 50%;
            display: inline-block;
          }
          .short-name {
            display: none;
          }
          .align-right {
            text-align: right;
          }
          .last {
            width: 0%;
            padding: 0;
          }
        `}</style>
      </table>
    )
  }
}

export default FlatsTable
