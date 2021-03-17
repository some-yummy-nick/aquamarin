import React, { Component, Fragment } from 'react'
import withFetch from '@/components/hocs/with-fetch'
import Spinner from '@/components/spinner'
import Title from '@/components/typo/title'

function withBaseForm(WrappedComponent) {
  class Form extends React.Component {
    state = {
      loading: false,
      complete: false,
      policyChecked: true,
      formdata: {}
    }

    submit = async formdata => {
      formdata = Object.assign({}, formdata, {
        policy_checked: this.state.policyChecked
      })

      if (this.inValidate(formdata)) {
        return
      }

      this.setState({ loading: true, formdata })

      try {
        await this.props.request.post('/feedback').send(formdata)

        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'formSubmission',
            formID: formdata.request_type
          })
        }

        this.setState({ loading: false, complete: true })
      } catch (error) {
        this.setState({ loading: false, complete: false }, () => {
          try {
            const errors = Object.values(error.response.body.errors).join(', ')
            alert('Ошибка отправки формы: ' + errors)
          } catch (e) {
            alert('Ошибка отправки формы')
          }
        })
      }
    }

    inValidate = formdata => {
      return formdata.name === '' || formdata.phone === ''
    }

    togglePolicyChecked = () => {
      this.setState({ policyChecked: !this.state.policyChecked })
    }

    componentDidUpdate() {
      if (this.state.complete) {
        setTimeout(this.props.requestClose, 3000)
      }
    }

    render() {
      const { loading, complete, policyChecked, formdata } = this.state
      return (
        <div className="form-wrap">
          {loading ? (
            <Spinner color5 center />
          ) : complete ? (
            <div className="complete">
              <Title color7 large marginless>
                Спасибо!
              </Title>
              <Title color7 small>
                <div>Ваше обращение принято</div>
                <div>В ближайшее время мы свяжемся с Вами</div>
              </Title>
            </div>
          ) : (
            <WrappedComponent
              {...this.props}
              formdata={formdata}
              submit={this.submit}
              policyChecked={policyChecked}
              onCheckPolicyClick={this.togglePolicyChecked}
            />
          )}
          <style jsx>{`
            .complete {
              text-align: center;
              top: 50%;
              left: 50%;
              position: fixed;
              z-index: 10;
              transform: translate(-50%, -50%);
              :global(.is-mobile) & {
                margin-top: 50px;
                padding: 40px;
                position: static;
                transform: translate(0, 0);
                :global(.small .name) {
                  font-size: 18px;
                  text-transform: none;
                }
              }
            }
            .form-wrap {
              :global(.is-mobile) & :global(.spacer) {
                margin-top: 50px !important;
              }
            }
          `}</style>
        </div>
      )
    }
  }
  return withFetch(Form)
}

export default withBaseForm
