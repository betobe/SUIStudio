import React from 'react'
import {Route, IndexRoute, Redirect} from 'react-router'

import Layout from './layout'
import Workbench from './components/workbench'
import Demo from './components/demo'
import Documentation from './components/documentation'
import ReactDocGen from './components/documentation/react-docgen'
import Markdown from './components/documentation/markdown'

export default (
  <Route>
    <Redirect from='/SUIStudio/' to='/' />
    <Route path='/' component={Layout}>
      <Route path='workbench/:category/:name/:component' component={Workbench}>
        <IndexRoute component={Demo} />
        <Route path='demo' component={Demo} />
        <Route path='documentation' component={Documentation}>
          <IndexRoute component={ReactDocGen} />
          <Route path='generate' component={ReactDocGen} />
          <Route path='readme' component={Markdown} />
        </Route>
      </Route>
    </Route>
  </Route>
)
