import React from 'react'
import { PagePhablet } from '@/components/page'
import Title from '@/components/typo/title'
import Content from '@/components/content'
import Filter from '@/components/search/filter'
import Spacer from '@/components/typo/spacer'
import Legend from '@/components/search/legend'
import debounce from 'lodash/debounce'
import withFetch from '@/components/hocs/with-fetch'
import ResultsTable from '@/components/search/results-table'
import { Router } from '@/routes'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: {},
      page: 1,
      total: 0,
      list: [],
      loading: false,
      error: false,
      sfield: 'rooms_count',
      stype: 'asc',
      running: false,
      fetched: false
    }
  }

  showFlat = ({ apartment_ui: flat }) => {
    Router.pushRoute('showFlat', { flat })
  }

  changeFilter = filter => {
    this.setState({ filter, fetched: false, page: 1 }, () => {
      this.fetchResults(filter, true)
    })
  }

  delay = 250
  countItems = 999

  fetchResults = debounce(async (filter, flush) => {
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
      // prettier-ignore
      const response = await this.props.request.post('/search/list').send({
        ...filter,
        sortBy: sfield,
        sortDesc: stype,
        count: this.countItems,
        page: page
      })

      const { data, meta } = response.body
      this.setState({
        list: flush ? data : [...list, ...data],
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

  componentDidMount() {
    this.fetchResults(this.props.filter)
    this.unlisten = this.listenToScrollEnd()
  }

  componentWillUnmount() {
    this.unlisten()
  }

  listenToScrollEnd = () => {
    window.addEventListener('scroll', this.handleScrollEnd)
    return () => window.removeEventListener('scroll', this.handleScrollEnd)
  }

  handleScrollEnd = () => {
    const d = document.documentElement
    const offset = d.scrollTop + window.innerHeight + 2000
    const height = d.offsetHeight
    if (offset >= height) {
      this.fetchResults(this.state.filter)
    }
  }

  render() {
    const { initialFilter, rooms } = this.props
    const { total, list, showCost } = this.state
    return (
      <PagePhablet>
        <Content>
          <Title>Подбор по параметрам</Title>
          <Spacer>
            <Filter
              rooms={rooms}
              onChange={this.changeFilter}
              initialFilter={initialFilter}
            />
          </Spacer>
        </Content>
        <Content colored>
          <div className="total">
            <div className="t1">
              НАЙДЕНО квартир: <span>{total}</span>
            </div>
            <Legend elements={[Legend.elements.reserved]} />
          </div>
        </Content>
        <ResultsTable
          rows={list}
          costShown={showCost}
          onSortChange={() => {}}
          onRowClick={this.showFlat}
          onClickFavourite={() => {}}
        />
        <style jsx>{`
          .total {
            .t1 {
              font-size: 14px;
              font-weight: 500;
              margin-bottom: 14px;
              text-transform: uppercase;
              span {
                color: var(--color2);
              }
            }
            & :global(.legend) {
              justify-content: flex-start;
            }
          }
        `}</style>
      </PagePhablet>
    )
  }
}

export default withFetch(Search)
