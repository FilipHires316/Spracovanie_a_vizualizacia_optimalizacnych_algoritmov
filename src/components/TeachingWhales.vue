<template>
  <div class="content-container">
    <h4 class="section-title">Algoritmus inšpirovaný správaním veľrýb</h4>
    <p class="section-paragraph">
      Algoritmus inšpirovaný správaním veľrýb, zachytáva použitie bublinovej siete pri
      love koristi. Takisto vyvažuje medzi lokálnym vyhľadávaním v okolí najlepších
      riešení a globálnym vyhľadávaním v celom priestore, pričom zo začiatku sa sústredí
      viac na náhodné hľadanie a ku koncu sa zameriava na vylepšovanie existujúcich
      riešení.
    </p>
    <h5 class="subsection-title">Biologická inšpirácia</h5>
    <p class="section-paragraph">
      Veľryby sú považované za najväčšie cicavce na svete. Dospelá veľryba môže dorásť
      až do dĺžky 30 metrov. Sú pozorovateľné prípady, kedy veľryby žijú samotársky,
      ale väčšinou sa pohybujú v skupinách.
    </p>
    <p class="section-paragraph">
      Existuje veľa rôznych druhov veľrýb, ale
      tento algoritmus je inšpirovaný hlavne správaním veľryby hrbatej, ktorá sa živí
      lovom kôrovcov a malých rýb. Tieto veľryby majú jedinečný štýl lovu potravy.
      Najprv sa potopia približne 12 metrov hlboko. Následne začnú vytvárať bubliny v
      tvare špirály okolo koristi a pomaly sa k nej približujú. Tento spôsob kŕmenia sa
      nazýva metóda kŕmenia bublinovou sieťou [14].
    </p>
    <h5 class="subsection-title">Priebeh algoritmu</h5>
    <p class="section-paragraph">
      Kroky algoritmu, ktoré sú podrobne vysvetlené nižšie, môžeme vidieť v diagrame:
    </p>
    <img src="/images/whale_diagram.png" alt="Diagram priebehu algoritmu inšpirovaného správaním veľrýb" style="margin-left: 10vw; margin-bottom: 1vw" />
    <h5 class="subsection-title">Inicializácia počiatočnej populácie</h5>
    <p class="section-paragraph">
      Na počiatku sa vytvorí náhodná množina riešení. Každé z nich predstavuje jednu
      veľrybu. Každá veľryba je ohodnotená fitness hodnotou.
    </p>
    <h5 class="subsection-title">Ohodnotenie jedincov pomocou fitness funkcie</h5>
    <p class="section-paragraph">
      Pre každého jedinca v populácii je opäť vypočítaná a aktualizovaná jeho fitness
      hodnota. Pokiaľ opustil vyhľadávací priestor, je jeho pozícia upravená tak, aby sa
      vrátil späť do definovaného priestoru.
    </p>
    <h5 class="subsection-title">Kontrola splnenia podmienky ukončenia algoritmu</h5>
    <p class="section-paragraph">
      Po splnení ukončovacej podmienky je algoritmus úspešne ukončený. Ak ukončovacia podmienka nebola splnená, prejdeme späť na krok pohybu veľrýb.
    </p>
    <h5 class="subsection-title">Pohyb veľrýb</h5>
    <p class="section-paragraph">
      V tomto kroku, každá veľryba vykoná určitý pohyb v prehľadávacom priestore.
      Môže sa jednať o jeden z troch typov pohybov: priblíženie sa ku koristi, krúženie
      okolo koristi, alebo hľadanie koristi. Prvé dva vyššie spomenuté pohyby simulujú
      postupné lovenie koristi pomocou bublinovej siete.
    </p>
    <p class="section-paragraph">
      Pohyb, ktorý každá veľryba vykoná, je určený nasledovne.
      Najprv sa vygeneruje náhodné číslo p, ktoré patrí
      do intervalu (0,1). Ak je p &ge; 0.5, vykoná sa krúženie okolo koristi. Ak je p &lt; 0.5,
      musíme ešte vypočítať hodnotu A pomocou vzorca:
    </p>
    <p class="section-paragraph" style="margin-left: 20vw">
      A = 2a ∗ r − a
    </p>
    <p class="section-paragraph">
      kde a predstavuje hodnotu od 2 po 0, ktorá sa počas iterácií lineárne zmenšuje.
      Hodnota r je náhodné číslo z intervalu &lt;0,1&gt;.
    </p>
    <p class="section-paragraph">
      Ak je |A| &lt; 1, veľryba vykoná pohyb
      smerom ku koristi. V opačnom prípade bude hľadať novú korisť v prehľadávacom
      priestore [14].
    </p>
    <ul class="section-list">
      <li>
        <strong>Krúženie okolo koristi -</strong> Nová pozícia veľryby je daná vzorcom:
        <p class="section-paragraph" style="margin-left: 10vw; margin-top: 1vw">
          X(t + 1) = D′ ∗ e<sup>bl</sup> ∗ cos(2πl) + X∗(t)
        </p>
        <p class="section-paragraph">
          kde
        </p>
        <p class="section-paragraph" style="margin-left: 10vw; margin-top: 1vw">
          D′ = X∗(t) − X(t)
        </p>
        <p class="section-paragraph">
          D′ vyjadruje vzdialenosť veľryby od koristi, t je aktuálna iterácia, b je konštanta pre definovanie logaritmickej špirály a l je náhodná hodnota v intervale &lt;-1,1&gt;. X∗(t)
          predstavuje najlepšie riešenie v práve prebiehajúcej iterácii [14].
        </p>
      </li>
      <li>
        <strong>Priblíženie sa ku koristi -</strong> Tento pohyb vyjadruje priamočiarejší pohyb smerom ku koristi, ktorý je definovaný rovnicou:
        <p class="section-paragraph" style="margin-left: 10vw; margin-top: 1vw">
          X(t + 1) = X∗(t) − A ∗ D
        </p>
        <p class="section-paragraph">
          kde
        </p>
        <p class="section-paragraph" style="margin-left: 10vw; margin-top: 1vw">
          D = C ∗ X∗(t) − X(t)
        </p>
        <p class="section-paragraph">
          pričom
        </p>
        <p class="section-paragraph" style="margin-left: 10vw; margin-top: 1vw">
          C = 2 ∗ r
        </p>
        <p class="section-paragraph">
          Hodnoty A a r sú popisáne vyššie [14].
        </p>
      </li>
      <li>
        <strong>Hľadanie koristi -</strong> Náhodného hľadanie koristi, predstavuje exploračnú fázu, ktorá podporuje globálne prehľadávanie priestoru. Nová poloha veľryby je
        určená nasledovne:
        <p class="section-paragraph" style="margin-left: 10vw; margin-top: 1vw">
          X (t + 1) = Xrand (t) − A ∗ D
        </p>
        <p class="section-paragraph">
          Teda tento náhodný pohyb sa vykoná podobne ako v prípade priblíženia sa
          ku koristi, s tým rozdielom, že sa nepohybujeme k najlepšiemu riešeniu ale
          k náhodne vybranému riešeniu z aktuálnej iterácie [14].
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TeachingWhales',
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
