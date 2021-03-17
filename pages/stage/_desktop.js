import React from 'react'
import Title from '@/components/typo/title'
import Compass from '@/components/compass'
import Content from '@/components/content'
import Page from '@/components/page'
import Sidebar from '@/components/sidebar'
import GenplanScheme from '@/components/genplan/scheme'
import Button from '@/components/button'
import Spacer from '@/components/typo/spacer'
import LeftArrowIcon from '@/components/icons/left-arrow-icon'
import StageFullScheme from '@/components/stage/full-scheme'
import Legend from '@/components/search/legend'
import StagesList from '@/components/stage/stages-list'
import { withRouter } from 'next/router'
import { Router } from '@/routes'

class Stage extends React.Component {
  static defaultProps = {
    scheme: null,
    placements: [],
    deg: 0,
    stage: 0,
    entrance: 0,
    stages: [],
    house: {}
  }

  showStage = stage => {
    const { entrance, house } = this.props.router.query
    Router.pushRoute('showStage', { stage, house, entrance })
  }

  showHouse = house => {
    const { entrance, stage } = this.props.router.query
    Router.pushRoute('showStage', { stage, house, entrance })
  }

  showFlat = flat => {
    Router.pushRoute('showFlat', { flat })
  }

  onStageClick = stage => {
    this.showStage(stage)
  }

  onHouseClick = house => {
    this.showHouse(house)
  }

  onFlatClick = ({ apartment_ui }) => {
    this.showFlat(apartment_ui)
  }

  render() {
    const {
      stage,
      placements,
      scheme,
      deg,
      stages,
      house,
      section,
      section_is_through,
      views
    } = this.props

    return (
      <Page footer={false}>
        <div className="flex flex-auto">
          <div className="flex flex-none">
            <Sidebar>
              <Content auto>
                <Spacer bSpace={20}>
                  <Button
                    link
                    leftIcon={<LeftArrowIcon />}
                    onClick={() => Router.pushRoute('genplan')}
                  >
                    Генплан
                  </Button>
                </Spacer>
                <GenplanScheme
                  showControls={true}
                  currentHouse={house.building_number}
                  currentHouseFinishDate={house.finish_date}
                  currentSection={section}
                  currentSectionIsThrough={section_is_through == 1}
                  onClickSection={(_, section, houseId, maxStage, minStage) => {
                    Router.pushRoute('showStage', {
                      house: houseId,
                      entrance: section,
                      stage:
                        stage <= maxStage
                          ? stage >= minStage
                            ? stage
                            : minStage
                          : maxStage
                    })
                  }}
                />
              </Content>
            </Sidebar>
          </div>
          <div className="flex flex-auto">
            <div className="flex flex-none items-center">
              <div className="divider" />
            </div>
            <div className="stages-list flex flex-none">
              <StagesList
                stages={stages}
                currentStage={stage}
                onStageClick={this.onStageClick}
              />
            </div>
            <div className="flex flex-auto flex-column">
              <div className="flex-none">
                <Content dbp>
                  <Title>Выберите квартиру на этаже</Title>
                </Content>
              </div>
              <div className="flex flex-auto flex-column">
                <div className="flex-none">
                  <div className="xlabel">{views.top}</div>
                </div>
                <div className="flex flex-auto">
                  <div className="xlabel-left flex-none flex items-center">
                    <div className="xlabel rotated">{views.left}</div>
                  </div>
                  <div className="flex flex-auto scheme-wrap">
                    <Content flex relative paddingless>
                      <StageFullScheme
                        {...this.props}
                        onClick={this.onFlatClick}
                      />
                    </Content>
                  </div>
                  <div className="xlabel-right flex-none flex items-center">
                    <div className="xlabel rotated">{views.right}</div>
                  </div>
                </div>
                <div className="flex-none">
                  <div className="xlabel">{views.bottom}</div>
                </div>
              </div>
              <div className="flex-none">
                <Content>
                  <div className="flex items-center">
                    <div className="flex-auto">
                      <Compass deg={deg} />
                    </div>
                    <div className="flex-none">
                      <Legend />
                    </div>
                  </div>
                </Content>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .xlabel {
            font-weight: 500;
            font-size: 14px;
            line-height: 14px;
            color: #b4b4b4;
            text-align: center;
            margin: 5px;
            white-space: nowrap;
            text-transform: uppercase;
          }
          .xlabel-left,
          .xlabel-right {
            width: 40px;
            position: relative;
          }
          .xlabel-left .rotated {
            top: 50%;
            left: 30px;
            position: absolute;
            transform-origin: 0 0;
            text-align: center;
            transform: rotate(-90deg) translateX(-45%);
          }
          .xlabel-right .rotated {
            top: 50%;
            left: -20px;
            position: absolute;
            transform-origin: 0 0;
            text-align: center;
            transform: rotate(90deg) translateX(-50%);
          }
          .rotated {
          }
          .scheme-wrap {
            padding: 15px;
          }
          .divider {
            width: 1px;
            flex: 1;
            height: 92.5%;
            display: flex;
            margin-right: 50px;
            position: relative;
            background: #b4b4b4;
            display: none;
          }
          .stages-list {
            margin: 19px 0;
            position: relative;
          }
          .selected {
            color: #646464;
            font-weight: 500;
            font-size: 14px;
            margin-top: 10px;
            text-transform: uppercase;
            span {
              color: var(--color1);
            }
          }
        `}</style>
      </Page>
    )
  }
}

export default withRouter(Stage)
