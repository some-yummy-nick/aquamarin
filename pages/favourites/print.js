import { useContext } from 'react'
import withFetch from '@/components/hocs/with-fetch'
import Title from '@/components/typo/title'
import { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import { AppConsumer, AppContext } from '@/components/context/app'
import dayjs from '@/dayjs'
import Spacer from '@/components/typo/spacer'
import keymirror from 'keymirror'
import { Router } from '@/routes'
import Error from '@/pages/_error'
import Spinner from '@/components/spinner'

const Print = ({ request }) => {
  const [state, setState] = useState({
    created: null,
    sitename: null,
    offices: [],
    favourites: [],
    error: null,
    loading: true
  })

  const { favouritesIds } = useContext(AppContext)

  const KEYS = keymirror({
    square: null,
    house: null,
    section: null,
    floor: null,
    apart_number: null,
    rooms_count: null,
    apartment_cost: null
  })

  useEffect(() => {
    const initState = async () => {
      const { shareId } = Router.query

      const fetchFavourites = async () => {
        // prettier-ignore
        if (shareId) return (await request.get('/favorites/' + shareId)).body.data.placements
        // prettier-ignore
        const response = await request.post('/genplan/placements').send({ placements: favouritesIds })
        return response.body.data
      }

      try {
        setState({
          ...state,
          sitename: window.location.host,
          created: dayjs().format('DD-MM-YYYY HH:mm:ss'),
          offices: (await request.get('/contacts')).body.data,
          favourites: await fetchFavourites(),
          loading: false
        })
      } catch (error) {
        setState({ ...state, error, loading: false })
        throw error
      }
    }

    if (process.env.NODE_ENV !== 'development') {
      setTimeout(window.print, 1000)
    }

    initState()
  }, [])

  if (state.error) {
    return <Error error={state.error} />
  }

  if (state.loading) {
    return <Spinner center color2 />
  }

  return (
    <AppConsumer>
      {({ user }) => (
        <div className="wrap-print">
          <div className="print">
            <div className="print-head">
              <div className="flex items-center">
                <div className="flex-auto">
                  <div className="print-logo flex">
                    <img
                      src={require('@/static/branding/logo-dark.svg')}
                      height="50"
                    />
                    {/* <div className="next-step"> */}
                    {/*   2 <span>очередь</span> */}
                    {/* </div> */}
                  </div>
                </div>
                {user && user.manager && (
                  <div className="flex-none">
                    <div className="flex">
                      {user.manager.avatar_url && (
                        <div>
                          <img
                            src={user.manager.avatar_url}
                            className="manager-info-avatar flex-auto"
                          />
                        </div>
                      )}
                      <div className="flex-auto">
                        <div className="manager-info-title">Ваш менеджер:</div>
                        <div className="manager-info">{user.name}</div>
                        <div className="manager-info-title">Телефон:</div>
                        <div className="manager-info">
                          {user.manager.phone_formated}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="print-body">
              <div className="print-body-wrap">
                <Spacer tSpace={40}>
                  <Title small>Сравнение квартир</Title>
                </Spacer>
                <table className="table">
                  <thead>
                    <tr>
                      <th>№ п/п</th>
                      <th>
                        Площадь, м<sup>2</sup>
                      </th>
                      <th>Дом №</th>
                      <th>Подъезд</th>
                      <th>Этаж</th>
                      <th>Кв. №</th>
                      <th>Комнат</th>
                      {user && <th>Стоимость, руб.</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {state.favourites.map((flat, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        {Object.keys(KEYS).map((key, index) => {
                          if (key == 'apartment_cost' && !user) return
                          return (
                            <td key={key}>
                              {key == 'apartment_cost' ? (
                                <NumberFormat
                                  value={flat[key]}
                                  displayType={'text'}
                                  thousandSeparator={' '}
                                />
                              ) : (
                                flat[key]
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="print-foot">
              <div className="flex">
                <div className="flex-none">
                  <div className="flex">
                    <img
                      src={require('@/static/branding/office-marker.svg')}
                      className="flex-none"
                      height={55}
                    />
                    <div className="flex-auto print-company">
                      Компания "Унистрой"
                      <br />
                      https://unistroyrf.ru
                      <br />
                      http://vesna-kzn.ru
                      <div className="print-company-phone">
                        +7 (843) 295-53-83
                      </div>
                    </div>
                  </div>
                  <span className="print-date">
                    Сформировано: {state.created}
                  </span>
                </div>
                <div className="flex-auto">
                  <div className="contacts">
                    {state.offices.map((office, _) => (
                      <div key={_}>
                        <b>{office.address_full}</b>, {office.work_time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <style jsx>{`
            @page {
              margin: 0;
              size: A4;
            }
            .wrap-print {
              width: 100%;
              bottom: 0;
              position: absolute;
              top: 0;
              display: flex;
              flex: 1;
            }
            .print {
              padding: 0.5cm 1cm;
              max-width: 210mm;
              height: 295mm;
              margin: auto;
              display: flex;
              flex: 1;
              flex-direction: column;
              box-sizing: border-box;
            }
            .print-body {
              flex: 1;
              display: flex;
              flex-direction: column;
            }
            .print-head {
              padding: 10px 0;
              border-bottom: solid 2px black;
            }
            .print-foot {
              padding: 10px 0;
              border-top: solid 2px black;
            }
            .print-company {
              font-size: 10px;
              margin-left: 13px;
            }
            .print-company-phone {
              font-weight: bold;
              font-size: 12px;
            }
            .print-body-wrap {
              flex: 1;
              display: flex;
              flex-direction: column;
            }
            .print-sitename {
              font-size: 14px;
              font-weight: 500;
            }
            .print-date {
              color: #6e6e6e;
              font-size: 9px;
            }
            .manager-info {
              font-weight: bold;
              text-align: left;
              line-height: 1.2;
            }
            .manager-info-title {
              font-size: 13px;
            }
            .manager-info-avatar {
              margin-right: 10px;
              height: 75px;
            }
            .phone {
              margin-top: 0.35rem;
            }
            .contacts {
              font-size: 11px;
              padding-left: 1rem;
            }
            .next-step {
              font-family: var(--heading-font);
              text-transform: uppercase;
              font-size: 39px;
              font-weight: bold;
              margin-left: 10px;
              margin-top: 9px;
              color: var(--color2);
            }
            .next-step span {
              font-size: 14px;
              color: var(--color4);
            }
            .table {
              width: 100%;
              border-collapse: collapse;
              th {
                padding: 10px 0;
                text-align: left;
                font-weight: 500;
                vertical-align: bottom;
                border-bottom: solid 2px black;
              }
              td {
                padding: 10px 0;
                border-bottom: solid 1px black;
              }
            }
          `}</style>
        </div>
      )}
    </AppConsumer>
  )
}

export default withFetch(Print)
