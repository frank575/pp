<template>
  <div class="home">
    <div class="home__items">
      <div class="number home__items__num">-5-5</div>
      <div class="number home__items__sym" />
      <div class="number home__items__num">3-9</div>
      <div class="number home__items__sym" />
      <div class="number home__items__num">1-2</div>
    </div>
    <div class="home__counters">
      <div class="counter">
        <div class="btn"><i class="minus" /></div>
        <div class="number">0</div>
        <div class="btn"><div class="plus" /></div>
      </div>
      <div class="counter">
        <div class="btn"><i class="minus" /></div>
        <div class="number">5</div>
        <div class="btn"><div class="plus" /></div>
      </div>
      <div class="counter">
        <div class="btn"><i class="minus" /></div>
        <div class="number">2</div>
        <div class="btn"><div class="plus" /></div>
      </div>
    </div>
    <div class="home__items">
      <div class="number home__items__num">0</div>
      <div class="number home__items__sym">+</div>
      <div class="number home__items__num">5</div>
      <div class="number home__items__sym">x</div>
      <div class="number home__items__num">2</div>
    </div>
    <div class="number home__result">10</div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
