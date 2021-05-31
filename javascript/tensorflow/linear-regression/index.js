import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'

window.onload = () => {
  const xs = [1, 2, 3, 4]
  const ys = [1, 3, 5, 7]
  tfvis.render.scatterplot(
    {name: '線性回歸訓練集'},
    {values: xs.map((x,i)=>({x,y:ys[i]}))}
  )
}
