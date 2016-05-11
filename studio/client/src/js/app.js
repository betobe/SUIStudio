import React from 'react'
import reactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import routes from './routes'

reactDOM.render(<Router routes={routes} history={browserHistory} />, document.getElementById('root'))
