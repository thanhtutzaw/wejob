<script setup lang="ts">
// import { store } from '@/stores/vuex';
import { ref, type Ref } from 'vue';
class Counter {
  value: Ref<number>;
  constructor(initialValue = 0) {
    this.value = ref(initialValue);
  }
  increment() {
    this.value.value++;
  }
  decrement() {
    this.value.value--;
  }
}
const counter = new Counter(0)
const otherState = new Counter(0)
// const increment = () => {
//   counter.value++
// }
// const decrement = () => {
//   counter.value--
// }
</script>
<template>
  <section>
    <h1>State Management</h1>
    <div class="container">
      <div>
        <h2>Vuex</h2>
        <div>
          <button @click="counter.increment()">+</button>
          <h2>{{ counter.value}}</h2>
          <button @click="counter.decrement()">-</button>
        </div>
      </div>
      <div>
        <h2>Pinia</h2>
        <div>
          <button @click="otherState.increment()">+</button>
          <h2>{{ otherState.value }}</h2>
          <button @click="otherState.decrement()">-</button>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
section {
  display: grid;
  justify-content: center;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
}

div {
  display: grid;
  justify-content: center;
  align-items: center;
  justify-items: center;
}

button {
  font-size: 1.5rem;
}
</style>
value: any;