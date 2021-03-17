import React, { Component } from 'react'
import InputMask from 'react-input-mask'

import CloseButton from '@/components/close-btn'
import Subtitle from '@/components/subtitle'
import Button from '@/components/button'

import Policy from '@/components/modals/policy'
import withBaseForm from '@/components/modals/with-base-form'

class WriteUs extends Component {
  static defaultProps = {
    uni_code: null
  }

  state = {
    name: '',
    comment: '',
    phone: '',
    request_type: 'question',
    uni_code: this.props.uni_code
  }

  render() {
    const {
      submit,
      requestClose,
      onCheckPolicyClick,
      policyChecked
    } = this.props

    return (
      <div className="form" style={{ maxWidth: 520 }}>
        <div className="flex items-center">
          <div className="flex-auto">
            <Subtitle color3 large marginless>
              написать нам
            </Subtitle>
          </div>
          <CloseButton small flat onClick={requestClose} />
        </div>
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
          <div className="form-row">
            <textarea
              className="form-textarea"
              placeholder="Сообщение"
              value={this.state.comment}
              onChange={ev => this.setState({ comment: ev.target.value })}
            />
          </div>
        </div>
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

export default withBaseForm(WriteUs)
