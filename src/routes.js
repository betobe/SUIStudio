import React from 'react'
import {Route, IndexRoute, Redirect} from 'react-router'

import Layout from './layout'
import Workbench from './components/workbench'
import Demo from './components/demo'
import Tests from './components/tests'
import Documentation from './components/documentation'
import ReactDocGen from './components/documentation/ReactDocGen'
import Markdown from './components/documentation/Markdown'

export default (
  <Route>
    <Redirect from='/SUIStudio/' to='/' />
    <Route path='/' component={Layout}>
      <Route path='workbench/:category/:component' component={Workbench}>
        <IndexRoute component={Demo} />
        <Route path='demo' component={Demo}>
          <Route path='**' />
        </Route>
        <Route path='documentation' component={Documentation}>
          <IndexRoute component={ReactDocGen} />
          <Route path='generate' component={ReactDocGen} />
          <Route path='readme' component={Markdown} />
        </Route>
        <Route path='tests' component={Tests} />
      </Route>
    </Route>
  </Route>
)
