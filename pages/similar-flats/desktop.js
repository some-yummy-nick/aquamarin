import React from 'react'
import Content from '@/components/content'
import Scroller from '@/components/scroller'
import Title from '@/components/typo/title'
import Page from '@/components/page'
import FlatRender from '@/components/flat/render'
import FlatsTable from '@/components/search/flats-table'
import Plashka from '@/components/search/plashka'
import ButtonMebel from '@/components/button/mebel'
import Spacer from '@/components/typo/spacer'
import { withRouter } from 'next/router'
import { Router } from '@/routes'

class SimilarFlats extends React.Component {
  constructor(props) {
    super(props)
    this.state = { mebelShown: false, showMebelSwitch: false }
    if (props.render_view) {
      this.state.mebelShown = true
      if (props.render_plan) this.state.showMebelSwitch = true
    }
  }

  showFlat = ({ apartment_ui: flat }) => {
    Router.pushRoute('showFlat', { flat })
  }

  toggleMebel = () => {
    this.setState({ mebelShown: !this.state.mebelShown })
  }

  render() {
    return (
      <Page>
        <Content flex>
          <div className="flex flex-auto">
            <div className="flex flex-column flex-auto basis-6">
              <div className="plashka-wrap">
                <Plashka rooms={this.props.rooms} square={this.props.square} />
              </div>
              <div className="body flex flex-auto">
                <FlatRender
                  flat={{
                    plan_type: {
                      render_view_url: this.props.render_view,
                      render_plan_url: this.props.render_plan
                    }
                  }}
                  rakursButtonShown={false}
                  mebelShown={this.state.mebelShown}
                />
              </div>
              <div className="flex-none flex justify-center">
                <Spacer tSpace={20}>
                  {this.state.showMebelSwitch && (
                    <ButtonMebel
                      onClick={this.toggleMebel}
                      active={this.state.mebelShown}
                    />
                  )}
                </Spacer>
              </div>
            </div>
            <div className="spacer" />
            <div className="flex flex-column flex-auto basis-6">
              <div className="placeholder">
                <Title>Все квартиры (помещения) с такой планировкой</Title>
              </div>
              <div className="body flex flex-auto">
                <div className="body-inner">
                  <Scroller>
                    <Content autoHeight paddingless>
                      <FlatsTable
                        rows={this.props.placements}
                        onRowClick={this.showFlat}
                        costShown={this.props.show_cost}
                      />
                    </Content>
                  </Scroller>
                </div>
              </div>
            </div>
            <style jsx>{`
              .subtitle {
                color: #555759;
                text-transform: uppercase;
                font-family: var(--heading-font);
                font-weight: 500;
                font-size: 50px;
                line-height: 106.68%;
                letter-spacing: 0.01em;
              }
              .body,
              .wrap {
                position: relative;
              }
              .body-inner {
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                position: absolute;
              }
              .placeholder {
                display: flex;
                line-height: 1;
                align-items: center;
                padding-bottom: 30px;
                padding-top: 2px;
              }
              .center {
                justify-content: center;
              }
              .plashka-wrap {
                & :global(.highlight) {
                  font-size: 30px;
                  font-weight: 500;
                }
                & :global(.desc) {
                  margin: 12px 0;
                }
              }
              .spacer {
                width: 1px;
                margin-right: 50px;
                background: #d3d3d3;
              }
            `}</style>
          </div>
        </Content>
      </Page>
    )
  }
}

export default withRouter(SimilarFlats)
