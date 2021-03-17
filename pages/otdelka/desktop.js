import NoSSR from 'react-no-ssr'
import Page from '@/components/page'
import Toggle from '@/components/toggle'
import Content from '@/components/content'
import Title from '@/components/typo/title'
import Stepper from '@/components/stepper'
import { useState, useEffect, useRef, useContext } from 'react'
import { RoundCheckbox } from '@/components/checkbox'
import Spacer from '@/components/typo/spacer'
import Blind from '@/components/blind'
import ImageLoad from '@/components/image/load'
import Typehead from '@/components/typehead'
import RemontPrice from '@/components/flat/remont-price'
import TextToggle from '@/components/text-toggle'
import { AppContext } from '@/components/context/app'
import { Router } from '@/routes'
import withFetch from '@/components/hocs/with-fetch'

const Checker = ({ onClick, ...props }) => (
  <div className="flex checker" onClick={onClick}>
    <RoundCheckbox {...props} />
    <div className="text">
      <div className="name">Хочу обои под покраску</div>
      <TextDesc>Чистые, неокрашенные стены</TextDesc>
    </div>
    <style jsx>{`
      .checker {
        cursor: pointer;
        user-select: none;
      }
      .text {
        padding-top: 3px;
        padding-left: 8px;
      }
      .name {
        font-weight: 500;
        font-size: 20px;
        line-height: 1;
        text-transform: uppercase;
        color: #262729;
        padding-top: 0px;
      }
      .name.on {
        color: #e45e7f;
      }
    `}</style>
  </div>
)

const TextDesc = ({ children }) => (
  <div>
    <div className="desc">{children}</div>
    <style jsx>{`
      .desc {
        font-weight: 400;
        font-size: 12px;
        line-height: 140%;
        color: #262729;
      }
      :global(strong) {
        color: #262729;
        font-weight: 500;
      }
    `}</style>
  </div>
)

const Label = ({ children }) => (
  <div>
    {children}
    <style jsx>{`
      div {
        font-size: 14px;
        font-weight: 400;
        text-transform: uppercase;
      }
    `}</style>
  </div>
)

const Otdelka = ({ remonts, toggler, stepper, rimages, request }) => {
  const offset = 20

  const app = useContext(AppContext)

  const togglerNames = Object.keys(toggler)
  const togglerValues = Object.values(toggler)
  const stepperNames = Object.keys(stepper)

  const [selectedToggler, setSelectedToggler] = useState(togglerNames[0])
  const [selectedStepper, setSelectedStepper] = useState(stepperNames[0])

  const [selectedChecker, setSelectedChecker] = useState(0)
  const [searchResult, setSearchResult] = useState(null)

  const [height, setHeight] = useState(0)
  const containerRef = useRef(null)

  const designs = remonts.find(({ name, type }) => {
    return name === selectedStepper && type === selectedToggler
  }).designs

  const desc = selectedToggler => {
    return togglerValues[togglerNames.indexOf(selectedToggler)].about
  }

  const updateSelected = ({ whiteBox, comfort, standart }) => {
    setSelectedChecker(whiteBox ? 1 : 0)
    setSelectedToggler(comfort ? 'Комфорт' : standart && 'Стандарт')
  }

  const showPrintPage = (flat, remont) => {
    window.open(`/print/${flat}?remont=${remont}`)
  }

  useEffect(() => {
    const { flat } = Router.query
    if (flat && app.user) {
      request.get(`/search/placement?apartment_ui=${flat}`).then(res => {
        setSearchResult(res.body.data[0])
      })
    }
  }, [])

  useEffect(() => {
    const onResize = () => {
      const height = containerRef.current.clientHeight
      setHeight(height - offset)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <Page>
      <Content flexible column dbp>
        {/* Прелоад картинок */}
        <div className="preload">
          {rimages.map(image => (
            <ImageLoad key={image} image={image} />
          ))}
        </div>
        <div className="flex">
          <div className="flex-auto">
            <Spacer rSpace={90}>
              <Title marginless color4>
                отделка на заказ
              </Title>
            </Spacer>
          </div>
        </div>
        <div className="flex flex-auto">
          <div className="flex-none" style={{ maxWidth: 350 }}>
            <NoSSR>
              <Spacer tSpace={45}>
                <Toggle
                  onText={togglerNames[1]}
                  offText={togglerNames[0]}
                  on={selectedToggler === togglerNames[0]}
                  onOn={() => setSelectedToggler(togglerNames[1])}
                  onOff={() => setSelectedToggler(togglerNames[0])}
                  onToggle={() => {
                    if (togglerNames[0] === selectedToggler) {
                      setSelectedToggler(togglerNames[1])
                    } else {
                      setSelectedToggler(togglerNames[0])
                    }
                  }}
                />
                <Spacer tSpace={12}>
                  <TextToggle isOpened={!(app.user && app.user.id > 0)}>
                    <TextDesc>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: desc(selectedToggler)
                        }}
                      />
                    </TextDesc>
                  </TextToggle>
                </Spacer>
              </Spacer>
            </NoSSR>
            <Spacer tSpace={30}>
              <Checker
                selected={selectedChecker}
                onClick={() => setSelectedChecker(!selectedChecker)}
              />
            </Spacer>
            <NoSSR>
              {app.user && (
                <>
                  <Spacer tSpace={30}>
                    <Typehead
                      initialResult={searchResult}
                      label="Введите номер квартиры"
                      onSelectResult={setSearchResult}
                    />
                  </Spacer>
                  {searchResult && (
                    <Spacer tSpace={30}>
                      <RemontPrice
                        prices={searchResult}
                        hasPrintButton={true}
                        whiteBox={selectedChecker}
                        comfort={selectedToggler === 'Комфорт'}
                        standart={selectedToggler === 'Стандарт'}
                        onClick={updateSelected}
                        onClickPrint={remont => {
                          showPrintPage(searchResult.apartment_ui, remont)
                        }}
                      />
                    </Spacer>
                  )}
                </>
              )}
            </NoSSR>
          </div>
          <div className="flex flex-auto flex-column">
            <div className="flex flex-none justify-center">
              <div className="inline-flex">
                <Stepper
                  values={stepper}
                  selected={selectedStepper}
                  onClick={setSelectedStepper}
                />
              </div>
            </div>
            <div className="flex flex-auto items-center" ref={containerRef}>
              <Content paddingless width={height}>
                <Blind
                  height={height}
                  Label1={<Label>{designs[0].name}</Label>}
                  Label2={<Label>{designs[1].name}</Label>}
                  image1={
                    designs[0][selectedChecker ? 'image_wb' : 'image'].url
                  }
                  image2={
                    designs[1][selectedChecker ? 'image_wb' : 'image'].url
                  }
                />
              </Content>
            </div>
          </div>
        </div>
      </Content>
      <style jsx>{`
        .preload {
          width: 0;
          height: 0;
          overflow: hidden;
          position: absolute;
        }
      `}</style>
    </Page>
  )
}

export default withFetch(Otdelka)
