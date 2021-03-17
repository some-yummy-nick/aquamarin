import React from 'react'
import Title from '@/components/typo/title'
import Content from '@/components/content'
import Spacer from '@/components/typo/spacer'
import StageFullScheme from '@/components/stage/full-scheme'
import Legend from '@/components/search/legend'
import Compass from '@/components/compass'
import ActionSheet from '@/components/action-sheet'
import GenplanScheme from '@/components/genplan/scheme'
import Label from '@/components/typo/label'
import { Router } from '@/routes'
import { PagePhablet } from '@/components/page'

class Stage extends React.Component {
  state = { actionSheetOpened: false }

  showFlat = flat => {
    Router.pushRoute('showFlat', {
      flat: flat.apartment_ui
    })
  }

  toggleActionSheet = () => {
    this.setState({ actionSheetOpened: !this.state.actionSheetOpened })
  }

  closeActionSheet = () => {
    this.setState({ actionSheetOpened: false })
  }

  onSectionClick = (house, section, houseId, maxStage, minStage) => {
    const { building, stage } = this.props
    Router.pushRoute('showStage', {
      house: houseId,
      entrance: section,
      stage:
        stage <= maxStage ? (stage >= minStage ? stage : minStage) : maxStage
    })
  }

  render() {
    // console.log(this.props);
    // return null;
    const stages = this.props.stages.reverse()
    return (
      <PagePhablet>
        <Content>
          <div onClick={this.toggleActionSheet}>
            <Title marginless>
              План{' '}
              <span className="highlight">
                {this.props.stage} этажа{' '}
                <svg width="13" height="8" viewBox="0 0 21 12" fill="none">
                  <path
                    d="M11.5396 11.5683L20.569 2.51655C21.1437 1.94075 21.1437 1.00719 20.569 0.431675C19.9948 -0.14389 19.0636 -0.14389 18.4895 0.431675L10.4998 8.44104L2.5105 0.431907C1.93611 -0.143658 1.00496 -0.143658 0.430797 0.431907C-0.143599 1.00747 -0.143599 1.94098 0.430797 2.51678L9.46032 11.5685C9.74754 11.8563 10.1236 12 10.4998 12C10.8762 12 11.2525 11.856 11.5396 11.5683Z"
                    fill="var(--color1)"
                  />
                </svg>
              </span>
            </Title>
          </div>
        </Content>
        <Spacer vSpace={10}>
          <div className="flex justify-center">
            <div className="inline-flex">
              <Legend />
            </div>
          </div>
        </Spacer>
        <div className="scheme-wrap">
          <StageFullScheme
            {...this.props}
            showTooltips={true}
            onClick={() => {}}
            onTooltipClick={this.showFlat}
          />
        </div>
        <div className="genplan-scheme-wrap">
          <GenplanScheme
            autoScale={false}
            showControls={false}
            currentSection={this.props.section}
            currentSectionIsThrough={this.props.is_through == 1}
            currentHouse={this.props.house.building_number}
            onClickSection={this.onSectionClick}
          />
          <div className="compass">
            <Compass deg={this.props.deg} />
          </div>
        </div>
        <ActionSheet
          options={stages.reverse()}
          opened={this.state.actionSheetOpened}
          onClose={this.closeActionSheet}
          onSelect={option => {
            this.closeActionSheet()
            Router.pushRoute('showStage', {
              ...Router.query,
              stage: option.floor
            })
          }}
          render={(option, index) => {
            return (
              <div>
                <ActionSheet.Title>Этаж {option.floor}</ActionSheet.Title>
                <ActionSheet.Subtitle>
                  Количество квартир {option.available_flats}
                </ActionSheet.Subtitle>
              </div>
            )
          }}
        />
        <style jsx>{`
          .scheme-wrap {
            margin: 20px;
            height: 200px;
            position: relative;
          }
          .highlight {
            color: var(--color1);
            svg {
              top: -0.2em;
              position: relative;
            }
          }
          .highlight2 {
            color: var(--color9);
          }
          .highlight .comment {
            font-size: 12px;
          }
          .genplan-scheme-wrap {
            margin: 20px;
            height: 200px;
            position: relative;
            height: auto;
          }
          .compass {
            position: absolute;
            right: 5px;
            bottom: 5px;
            transform: scale(0.8);
            transform-origin: 100% 100%;
          }
        `}</style>
      </PagePhablet>
    )
  }
}

export default Stage
