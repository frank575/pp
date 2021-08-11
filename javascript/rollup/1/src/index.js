import React from 'react'
import { myTSFun } from './testts'
import cww from './cww.jpg'
import data from 'asdasd'
const path = require('path')

// __TEST__ 會被編譯成 123，因為有寫 replace({ __TEST__: 123 })
console.log(__TEST__, data, path.resolve(__dirname))

const context = React.createContext(null)

myTSFun('frank')
alert(context)
console.log(cww)
