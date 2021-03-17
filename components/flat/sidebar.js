import NoSSR from 'react-no-ssr'
import statuses from '@/enums/statuses'
import Button from '@/components/button'
import FlatSquare from '@/components/flat/square'
import FlatPrice from '@/components/flat/price'
import Label from '@/components/typo/label'
import Spacer from '@/components/typo/spacer'
import FlatMenu from '@/components/flat/menu'
import Sidebar from '@/components/sidebar'
import Content from '@/components/content'
import Tooltip from '@/components/tooltip'
import FlatPriceTooltip from '@/components/flat/price-tooltip'
import { AppConsumer } from '@/components/context/app'
import { ModalConsumer } from '@/components/context/modal'

const FlatSidebar = ({
  flat,
  house,
  onFlatMenuClick,
  costShown,
  onRemontClick,
  onPano3dClick
}) => {
  const scene3dGuid = flat.plan_type.scene3d_guid
  return (
    <ModalConsumer>
      {({ showModal }) => (
        <div className="sidebar-wrap flex flex-auto flex-column">
          <div className="flex flex-auto">
            <Sidebar>
              <div style={{ padding: 30, paddingBottom: 0 }}>
                <Content paddingless>
                  <FlatSquare square={flat.square} />
                  <Spacer tSpace={10}>
                    <Label>
                      {flat.apartment_type} №{flat.apart_number}
                    </Label>
                    {flat.rooms_count > 0 && (
                      <Label>{flat.rooms_count}х-комнатная</Label>
                    )}
                  </Spacer>
                  {costShown && flat.apartment_cost && (
                    <Spacer tSpace={40} bSpace={20}>
                      <Label>Стоимость, руб.</Label>
                      <FlatPrice price={flat.apartment_cost} />
                    </Spacer>
                  )}
                  <Spacer tSpace={40} bSpace={20}>
                    {statuses.sold !== flat.sold_status && (
                      <div className="order-button">
                        <Button
                          block
                          primary
                          onClick={async () => {
                            const Reservation = await import('@/components/modals/reservation')
                            showModal(Reservation.default, {
                              flat: flat,
                              centerContent: true
                            })
                          }}
                        >
                          Забронировать
                        </Button>
                      </div>
                    )}
                  </Spacer>
                  {scene3dGuid ? (
                    <Spacer tSpace={20} bSpace={20}>
                      <div>
                        <Button block outline secondary onClick={onPano3dClick}>
                          3D панорама
                        </Button>
                      </div>
                    </Spacer>
                  ) : null}
                  {house.has_remont && (
                    <Spacer tSpace={20} bSpace={20}>
                      <div data-for="remont" data-place="top" data-tip={true}>
                        <Button outline secondary block onClick={onRemontClick}>
                          Варианты отделки
                        </Button>
                      </div>
                    </Spacer>
                  )}
                  <Spacer tSpace={40}>
                    <NoSSR>
                      <AppConsumer>
                        {({ hasFavourite }) => (
                          <FlatMenu
                            onClick={onFlatMenuClick}
                            hasFavourite={hasFavourite(flat.apartment_ui)}
                          />
                        )}
                      </AppConsumer>
                    </NoSSR>
                  </Spacer>
                </Content>
              </div>
            </Sidebar>
          </div>
          <Tooltip
            id="remont"
            styless={true}
            animated={true}
            clickable={false}
            paddingless={true}
            getContent={() => {
              if (!costShown) return null
              return (
                <FlatPriceTooltip
                  prices={Object.assign({}, flat.cost_with_finish || {}, {
                    cost: flat.apartment_cost
                  })}
                />
              )
            }}
          />
          <style jsx>{`
            .label {
              font-size: 12px;
              line-height: 14px;
              text-transform: uppercase;
              color: #979797;
            }
          `}</style>
        </div>
      )}
    </ModalConsumer>
  )
}

FlatSidebar.onHouseClick = {
  onHouseClick() {},
  onFlatMenuClick() {},
  stage: 0,
  house: {},
  flat: {}
}

export default FlatSidebar
