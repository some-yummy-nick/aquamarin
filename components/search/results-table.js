import React from 'react'
import SortToggle from '@/components/search/sort-toggle'
import FavouriteIcon from '@/components/icons/favourite-icon'
import PreviewIcon from '@/components/icons/preview-icon'
import NumberFormat from 'react-number-format'
import emitter from '@/emitter'
import keymirror from 'keymirror'
import classnames from 'classnames'
import statuses from '@/enums/statuses'
import { AppConsumer } from '@/components/context/app'

const sort = keymirror({
  // house: null,
  // section: null,
  floor: null,
  apart_number: null,
  rooms_count: null,
  apart_square: null,
  apartment_cost: null,
  status: null
})

class ResultsTable extends React.Component {
  state = {
    sortDir: 'asc',
    sortKey: this.props.cols[0].sort
  }

  static defaultProps = {
    rows: [],
    cols: [
      {
        name: 'Дом №',
        sort: sort.house,
        width: '10%'
      },
      {
        name: 'Подъезд',
        sort: sort.section,
        width: '10%'
      },
      {
        name: 'Этаж',
        sort: sort.floor,
        width: '10%'
      },
      {
        name: 'Квартира №',
        sort: sort.apart_number,
        width: '10%'
      },
      {
        name: 'Комнат',
        sort: sort.rooms_count,
        width: '10%'
      },
      {
        name: 'Площадь, м.кв',
        sort: sort.apart_square,
        align: 'right',
        width: '10%'
      },
      {
        name: 'Стоимость, руб',
        sort: sort.apartment_cost,
        authOnly: true,
        align: 'right',
        width: '10%'
      },
      {
        name: 'Статус',
        sort: sort.status,
        authOnly: false,
        width: '10%'
      }
    ],
    onRowClick() {},
    onSortChange() {},
    onClickFavourite() {}
  }

  toggleSort = sortKey => {
    let sortState
    const { sortDir } = this.state

    if (sortKey === this.state.sortKey) {
      sortState = {
        sortKey,
        sortDir: sortDir === 'asc' ? 'desc' : 'asc'
      }
    } else {
      sortState = {
        sortKey,
        sortDir: 'asc'
      }
    }

    this.setState(sortState)
    this.props.onSortChange(sortState)
  }

  render() {
    const { sortDir, sortKey } = this.state
    const { rows, cols, onRowClick, onClickFavourite, costShown } = this.props
    return (
      <AppConsumer>
        {({ hasFavourite }) => (
          <table>
            <thead>
              <tr>
                <th style={{ width: 10 }} className="tools-headline" />
                {Object.keys(cols).map(key => {
                  const row = cols[key]
                  if (!costShown && row.sort === sort.cost) {
                    return <th />
                  }
                  if (row.authOnly === true) {
                    if (!costShown) return
                  }
                  if (row.authOnly === false) {
                    if (costShown) return
                  }
                  return (
                    <th
                      key={key}
                      className={classnames({
                        [row.sort]: true,
                        'align-right': row.align === 'right'
                      })}
                    >
                      <span
                        className="sort-toggle"
                        onClick={() => this.toggleSort(row.sort)}
                      >
                        {row.name}
                        <SortToggle
                          dir={sortDir}
                          visible={row.sort === sortKey}
                        />
                      </span>
                      <span className="short-name">{row.name}</span>
                    </th>
                  )
                })}
                <th style={{ width: 10 }} className="tools-headline" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr onClick={() => onRowClick(row)} key={index}>
                  <td
                    className="tools"
                    onClick={ev => {
                      ev.stopPropagation()
                    }}
                    onMouseEnter={ev => {
                      // TODO: вынести названия событий
                      const d = ev.target.getBoundingClientRect()
                      emitter.emit('search.showPreview', {
                        position: d.top,
                        planning: row.plan_view,
                        tdheight: d.height
                      })
                    }}
                    onMouseLeave={ev => {
                      // TODO: вынести названия событий
                      emitter.emit('search.showPreview', {
                        position: null,
                        planning: null
                      })
                    }}
                  >
                    <span className="preview">
                      <PreviewIcon />
                    </span>
                  </td>
                  <td>{row.house}</td>
                  <td>{row.section}</td>
                  <td>{row.floor}</td>
                  <td>{row.apart_number}</td>
                  <td>{row.rooms_count}</td>
                  <td className="align-right square">{row.apart_square}</td>
                  <td className="align-right">
                    {costShown && (
                      <span className="cost">
                        <NumberFormat
                          value={row.apartment_cost}
                          displayType={'text'}
                          thousandSeparator={' '}
                        />
                      </span>
                    )}
                  </td>
                  <td className="tools">
                    <span
                      className="marker"
                      style={{
                        background: statuses.getColor(row.status)
                      }}
                    />
                    <span
                      className="favourite"
                      onClick={event => {
                        event.stopPropagation()
                        onClickFavourite(row)
                      }}
                    >
                      <FavouriteIcon
                        hasFavourite={hasFavourite(row.apartment_ui)}
                      />
                    </span>
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
              td:first-child span {
                padding: 0;
                margin-left: 0;
              }
              tr:nth-child(even) td {
                // background: #f8f8f8;
              }
              tr {
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
                  }
                }
              }
              .sort-toggle {
                cursor: pointer;
              }
              .sort-toggle :global(svg) {
              }
              .tools {
                width: 0;
                padding: 0;
                vertical-align: middle;
                white-space: nowrap;
                text-align: right;
                &:last-child {
                  padding-right: 20px;
                }
                :global(.is-mobile) & {
                  display: none;
                }
              }
              .tools-headline {
                :global(.is-mobile) & {
                  display: none;
                }
              }
              .favourite,
              .preview {
                cursor: pointer;
                margin-left: 30px;
                display: inline-block;
                vertical-align: middle;
              }
              .favourite :global(svg),
              .preview :global(svg) {
                display: block;
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
              .tools {
              }
              .tools:hover {
              }
              .short-name {
                display: none;
              }
              .preview {
                color: #c0c0c0;
                &:hover {
                  color: var(--color1);
                }
              }
              .square {
                font-weight: 500;
                font-size: 20px;
                line-height: 23px;
                color: var(--color9);
                padding-right: 1.5em;
              }
              .align-right {
                text-align: right;
                :global(.is-mobile) & {
                  text-align: left;
                }
              }
              .cost {
                padding-right: 1.3em;
              }
            `}</style>
          </table>
        )}
      </AppConsumer>
    )
  }
}

export default ResultsTable
