import NoSSR from 'react-no-ssr'
import withFetch from '@/components/hocs/with-fetch'
import Title from '@/components/typo/title'
import { useState, useEffect } from 'react'
import dayjs from '@/dayjs'
import GenplanScheme from '@/components/genplan/scheme'
import Compass from '@/components/compass'
import StageFullScheme from '@/components/stage/full-scheme'
import NumberFormat from 'react-number-format'
import { AppConsumer } from '@/components/context/app'
import { Router } from '@/routes'
import Spacer from '@/components/typo/spacer'
import get from 'lodash/get'
import ReserveInfo from '../../components/flat/reserv-info'

const Print = props => {
  const building = props.building

  const [state, setState] = useState({ created: null, sitename: null })
  const [showSecondPage, setShowSecondPage] = useState(showSecondPage)

  const [mebeled, setMebeled] = useState(mebeled)
  useEffect(() => {
    setState({
      sitename: window.location.host,
      created: dayjs().format('DD-MM-YYYY HH:mm:ss')
    })

    if (process.env.NODE_ENV !== 'development') {
      setTimeout(window.print, 1000)
    }
  }, [])

  const stageSchemeStruct = {
    flats: props.current_floor.placements,
    scheme: props.current_floor.floor_plan
  }

  const PrintHeader = props => {
    const user = props.user
    return (
      <div className="flex items-center">
        <div className="flex-auto">
          <div className="print-logo flex">
            <img src={require('@/static/branding/logo-dark.svg')} height="50" />
          </div>
        </div>
        {user && user.manager && (
          <div className="flex-none">
            <div className="flex">
              {user.manager.avatar_url && (
                <div onClick={() => setShowSecondPage(!showSecondPage)}>
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
        <style jsx>{`
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
        `}</style>
      </div>
    )
  }

  return (
    <NoSSR>
      <AppConsumer>
        {({ user }) => (
          <div className="wrap-print">
            <div className="print">
              <div className="print-head">
                <PrintHeader user={user} />
              </div>
              <div className="print-body">
                <div className="print-body-wrap">
                  <div className="flex print-body-row">
                    <div className="flex-auto relative">
                      <div
                        className="render"
                        onClick={() => setMebeled(!mebeled)}
                      >
                        {mebeled ? (
                          <img
                            className="mebel"
                            src={
                              props.current_floor.placement.plan_type
                                .render_view_url
                            }
                          />
                        ) : (
                          <img
                            className="empty"
                            src={
                              props.current_floor.placement.plan_type
                                .render_plan_url
                            }
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex-none flex items-center">
                      <div className="wrap-right-col">
                        <Spacer vSpace={5}>
                          <Title marginless extraSmall>
                            {props.current_floor.placement.apartment_type} №{' '}
                            {props.current_floor.placement.apart_number}
                          </Title>
                          <div className="gray-text">
                            {props.current_floor.placement.rooms_count}-х
                            комнатная
                          </div>
                        </Spacer>
                        <Spacer vSpace={5}>
                          <Title marginless extraSmall>
                            {props.current_floor.placement.square} м{' '}
                            <sup>2</sup>
                          </Title>
                          <div className="gray-text">Площадь</div>
                        </Spacer>
                        {building.finish_date && (
                          <Spacer vSpace={5}>
                            <Title marginless extraSmall>
                              {building.finish_date}
                            </Title>
                            <div className="gray-text">Срок передачи</div>
                          </Spacer>
                        )}
                        {(props.current_floor.placement.apartment_cost && (
                          <Spacer vSpace={5}>
                            <Title marginless extraSmall>
                              {props.current_floor.placement.apartment_cost && (
                                <div>
                                  <NumberFormat
                                    value={
                                      props.current_floor.placement
                                        .apartment_cost
                                    }
                                    displayType={'text'}
                                    thousandSeparator={' '}
                                  />{' '}
                                  ₽
                                </div>
                              )}
                            </Title>
                            <div className="gray-text">Стоимость</div>
                          </Spacer>
                        )) ||
                          null}
                        {get(
                          props,
                          'current_floor.placement.apartment_cost_remont',
                          []
                        ).map(remont => {
                          const key = Object.keys(remont)[0]
                          const val = Object.values(remont)[0]
                          if (val > 0)
                            return (
                              <Spacer vSpace={5} key={key}>
                                <Title marginless extraSmall>
                                  <NumberFormat
                                    value={val}
                                    displayType={'text'}
                                    thousandSeparator={' '}
                                  />{' '}
                                  ₽
                                </Title>
                                <div className="gray-text">{key}</div>
                              </Spacer>
                            )
                          else return null
                        })}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="compass">
                        <Compass deg={props.current_floor.compas_degree} />
                      </div>
                    </div>
                  </div>
                  <div className="flex print-body-row">
                    <div className="flex flex-auto relative">
                      <div className="stage-scheme-wrap flex flex-auto flex-column">
                        <div className="flex flex-auto flex-column">
                          <div className="flex-none">
                            <div className="title">
                              План {props.current_floor.placement.floor} этажа
                            </div>
                          </div>
                          <div className="flex flex-auto relative">
                            <StageFullScheme
                              autoScale={false}
                              onClick={flat => {
                                Router.pushRoute('print', {
                                  flat: flat.apartment_ui
                                })
                              }}
                              showStatuses={false}
                              viewBox={props.current_floor.floor_plan_viewbox}
                              selected={
                                props.current_floor.placement.apartment_ui
                              }
                              {...stageSchemeStruct}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="genplan-scheme-wrap flex-none flex basis-4">
                        <div className="flex flex-auto flex-column">
                          <div className="flex-none">
                            <div className="title">
                              Дом № {props.current_floor.placement.house},
                              Подъезд {props.current_floor.placement.section}
                              {props.current_floor.placement.is_through ==
                                1 && (
                                <span className="gray-text"> (сквозной)</span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-auto">
                            <GenplanScheme
                              autoScale={false}
                              onClickSection={() => {}}
                              selected={{
                                [props.current_floor.placement.house]: [
                                  props.current_floor.placement.section
                                ]
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ReserveInfo />
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
                        https://{location.hostname}
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
                      {props.offices.map((office, _) => (
                        <div key={_}>
                          <b>{office.address_full}</b>, {office.work_time}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showSecondPage && (
              <>
                <div className="page-break" />
                <div className="print print2">
                  <div className="print-head">
                    <PrintHeader user={user} />
                  </div>
                  <div className="print-body">
                    <div className="print-body-wrap">
                      <div>
                        {!mebeled ? (
                          <img
                            className="mebel"
                            src={
                              props.current_floor.placement.plan_type
                                .render_view_url
                            }
                          />
                        ) : (
                          <img
                            className="empty"
                            src={
                              props.current_floor.placement.plan_type
                                .render_plan_url
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
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
              }
              .print {
                padding: 0.5cm 1cm;
                max-width: 210mm;
                height: 295mm;
                overflow: hidden;
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
              .print-foot-text {
                text-align: right;
              }
              .print-company {
                font-size: 10px;
                margin-left: 13px;
              }
              .print-company-phone {
                font-weight: bold;
                font-size: 12px;
              }
              .print-title,
              .print-body-text {
                margin: 14px 0;
                font-size: 20px;
                font-weight: 600;
                text-align: center;
              }
              .print-body-wrap {
                flex: 1;
                display: flex;
                flex-direction: column;
              }
              .print-body-body {
                flex: 1;
                position: relative;
              }
              .print-body-foot {
                position: relative;
                flex: 1;
              }
              .render,
              .scheme {
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                position: absolute;
              }
              .print2 .print-body-wrap img,
              .render img {
                max-width: 100%;
                max-height: 100%;
              }
              .print-sitename {
                font-size: 14px;
                font-weight: 500;
              }
              .print-date {
                color: #6e6e6e;
                font-size: 9px;
              }
              .currflat {
                opacity: 0.3;
              }
              .wrapless {
                white-space: nowrap;
              }
              .relative {
                position: relative;
              }
              .print-body-row {
                flex: 1;
                padding-top: 1rem;
                padding-bottom: 1rem;
                box-sizing: border-box;
              }
              .print-body-row + .print-body-row {
                border-top: solid 1px #6e6e6e;
              }
              .gray-text {
                font-size: 12px;
                color: #6e6e6e;
              }
              .scheme :global(.scheme) {
                padding: 0;
              }
              .wrap-right-col {
                padding-left: 2rem;
              }
              .title {
                font-size: 18px;
                font-weight: 500;
                text-align: center;
                margin-bottom: 1rem;
                text-transform: uppercase;
              }
              .compass {
                margin-top: 4rem;
                text-align: center;
              }
              .large-text {
                font-weight: bold;
              }
              .phone {
                margin-top: 0.35rem;
              }
              .genplan-scheme-wrap :global(.wrap) {
                width: 100%;
              }
              .contacts {
                font-size: 11px;
                padding-left: 1rem;
              }
              .stage-scheme-wrap {
                padding-right: 1cm;
              }
              .genplan-scheme-wrap {
                padding-left: 1cm;
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
              .page-break {
                page-break-after: always;
              }
            `}</style>
          </div>
        )}
      </AppConsumer>
    </NoSSR>
  )
}

Print.getInitialProps = async ({ query, request }) => {
  const params = { apartment_ui: query.flat, remont: query.remont, print: 1 }

  const response1 = await request.get('/genplan/placement').query(params)
  const response2 = await request.get('/contacts')

  const { meta, data } = response1.body

  return { ...meta, ...data, offices: response2.body.data }
}

export default withFetch(Print)
