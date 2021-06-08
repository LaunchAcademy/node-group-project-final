import React, { useEffect } from "react"
import { hot } from "react-hot-loader/root"
import "foundation-sites"
import $ from "jquery"
import "../assets/scss/main.scss"

import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom"

import PetTypesIndex from "./PetTypesIndex"
import PetTypeShow from "./PetTypeShow"

const App = props => {
  useEffect(() => {
    $(document).foundation()
  }, [])

  return(
    <BrowserRouter>
      <Route exact path="/">
        <Redirect to="/pets" />
      </Route>
      <Route exact path="/pets" component={PetTypesIndex} />
      <Route exact path="/pets/:petType" component={PetTypeShow} />
    </BrowserRouter>
  )
}

export default hot(App)
