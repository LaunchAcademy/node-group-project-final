import React, { useEffect } from "react"
import { hot } from "react-hot-loader/root"
import "foundation-sites"
import $ from "jquery"
import "../assets/scss/main.scss"

import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom"

import PetTypesIndex from "./PetTypesIndex"
import PetTypeShow from "./PetTypeShow"
import PetShow from "./PetShow"

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
      <Route exact path="/pets/:petType/:petId" component={PetShow} />
    </BrowserRouter>
  )
}

export default hot(App)
