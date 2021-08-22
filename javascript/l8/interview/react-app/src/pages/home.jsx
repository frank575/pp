import React from 'react'

export { Home }

function Home() {
  return <div className="home">
    <div className="home__items">
      <div className="number home__items__num">-5-5</div>
      <div className="number home__items__sym" />
      <div className="number home__items__num">3-9</div>
      <div className="number home__items__sym" />
      <div className="number home__items__num">1-2</div>
    </div>
    <div className="home__counters">
      <div className="counter">
        <div className="btn"><i className="minus" /></div>
        <div className="number">0</div>
        <div className="btn"><div className="plus" /></div>
      </div>
      <div className="counter">
        <div className="btn"><i className="minus" /></div>
        <div className="number">5</div>
        <div className="btn"><div className="plus" /></div>
      </div>
      <div className="counter">
        <div className="btn"><i className="minus" /></div>
        <div className="number">2</div>
        <div className="btn"><div className="plus" /></div>
      </div>
    </div>
    <div className="home__items">
      <div className="number home__items__num">0</div>
      <div className="number home__items__sym">+</div>
      <div className="number home__items__num">5</div>
      <div className="number home__items__sym">x</div>
      <div className="number home__items__num">2</div>
    </div>
    <div className="number home__result">10</div>
  </div>
}
