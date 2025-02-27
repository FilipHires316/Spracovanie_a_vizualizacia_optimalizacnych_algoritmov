<template>
  <div class="content-container">
    <h4 class="section-title">O aplikácii</h4>
    <p class="section-paragraph">
      Táto webová aplikácia je súčasťou praktickej časti bakalárskej práce, ktorá sa zaoberá analýzou
      a implementáciou optimalizačných algoritmov inšpirovaných prírodou. Aplikácia umožňuje vizualizáciu
      algoritmov a poskytuje používateľom interaktívny nástroj na ich skúmanie a porozumenie.
      Cieľom je nielen ukázať ich efektivitu pri riešení reálnych problémov, ale aj poskytnúť
      nástroj na vzdelávanie v tejto oblasti.
    </p>

    <h4 class="section-title">Funkcie aplikácie</h4>
    <ul class="section-list">
      <li><strong>Riešenie optimalizačných problémov pomocou algoritmov inšpirovaných prírodou:</strong> Problém batohu, balenia košov a obchodného cestujúceho. Algoritmus inšpirovaný správaním veľrýb, algoritmus inšpirovaný správaním levov a genetický algoritmus.</li>
      <li><strong>Vizualizácia výsledkov:</strong> Interaktívne grafy a tabuľky ukazujúce priebeh optimalizácie.</li>
      <li><strong>Porovnanie výsledkov:</strong> Jednoduché porovnanie viacerých optimalizačných procesov.</li>
      <li><strong>Vzdelávacie materiály:</strong> Informácie o princípoch fungovania algoritmov a optimalizačných problémov.</li>
    </ul>

    <h4 class="section-title">Ako to funguje?</h4>
    <ul class="section-list">
      <li>Vyberte si problém, ktorý chcete optimalizovať.</li>
      <li>Zvoľte algoritmus, ktorým ho chcete riešiť.</li>
      <li>Zadajte vstupné parametre alebo si vyberte z našej ponuky parametrov.</li>
      <li>Spustite proces a sledujte, ako algoritmus postupne zlepšuje riešenie.</li>
      <li>Prezrite si vizualizáciu a analyzujte výsledky.</li>
      <li>Prezrite podrobný popis fungovania jednotlivých algoritmov a optimalizačných problémov.</li>
    </ul>

    <div class="button-container">
      <q-btn class="button" color="white" text-color="black" label="O algoritmoch" to="/AboutAlgorithms" style="width: 40vw;"/>
      <q-btn class="button" color="primary" label="Riešenie optimalizačných problémov" to="/Problems" style="width: 40vw;"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InfoPanel',
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

.section-paragraph {
  text-align: justify;
  padding-left: 2.6vw;
  margin-bottom: 1vw;
  font-size: 16px;
  letter-spacing: 0.5px;
}

.section-list {
  text-align: justify;
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
