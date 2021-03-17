import React from 'react'
import Content from '@/components/content'
import Filter from '@/components/search/filter'
import Params from '@/components/search/params'
import Matrix from '@/components/search/matrix'
import Plannings from '@/components/search/plannings'
import Page from '@/components/page'
import Sidebar from '@/components/sidebar'
import Switch from '@/components/switch'
import Spinner from '@/components/spinner'
import keymirror from 'keymirror'
import emitter from '@/emitter'
import { Router } from '@/routes'
import { withRouter } from 'next/router'

const previewHeight = 280

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: {},
      position: null,
      preview: null
    }
  }

  static defaultProps = {
    initialFilter: {}
  }

  static page = keymirror({
    params: null,
    plannings: null,
    matrix: null
  })

  static controls = [
    { name: 'список', page: 'params' },
    { name: 'планировки', page: 'plannings' },
    { name: 'шахматка', page: 'matrix' }
  ]

  get pageName() {
    return this.props.router.query.page || Search.page.params
  }

  createPage(name) {
    switch (name) {
      // поиск по параметрам
      case Search.page.params:
        return <Params onShowFlat={this.showFlat} filter={this.state.filter} />
      // поиск по планировкам
      case Search.page.plannings:
        return (
          <Plannings onShowFlat={this.showFlat} filter={this.state.filter} />
        )
      // шахматка
      case Search.page.matrix:
        return <Matrix onShowFlat={this.showFlat} filter={this.state.filter} />
    }
  }

  showPage = ({ page }) => {
    Router.pushRoute('search', { page })
  }

  showFlat = ({ apartment_ui: flat }) => {
    Router.pushRoute('showFlat', { flat })
  }

  changeFilter = filter => {
    this.setState({ filter })
  }

  preShowPreview = params => {
    const { planning } = params

    if (null === planning) {
      clearTimeout(this.showTimer)
    }

    this.showTimer = setTimeout(() => {
      this.showPreview(params)
    }, 200)
  }

  showPreview = ({ position, planning, tdheight }) => {
    if (null === planning) {
      this.timer = setTimeout(
        () =>
          this.setState({
            planning: null
          }),
        250
      )
      return
    }

    clearTimeout(this.timer)
    let nPostion = position - previewHeight / 2

    if (nPostion + previewHeight >= window.innerHeight) {
      const dy = previewHeight - (window.innerHeight - position)
      nPostion = position - dy
    }

    this.setState({ position: nPostion, planning })
  }

  listen = () => {
    emitter.addListener('search.showPreview', this.preShowPreview)
    return () => emitter.addListener('search.showPreview', this.preShowPreview)
  }

  componentDidMount() {
    this.unlisten = this.listen()
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten()
    }
  }

  render() {
    const { initialFilter } = this.props
    const name = this.props.router.query.page
    const controls = Search.controls.map(control => {
      return { ...control, selected: control.page === this.pageName }
    })

    return (
      <Page footer={false}>
        <div className="flex flex-auto">
          <div className="flex flex-none relative">
            {this.state.planning && (
              <div className="planning" style={{ top: this.state.position }}>
                <img src={this.state.planning} />
                <Spinner color1 center />
              </div>
            )}
            <Sidebar width={320} transparent={this.state.planning}>
              <div
                className="wrap-filter"
                style={{ opacity: this.state.planning ? 0 : 1 }}
              >
                <Content dbp>
                  <Filter
                    initialFilter={initialFilter}
                    onChange={this.changeFilter}
                    rooms={this.props.rooms}
                  />
                </Content>
              </div>
            </Sidebar>
          </div>
          <div className="flex flex-none items-center">
            <div className="divider" />
          </div>
          <div className="flex flex-auto flex-column">
            <div className="switch-wrap flex-none">
              <Content dtp dbp>
                <Switch.Desktop controls={controls} onClick={this.showPage} />
              </Content>
            </div>
            <div className="flex flex-auto">{this.createPage(name)}</div>
          </div>
        </div>
        <style jsx>{`
          .switch-wrap {
            padding-top: 30px;
          }
          .planning {
            width: 300px;
            height: 300px;
            position: fixed;
            z-index: 1000;
            transition: 0.25s;
            background: white;
            overflow: hidden;
            img {
              width: 90%;
              height: 90%;
              display: block;
              object-fit: contain;
              z-index: 20;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .divider {
            width: 1px;
            flex: 1;
            height: 92.5%;
            display: flex;
            margin-left: 30px;
            position: relative;
            background: #b4b4b4;

            display: none;
          }
        `}</style>
      </Page>
    )
  }
}

export default withRouter(Search)
