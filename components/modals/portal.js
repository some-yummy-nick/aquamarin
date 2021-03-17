import posed, { PoseGroup } from 'react-pose'
import classnames from 'classnames'
import ButtonClose from '@/components/button/close'
import { ModalConsumer } from '@/components/context/modal'
import Scroller from '@/components/scroller'

const ModalRoot = props => (
  <ModalConsumer>
    {({ component: Component, props: modalProps, hideModal }) => {
      if (Component && process.browser) {
        window.addEventListener('keyup', event => {
          if (event.keyCode == 27) {
            hideModal()
          }
        })
      }

      const transition = Component ? 'enter' : 'exit'

      return (
        <div
          className={classnames('modal-portal', {
            center: modalProps.centerContent
          })}
        >
          <PoseGroup>
            {Component && (
              <Modal
                pose={transition}
                initialPose="init"
                className="modal-inner"
                key={'modal-inner'}
              >
                <div className="wrap">
                  <>
                    <Scroller>
                      <div className="body">
                        <Component {...modalProps} requestClose={hideModal} />
                      </div>
                    </Scroller>
                    <div className="close-wrap">
                      <ButtonClose
                        onClick={hideModal}
                        hoverColor="#AAC800"
                        color="white"
                      />
                    </div>
                  </>
                </div>
              </Modal>
            )}
          </PoseGroup>
          <style jsx>{`
            @import 'mixins/r';
            .modal-portal :global(.modal-inner) {
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              position: fixed;
              z-index: 100500;
              background: url(/static/branding/modal-background.svg);
              background-size: cover;
              :global(.is-mobile) & {
                overflow: auto;
                z-index: 99999999999;
              }
            }
            .modal-portal :global(h1) {
              color: white;
              font-weight: 500;
            }
            .body {
              width: 100%;
              height: 100%;
              display: flex;
            }
            .center .body {
              justify-content: center;
            }
            .close-wrap {
              top: 50px;
              right: 50px;
              position: absolute;
              :global(.is-mobile) & {
                top: 20px;
                right: 20px;
              }
            }
          `}</style>
        </div>
      )
    }}
  </ModalConsumer>
)

ModalRoot.defaultProps = {}

const Modal = posed.div({
  init: {
    opacity: 0
  },
  enter: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
})

export default ModalRoot
