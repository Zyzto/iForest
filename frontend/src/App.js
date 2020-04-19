import React, { Component } from 'react'
import Allplants from './Plants/Allplants'
import Nave from './Navebar/Nave'

export default class App extends Component {
  render() {
    return (
      <div>
        <Nave/>
        <Allplants/>
      </div>
    )
  }
}
