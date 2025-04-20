<!-- list of cited literature -->
<template>
  <!-- all appearances of citation number are changed after changing number in store -->
  <div class="content-container">
    <h4 class="section-title">Zdroje a použitá literatúra</h4>
    <ul class="section-list">
      <li class="citation">{{cite1.index}} {{cite1.text}}</li>
      <li class="citation">{{cite2.index}} {{cite2.text}} </li>
      <li class="citation">{{cite3.index}} {{cite3.text}} </li>
      <li class="citation">{{cite4.index}} {{cite4.text}} </li>
      <li class="citation">{{cite5.index}} {{cite5.text}} </li>
      <li class="citation">{{cite6.index}} {{cite6.text}} </li>
      <li class="citation">{{cite7.index}} {{cite7.text}} </li>
      <li class="citation">{{cite8.index}} {{cite8.text}} </li>
      <li class="citation">{{cite9.index}} {{cite9.text}} </li>
      <li class="citation">{{cite10.index}} {{cite10.text}} </li>
      <li class="citation">{{cite11.index}} {{cite11.text}} </li>
      <li class="citation">{{cite12.index}} {{cite12.text}} </li>
      <li class="citation">{{cite13.index}} {{cite13.text}} </li>
      <li class="citation">{{cite14.index}} {{cite14.text}} </li>
      <li class="citation">{{cite15.index}} {{cite15.text}} </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useNumberCites } from 'stores/citationsNumbers';

export default defineComponent({
  name: 'ResourcesAndLiterature',

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
