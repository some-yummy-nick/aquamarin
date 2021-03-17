import CloseButton from '@/components/button/close'
import Spinner from '@/components/spinner'
import withFetch from '@/components/hocs/with-fetch'
import debounce from 'lodash/debounce'
import classnames from 'classnames'
import { useState, useRef, useCallback, useEffect } from 'react'

const ROWS_COUNT = 4
const INPUT_HEIGHT = 34
const formatResultText = flat => `
  Дом ${flat.house}, подъезд ${flat.section}, кв.
  ${flat.apart_number}, площадь ${flat.apart_square} кв.м
`

export default withFetch(
  ({ request, label, isPhablet, initialResult, onSelectResult = () => {} }) => {
    const ddRef = useRef(null)
    const queryRef = useRef(null)
    const initialResultRef = useRef(null)

    const [results, setResults] = useState(null)
    const [selectedResult, setSelectedResult] = useState(null)
    const [position, setPosition] = useState('bottom')
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      if (null === initialResultRef.current && null !== initialResult) {
        initialResultRef.current = initialResult
        setSelectedResult(initialResultRef.current)
      }
    }, [initialResult])

    const clearForm = () => {
      flushSelectedResult()
      flushResults()
      setQuery('')
      queryRef.current.focus()
      onSelectResult(null)
    }

    const flushResults = () => setResults(null)
    const flushSelectedResult = () => setSelectedResult(null)

    const fetchResults = async query => {
      setLoading(true)
      try {
        // prettier-ignore
        const response = await request.get('/search/placement').query({ search: query })
        const results = response.body.data
        setResults(results.length ? results : null)
        if (!isPhablet) {
          updateDropDownPostion()
        }
      } catch (e) {}
      setLoading(false)
    }

    const debouncedFetch = useCallback(debounce(fetchResults, 250), [])
    const updateDropDownPostion = () => {
      if (ddRef.current) {
        const { bottom } = ddRef.current.getBoundingClientRect()
        setPosition(bottom > window.innerHeight ? 'top' : 'bottom')
      }
    }

    return (
      <div>
        <div className="hint">{label}</div>
        <div className="wrap">
          <div className="wrap-query">
            <input
              type="text"
              value={query}
              ref={queryRef}
              onClick={flushSelectedResult}
              onChange={ev => {
                flushResults()
                setQuery(ev.target.value)
                debouncedFetch(ev.target.value)
              }}
            />
            {loading ? (
              <div className="spinner">
                <Spinner color4 width={34} />
              </div>
            ) : (
              <div className="clear">
                <CloseButton onClick={clearForm} />
              </div>
            )}
            {selectedResult && (
              <div className="selected">{formatResultText(selectedResult)}</div>
            )}
          </div>
          <div
            ref={ddRef}
            className={classnames('dd', {
              [position]: true,
              ready: results && !selectedResult
            })}
          >
            {results && (
              <>
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="dd-row"
                    onClick={() => {
                      setSelectedResult(result)
                      onSelectResult(result)
                    }}
                  >
                    Дом {result.house}, кв. №{result.apart_number}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <style jsx>{`
          .wrap {
            position: relative;
          }
          .wrap-query {
            position: relative;
            display: inline-block;
          }
          input {
            width: 220px;
            display: block;
            outline: none;
            border-radius: 0;
            box-shadow: none;
            border: solid 1px #717271;
            height: ${INPUT_HEIGHT}px;
            font-size: 19px;
            text-transform: uppercase;
            color: #262729;
            padding: 3px;
            box-sizing: border-box;
            font-family: var(--text-font);
            line-height: 1;
            padding-right: 40px;
          }
          .clear,
          .spinner {
            right: 10px;
            top: 50%;
            width: 14px;
            height: 14px;
            cursor: pointer;
            transform: translateY(-50%);
            position: absolute;
            z-index: 2;
          }
          .spinner {
            width: 34px;
            height: 34px;
            right: 0;
          }
          .clear {
            width: 14px;
            height: 14px;
            overflow: hidden;
          }
          .clear :global(svg) {
            width: 14px;
            height: 14px;
            display: block;
            color: var(--color1);
            &:hover {
              color: var(--color2);
            }
          }
          .dd {
            left: 0;
            right: 0;
            height: ${INPUT_HEIGHT * ROWS_COUNT}px;
            overflow: auto;
            position: absolute;
            border: solid 1px #717271;
            background: white;
            visibility: hidden;
            pointer-events: none;
            z-index: 10;
            &.ready {
              pointer-events: all;
              visibility: visible;
            }
            &.bottom {
              top: 33px;
            }
            &.top {
              bottom: 33px;
            }
          }
          .dd-row {
            height: ${INPUT_HEIGHT}px;
            padding: 3px;
            font-size: 16px;
            display: flex;
            align-items: center;
            cursor: pointer;
            box-sizing: border-box;
            &:hover {
              background: #fafafa;
            }
          }
          .hint {
            font-size: 14px;
            margin-bottom: 8px;
            color: #a1a1a1;
          }
          .selected {
            font-size: 12px;
            line-height: 1.2;
            color: #262729;
            font-weight: 400;
            position: absolute;
            top: 1px;
            right: 40px;
            bottom: 1px;
            left: 1px;
            background: white;
            overflow: hidden;
            padding: 4px;
            padding-top: 2px;
            pointer-events: none;
          }
        `}</style>
      </div>
    )
  }
)
