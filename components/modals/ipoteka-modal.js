import React, { Component } from 'react'
import InputMask from 'react-input-mask'

import CloseButton from '@/components/close-btn'
import Subtitle from '@/components/subtitle'
import Button from '@/components/button'

import Policy from '@/components/modals/policy'
import withBaseForm from '@/components/modals/with-base-form'

class IpotekaModal extends Component {
  state = {
    name: '',
    phone: '',
    request_type: 'ipoteka',
    data: {
      flat: this.props.flat,
      calculationResults: this.props.calculationResults
    }
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
      <div className="form" style={{ maxWidth: 620 }}>
        <div className="flex items-center">
          <div className="flex-auto">
            <Subtitle color3 large marginless>
              Заявка на ипотеку
            </Subtitle>
          </div>
          <CloseButton small flat onClick={requestClose} />
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
        <div className="form-row">
          <div className="flex items-center">
            <div className="pr2 flex-auto">
              <Policy
                color7
                checked={policyChecked}
                onCheckClick={onCheckPolicyClick}
              />
            </div>
            <Button large primary onClick={() => submit(this.state)}>
              Отправить
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

IpotekaModal.defaultProps = {
  flat: null,
  calculationResults: null
}

export default withBaseForm(IpotekaModal)
