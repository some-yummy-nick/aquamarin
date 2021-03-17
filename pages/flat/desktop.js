import React from 'react'
import statuses from '@/enums/statuses'
import Title from '@/components/typo/title'
import Page from '@/components/page'
import Content from '@/components/content'
import Compass from '@/components/compass'
import FlatRender from '@/components/flat/render'
import ButtonMebel from '@/components/button/mebel'
import ButtonSimilarFlats from '@/components/button/similar-flats'
import StagesList from '@/components/stage/stages-list'
import FlatSidebar from '@/components/flat/sidebar'
import Sidebar from '@/components/sidebar'
import GenplanScheme from '@/components/genplan/scheme'
import StageFullScheme from '@/components/stage/full-scheme'
import Button from '@/components/button'
import LeftArrowIcon from '@/components/icons/left-arrow-icon'
import FlatMenu from '@/components/flat/menu'
import Spacer from '@/components/typo/spacer'
import FlatGallery from '@/components/flat/gallery'
import Spinner from '@/components/spinner'
import { Router } from '@/routes'
import { AppConsumer } from '@/components/context/app'
import { ModalContext } from '@/components/context/modal'
import { withRouter } from 'next/router'

class Flat extends React.Component {
  static contextType = ModalContext

  constructor(props) {
    super(props)
    this.state = { mebelShown: false, showMebelSwitch: false }
    if (props.current_floor.placement.plan_type.render_view) {
      this.state.mebelShown = true
      if (props.current_floor.placement.plan_type.render_plan)
        this.state.showMebelSwitch = true
    }
  }

  static async getInitialProps({ query }) {
    const response = await request
      .get('/genplan/placement')
      .query({ apartment_ui: query.flat })

    const { meta, data } = response.body
    return { ...meta, ...data }
  }

  get flatId() {
    return this.props.router.query.flat
  }

  showSimilarFlats = () => {
    Router.pushRoute('similarFlats', {
      planning: this.props.current_floor.placement.plan_type.id
    })
  }

  showFlatGallery = () => {
    Router.pushRoute('showFlat', {
      flat: this.flatId,
      view: 'gallery'
    })
  }

  closeFlatGallery = () => {
    Router.pushRoute('showFlat', {
      flat: this.flatId
    })
  }

  onStageClick = stage => {
    const { building, section } = this.props
    Router.pushRoute('showStage', {
      stage,
      entrance: section,
      house: building.building_id
    })
  }

  onHouseClick = house => {
    // TODO
    const { entrance, stage } = this.props
    Router.pushRoute('showStage', {
      house,
      entrance,
      stage
    })
  }

  onSectionClick = (house, section, houseId, maxStage, minStage) => {
    const { building, floor } = this.props
    Router.pushRoute('showStage', {
      house: houseId,
      entrance: section,
      stage:
        floor <= maxStage ? (floor >= minStage ? floor : minStage) : maxStage
    })
  }

  toggleMebel = () => {
    this.setState({ mebelShown: !this.state.mebelShown })
  }

  pano3dClick = flat => {
    const htmlIframe = `
    <iframe style="height: 100vh;" width="100%" height="100%"
    src="https://uos.unistroyrf.ru/pages/common/pano3dext?scenehash=${
      flat.plan_type.scene3d_guid
    }"
    frameborder="0" allowfullscreen>
    </iframe>
    `
    const Modal = () => (
      <>
        <div className="wrap">
          <Spinner center color7 />
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: htmlIframe }}
        />
        <style jsx>{`
          @import 'mixins/r';
          .wrap {
            @extend %abs-container;
            position: fixed;
            z-index: -1;
          }
          .content {
            width: 100%;
            top: 50%;
            left: 50%;
            position: fixed;
            transform: translate(-50%, -50%);
          }
          .content :global(a) {
            bottom: 10px !important;
            right: 10px !important;
            top: auto;
          }
        `}</style>
      </>
    )
    this.context.showModal(Modal)
  }

  render() {
    const { view } = this.props.router.query
    const images = this.props.current_floor.placement.plan_type.files

    if (view === 'gallery') {
      return (
        <Page footer={false}>
          <Content flex>
            <FlatGallery
              requestClose={this.closeFlatGallery}
              gallery={images.map(image => image.url)}
            />
          </Content>
        </Page>
      )
    }

    // console.log(this.props)

    return (
      <Page footer={false}>
        <Content paddingless relative flex>
          <div className="wrap flex">
            <div className="flex flex-auto">
              <div className="flex flex-auto">
                <div className="flex flex-none">
                  <Sidebar>
                    <Content auto>
                      <Spacer bSpace={20}>
                        <Button
                          link
                          large
                          secondary
                          leftIcon={<LeftArrowIcon />}
                          onClick={() => Router.pushRoute('genplan')}
                        >
                          Генплан
                        </Button>
                      </Spacer>
                      <GenplanScheme
                        showControls={true}
                        currentSection={this.props.section}
                        currentHouse={this.props.building.building_number}
                        currentHouseFinishDate={this.props.building.finish_date}
                        currentSectionIsThrough={
                          this.props.current_floor.placement.is_through == 1
                        }
                        onClickSection={this.onSectionClick}
                      />
                      <Spacer tSpace={50}>
                        <Spacer bSpace={20}>
                          <Button
                            link
                            large
                            secondary
                            leftIcon={<LeftArrowIcon />}
                            onClick={() =>
                              Router.pushRoute('showStage', {
                                house: this.props.building.building_id,
                                entrance: this.props.section,
                                stage: this.props.floor
                              })
                            }
                          >
                            План этажа
                          </Button>
                        </Spacer>
                        <div className="scheme-wrap relative">
                          <StageFullScheme
                            autoScale={true}
                            scheme={this.props.current_floor.floor_plan}
                            flats={this.props.current_floor.placements}
                            viewBox={
                              this.props.current_floor.floor_plan_viewbox
                            }
                            selected={
                              this.props.current_floor.placement.apartment_ui
                            }
                            onClick={flat => {
                              Router.pushRoute('showFlat', {
                                flat: flat.apartment_ui
                              })
                            }}
                          />
                        </div>
                      </Spacer>
                    </Content>
                  </Sidebar>
                </div>
                <div className="flex flex-none items-center">
                  <div className="divider" />
                </div>
                <div className="stages-list flex flex-none">
                  <StagesList
                    stages={this.props.floors}
                    currentStage={this.props.floor}
                    onStageClick={this.onStageClick}
                  />
                </div>
                <div className="flex flex-auto flex-column">
                  <div className="flex-none">
                    <Content dbp>
                      <div className="flex items-center">
                        <div className="flex flex-auto justify-center">
                          <Title marginless>
                            {this.props.current_floor.placement.apartment_type}{' '}
                            -{' '}
                            <span
                              style={{
                                color: statuses.getTextColor(
                                  this.props.current_floor.placement.sold_status
                                )
                              }}
                            >
                              {statuses.getName(
                                this.props.current_floor.placement.sold_status
                              )}
                            </span>
                          </Title>
                        </div>
                      </div>
                    </Content>
                  </div>
                  <div className="render-wrap flex flex-auto">
                    <FlatRender
                      mebelShown={this.state.mebelShown}
                      flat={this.props.current_floor.placement}
                      clickGallery={this.showFlatGallery}
                    />
                  </div>
                  <div className="flex-none">
                    <Content dtp>
                      <div className="flex items-center">
                        <div className="compass-wrap">
                          <div className="compass">
                            <Compass
                              deg={this.props.current_floor.compas_degree}
                            />
                          </div>
                        </div>
                        <div className="flex flex-auto justify-center">
                          {this.state.showMebelSwitch && (
                            <ButtonMebel
                              spacing={15}
                              onClick={this.toggleMebel}
                              active={this.state.mebelShown}
                            />
                          )}
                          <div style={{ width: 50 }} />
                          <ButtonSimilarFlats
                            spacing={15}
                            onClick={this.showSimilarFlats}
                          />
                        </div>
                      </div>
                    </Content>
                  </div>
                </div>
              </div>
            </div>
            <div className="sidebar flex flex-none">
              <AppConsumer>
                {({ toggleFavourite }) => (
                  <FlatSidebar
                    costShown={this.props.show_cost}
                    flat={this.props.current_floor.placement}
                    house={this.props.building}
                    stage={this.props.floor}
                    onPano3dClick={() =>
                      this.pano3dClick(this.props.current_floor.placement)
                    }
                    onRemontClick={() =>
                      Router.pushRoute('otdelka', { flat: this.flatId })
                    }
                    onFlatMenuClick={async btnName => {
                      switch (btnName) {
                        case FlatMenu.buttons.print:
                          window.open(`/print/${this.flatId}`)
                          break
                        case FlatMenu.buttons.compare:
                          toggleFavourite(this.flatId)
                          break
                      }
                    }}
                  />
                )}
              </AppConsumer>
            </div>
          </div>
          <style jsx>{`
            .wrap {
              display: flex;
              flex: 1;
            }
            .render-wrap {
              position: relative;
              margin: 1rem 0;
            }
            .stages-list {
              margin: 22px 0;
              position: relative;
            }
            .compass-wrap {
              position: relative;
            }
            .compass {
              top: -60px;
              right: -80px;
              position: absolute;
            }
            .scheme-wrap {
              height: 180px;
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
            .sidebar {
            }
          `}</style>
        </Content>
      </Page>
    )
  }
}

export default withRouter(Flat)
