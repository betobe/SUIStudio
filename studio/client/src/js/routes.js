import React from 'react'
import {Route} from 'react-router'

import Layout from './layout'
import Workbench from './components/workbench'

export default (
  <Route path='/' component={Layout}>
    <Route path='workbench/:category/:name/:component' component={Workbench} />
  </Route>
)
