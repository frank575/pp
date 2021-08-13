const { useProvider } = require('./src/react/hooks/use-provider')
const { stepPrice } = require('./dist/index.cjs')

console.log(stepPrice(500))
console.log(stepPrice(1000))
