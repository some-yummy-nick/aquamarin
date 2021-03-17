import React from 'react'
import statuses from '@/enums/statuses'
import Title from '@/components/typo/title'
import Content from '@/components/content'
import Compass from '@/components/compass'
import Button from '@/components/button'
import Spacer from '@/components/typo/spacer'
import FlatSquare from '@/components/flat/square'
import Label from '@/components/typo/label'
import FlatPrice from '@/components/flat/price'
import ButtonMebel from '@/components/button/mebel'
import ButtonSimilarFlats from '@/components/button/similar-flats'
import ButtonRakurs from '@/components/button/rakurs'
import ButtonPano from '@/components/button/pano'
import StageFullScheme from '@/components/stage/full-scheme'
import GenplanScheme from '@/components/genplan/scheme'
import GalleryLight from '@/components/gallery/gallery-light'
import ButtonClose from '@/components/button/close'
import Spinner from '@/components/spinner'
import { FlatRenderPhablet } from '@/components/flat/render'
import { Router } from '@/routes'
import { PagePhablet } from '@/components/page'
import { withRouter } from 'next/router'
import { ModalConsumer, ModalContext } from '@/components/context/modal'

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
        <PagePhablet footer={false}>
          <div className="flex items-center">
            <div className="flex-none">
              <div className="close-wrap">
                <ButtonClose onClick={this.closeFlatGallery} />
              </div>
            </div>
          </div>
          <div className="gallery-wrap">
            <GalleryLight
              showPager={false}
              images={images.map(image => image.url)}
            />
          </div>
          <style jsx>{`
            .gallery-wrap {
              top: 90px;
              right: 20px;
              bottom: 20px;
              left: 20px;
              position: fixed;
              :global(.swiper-slide > div) {
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
              }
            }
            .close-wrap {
              & :global(svg) {
                color: black;
                top: 20px;
                right: 24px;
                position: absolute;
              }
            }
          `}</style>
        </PagePhablet>
      )
    }

    const costShown = this.props.show_cost
    const flat = this.props.current_floor.placement
    const currentFloor = this.props.current_floor
    const building = this.props.building
    const scene3dGuid = flat.plan_type.scene3d_guid
    return (
      <ModalConsumer>
        {({ showModal }) => (
          <PagePhablet>
            <Content>
              <Title marginless>
                Квартира{'  '}
                <span style={{ color: 'var(--color1)' }}>
                  {statuses.getName(flat.sold_status)}
                </span>
              </Title>
              <Spacer tSpace={15}>
                <Label>
                  Этаж <span className="highlight">{this.props.floor}</span>
                </Label>
              </Spacer>
              {statuses.sold !== flat.sold_status && (
                <Spacer tSpace={20}>
                  <Button
                    block
                    primary
                    onClick={async () => {
                      const Reservation = await import('@/components/modals/reservation')
                      showModal(Reservation.default, { flat })
                    }}
                  >
                    Забронировать
                  </Button>
                </Spacer>
              )}
            </Content>
            <Content>
              <FlatRenderPhablet
                flat={flat}
                mebelShown={this.state.mebelShown}
                clickGallery={this.showFlatGallery}
              />
              <Spacer tSpace={30} bSpace={30}>
                <div className="flex relative">
                  <div className="flex-auto">
                    {this.state.showMebelSwitch && (
                      <ButtonMebel
                        onClick={this.toggleMebel}
                        active={this.state.mebelShown}
                      />
                    )}
                  </div>
                  <div className="compass-wrap">
                    <Compass deg={currentFloor.compas_degree} />
                  </div>
                </div>
              </Spacer>
            </Content>
            <Content dtp>
              <FlatSquare square={flat.square} />
              <Spacer tSpace={10}>
                <Label>
                  {flat.apartment_type} №{flat.apart_number}
                </Label>
                {flat.rooms_count > 0 && (
                  <Label>{flat.rooms_count}х-комнатная</Label>
                )}
              </Spacer>
              {costShown && (
                <Spacer tSpace={40} bSpace={20}>
                  <Label>Стоимость, руб.</Label>
                  <FlatPrice price={flat.apartment_cost} />
                </Spacer>
              )}
              {scene3dGuid && (
                <Spacer tSpace={20}>
                  <div className="button-wrap">
                    <ButtonPano block onClick={() => this.pano3dClick(flat)} />
                  </div>
                </Spacer>
              )}
              <Spacer tSpace={20}>
                <div className="button-wrap">
                  <ButtonRakurs block onClick={this.showFlatGallery} />
                </div>
              </Spacer>
              <Spacer tSpace={20}>
                <div className="button-wrap">
                  <ButtonSimilarFlats block onClick={this.showSimilarFlats} />
                </div>
              </Spacer>
            </Content>
            <div className="genplan-scheme-wrap">
              <GenplanScheme
                autoScale={false}
                showControls={false}
                currentSection={this.props.section}
                currentHouse={building.building_number}
                onClickSection={this.onSectionClick}
              />
            </div>
            <div className="stage-full-scheme-wrap">
              <StageFullScheme
                showTooltips={false}
                scheme={currentFloor.floor_plan}
                flats={currentFloor.placements}
                viewBox={currentFloor.floor_plan_viewbox}
                selected={flat.apartment_ui}
                onClick={flat => {
                  Router.pushRoute('showFlat', {
                    flat: flat.apartment_ui
                  })
                }}
              />
            </div>
            <Content dtp>
              <div>
                <Label>
                  план{' '}
                  <span className="highlight">{this.props.floor} этажа</span>
                </Label>
              </div>
              <Spacer tSpace={40}>
                <Button
                  block
                  outline
                  secondary
                  onClick={() => {
                    Router.pushRoute('showStage', {
                      stage: this.props.floor,
                      entrance: this.props.section,
                      house: building.building_id
                    })
                  }}
                >
                  Перейти на этаж
                </Button>
              </Spacer>
            </Content>
            <style jsx>{`
              .render-wrap {
                height: 320px;
              }
              .compass-wrap {
                top: -30px;
                right: 0;
                position: absolute;
              }
              .stage-full-scheme-wrap,
              .genplan-scheme-wrap {
                margin: 20px;
                height: 200px;
                position: relative;
              }
              .genplan-scheme-wrap {
                height: auto;
              }
              .highlight {
                color: var(--color9);
              }
              .highlight .comment {
                font-size: 12px;
              }
              .button-wrap {
                & :global(.btn) {
                  width: auto !important;
                  display: inline-flex !important;
                }
              }
            `}</style>
          </PagePhablet>
        )}
      </ModalConsumer>
    )
  }
}

export default withRouter(Flat)
