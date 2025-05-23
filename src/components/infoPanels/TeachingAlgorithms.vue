<!-- information about optimization -->
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
      umožňujú systematické hľadanie optimálnych riešení {{cite14.index}}. Tieto algoritmy je možné
      klasifikovať do viacerých kategórií na základe rôznych kritérií.
    </p>
    <h5 class="subsection-title">Rozdelenie podľa spôsobu vyhľadávania</h5>
    <p class="section-paragraph">
      Optimalizačné algoritmy môžeme rozdeliť podľa spôsobu vyhľadávania na dve kategórie.
    </p>
    <p class="section-paragraph">
      Prvá kategória zahŕňa algoritmy, ktoré vyhľadávajú riešenie pomocou trajektórie. Tieto algoritmy využívajú len jedného agenta, ktorý postupne hľadá cestu
      k optimálnemu riešeniu {{cite14.index}}. Do tejto kategórie patria algoritmy ako horolezecký
      algoritmus alebo algoritmus simulovaného žíhania. Prehľadávanie okolia jedného
      riešenia však môže viesť k problémom, ako je uviaznutie v lokálnom optime, pretože agent sa pohybuje len v rámci jedného miesta v riešení.
    </p>
    <p class="section-paragraph">
      Druhou kategóriou
      sú populačné algoritmy, ktoré využívajú viacero agentov naraz. Títo agenti medzi sebou spolupracujú a prehľadávajú viacero riešení súčasne, pričom každý agent
      prispôsobuje svoje správanie na základe výsledkov ostatných agentov {{cite9.index}}. Známym
      príkladom algoritmu, ktorý využíva populáciu, je genetický algoritmus. Tieto algoritmy sú odolnejšie voči uviaznutiu v lokálnom optime, pretože prehľadávajú viac
      častí vyhľadávacieho priestoru súčasne, avšak bývajú výpočtovo zložitejšie.
    </p>
    <h5 class="subsection-title">Rozdelenie podľa jednoznačnosti</h5>
    <p class="section-paragraph">
      Algoritmy môžu byť deterministické alebo nedeterministické, teda stochastické.
    </p>
    <p class="section-paragraph">
      Algoritmus môžeme považovať za deterministický, pokiaľ neobsahuje žiadne prvky
      náhody. Teda algoritmus vždy dosiahne rovnaký výsledok za predpokladu, že mal
      rovnaký počiatočný stav. Príkladom deterministického algoritmu môže byť opäť
      horolezecký algoritmus.
    </p>
    <p class="section-paragraph">
      Na druhú stranu algoritmy, ktoré obsahujú určité prvky
      náhody, môžu z rovnakého počiatočného bodu dosiahnuť rôzne výsledky. Do tejto
      kategórie patria napríklad algoritmy skupinovej inteligencie.
    </p>
    <h5 class="subsection-title">Rozdelenie podľa prehľadávaného priestoru</h5>
    <p class="section-paragraph">
      V tejto kategórii sú algoritmy rozdelené na tie, ktoré prehľadávajú priestor lokálne,
      a na tie, ktoré priestor prehľadávajú globálne.
    </p>
    <p class="section-paragraph">
      Algoritmy lokálneho prehľadávania
      sú často zároveň deterministické a pokiaľ uviaznu v lokálnom optime, nedokážu
      ho opustiť. Pridanie náhodných prvkov do algoritmu dokáže pomôcť vyviaznuť z
      lokálneho optima a následne nájsť globálne optimum {{cite14.index}}.
    </p>
    <p class="section-paragraph">
      Samozrejme nie všetky algoritmy dokážeme jednoznačne zaradiť do určitej kategórie. Takéto hybridné algoritmy môžu kombinovať prvky z viacerých kategórií
      súčasne {{cite14.index}}. Táto aplikácia je zameraná hlavne na stochastické algoritmy, ktoré
      prehľadávajú priestor globálne pomocou populácie viacerých agentov.
    </p>
    <h4 class="section-title">Algoritmy inšpirované prírodou</h4>
    <p class="section-paragraph">
      Veľkú časť optimalizačných algoritmov tvoria algoritmy inšpirované prírodou. Tieto
      algoritmy simulujú určitý jav, ktorý sa dá sledovať v prírode. Môže sa jednať o
      črtu, ktorá je charakteristická pre konkrétnu skupinu živočíchov a ich kolektívne správanie, ale aj o nejaký biologický alebo chemický proces.
    </p>
    <p class="section-paragraph">
      Všetky algoritmy z tejto kategórie majú podobný priebeh, ktorý je zobrazený
      na obrázku nižšie.
    </p>
    <img src="/images/nature_diagram.png" alt="Diagram priebehu algoritmov inšpirovaných prírodou" style="margin-left: 10vw; margin-bottom: 1vw" />
    <p class="section-paragraph">
      Prvým krokom je inicializácia počiatočnej populácie. Počiatočná populácia obsahuje náhodne vytvorených jedincov. Následne sa pre každého jedinca vypočíta hodnota fitness funkcie.
      Hodnota fitness funkcie udáva, ako dobre jedinec splnil danú úlohu. Pokiaľ nebola splnená podmienka, ktorá ukončí priebeh algoritmu, prejde sa na ďalší krok,
      ktorým je uskutočnenie operácií nad súčasnou generáciou a vytvorenie novej generácie. Tento krok sa líši podľa vybraného algoritmu. Po vytvorení novej generácie
      sa opäť pokračuje vyhodnotením úspešnosti pomocou fitness funkcie, až kým nie
      je splnená podmienka ukončenia {{cite3.index}}.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useNumberCites } from 'stores/citationsNumbers';

export default defineComponent({
  name: 'TeachingAlgorithms',

  setup() {
    const cite = useNumberCites();
    return {
      cite1: cite.Cite1,
      cite2: cite.Cite2,
      cite3: cite.Cite3,
      cite4: cite.Cite4,
      cite5: cite.Cite5,
      cite6: cite.Cite6,
      cite7: cite.Cite7,
      cite8: cite.Cite8,
      cite9: cite.Cite9,
      cite10: cite.Cite10,
      cite11: cite.Cite11,
      cite12: cite.Cite12,
      cite13: cite.Cite13,
      cite14: cite.Cite14,
      cite15: cite.Cite15,
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
