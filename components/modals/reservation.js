import React, { Component } from 'react'
import InputMask from 'react-input-mask'
import Title from '@/components/typo/title'
import Button from '@/components/button'
import Policy from '@/components/modals/policy'
import withBaseForm from '@/components/modals/with-base-form'
import Spacer from '@/components/typo/spacer'

class ReservationModal extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign(
      {},
      {
        name: '',
        phone: '',
        request_type: 'rezerv',
        apartment_ui: props.flat.apartment_ui
      },
      props.formdata
    )
  }

  render() {
    const {
      flat,
      submit,
      requestClose,
      onCheckPolicyClick,
      policyChecked
    } = this.props

    return (
      <Spacer tSpace={200}>
        <div className="form" style={{ maxWidth: 450 }}>
          <div className="flex items-center">
            <div className="flex-auto">
              <Title color7 large>
                Забронировать квартиру
              </Title>
            </div>
          </div>
          <form id={this.state.request_type}>
            <div className="form-body">
              <div className="form-row">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ваше имя"
                  value={this.state.name}
                  onChange={ev => this.setState({ name: ev.target.value })}
                  autoFocus
                />
                <div className="form-error" />
              </div>
              <div className="form-row">
                <InputMask
                  placeholder="Телефон"
                  maskChar=" "
                  className="form-input"
                  mask="+7 999 999 99 99"
                  value={this.state.phone}
                  onChange={ev => this.setState({ phone: ev.target.value })}
                />
              </div>
            </div>
          </form>
          <div className="flex policy-wrap">
            <div className="flex-item">
              <Button
                onClick={() => submit(Object.assign(this.state, flat))}
                secondary
              >
                Отправить
              </Button>
            </div>
            <div className="flex-auto all-policy-wrap">
              <Policy
                color7
                checked={policyChecked}
                onCheckClick={onCheckPolicyClick}
              />
            </div>
          </div>
        </div>
        <style jsx>{`
          .policy-wrap {
            :global(.is-mobile) & {
              display: block;
            }
          }
          .all-policy-wrap {
            :global(.is-mobile) & {
              margin-top: 24px;
              & :global(.policy) {
                padding-left: 0;
              }
            }
          }
        `}</style>
      </Spacer>
    )
  }
}

export default withBaseForm(ReservationModal)
