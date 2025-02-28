<template>
  <div class="content-container">
    <h4 class="section-title">Problém batohu</h4>
    <p class="section-paragraph">
      Problém batohu je typom optimalizačnej úlohy, ktorej cieľom je umiestniť predmety do batohu tak, aby hodnota vybraných predmetov bola čo najväčšia. Zároveň
      nesmie dôjsť k porušeniu daných obmedzení, ako napríklad, že hmotnosť predmetov umiestnených v batohu nesmie prekročiť nosnosť batohu [17].
    </p>
    <p class="section-paragraph">
      Existuje niekoľko alternatív tohto problému. Známymi príkladmi sú 0-1 batoh, obmedzený batoh a
      neobmedzený batoh.
    </p>
    <h5 class="subsection-title">0-1 batoh</h5>
    <p class="section-paragraph">
      Táto verzia predstavuje najzákladnejšiu a najjednoduchšiu formu tohto problému.
      Názov 0-1 je odvodený od spôsobu, ktorým sa s predmetmi zaobchádza. Každý
      predmet je buď do batohu pridaný, teda 1, alebo je zamietnutý a do batohu sa
      nepridá, teda 0 [17].
    </p>
    <h5 class="subsection-title">Obmedzený batoh</h5>
    <p class="section-paragraph">
      Obmedzený batoh je modifikáciou 0-1 batohu, v ktorej je možné umiestniť predmety rovnakého typu do batohu aj viackrát. Každý predmet môže mať určené
      minimálne množstvo (spodné ohraničenie), teda koľkokrát sa predmet musí v batohu nachádzať. Okrem toho môže byť stanovené aj maximálne množstvo (horné
      ohraničenie), ktoré obmedzuje, koľko kusov daného predmetu je možné do batohu
      vložiť [17].
    </p>
    <h5 class="subsection-title">Neobmedzený batoh</h5>
    <p class="section-paragraph">
      V tomto type úlohy je jediným obmedzením kapacita batohu. Samotné počty predmetov nie sú nijako obmedzené [17].
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TeachingKnapsack',
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
