import React from 'react'
import withFetch from '@/components/hocs/with-fetch'
import debounce from 'lodash/debounce'
import Error from '@/pages/_error'
import Scroller from '@/components/scroller'
import Content from '@/components/content'
import Spinner from '@/components/spinner'
import Legend from '@/components/search/legend'
import Total from '@/components/search/total'
import PlanningItem from '@/components/search/planning-item'
import NoData from '@/components/search/no-data'
import { ModalConsumer } from '@/components/context/modal'
import { Router } from '@/routes'
import { declOfNum } from '@/helpers'

class Plannings extends React.Component {
  state = {
    total: 0,
    list: {},
    loading: true,
    error: false
  }

  delay = 250

  fetchResults = debounce(async filter => {
    this.setState({ loading: true })

    try {
      // prettier-ignore
      const response = await this.props.request.post('/search/plans').send(filter)
      const { data, meta } = response.body
      this.setState({
        list: data,
        total: data.length,
        loading: false,
        costShown: meta.show_cost
      })
    } catch (error) {
      this.setState({
        loading: false,
        error
      })
    }
  }, this.delay)

  showSimilarFlats = planning => {
    Router.pushRoute('similarFlats', { planning })
  }

  componentDidMount() {
    this.fetchResults(this.props.filter)
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.fetchResults(props.filter)
  }

  render() {
    const { onShowFlat } = this.props
    const { total, list, error, loading } = this.state

    if (error) {
      return <Error error={error} />
    }

    return (
      <div className="wrap flex flex-auto flex-column">
        <div className="wrap flex flex-auto flex-column">
          {loading && (
            <div className="spinner-wrap">
              <Spinner color1 center />
            </div>
          )}
          {total > 0 && (
            <div className="count-wrap">
              <Content auto dtp dbp>
                <div className="flex items-center count-wrap-bord">
                  <div className="flex-auto">
                    <Total
                      total={total}
                      suf={declOfNum(total, [
                        'планировка',
                        'планировки',
                        'планировок'
                      ])}
                    />
                  </div>
                  <div className="flex-none">
                    <Legend showReservOnly="true" />
                  </div>
                </div>
              </Content>
            </div>
          )}
          <div className="body flex-auto">
            <div className="body-inner">
              {total > 0 ? (
                <>
                  <Scroller>
                    <Content auto dtp>
                      <ModalConsumer>
                        {({ showModal }) => (
                          <div>
                            {Object.keys(list).map(key => (
                              <PlanningItem
                                key={key}
                                plan={list[key]}
                                onFlatClick={onShowFlat}
                                onSimilarClick={this.showSimilarFlats}
                                onRequestClick={() => {}}
                                costShown={this.state.costShown}
                              />
                            ))}
                          </div>
                        )}
                      </ModalConsumer>
                    </Content>
                  </Scroller>
                </>
              ) : (
                !loading && <NoData />
              )}
            </div>
          </div>
        </div>
        <style jsx>{`
          .body,
          .wrap {
            position: relative;
            overflow: hidden;
          }
          .body-inner {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            position: absolute;
          }
          .count-wrap {
            padding: 35px 0 0 0;
          }
          .count-wrap-bord {
            padding-bottom: 15px;
          }
          .spinner-wrap {
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            position: absolute;
            background: rgba(255, 255, 255, 0.5);
            z-index: 100;
          }
        `}</style>
      </div>
    )
  }
}

export default withFetch(Plannings)
