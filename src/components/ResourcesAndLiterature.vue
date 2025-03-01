<template>
  <div class="content-container">
    <h4 class="section-title">Zdroje a použitá literatúra</h4>
    <ul class="section-list">
      <li class="citation">[1] Saman M Almufti. “Lion algorithm: Overview, modifications and applications”. In: International Research Journal on Science, Technology, Education,
        and Management 2.2 (2022).</li>
      <li class="citation">[2] V Anusuya a R Kavitha. “Roulette ant wheel selection (RAWS) for genetic
        algorithm–fuzzy shortest path problem”. In: International Journal of Mathematics and Computer Applications Research 5 (2015), s. 1–14.</li>
      <li class="citation">[7] Lingaraj Haldurai, T Madhubala a R Rajalakshmi. “A study on genetic
        algorithm and its applications”. In: Int. J. Comput. Sci. Eng 4.10 (2016),
        s. 139–143.</li>
      <li class="citation">[10] Manoj Kumar et al. “Genetic algorithm: Review and application”. In: Available at SSRN 3529843 (2010).</li>
      <li class="citation">[12] Tom V Mathew. “Genetic algorithm”. In: Report submitted at IIT Bombay
        53 (2012).</li>
      <li class="citation">[13] Brad L Miller, David E Goldberg et al. “Genetic algorithms, tournament
        selection, and the effects of noise”. In: Complex systems 9.3 (1995), s. 193–
        212.</li>
      <li class="citation">[14] Seyedali Mirjalili a Andrew Lewis. “The whale optimization algorithm”. In:
        Advances in engineering software 95 (2016), s. 51–67.</li>
      <li class="citation">[15] Chanaleä Munien a Absalom E. Ezugwu. “Metaheuristic algorithms for onedimensional bin-packing problems: A survey of recent advances and app34
        Literatúra
        lications”. In: Journal of Intelligent Systems 30.1 (2021), s. 636–663. doi:
        doi:10.1515/jisys-2020-0117. url: https://doi.org/10.1515/jisys2020-0117.</li>
      <li class="citation">[16] Gonçalo Neto. “From single-agent to multi-agent reinforcement learning:
        Foundational concepts and methods”. In: Learning theory course 2 (2005).</li>
      <li class="citation">[17] Nikola Piskačová. “Úloha o batohu”. In: (2018).</li>
      <li class="citation">[18] Petra Pokorná. “Problém obchodního cestujícího pomocí metody Mravenčí
        kolonie”. In: (2008).</li>
      <li class="citation">[19] Robin C Purshouse a Peter J Fleming. “Why use elitism and sharing in a
        multi-objective genetic algorithm?” In: Proceedings of the 4th Annual Conference on Genetic and Evolutionary computation. 2002, s. 520–527.</li>
      <li class="citation">[21] Anant J Umbarkar a Pranali D Sheth. “Crossover operators in genetic algorithms: a review.” In: ICTACT journal on soft computing 6.1 (2015).</li>
      <li class="citation">[22] X. Yang. “Metaheuristic Optimization”. In: Scholarpedia 6.8 (2011). revision
        #91488, s. 11472. doi: 10.4249/scholarpedia.11472.</li>
      <li class="citation">[23] Maziar Yazdani a Fariborz Jolai. “Lion optimization algorithm (LOA): a
        nature-inspired metaheuristic algorithm”. In: Journal of computational design and engineering 3.1 (2016), s. 24–36.</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ResourcesAndLiterature',
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

.citation {
  margin-bottom: 1vw;
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
