import React from 'react'
import data from './a.json'
const path = require('path')

console.log(1, data, path.resolve(__dirname))

const context = React.createContext(null)
