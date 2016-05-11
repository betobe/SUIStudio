import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Layout from './layout'
import Workbench from './components/workbench'
import Demo from './components/demo'
import Documentation from './components/documentation'

export default (
  <Route path='/' component={Layout}>
    <Route path='workbench/:category/:name/:component' component={Workbench}>
      <IndexRoute component={Demo} />
      <Route path='demo' component={Demo} />
      <Route path='documentation' component={Documentation} />
    </Route>
  </Route>
)
