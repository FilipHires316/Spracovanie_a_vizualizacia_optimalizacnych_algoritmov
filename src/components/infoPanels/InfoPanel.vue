<!-- initial information panel shown on home page -->
<template>
  <!-- information -->
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
      <p class="section-paragraph">
        Nižšie je stručný prehlad ako pracovať s aplikáciou. V prípade potreby sa môžete obrátiť na <a href="/documents/Prirucka.pdf" target="_blank">kompletnú používatelskú príručku</a>.
      </p>
    <p class="section-paragraph">
      V sekcii 'O algoritmoch' nájdete virtuálnu knižnicu, v ktorej je
      možné prezerať teoretické základy a princípy fungovania jednotlivých
      optimalizačných algoritmov a optimalizačných problémov. Medzi jednotlivými kapitolami sa dá navigovať pomocou záložiek v ľavej časti aplikácie.
    </p>
    <p class="section-paragraph">
      V sekcii 'Riešenie optimalizačných problémov' si môžete zvoliť ľubovolnú kombináciu optimalizačných problémov a algoritmov a experimentovať so vstupnými parametrami. Je možné si tiež zvoliť z prednastavených hodnôt. Keď ste s výberom parametrov spokojný, spustite výpočet pomocou tlačidla a počkajte na výsledok.
    </p>
    <p class="section-paragraph">
      V sekcii 'História výpočtov' si môžete prezerať výsledky výpočtov. Výpočty môžete nájsť v bočnej lište. Pokiaľ pre vás niektorý z výpočtov už nie je užitočný, môžete ho z histórie jednoducho odstrániť.
      Vizualizované výsledky si možno prezerať pomocou interaktívnych grafov. Prvý graf zobrazuje výsledky fitness jednotlivých iterácií. Po kliknutí na ktorýkoľvek stĺpec grafu, si v druhom grafe môžete pozrieť
      výsledky všetkých jedincov zvolenej iterácie. V druhom grafe si môžete rovnakým spôsobom zvoliť, ktorého jedinca z danej generácie chcete vizualizovať. Vizualizácia riešenia je zobrazená v spodnej časti stránky.
      Je možné porovnávať výsledky dvoch výpočtov pomocou tlačidla '+'.
    </p>
    <!-- navigation buttons -->
    <div class="button-container">
      <q-btn class="button" color="white" text-color="black" label="O algoritmoch" to="/AboutAlgorithms" style="width: 40vw;"/>
      <q-btn class="button" color="primary" label="Riešenie optimalizačných problémov" to="/Problems" style="width: 40vw;"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InfoPanel'
})
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
