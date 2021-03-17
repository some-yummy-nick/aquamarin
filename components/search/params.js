import React from "react"
import Error from "@/pages/_error"
import withFetch from "@/components/hocs/with-fetch"
import Legend from "@/components/search/legend"
import Scroller from "@/components/scroller"
import Content from "@/components/content"
import Total from "@/components/search/total"
import ResultsTable from "@/components/search/results-table"
import NoData from "@/components/search/no-data"
import Spinner from "@/components/spinner"
import debounce from "lodash/debounce"
import { AppConsumer } from "@/components/context/app"

class Params extends React.Component {
  state = {
    page: 1,
    total: 0,
    list: [],
    loading: false,
    error: false,
    sfield: "rooms_count",
    stype: "asc",
    running: false,
    fetched: false
  }

  delay = 250
  countItems = 100

  fetchResults = debounce(async filter => {
    if (this.state.loading || this.state.fetched) {
      return
    }

    this.setState({
      loading: true,
      running: true,
      fetched: false
    })

    const { page, sfield, stype, list } = this.state
    try {
      // prettier-ignroe
      const response = await this.props.request.post("/search/list").send({
        ...filter,
        sortBy: sfield,
        sortDesc: stype,
        count: this.countItems,
        page
      })

      const { data, meta } = response.body
      this.setState({
        list: [...list, ...data],
        total: meta.total,
        loading: false,
        page: page + 1,
        fetched: 0 === data.length,
        showCost: meta.show_cost
      })
    } catch (error) {
      this.setState({
        loading: false,
        error
      })
    }
  }, this.delay)

  changeSort = ({ sortDir, sortKey }) => {
    const { filter } = this.props
    this.setState(
      {
        sfield: sortKey,
        stype: sortDir,
        loading: false,
        page: 1,
        list: [],
        fetched: false
      },
      () => this.fetchResults(filter)
    )
  }

  componentDidMount() {
    this.fetchResults(this.props.filter)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      this.setState({ page: 1, list: [], fetched: false }, () => {
        this.fetchResults(nextProps.filter)
      })
    }
  }

  render() {
    const { filter } = this.props
    const { page, total, list, error, loading, running, showCost } = this.state

    if (error) {
      return <Error error={error} />
    }

    return (
      <AppConsumer>
        {({ toggleFavourite }) => (
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
                          suf="кв."
                          all={this.props.filter.availableFlats}
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
                      <Scroller onScrollEnd={() => this.fetchResults(filter)}>
                        <Content auto dtp dbp>
                          <ResultsTable
                            rows={list}
                            costShown={showCost}
                            onRowClick={flat => {
                              window.open(`/flat/${flat.apartment_ui}`)
                            }}
                            onSortChange={this.changeSort}
                            onClickFavourite={flat => {
                              toggleFavourite(flat.apartment_ui)
                            }}
                          />
                        </Content>
                      </Scroller>
                    </>
                  ) : (
                    running && !loading && <NoData />
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
              .spinner-wrap {
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                position: absolute;
                background: rgba(255, 255, 255, 0.5);
                z-index: 100;
              }
              .count-wrap {
                padding: 35px 0 0 0;
              }
              .count-wrap-bord {
                padding-bottom: 15px;
              }
            `}</style>
          </div>
        )}
      </AppConsumer>
    )
  }
}

export default withFetch(Params)
