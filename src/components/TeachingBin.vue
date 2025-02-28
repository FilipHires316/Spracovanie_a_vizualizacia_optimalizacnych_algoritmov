<template>
  <div class="content-container">
    <h4 class="section-title">Problém balenia košov</h4>
    <p class="section-paragraph">
      Problém balenia košov je optimalizačný problém založený na kombinatorike. Problém sa zaoberá balením zadaného počtu predmetov do kontajnerov. Kontajnery
      majú zadanú jednotnú kapacitu. Cieľom úlohy je umiestniť všetky predmety do
      kontajnerov, tak aby neprekročili ich nosnosť. Najoptimálnejšie riešenie je také, v
      ktorom použijeme najmenší počet kontajnerov [15].
    </p>
    <p class="section-paragraph">
      Opäť si predstavíme viacero variácií tohto problému, ktoré sa líšia typom obmedzení.
    </p>
    <h5 class="subsection-title">Dynamické balenie</h5>
    <p class="section-paragraph">
      V tejto variante problému majú predmety zadaný časový interval, v ktorom zaberajú miesto v kontajneroch. Teda po skončení tohto intervalu je miesto, do ktorého
      boli pridelené, uvoľnené pre ďalšie predmety [15].
    </p>
    <h5 class="subsection-title">Viacrozmerné koše</h5>
    <p class="section-paragraph">
      Táto variácia úlohy pridáva kontajnerom, do ktorých sú predmety balené, rozmer
      šírky, ak sa jedná o 2D koše, a taktiež rozmer hĺbky, ak sa jedná o 3D koše.
      Teda okrem obmedzenia hmotnosti, treba pri riešení problému myslieť aj na tvar
      predmetov [15].
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TeachingBin',
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
