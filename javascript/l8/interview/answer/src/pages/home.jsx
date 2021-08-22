import React, { useState } from 'react'
import { Counter } from '../components/counter'

export { Home }

function Home() {
  const [count, setCount] = useState({
    one: -5,
    two: 3,
    three: 1,
  })
  const onChange = key => (count) => setCount(e => ({ ...e, [key]: count }))

  return <div className="home">
    <div className="home__items">
      <div className="number home__items__num">-5-5</div>
      <div className="number home__items__sym" />
      <div className="number home__items__num">3-9</div>
      <div className="number home__items__sym" />
      <div className="number home__items__num">1-2</div>
    </div>
    <div className="home__counters">
      <Counter min={-5} max={5} onChange={onChange('one')} />
      <Counter min={3} max={9} onChange={onChange('two')} />
      <Counter min={1} max={2} onChange={onChange('three')} />
    </div>
    <div className="home__items">
      <div className="number home__items__num">{count.one}</div>
      <div className="number home__items__sym">+</div>
      <div className="number home__items__num">{count.two}</div>
      <div className="number home__items__sym">x</div>
      <div className="number home__items__num">{count.three}</div>
    </div>
    <div className="number home__result">{count.one + count.two * count.three}</div>
  </div>
}
