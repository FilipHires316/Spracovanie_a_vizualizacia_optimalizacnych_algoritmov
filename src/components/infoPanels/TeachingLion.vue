<template>
  <div class="content-container">
    <h4 class="section-title">Algoritmus inšpirovaný správaním levov</h4>
    <p class="section-paragraph">
      V optimalizačnom algoritme inšpirovanom správaním levov sú zachytené niektoré
      charakteristické črty správania levov.
    </p>
    <p class="section-paragraph">
      Každý lev predstavuje jedno riešenie problému, ktoré má algoritmus za úlohu vyriešiť. Podobne ako v genetickom algoritme,
      aj tu je každé riešenie ohodnotené hodnotou fitness. Lev s vyššou fitness hodnotou
      je považovaný za silnejšieho.
    </p>
    <p class="section-paragraph">
      Počas vyhľadávacieho procesu si každý lev označuje svoju najlepšiu navštívenú
      pozíciu. Na základe týchto označených pozícií sa vytvára územie každej svorky.
      Pre každú svorku platí, že územie tvoria najlepšie pozície označené jej členmi {{cite1.index}}.
      Tento mechanizmus napomáha udržiavať informácie o zatiaľ najlepších riešeniach
      a umožňuje prehľadávať ich okolie. Aby sa však predišlo uviaznutiu v lokálnom
      optime, nomádske levy prehľadávajú dosiaľ nepreskúmané oblasti.
    </p>
    <h5 class="subsection-title">Biologická inšpirácia</h5>
    <p class="section-paragraph">
      Levy sú najspoločenskejšie zo všetkých voľne žijúcich druhov mačkovitých šeliem,
      pričom vykazujú vysokú mieru spolupráce pri aktivitách potrebných pre ich prežitie, ako sú lov alebo ochrana teritória. Levy sa vyznačujú dvoma typmi sociálnej
      organizácie: rezidentskou a nomádskou {{cite15.index}}.
    </p>
    <p class="section-paragraph">
      Rezidenti žijú skupinovo v útvaroch nazývaných svorky. Svorka levov zvyčajne zahŕňa približne päť levíc, mláďatá oboch pohlaví a niekoľkých dospelých samcov.
      Na rozdiel od ostatných mačkovitých šeliem levy lovia spoločne ako skupina, pričom sa snažia korisť obklúčiť z rôznych strán. Koordinovaný skupinový lov výrazne
      zvyšuje pravdepodobnosť úspechu. Medzitým samce levov a niektoré levice zvyčajne zostávajú a oddychujú, kým sa loviace levice vrátia s korisťou {{cite15.index}}. Mladé
      levy potrebujú 2-4 roky na dosiahnutie dospelosti. Keď mláďa dospeje, dochádza
      k súboju medzi starým samcom a novodospelým samcom. Ak je mladý lev silnejší,
      prevezme nadvládu nad svorkou, pričom pôvodný vodca svorky je buď zabitý,
      alebo vyhnaný {{cite1.index}}.
    </p>
    <p class="section-paragraph">
      Druhým organizačným správaním je nomádstvo, pri ktorom levy žijú samotársky,
      buď jednotlivo, alebo v pároch. Páry sa často tvoria medzi príbuznými samcami,
      ktorí boli vylúčení zo svojej rodnej svorky {{cite15.index}}. Nomádske levy môžu napadnúť
      svorku, a pokúsiť sa prebrať nadvládu. Ak nomádsky lev vyhrá, núti samice v
      svorke do ruje a párenia, aby mohli porodiť jeho vlastné mláďatá {{cite1.index}}.
    </p>
    <p class="section-paragraph">
      Je dôležité poznamenať, že levy môžu meniť spôsob života. Rezidenti sa môžu stať
      nomádmi a nomádi rezidentami.
    </p>
    <h5 class="subsection-title">Priebeh algoritmu</h5>
    <p class="section-paragraph">
      Algoritmus postupne prechádza nasledujúcimi krokmi. Princípy fungovania týchto krokov sú vysvetlené nižšie.
    </p>
    <img src="/images/lions_diagram.png" alt="Diagram priebehu algoritmu inšpirovaného správaním levov" style="margin-left: 7vw; margin-top: 1vw;" />
    <h5 class="subsection-title">Inicializácia počiatočnej populácie</h5>
    <p class="section-paragraph">
      Prvým krokom je náhodné generovanie populácie. Po vygenerovaní náhodných riešení v prehľadávacom priestore, je určité percento populácie označené za nomádske
      levy. Ostatné riešenia budú predstavovať rezidentné levy žijúce v svorkách. Počet
      svoriek je určený veľkosťou populácie. Každý lev má pridelené konkrétne pohlavie,
      ktoré zostáva počas optimalizačného procesu nemenné. Na simuláciu tohto faktu
      platí, že v každej svorke je 75–90% samíc a zvyšok sú samci. Pri nomádskych
      levoch je tento pomer opačný {{cite15.index}}. Samozrejme, ideálne nastavenie parametrov
      ako celková veľkosť populácie, veľkosť a počet svoriek a percentuálne rozdelenie
      samcov a samíc záleží od riešeného problému.
    </p>
    <h5 class="subsection-title">Lov</h5>
    <p class="section-paragraph">
      V tomto kroku sa náhodne vyberú levice z každej svorky, ktoré sa zúčastnia lovu.
      Vybrané samice sa následne náhodne rozdelia do troch skupín: ľavé krídlo, stred a
      pravé krídlo. Skupina s najvyšším súčtom fitness hodnôt je považovaná za stred,
      zatiaľ čo ostatné dve skupiny tvoria krídla {{cite1.index}}.
    </p>
    <p class="section-paragraph">
      Následne je potrebné určiť polohu koristi. Korisť predstavuje bod v prehľadávacom priestore, ku ktorému sa levice snažia priblížiť. Tento bod je umiestnený v
      strede medzi levicami {{cite1.index}}. Jeho polohu teda môžeme vypočítať nasledujúcim vzorcom:
    </p>
    <img src="/images/korist_vzorec.png" alt="Vzorec pre výpočet pozície koristi" style="margin-left: 15vw"/>
    <p class="section-paragraph">
      Rozdelenie lovkýň môžeme vidieť na nasledujúcom obrázku:
    </p>
    <img src="/images/hunt.png" alt="Rozdelenie samíc pri love" style="margin-left: 15vw; margin-top: 1vw;"/>
    <p class="section-paragraph">
      Lov prebieha tak, že lovkyne sa jedna po druhej v náhodnom poradí pohybujú smerom ku koristi podľa nasledujúcich pravidiel:
    </p>
    <p class="section-paragraph">
      Ak lovkyňa patrí do skupiny v strede:
    </p>
    <img src="/images/stred_vzorec.png" alt="Vzorec pre výpočet novej pozíce samice v strede" style="margin-left: 9vw; margin-top: -1vw;"/>
    <p class="section-paragraph">
      operácia rand(x, y) predstavuje vygenerovanie náhodného čísla z daného rozsahu.
    </p>
    <p class="section-paragraph">
      Ak lovkyňa patrí do jedného z krídel (ľavého alebo pravého), je jej nová pozícia
      určená nasledovne:
    </p>
    <img src="/images/kridlo_vzorec.png" alt="Vzorec pre výpočet novej pozíce samice na krídle" style="margin-left: 3vw; margin-top: -1vw;"/>
    <p class="section-paragraph">
      Ďalej platí, že po presunutí každej levice, pokiaľ táto levica zlepšila svoju fitness
      hodnotu, korisť ujde a jej nová pozícia je určená nasledujúcim vzorcom:
    </p>
    <p class="section-paragraph" style="margin-left: 5vw">
      korist’ = korist + rand(0, 1) * percentualne zlepsenie fitness * (korist - lovec) {{cite1.index}}
    </p>
    <h5 class="subsection-title"> Presun do bezpečia</h5>
    <p class="section-paragraph">
      Samice, ktoré sa nezúčastnili lovu, sa presunú smerom k riešeniu, ktoré sa nachádza
      na území ich svorky (Jedná sa teda o jedno z najlepších riešení, ktoré bolo v danej
      svorke objavené). Toto riešenie je pre každú levicu vybrané pomocou turnajového
      výberu {{cite1.index}}, ktorý je popísaný v sekcii genetický algoritmus.
    </p>
    <h5 class="subsection-title">Potulovanie sa</h5>
    <p class="section-paragraph">
      Model potulovania sa je určený na silné lokálne vyhľadávanie v okolí územia svoriek. Každý rezidentný samec si náhodne vyberie náhodné územia v rámci teritória.
      Následne sa postupne presúva medzi určenými miestami. Nakoniec sa samec presunie na svoju najlepšiu navštívenú pozíciu {{cite15.index}}. Tento pohyb je znázornený na
      obrázku nižšie:
    </p>
    <img src="/images/roaming.png" alt="Lokálne prehľadávanie priestoru pohybom samca" style="margin-left: 7vw; margin-top: 1vw;" />
    <p class="section-paragraph">
      V tomto kroku aj nomádske levy vykonávajú náhodný pohyb, aby preskúmali
      neobjavené časti prehľadávacieho priestoru.
    </p>
    <h5 class="subsection-title">Párenie</h5>
    <p class="section-paragraph">
      V každej svorke sa určité % samíc pári s jedným alebo viacerými samcami z rovnakej svorky. Nomádske samice sa pária iba s jedným náhodne vybraným samcom.
      Pomocou lineárnej kombinácie a operátorov mutácie sú vytvorení dvaja noví potomkovia. Jeden z nich je samec a druhý samica {{cite15.index}}.
    </p>
    <h5 class="subsection-title">Obrana teritória</h5>
    <p class="section-paragraph">
      Po vytvorení nových potomkov sa môžu nové samce pokúsiť prebrať miesto v
      svorke. Samce v každej svorke, ktoré majú najhoršiu fitness hodnotu, sú vyhostené
      a stávajú sa nomádmi.
    </p>
    <p class="section-paragraph">
      Rovnako sa môžu o miesto v svorke usilovať aj nomádske
      levy. Každý nomádsky samec napadne náhodnú svorku. Pokiaľ má lepšiu fitness
      hodnotu ako niektorý zo samcov v danej skupine, zaberie jeho miesto {{cite15.index}}.
    </p>
    <h5 class="subsection-title">Migrácia</h5>
    <p class="section-paragraph">
      V každej svorke je určený maximálny počet samíc. Pri migrácii sa náhodne vyberie časť samíc, ktorých počet je určený ako súčet samíc, ktoré prevyšujú tento
      maximálny stanovený počet, a predom definovaného percenta z celkovej veľkosti
      svorky. Tieto samice migrujú a stávajú sa nomádskymi levicami. Následne sú voľné
      miesta v svorkách náhodne doplnené nomádskymi samicami, ktoré majú najlepšiefitness hodnoty (môžu to byť aj tie, ktoré práve opustili svorku).
    </p>
    <p class="section-paragraph">
      Presun samíc medzi svorkami umožňuje výmenu informácií a prispieva k lepšiemu prehľadávaniu riešení {{cite15.index}}.
    </p>
    <h5 class="subsection-title">Kontrola velkosti populácie</h5>
    <p class="section-paragraph">
      Pokiaľ veľkosť populácie presahuje maximálne rozmery, sú nomádske levy s najnižšou fitness hodnotou odstránené.
    </p>
    <h5 class="subsection-title">Kontrola splnenia podmienky ukončenia algoritmu</h5>
    <p class="section-paragraph">
      Pokiaľ boli splnené podmienky ukončenia algoritmu, proces sa zastaví a vráti sa
      najlepšie nájdené riešenie. Ak nie, pokračujeme ďalšou iteráciou, v ktorej sa vyhodnotia vyššie popísané kroky (okrem inicializácie počiatočnej populácie).
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useNumberCites } from 'stores/citationsNumbers';

export default defineComponent({
  name: 'TeachingLion',

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
