<template>
  <div class="content-container">
    <h4 class="section-title">Problém obchodného cestujúceho</h4>
    <p class="section-paragraph">
      Problém obchodného cestujúceho spočíva v tom, že máme danú množinu miest,
      ktoré musíme navštíviť a následne sa vrátiť späť do mesta, v ktorom cesta začínala.
      Každé mesto je možné navštíviť len raz. Cieľom úlohy je nájsť cestu, pri ktorej
      prejdeme čo najmenšiu vzdialenosť [18].
    </p>
    <img src="/images/salesman.png" alt="Príklad riešenia problému obchodného cestujúceho" style="margin-left: 15vw; margin-top: 1vw;" />
    <p class="section-paragraph">
      Na obrázku vyššie môžeme vidieť, ako by mohlo vyzerať optimálne riešenie problému
      obchodného cestujúceho. Uzly predstavujú mestá a hrany optimálnu cestu, po
      ktorej by sa mal obchodný cestujúci vydať.
    </p>
    <p class="section-paragraph">
      Pre tento problém existuje viacero modifikácií, ktoré upravujú spôsob riešenia
      úlohy.
    </p>
    <h5 class="subsection-title">Problém obchodného cestujúceho s asymetrickými cestami</h5>
    <p class="section-paragraph">
      V tejto verzii problému obchodného cestujúceho, majú cesty medzi mestami asymetrické dĺžky. Teda dĺžka cesty z mesta A do mesta B je rôzna od dĺžky z mesta
      B do mesta A [18].
    </p>
    <h5 class="subsection-title">Problém obchodného cestujúceho s časovými oknami</h5>
    <p class="section-paragraph">
      Táto varianta pridáva do klasického problému obchodného cestujúceho aspekt časových okien. Obchodný cestujúci musí opäť navštíviť každé mesto práve raz a
      vrátiť sa do východzieho mesta, avšak je navyše obmedzený časovými oknami
      jednotlivých miest. Každé mesto má priradený interval, v ktorom musí byť navštívené. Spodná hranica intervalu udáva najskorší termín, v ktorom sa do mesta
      obchodný cestujúci dostane, a vrchná hranica udáva termín, do ktorého musí byť
      mesto navštívené [18].
    </p>
    <h5 class="subsection-title">Problém viacerých obchodných cestujúcich</h5>
    <p class="section-paragraph">
      Táto úloha predstavuje model, v ktorom viacero cestujúcich spolupracuje, aby
      prešli všetky mestá v čo najkratšom čase. Obchodní cestujúci sa pohybujú medzi
      mestami naraz, avšak žiadny z nich nemôže vstúpiť do mesta, ktoré už navštívil niekto iný. Všetci obchodní cestujúci začínajú aj končia v rovnakom meste
      [18].
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TeachingSalesman',
  props: {
  },

  setup() {
    return {
    };
  }
});
</script>

<style lang="scss" scoped>

.content-container {
  font-family: 'Arial', sans-serif;
  max-width: 50vw;
}

.section-title {
  font-family: 'Arial', sans-serif;
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 1vw;
}

.subsection-title {
  font-family: 'Arial', sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1vw;
}

.section-paragraph {
  text-align: left;
  padding-left: 2.6vw;
  margin-bottom: 1vw;
  font-size: 16px;
  letter-spacing: 0.5px;
}

.section-list {
  text-align: left;
  margin-bottom: 1vw;
  font-size: 16px;
  letter-spacing: 0.5px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 1vw;
  margin-top: 2vw;
  margin-bottom: 2vw;
}

.button {
  border-radius: 20px;
}
</style>
