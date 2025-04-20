import { defineStore } from 'pinia';
import { ref } from 'vue';

// list of all references and resources (if number of citation is changed here it will change at all places where it is used)
export const useNumberCites = defineStore('citationsNumbers', () => {
  const Cite1 = ref({
    index: '[1]',
    text: 'Saman M Almufti. “Lion algorithm: Overview, modifications and applications”. In: International Research Journal on Science, Technology, Education, and Management 2.2 (2022).'
  });
  const Cite2 = ref({
    index: '[2]',
    text: 'V Anusuya a R Kavitha. “Roulette ant wheel selection (RAWS) for genetic algorithm–fuzzy shortest path problem”. In: International Journal of Mathematics and Computer Applications Research 5 (2015), s. 1–14.'
  });
  const Cite3 = ref({
    index: '[3]',
    text: 'Lingaraj Haldurai, T Madhubala a R Rajalakshmi. “A study on genetic algorithm and its applications”. In: Int. J. Comput. Sci. Eng 4.10 (2016), s. 139–143.'
  });
  const Cite4 = ref({
    index: '[4]',
    text: 'Manoj Kumar et al. “Genetic algorithm: Review and application”. In: Available at SSRN 3529843 (2010).'
  });
  const Cite5 = ref({
    index: '[5]',
    text: 'Tom V Mathew. “Genetic algorithm”. In: Report submitted at IIT Bombay 53 (2012).'
  });
  const Cite6 = ref({
    index: '[6]',
    text: 'Brad L Miller, David E Goldberg et al. “Genetic algorithms, tournament selection, and the effects of noise”. In: Complex systems 9.3 (1995), s. 193–212.'
  });
  const Cite7 = ref({
    index: '[7]',
    text: 'Seyedali Mirjalili a Andrew Lewis. “The whale optimization algorithm”. In: Advances in engineering software 95 (2016), s. 51–67.'
  });
  const Cite8 = ref({
    index: '[8]',
    text: 'Chanaleä Munien a Absalom E. Ezugwu. “Metaheuristic algorithms for onedimensional bin-packing problems: A survey of recent advances and applications”. In: Journal of Intelligent Systems 30.1 (2021), s. 636–663. doi:doi:10.1515/jisys-2020-0117. url: https://doi.org/10.1515/jisys2020-0117.'
  });
  const Cite9 = ref({
    index: '[9]',
    text: 'Gonçalo Neto. “From single-agent to multi-agent reinforcement learning: Foundational concepts and methods”. In: Learning theory course 2 (2005).'
  });
  const Cite10 = ref({
    index: '[10]',
    text: 'Nikola Piskačová. “Úloha o batohu”. In: (2018).'
  });
  const Cite11 = ref({
    index: '[11]',
    text: 'Petra Pokorná. “Problém obchodního cestujícího pomocí metody Mravenčí kolonie”. In: (2008).'
  });
  const Cite12 = ref({
    index: '[12]',
    text: 'Robin C Purshouse a Peter J Fleming. “Why use elitism and sharing in a multi-objective genetic algorithm?” In: Proceedings of the 4th Annual Conference on Genetic and Evolutionary computation. 2002, s. 520–527.'
  });
  const Cite13 = ref({
    index: '[13]',
    text: 'Anant J Umbarkar a Pranali D Sheth. “Crossover operators in genetic algorithms: a review.” In: ICTACT journal on soft computing 6.1 (2015).'
  });
  const Cite14 = ref({
    index: '[14]',
    text: 'X. Yang. “Metaheuristic Optimization”. In: Scholarpedia 6.8 (2011). revision #91488, s. 11472. doi: 10.4249/scholarpedia.11472.'
  });
  const Cite15 = ref({
    index: '[15]',
    text: 'Maziar Yazdani a Fariborz Jolai. “Lion optimization algorithm (LOA): a nature-inspired metaheuristic algorithm”. In: Journal of computational design and engineering 3.1 (2016), s. 24–36.'
  });
  return { Cite1, Cite2, Cite3, Cite4, Cite5, Cite6, Cite7, Cite8, Cite9, Cite10, Cite11, Cite12, Cite13, Cite14, Cite15 };
});
