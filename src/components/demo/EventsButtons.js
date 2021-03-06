/* global __BASE_DIR__ */
import React, {PropTypes} from 'react'

const reqFixturesDemo =
  require.context(`${__BASE_DIR__}`, true, /\/demo\/fixtures\/.*\.js/)

const executeUseCase = ({domain, useCase, params}) => {
  const base = reqFixturesDemo(`./demo/fixtures/${useCase}.js`).default
  domain.get(useCase).execute({
    ...base,
    ...params
  })
}

const EventsButtons = ({events, domain}) => {
  if (!domain) { return null }
  return (
    <div className='sui-StudioEventsButtons'>
      <ul className='sui-StudioEventsButtons-buttons sui-StudioTabs sui-StudioTabs--horizontal'>
        <li className='sui-StudioTabs-title'>
          <span className='sui-StudioTabs-titleLink'>Events</span>
        </li>
        {
          Object.keys(events).map(
            useCase => Object.keys(events[useCase]).map(
              event => (
                <li className='sui-StudioTabs-tab'>
                  <button
                    key={`${useCase}#${event}`}
                    className='sui-StudioTabs-link'
                    onClick={evt => executeUseCase({domain, useCase, params: events[useCase][event]})}>{event}</button>
                </li>
              )
            )
          )
        }
      </ul>
    </div>
  )
}

EventsButtons.displayName = 'EventsButtons'
EventsButtons.propTypes = {
  events: PropTypes.object,
  domain: PropTypes.object
}

export default EventsButtons
