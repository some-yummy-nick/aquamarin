import React from 'react'
import { withRouter } from 'next/router'
import { Router } from '@/routes'
import Content from '@/components/content'
import Title from '@/components/typo/title'
import { PagePhablet } from '@/components/page'
import { FlatRenderPhablet } from '@/components/flat/render'
import ButtonMebel from '@/components/button/mebel'
import Spacer from '@/components/typo/spacer'
import FlatSquare from '@/components/flat/square'
import Label from '@/components/typo/label'
import FlatsTable from '@/components/search/flats-table'
import Legend from '@/components/search/legend'

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
    // console.log(this.props)
    return (
      <PagePhablet>
        <Content>
          <Title>уникальная планировка</Title>
          <Spacer bSpace={16}>
            <FlatSquare square={this.props.square} />
            <Label>{this.props.rooms}х-комнатная</Label>
          </Spacer>
          <FlatRenderPhablet
            flat={{
              plan_type: {
                render_view_url: this.props.render_view,
                render_plan_url: this.props.render_plan
              }
            }}
            mebelShown={this.state.mebelShown}
          />
          <Spacer tSpace={20}>
            {this.state.showMebelSwitch && (
              <ButtonMebel
                block
                onClick={this.toggleMebel}
                active={this.state.mebelShown}
              />
            )}
          </Spacer>
        </Content>
        <Content colored>
          <div className="total">
            <div className="t1">
              Найдено квартир: <span>{this.props.placements.length}</span>
            </div>
            <Legend elements={[Legend.elements.reserved]} />
          </div>
        </Content>
        <Spacer>
          <FlatsTable
            rows={this.props.placements}
            onRowClick={this.showFlat}
            costShown={this.props.show_cost}
          />
        </Spacer>
        <style jsx>{`
          .total {
            .t1 {
              font-size: 14px;
              font-weight: 500;
              margin-bottom: 14px;
              text-transform: uppercase;
              span {
                color: var(--color9);
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

export default withRouter(SimilarFlats)
