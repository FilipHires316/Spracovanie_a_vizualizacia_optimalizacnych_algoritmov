<!-- information about genetic algorithm -->
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
      pomocou fitness funkcie, ktorá je prispôsobená pre potreby konkrétneho problému {{cite3.index}}. Napríklad pri probléme, v ktorom by sme sa snažili o maximalizáciu profitu,
      by funkcia mohla vyjadrovať celkový profit, ktorý reprezentované riešenie získalo.
      Teda vyššia hodnota fitness znamená lepšie riešenie.
    </p>
    <h5 class="subsection-title">Biologická inšpirácia</h5>
    <p class="section-paragraph">
      V prírode dokážu silnejší a lepšie prispôsobení jedinci prežiť dlhšie. To má za
      následok zvýšenie šancí na reprodukciu a zachovanie genetického materiálu. V konečnom dôsledku teda populácia nesie viac génov od silnejších jedincov a menej od
      tých slabších {{cite5.index}}. Javy, ktoré môžeme pozorovať v prírode pri evolúcii živočíchov,
      sa stali inšpiráciou pre genetický algoritmus, ktorý je založený na princípoch prirodzeného výberu jedincov a prenose genetickej informácie medzi generáciami.
    </p>
    <h5 class="subsection-title">Priebeh algoritmu</h5>
    <p class="section-paragraph">
      Samotný proces prebieha vo fázach, ktoré môžeme vidieť na nasledujúcom diagrame. Všetky kroky genetického algoritmu sú podrobne vysvetlené nižšie.
    </p>
    <img src="/images/genetic_diagram.png" alt="Diagram priebehu genetického algoritmu" style="margin-left: 10vw; margin-bottom: 1vw" />
    <h5 class="subsection-title">Inicializácia počiatočnej populácie</h5>
    <p class="section-paragraph">
      Prvou fázou genetického algoritmu je vytvorenie počiatočnej populácie. Veľkosť
      tejto populácie závisí od charakteru problému, ale zvyčajne obsahuje stovky až
      tisíce možných riešení. Obvykle sa populácia generuje náhodne, aby pokryla celý
      prehľadávací priestor možných riešení {{cite4.index}}.
    </p>
    <h5 class="subsection-title">Ohodnotenie jedincov pomocou fitness funkcie</h5>
    <p class="section-paragraph">
      Pre každý chromozóm je vypočítaná jeho fitness hodnota prostredníctvom fitness
      funkcie. Chromozómy s vyššou fitness hodnotou predstavujú lepšie riešenia problému. Táto hodnota bude zohľadnená pri vytváraní novej generácie {{cite3.index}}.
    </p>
    <h5 class="subsection-title">Kontrola splnenia podmienky ukončenia algoritmu</h5>
    <p class="section-paragraph">
      Ak je splnená stanovená podmienka ukončenia algoritmu, prechádzame k vyhodnoteniu výsledkov. Optimálnym riešením je riešenie, ktoré dosiahlo najlepšiu hodnotu
      fitness. Ak podmienka ukončenia nebola splnená, pokračujeme vytvorením novej
      generácie pomocou operácií nad chromozómami, ktoré sú popísané nižšie.
    </p>
    <h5 class="subsection-title">Výber najlepších jedincov</h5>
    <p class="section-paragraph">
      Z potenciálnych riešení je metódami výberu zvolená podmnožina, ktorá sa bude podielať na tvorbe novej generácie jedincov. Chromozómy s vyššou fitness hodnotou
      majú väčšiu pravdepodobnosť na prenos genetickej informácie medzi generáciami,
      avšak zaručené to nie je {{cite3.index}}. Medzi najznámejšie metódy výberu patrí napríklad
      elitizmus, ruleta alebo turnaj.
    </p>
    <ul class="section-list">
      <li style="margin-bottom: 1vw"><strong>Elitizmus -</strong> Jedná sa o zachovanie riešení, ktoré dosahovali najlepšie výsledky.
        Tieto riešenia sú jednoducho prenesené bez zmeny do ďalšej generácie. Pokiaľ
        je však počet zachovaných riešení, ktoré sa automaticky dostanú do ďalšej
        generácie privysoký, môže dôjsť k strate diverzity a začnú sa generovať len
        lokálne optimálne riešenia {{cite12.index}}. Preto je dôležité správne nastaviť pomer, v
        ktorom bude elitizmus aplikovaný.</li>
      <li style="margin-bottom: 1vw"><strong>Ruleta -</strong> Táto metóda výberu funguje na princípe ruletovej hry. Hodnota
        fitness každého chromozómu je úmerná pravdepodobnosti, že tento jedinec
        bude vybraný. Teda čím väčšiu fitness hodnotu chromozóm má, tým mu patrí
        väčší rozsah čísel na rulete. Následne sa vygeneruje náhodné číslo, ktoré sa
        použije na výber rodiča {{cite2.index}}. Na rozdiel od elitizmu, ruleta ponecháva pri výbere prvok náhody, čo znamená, že aj jedinci s nižšou fitness hodnotou
        môžu byť vybraní, čím sa podporuje väčšia diverzita v populácii.</li>
      <li style="margin-bottom: 1vw"><strong>Turnaj -</strong> Metóda turnaja vytvorý náhodnú skupinu chromozómov, ktoré sa
        zúčastnia turnaja. Víťazom turnaja je jedinec s najvyššou fitness hodnotou
        zo súťažiacich {{cite6.index}}.</li>
    </ul>
    <h5 class="subsection-title">Kríženie</h5>
    <p class="section-paragraph">
      Cieľom kríženia je vytvorenie nových jedincov kombináciou dvoch rodičovských
      chromozómov. Métódami výberu, ktoré sme popísali vyššie, sú vybrané dva rodičovské chromozómy. Následne je vytvorený nový chromozóm, ktorý obsahuje
      genetické informácie z oboch rodičovských chromozómov {{cite3.index}}. Známymi metódami
      kríženia sú jednobodové kríženie, dvojbodové kríženie a uniformné kríženie.
    </p>
    <ul class="section-list">
      <li style="margin-bottom: 1vw"><strong>Jednobodové kríženie -</strong> Pri tomto type kríženia sa náhodne vyberie bod,
        v ktorom sa oba rodičovské chromozómy rozdelia na dve časti. Potom sa
        vytvorí nový chromozóm, ktorý pozostáva z prvej časti prvého rodičovského
        chromozómu a druhej časti druhého rodičovského chromozómu {{cite13.index}}.
        <img src="/images/jednobodove_krizenie.png" alt="Príklad jednobodového kríženia" style="margin-left: 1.5vw; width: 45vw" />
      </li>
      <li style="margin-bottom: 1vw"><strong>Dvojbodové kríženie -</strong> TFunguje podobne ako jednobodové kríženie. Rozdiel
        spočíva v tom, že sú vybrané dva náhodné body. Týmto spôsobom sú rodičovské chromozómy rozdelené na tri časti. Nový chromozóm sa následne
        vytvorí kombinovaním centrálnej časti jedného rodičovského chromozómu a
        okrajových častí druhého rodičovského chromozómu {{cite13.index}}.
        <img src="/images/dvojbodove_krizenie.png" alt="Príklad dvojbodového kríženia" style="margin-left: 1.5vw; width: 45vw"/>
      </li>
      <li style="margin-bottom: 1vw"><strong>Uniformné kríženie -</strong> Každý gén v novom jedincovi je náhodne vybraný z
        prvého, alebo druhého rodiča na rovnakej pozícii {{cite13.index}}.
        <img src="/images/uniformne_krizenie.png" alt="Príklad uniformného kríženia" style="margin-left: 1.5vw; margin-top: 1vw; width: 45vw" />
      </li>
    </ul>
    <p class="section-paragraph">
      Pri všetkých vyššie uvedených formách kríženia dokážeme vytvoriť aj druhého
      jedinca z nevyužitých častí rodičovských chromozómov.
    </p>
    <h5 class="subsection-title">Mutácia</h5>
    <p class="section-paragraph">
      Aby sa zabránilo uviaznutiu v lokálnom optime, sú nad riešeniami vykonávané
      malé náhodné zmeny, ktoré sa nazývajú mutácie.
    </p>
    <p class="section-paragraph">
      Pre každý bit existuje pravdepodobnosť, že prejde mutáciou. Táto pravdepodobnosť je zvyčajne veľmi malá,
      aby sme nestratili pôvodnú genetickú informáciu. Ak bit mutuje, jeho hodnota sa
      invertuje, takže nula sa stane jednotkou a jednotka nulou {{cite5.index}}.
      <img src="/images/mutacia.png" alt="Príklad mutácie chromozómu" style="margin-left: 10vw; margin-top: 1vw;" />
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useNumberCites } from 'stores/citationsNumbers';

export default defineComponent({
  name: 'TeachingGenetic',

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
