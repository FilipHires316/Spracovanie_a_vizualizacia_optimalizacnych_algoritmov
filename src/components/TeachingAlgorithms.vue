<template>
  <div class="content-container">
    <h4 class="section-title">Optimalizácia</h4>
    <p class="section-paragraph">
      V dnešnej dobe sa stretneme s veľkým množstvom problémov, ktoré vyžadujú
      efektívne plánovanie a manažment zdrojov, hľadanie optimálnych riešení alebo
      prispôsobenie sa určitým podmienkam. Aby sme tieto ideálne riešenia problémov
      našli, musíme využiť určitú formu optimalizácie.
    </p>
    <p class="section-paragraph">
      Optimalizácia je proces, ktorého cieľom je nájsť optimum funkcie, pričom toto optimum môže predstavovať maximum alebo minimum. Riešenie nelineárnych problémov je však často náročné, najmä z dôvodu rozsiahleho vyhľadávacieho priestoru.
      Na zvládnutie takýchto úloh je nevyhnutné využiť optimalizačné algoritmy, ktoré
      umožňujú systematické hľadanie optimálnych riešení. Tieto algoritmy je možné
      klasifikovať do viacerých kategórií na základe rôznych kritérií.
    </p>
    <h5 class="subsection-title">Rozdelenie podľa spôsobu vyhľadávania</h5>
    <p class="section-paragraph">
      Optimalizačné algoritmy môžeme rozdeliť podľa spôsobu vyhľadávania na dve kategórie. Prvá kategória zahŕňa algoritmy, ktoré vyhľadávajú riešenie pomocou trajektórie. Tieto algoritmy využívajú len jedného agenta, ktorý postupne hľadá cestu
      k optimálnemu riešeniu. Do tejto kategórie patria algoritmy ako horolezecký
      algoritmus alebo algoritmus simulovaného žíhania. Prehľadávanie okolia jedného
      riešenia však môže viesť k problémom, ako je uviaznutie v lokálnom optime, pretože agent sa pohybuje len v rámci jedného miesta v riešení. Druhou kategóriou
      sú populačné algoritmy, ktoré využívajú viacero agentov naraz. Títo agenti medzi sebou spolupracujú a prehľadávajú viacero riešení súčasne, pričom každý agent
      prispôsobuje svoje správanie na základe výsledkov ostatných agentov. Známym
      príkladom algoritmu, ktorý využíva populáciu, je genetický algoritmus. Tieto algoritmy sú odolnejšie voči uviaznutiu v lokálnom optime, pretože prehľadávajú viac
      častí vyhľadávacieho priestoru súčasne, avšak bývajú výpočtovo zložitejšie.
    </p>
    <h5 class="subsection-title">Rozdelenie podľa jednoznačnosti</h5>
    <p class="section-paragraph">
      Algoritmy môžu byť deterministické alebo nedeterministické, teda stochastické.
      Algoritmus môžeme považovať za deterministický, pokiaľ neobsahuje žiadne prvky
      náhody. Teda algoritmus vždy dosiahne rovnaký výsledok za predpokladu, že mal
      rovnaký počiatočný stav. Príkladom deterministického algoritmu môže byť opäť
      horolezecký algoritmus. Na druhú stranu algoritmy, ktoré obsahujú určité prvky
      náhody, môžu z rovnakého počiatočného bodu dosiahnuť rôzne výsledky. Do tejto
      kategórie patria napríklad algoritmy skupinovej inteligencie.
    </p>
    <h5 class="subsection-title">Rozdelenie podľa prehľadávaného priestoru</h5>
    <p class="section-paragraph">
        V tejto kategórii sú algoritmy rozdelené na tie, ktoré prehľadávajú priestor lokálne,
      a na tie, ktoré priestor prehľadávajú globálne. Algoritmy lokálneho prehľadávania
      sú často zároveň deterministické a pokiaľ uviaznu v lokálnom optime, nedokážu
      ho opustiť. Pridanie náhodných prvkov do algoritmu dokáže pomôcť vyviaznuť z
      lokálneho optima a následne nájsť globálne optimum.
    </p>
    <p class="section-paragraph">
      Samozrejme nie všetky algoritmy dokážeme jednoznačne zaradiť do určitej kategórie. Takéto hybridné algoritmy môžu kombinovať prvky z viacerých kategórií
      súčasne. V našej práci sa zameriame hlavne na stochastické algoritmy, ktoré
      prehľadávajú priestor globálne pomocou populácie viacerých agentov.
    </p>
    <h4 class="section-title">Algoritmy inšpirované prírodou</h4>
    <p class="section-paragraph">
      Veľkú časť optimalizačných algoritmov tvoria algoritmy inšpirované prírodou. Tieto
      algoritmy simulujú určitý jav, ktorý sa dá sledovať v prírode. Môže sa jednať o
      črtu, ktorá je charakteristická pre konkrétnu skupinu živočíchov a ich kolektívne správanie, ale aj o nejaký biologický alebo chemický proces.
      Všetky algoritmy z tejto kategórie majú podobný priebeh. Prvým krokom je inicializácia počiatočnej populácie. Počiatočná populácia obsahuje náhodne vytvorených jedincov. Následne sa pre každého jedinca vypočíta hodnota fitness funkcie.
      Hodnota fitness funkcie udáva, ako dobre jedinec splnil danú úlohu. Pokiaľ nebola splnená podmienka, ktorá ukončí priebeh algoritmu, prejde sa na ďalší krok,
      ktorým je uskutočnenie operácií nad súčasnou generáciou a vytvorenie novej generácie. Tento krok sa líši podľa vybraného algoritmu. Po vytvorení novej generácie
      sa opäť pokračuje vyhodnotením úspešnosti pomocou fitness funkcie, až kým nie
      je splnená podmienka ukončenia. Diagram priebehu tohto procesu je zobrazený
      na obrázku nižšie.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TeachingAlgorithms',
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
  text-align: justify;
  padding-left: 2.6vw;
  margin-bottom: 2vw;
  font-size: 16px;
  letter-spacing: 0.5px;
}

.section-list {
  text-align: justify;
  margin-bottom: 2vw;
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
