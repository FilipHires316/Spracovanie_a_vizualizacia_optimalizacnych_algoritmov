<template>
  <div class="content-container">
    <h4 class="section-title">Genetický Algoritmus</h4>
    <p class="section-paragraph">
      Genetický algoritmus, ktorý patrí medzi evolučné algoritmy, využíva iteratívny
      proces inšpirovaný prírodným výberom najsilnejších jedincov v populácii a operácie, ako je kríženie či mutácia, aby z počiatočnej populácie vytvoril populáciu,
      ktorá svojou kvalitou approximuje optimálne riešenie problému.
    </p>
    <p class="section-paragraph">
      Každý jedinec (označovaný ako chromozóm) predstavuje jedno možné riešenie problému a skladá
      sa z reťazca génov. Chromozóm je často reprezentovaný bitovou sekvenciou (napr.
      101101), kde každý bit predstavuje jeden gén. Kvalita chromozómov je meraná
      pomocou fitness funkcie, ktorá je prispôsobená pre potreby konkrétneho problému. Napríklad pri probléme, v ktorom by sme sa snažili o maximalizáciu profitu,
      by funkcia mohla vyjadrovať celkový profit, ktorý reprezentované riešenie získalo.
      Teda vyššia hodnota fitness znamená lepšie riešenie.
    </p>
    <h5 class="subsection-title">Biologická inšpirácia</h5>
    <p class="section-paragraph">
      V prírode dokážu silnejší a lepšie prispôsobení jedinci prežiť dlhšie. To má za
      následok zvýšenie šancí na reprodukciu a zachovanie genetického materiálu. V konečnom dôsledku teda populácia nesie viac génov od silnejších jedincov a menej od
      tých slabších. Javy, ktoré môžeme pozorovať v prírode pri evolúcii živočíchov,
      sa stali inšpiráciou pre genetický algoritmus, ktorý je založený na princípoch prirodzeného výberu jedincov a prenose genetickej informácie medzi generáciami.
    </p>
    <h5 class="subsection-title">Priebeh algoritmu</h5>
    Samotný proces prebieha vo fázach, ktoré môžeme vidieť na nasledujúcom diagrame:
<!--    <img src="vue-project/src/assets/images/genetic_diagram.png" alt="Diagram priebehu genetického algoritmu" width="500">-->
    Všetky kroky genetického algoritmu si bližšie popíšeme v nasledujúcej časti.
    Inicializácia počiatočnej populácie
    Prvou fázou genetického algoritmu je vytvorenie počiatočnej populácie. Veľkosť
    tejto populácie závisí od charakteru problému, ale zvyčajne obsahuje stovky až
    tisíce možných riešení. Obvykle sa populácia generuje náhodne, aby pokryla celý
    prehľadávací priestor možných riešení [10].
    7
    2. Analýza problému
    Ohodnotenie jedincov pomocou fitness funkcie
    Pre každý chromozóm je vypočítaná jeho fitness hodnota prostredníctvom fitness
    funkcie. Chromozómy s vyššou fitness hodnotou predstavujú lepšie riešenia problému. Táto hodnota bude zohľadnená pri vytváraní novej generácie [7].
    Kontrola splnenia podmienky ukončenia algoritmu
    Ak je splnená stanovená podmienka ukončenia algoritmu, prechádzame k vyhodnoteniu výsledkov. Optimálnym riešením je riešenie, ktoré dosiahlo najlepšiu hodnotu
    fitness. Ak podmienka ukončenia nebola splnená, pokračujeme vytvorením novej
    generácie pomocou operácií nad chromozómami, ktoré sú popísané nižšie.
    Výber najlepších jedincov
    Z potenciálnych riešení je metódami výberu zvolená podmnožina, ktorá sa bude podielať na tvorbe novej generácie jedincov. Chromozómy s vyššou fitness hodnotou
    majú väčšiu pravdepodobnosť na prenos genetickej informácie medzi generáciami,
    avšak zaručené to nie je [7]. Medzi najznámejšie metódy výberu patrí napríklad
    elitizmus, ruleta alebo turnaj.
    • Elitizmus - Jedná sa o zachovanie riešení, ktoré dosahovali najlepšie výsledky.
    Tieto riešenia sú jednoducho prenesené bez zmeny do ďalšej generácie. Pokiaľ
    je však počet zachovaných riešení, ktoré sa automaticky dostanú do ďalšej
    generácie privysoký, môže dôjsť k strate diverzity a začnú sa generovať len
    lokálne optimálne riešenia [19]. Preto je dôležité správne nastaviť pomer, v
    ktorom bude elitizmus aplikovaný.
    • Ruleta - Táto metóda výberu funguje na princípe ruletovej hry. Hodnota
    fitness každého chromozómu je úmerná pravdepodobnosti, že tento jedinec
    bude vybraný. Teda čím väčšiu fitness hodnotu chromozóm má, tým mu patrí
    väčší rozsah čísel na rulete. Následne sa vygeneruje náhodné číslo, ktoré sa
    použije na výber rodiča [2]. Na rozdiel od elitizmu, ruleta ponecháva pri
    8
    2. Analýza problému
    výbere prvok náhody, čo znamená, že aj jedinci s nižšou fitness hodnotou
    môžu byť vybraní, čím sa podporuje väčšia diverzita v populácii.
    • Turnaj - Metóda turnaja vytvorý náhodnú skupinu chromozómov, ktoré sa
    zúčastnia turnaja. Víťazom turnaja je jedinec s najvyššou fitness hodnotou
    zo súťažiacich [13].
    Kríženie
    Cieľom kríženia je vytvorenie nových jedincov kombináciou dvoch rodičovských
    chromozómov. Métódami výberu, ktoré sme popísali vyššie, sú vybrané dva rodičovské chromozómy. Následne je vytvorený nový chromozóm, ktorý obsahuje
    genetické informácie z oboch rodičovských chromozómov [7]. Známymi metódami
    kríženia sú jednobodové kríženie, dvojbodové kríženie a uniformné kríženie.
    • Jednobodové kríženie - Pri tomto type kríženia sa náhodne vyberie bod,
    v ktorom sa oba rodičovské chromozómy rozdelia na dve časti. Potom sa
    vytvorí nový chromozóm, ktorý pozostáva z prvej časti prvého rodičovského
    chromozómu a druhej časti druhého rodičovského chromozómu [21].
    Obr. 2.3: Príklad jednobodového kríženia
    Na obrázku vyššie, môžeme vidieť príklad jednobodového kríženia. Čierne
    šípky znározňujú bod rozdelenia rodičovských chromozómov. V spodnej časti
    obrázku, sú dva chromozómy, ktoré vznikli pomocou tohto operátora.
    9
    2. Analýza problému
    • dvojbodové kríženie - Funguje podobne ako jednobodové kríženie. Rozdiel
    spočíva v tom, že sú vybrané dva náhodné body. Týmto spôsobom sú rodičovské chromozómy rozdelené na tri časti. Nový chromozóm sa následne
    vytvorí kombinovaním centrálnej časti jedného rodičovského chromozómu a
    okrajových častí druhého rodičovského chromozómu [21].
    Obr. 2.4: Príklad dvojbodového kríženia
    Obrázok vyššie znázorňuje rozdelenie chromozómov na tri časti v dvoch bodoch, a jedincov, ktorý vznikli ich krížením.
    • uniformné kríženie - Každý gén v novom jedincovi je náhodne vybraný z
    prvého, alebo druhého rodiča na rovnakej pozícii [21].
    Obr. 2.5: Príklad uniformného kríženia
    Na obrázku vyššie je znázornený náhodný výber génov z oboch rodičovských chromozómov.
    10
    2. Analýza problému
    Pri všetkých vyššie uvedených formách kríženia dokážeme vytvoriť aj druhého
    jedinca z nevyužitých častí rodičovských chromozómov.
    Mutácia
    Aby sa zabránilo uviaznutiu v lokálnom optime, sú nad riešeniami vykonávané
    malé náhodné zmeny, ktoré sa nazývajú mutácie. Pre každý bit existuje pravdepodobnosť, že prejde mutáciou. Táto pravdepodobnosť je zvyčajne veľmi malá,
    aby sme nestratili pôvodnú genetickú informáciu. Ak bit mutuje, jeho hodnota sa
    invertuje, takže nula sa stane jednotkou a jednotka nulou [12].
    Obr. 2.6: Príklad mutácie chromozómu
    Obrázok vyššie znázorňuje zmenu hodnoty dvoch génov, ktoré prešli mutáciou.
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TeachingGenetic',
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
