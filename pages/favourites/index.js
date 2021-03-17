import React from 'react'
import withFetch from '@/components/hocs/with-fetch'
import Error from '@/pages/_error'
import keymirror from 'keymirror'
import { Router } from '@/routes'
import Title from '@/components/typo/title'
import Content from '@/components/content'
import Scroller from '@/components/scroller'
import Label from '@/components/favourites/label'
import Placeholder from '@/components/favourites/placeholder'
import Page from '@/components/page'
import ButtonPrint from '@/components/button/print'
import ButtonShare from '@/components/button/share'
import Spacer from '@/components/typo/spacer'
import NumberFormat from 'react-number-format'
import Spinner from '@/components/spinner'
import classnames from 'classnames'
import { Link } from '@/routes'
import { AppConsumer, AppContext } from '@/components/context/app'
import { copyToClipboard } from '@/helpers'
import { withRouter } from 'next/router'

const KEYS = keymirror({
  square: null,
  house: null,
  section: null,
  floor: null,
  apart_number: null,
  rooms_count: null,
  apartment_cost: null
})

class Favourites extends React.Component {
  state = {
    index: false,
    loading: true,
    error: false,
    favourites: []
  }

  static contextType = AppContext

  async fetchResults() {
    const { shareId } = Router.query
    this.setState({ loading: true })

    try {
      if (shareId) {
        const response = await this.props.request.get('/favorites/' + shareId)
        this.setState({ favourites: response.body.data.placements })
      } else {
        // prettier-ignore
        const response = await this.props.request.post('/genplan/placements').send({
          placements: this.context.favouritesIds
        })
        this.setState({ favourites: response.body.data })
      }
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ loading: false })
    }
  }

  componentDidMount() {
    const { shareId } = Router.query
    const { favouritesIds } = this.context
    if (shareId || (favouritesIds && favouritesIds.length > 0)) {
      this.fetchResults()
    } else {
      this.setState({ loading: false })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { shareId } = Router.query
    if (shareId && shareId !== nextProps.props.router.query.shareId) {
      this.fetchResults()
    }
  }

  getShareHash = async flatsIds => {
    // prettier-ignore
    return (await this.props.request.post('/favorites/placements').send({
      placements: flatsIds
    })).body.data.hash
  }

  render() {
    const shareId = this.props.router.query.shareId
    const { favourites, loading, error, index } = this.state

    if (error) {
      return <Error error={error} />
    }

    if (loading) {
      return <Spinner center color2 />
    }

    return (
      <AppConsumer>
        {({ favouritesIds, removeFavourite, user }) => {
          return (
            <Page footer={false}>
              <Content flexible paddingless relative>
                <div className="flex flex-column flex-auto">
                  <div className="flex-none">
                    <Content dbp>
                      <div className="flex">
                        <div className="flex-auto">
                          <Title marginless>Сравнение квартир</Title>
                        </div>
                        {favourites.length > 0 && (
                          <div className="flex-none wrapless">
                            <Spacer hSpace={shareId ? 0 : 70} inline>
                              <ButtonPrint
                                onClick={() => {
                                  let printUrl = '/favourites/print'
                                  if (shareId) {
                                    printUrl += '?shareId=' + shareId
                                  }
                                  window.open(printUrl)
                                }}
                              />
                            </Spacer>
                            {shareId ? null : (
                              <div
                                style={{
                                  top: -2,
                                  position: 'relative',
                                  display: 'inline-block'
                                }}
                              >
                                <ButtonShare
                                  disabled
                                  onClick={async () => {
                                    try {
                                      const hash = await this.getShareHash(
                                        favouritesIds
                                      )
                                      copyToClipboard(
                                        location.host +
                                          '/favourites/?shareId=' +
                                          hash
                                      )
                                    } catch (e) {
                                      alert('Ошибка')
                                    }
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </Content>
                  </div>
                  {favourites.length > 0 ? (
                    <div className="flex flex-auto">
                      <div className="wrap-y-padding flex-none">
                        <div className="leading col">
                          <Placeholder center>
                            <Label style={{ borderColor: 'transparent' }}>
                              Планировка
                            </Label>
                          </Placeholder>
                          <Label even>
                            Площадь, м<sup>2</sup>
                          </Label>
                          <Label>Дом №</Label>
                          <Label even>Подъезд</Label>
                          <Label>Этаж</Label>
                          <Label even>Квартира №</Label>
                          <Label>Комнат</Label>
                          {user && <Label even>Стоимость, руб.</Label>}
                        </div>
                      </div>
                      <div className="flex-auto scroller">
                        <div className="scroller-wrap">
                          <Scroller inverse>
                            <div className="wrap-y-padding scroller-inner flex">
                              {favourites.map((flat, index) => (
                                <div className="col" key={index}>
                                  <div
                                    className="col-wrap"
                                    onClick={() =>
                                      Router.pushRoute('showFlat', {
                                        flat: flat.apartment_ui
                                      })
                                    }
                                  >
                                    {shareId ? null : (
                                      <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 15 15"
                                        fill="currentColor"
                                        onClick={async ev => {
                                          ev.stopPropagation()
                                          await removeFavourite(
                                            flat.apartment_ui
                                          )
                                          this.setState({
                                            favourites: this.state.favourites.filter(
                                              f =>
                                                f.apartment_ui !==
                                                flat.apartment_ui
                                            )
                                          })
                                        }}
                                      >
                                        {/* prettier-ignore */}
                                        <rect width="19.4454" height="1.76776" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 15 13.75)" fill="currentColor"/>
                                        {/* prettier-ignore */}
                                        <rect y="13.75" width="19.4454" height="1.76776" transform="rotate(-45 0 13.75)" fill="currentColor"/>
                                      </svg>
                                    )}
                                  </div>
                                  <Placeholder>
                                    <img
                                      src={flat.plan_view}
                                      className="render"
                                    />
                                  </Placeholder>
                                  {Object.keys(KEYS).map((key, index) => {
                                    if (key == 'apartment_cost' && !user) return
                                    return (
                                      <Label even={(index + 1) % 2} key={key}>
                                        {key == 'apartment_cost' ? (
                                          <span style={{ color: 'black' }}>
                                            <NumberFormat
                                              value={flat[key]}
                                              displayType={'text'}
                                              thousandSeparator={' '}
                                            />
                                          </span>
                                        ) : (
                                          <span
                                            className={classnames('label-key', {
                                              [key]: true
                                            })}
                                          >
                                            {flat[key]}
                                          </span>
                                        )}
                                      </Label>
                                    )
                                  })}
                                </div>
                              ))}
                            </div>
                          </Scroller>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-auto">
                      <Content dtp>
                        <p>
                          У вас нет избранных квартир, воспользуйтесь{' '}
                          <Link to="search" params={{ page: 'params' }}>
                            <a>подбором квартир</a>
                          </Link>
                        </p>
                      </Content>
                    </div>
                  )}
                </div>
                <style jsx>{`
                  .col {
                    cursor: pointer;
                    min-height: 100%;
                    min-width: 280px;
                    max-width: 280px;
                    position: relative;
                    box-sizing: border-box;
                  }
                  .col-wrap {
                    top: 0;
                    right: -1px;
                    bottom: 0;
                    left: 0;
                    position: absolute;
                    z-index: 10;
                    border: solid 1px transparent;
                    &:hover {
                      // border-color: #e2e2e2;
                      svg {
                        // display: block;
                        // color: var(--color6);
                      }
                    }
                    svg {
                      top: 15px;
                      right: 15px;
                      cursor: pointer;
                      // display: none;
                      position: absolute;
                      &:hover {
                        color: var(--color9);
                      }
                    }
                  }
                  .col:after {
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 1px;
                    content: '';
                    position: absolute;
                    pointer-events: none;
                    background: #e2e2e2;
                  }
                  .scroller {
                    position: relative;
                    .col:first-child {
                      border-left: solid 1px #e2e2e2;
                    }
                  }
                  .scroller-wrap {
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    position: absolute;
                  }
                  .scroller-inner {
                    box-sizing: border-box;
                  }
                  .wrap-y-padding {
                    padding-top: 2rem;
                    padding-bottom: 2rem;
                  }
                  .rows {
                    left: 0;
                    right: 0;
                    position: absolute;
                    top: calc(220px + 3rem);
                    pointer-events: none;
                  }
                  .row {
                    width: 100%;
                    height: 45px;
                    opacity: 0;
                    position: absolute;
                    pointer-events: none;
                    // background: var(--color5);
                  }
                  .active {
                    opacity: 1;
                  }
                  .leading {
                    z-index: 1;
                    position: relative;
                    &:after {
                      display: none;
                    }
                  }
                  .render {
                    width: 100%;
                    height: 90%;
                    object-fit: contain;
                    position: absolute;
                    top: 5%;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: block;
                    object-position: center;
                  }
                  .label-key {
                    color: #000;
                  }
                  .square {
                    color: var(--color1);
                    font-size: 24px;
                    font-weight: 500;
                  }
                `}</style>
              </Content>
            </Page>
          )
        }}
      </AppConsumer>
    )
  }
}

export default withFetch(withRouter(Favourites))
