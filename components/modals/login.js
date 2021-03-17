import React, { Component } from 'react'
import Title from '@/components/typo/title'
import Button from '@/components/button'
import Spacer from '@/components/typo/spacer'
import withFetch from '@/components/hocs/with-fetch'
import { AppContext } from '@/components/context/app'
import { UserAgent } from '@quentin-sommer/react-useragent'
import Spinner from '@/components/spinner'
import Scroller from '@/components/scroller'

const rowHeight = 68
const Persons = ({ persons, onSelectPerson }) => (
  <div>
    <div
      className="persons"
      style={{ height: Math.min(340, rowHeight * persons.length) }}
    >
      <Scroller>
        {persons.map(person => (
          <div
            key={person.id}
            className="flex items-center person"
            onClick={() => onSelectPerson(person)}
          >
            <div className="person-ava">
              <img src={person.avatar_url} />
            </div>
            <div className="person-name">
              {person.first_name} {person.second_name}
            </div>
          </div>
        ))}
      </Scroller>
    </div>
    <style jsx>{`
      .persons {
        position: relative;
        margin-left: -8px;
      }
      .person-ava {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
      }
      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
      .person-name {
        padding-left: 16px;
        font-weight: 500;
        font-size: 18px;
        color: white;
      }
      .person {
        padding: 10px;
        cursor: pointer;
        border-radius: 4px;
        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    `}</style>
  </div>
)

class Login extends Component {
  static contextType = AppContext

  constructor(props) {
    super(props)

    this.state = {
      user: '',
      password: '',
      persons: null,
      loading: true,
      person: null,
      userhash: null
    }

    this.passRef = React.createRef()
  }

  login = async () => {
    try {
      // prettier-ignore
      const response = await this.props.request.post('/login').send(this.state)
      const { token, user } = response.body.data
      await this.context.login({ token, user })
      location.reload()
    } catch (error) {
      alert('Ошибка авторизации')
    }
  }

  componentDidMount() {
    const fetchPersons = async () => {
      this.setState({ loading: true })
      try {
        const { data } = (await this.props.request.get('/login/select')).body
        const persons = data.length > 0 ? data : null
        this.setState({ persons })
      } catch (e) {
      } finally {
        this.setState({ loading: false })
      }
    }
    fetchPersons()
  }

  componentDidUpdate() {
    // Автофокус
    if (this.state.userhash && this.passRef.current) {
      this.passRef.current.focus()
    }
  }

  flushPersons = () => this.setState({ persons: null })
  setPerson = person => this.setState({ person, userhash: person.userhash })

  render() {
    const { loading, persons, person } = this.state
    return (
      <UserAgent>
        {agent => (
          <Spacer tSpace={agent.mobile ? 50 : 150}>
            <div className="form" style={{ width: 400 }}>
              {loading ? (
                <Spinner center color1 />
              ) : null !== persons && null === person ? (
                <div className="flex flex-column">
                  <Title color7>Выбор&nbsp;менеджера</Title>
                  <Spacer vSpace={12}>
                    <Persons
                      persons={persons}
                      onSelectPerson={this.setPerson}
                    />
                  </Spacer>
                  <Spacer tSpace={24}>
                    <Button secondary onClick={this.flushPersons}>
                      Другой менеджер
                    </Button>
                  </Spacer>
                </div>
              ) : (
                <div>
                  <div className="flex items-center">
                    <div className="flex-auto">
                      <Title color7>Авторизация</Title>
                    </div>
                  </div>
                  <div className="form-body">
                    {null === this.state.userhash && (
                      <div className="form-row">
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Логин"
                          value={this.state.user}
                          onChange={ev =>
                            this.setState({ user: ev.target.value })
                          }
                          autoFocus
                        />
                      </div>
                    )}
                    <div className="form-row">
                      <input
                        type="password"
                        className="form-input"
                        placeholder="Пароль"
                        value={this.state.password}
                        ref={this.passRef}
                        onChange={ev =>
                          this.setState({ password: ev.target.value })
                        }
                      />
                    </div>
                  </div>
                  <Spacer tSpace={40}>
                    <Button onClick={this.login} secondary>
                      Войти
                    </Button>
                  </Spacer>
                </div>
              )}
            </div>
          </Spacer>
        )}
      </UserAgent>
    )
  }
}

export default withFetch(Login)
