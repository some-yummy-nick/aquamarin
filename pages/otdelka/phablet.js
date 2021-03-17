import { PagePhablet } from '@/components/page'
import Toggle from '@/components/toggle'
import Content from '@/components/content'
import Title from '@/components/typo/title'
import { useState, useEffect, useContext } from 'react'
import { RoundCheckbox } from '@/components/checkbox'
import Spacer from '@/components/typo/spacer'
import Blind from '@/components/blind'
import ActionSheet from '@/components/action-sheet'
import classnames from 'classnames'
import TextToggle from '@/components/text-toggle'
import Typehead from '@/components/typehead'
import RemontPrice from '@/components/flat/remont-price'
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
        font-weight: 600;
        font-size: 14px;
        line-height: 1;
        text-transform: uppercase;
        color: #78859c;
        padding-top: 0px;
      }
    `}</style>
  </div>
)

const TextDesc = ({ children }) => (
  <div>
    <div className="desc">{children}</div>
    <style jsx>{`
      .desc {
        font-weight: 600;
        font-size: 12px;
        line-height: 140%;
        color: #b5b5b5;
      }
      :global(strong) {
        color: var(--color4);
      }
    `}</style>
  </div>
)

const Label = ({ children }) => (
  <div>
    {children}
    <style jsx>{`
      div {
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
      }
    `}</style>
  </div>
)

const Otdelka = ({
  remonts,
  toggler,
  stepper,
  isPhablet,
  request,
  ...props
}) => {
  const app = useContext(AppContext)

  const togglerNames = Object.keys(toggler)
  const stepperNames = Object.keys(stepper)

  const [selectedToggler, setSelectedToggler] = useState(togglerNames[0])
  const [selectedStepper, setSelectedStepper] = useState(stepperNames[0])

  const [selectedChecker, setSelectedChecker] = useState(0)
  const [actionSheetOpened, setActionSheetOpened] = useState(0)

  const [searchResult, setSearchResult] = useState(null)

  const [height, setHeight] = useState(0)

  const designs = remonts.find(({ name, type }) => {
    return name === selectedStepper && type === selectedToggler
  }).designs

  const updateSelected = ({ whiteBox, comfort, standart }) => {
    setSelectedChecker(whiteBox ? 1 : 0)
    setSelectedToggler(comfort ? 'Комфорт' : standart && 'Стандарт')
  }

  useEffect(() => {
    const { flat } = Router.query
    if (flat) {
      request.get(`/search/placement?apartment_ui=${flat}`).then(res => {
        setSearchResult(res.body.data[0])
      })
    }
  }, [])

  useEffect(() => {
    const onResize = () => setHeight(window.innerWidth)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <PagePhablet>
      <Content flexible column dbp>
        <Title marginless color4>
          отделка на заказ
        </Title>
        <Spacer tSpace={20}>
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
          <Spacer tSpace={10}>
            <TextToggle>
              <TextDesc>
                <div
                  dangerouslySetInnerHTML={{
                    __html: toggler[selectedToggler].about
                  }}
                />
              </TextDesc>
            </TextToggle>
          </Spacer>
        </Spacer>
        <Spacer tSpace={20}>
          <Checker
            selected={selectedChecker}
            onClick={() => setSelectedChecker(!selectedChecker)}
          />
        </Spacer>
        {app.user && (
          <>
            <Spacer tSpace={30}>
              <div style={{ position: 'relative', zIndex: 100 }}>
                <Typehead
                  onSelectResult={setSearchResult}
                  label="Введите номер квартиры"
                  isPhablet={isPhablet}
                />
              </div>
            </Spacer>
            {searchResult && (
              <Spacer tSpace={30}>
                <RemontPrice
                  prices={searchResult}
                  onClick={updateSelected}
                  whiteBox={selectedChecker}
                  comfort={selectedToggler === 'Комфорт'}
                  standart={selectedToggler === 'Стандарт'}
                />
              </Spacer>
            )}
          </>
        )}{' '}
      </Content>
      <Spacer vSpace={20}>
        <Blind
          height={height}
          Label1={<Label>{designs[0].name}</Label>}
          Label2={<Label>{designs[1].name}</Label>}
          image1={designs[0][selectedChecker ? 'image_wb' : 'image'].url}
          image2={designs[1][selectedChecker ? 'image_wb' : 'image'].url}
        />
      </Spacer>
      <Content>
        <Spacer bSpace={20}>
          <div className="sel" onClick={() => setActionSheetOpened(1)}>
            <div className="flex items-center">
              <div className="sel-label">{selectedStepper}</div>
              <svg width="21" height="11" viewBox="0 0 21 11" fill="none">
                <path
                  d="M11.4616 0.693463L19.8129 8.50729C20.3444 9.00435 20.3444 9.81023 19.8129 10.307C19.2819 10.8039 18.4206 10.8039 17.8896 10.307L10.4999 3.39301L3.11055 10.3068C2.57929 10.8037 1.71807 10.8037 1.18702 10.3068C0.655759 9.80999 0.655759 9.00415 1.18702 8.50709L9.53846 0.693262C9.80411 0.444835 10.1519 0.320762 10.4999 0.320762C10.848 0.320762 11.1961 0.445076 11.4616 0.693463Z"
                  fill="#78859C"
                />
              </svg>
            </div>
            <TextDesc>
              <div style={{ color: 'var(--color2)' }}>
                {stepper[selectedStepper]}
              </div>
            </TextDesc>
          </div>
        </Spacer>
      </Content>
      <ActionSheet
        options={Object.keys(stepper)}
        opened={!!actionSheetOpened}
        onClose={() => setActionSheetOpened(0)}
        onSelect={key => {
          setActionSheetOpened(0)
          setSelectedStepper(key)
        }}
        render={(key, index) => {
          return (
            <div>
              <ActionSheet.Title>
                <div
                  className={classnames({
                    'a-selected': key === selectedStepper
                  })}
                >
                  {key}
                </div>
              </ActionSheet.Title>
              <ActionSheet.Subtitle>{stepper[key]}</ActionSheet.Subtitle>
            </div>
          )
        }}
      />
      <style jsx>{`
        .sel {
        }
        .sel-label {
          font-weight: 600;
          font-size: 18px;
          line-height: 25px;
          text-transform: uppercase;
          color: #e45e7f;
          margin-right: 20px;
        }
        .a-selected {
          color: var(--color2);
        }
      `}</style>
    </PagePhablet>
  )
}

export default withFetch(Otdelka)
