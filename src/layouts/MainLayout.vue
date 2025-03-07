<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          OPTIMUS
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab to="/HomePage" label="Domov" />
        <q-route-tab to="/AboutAlgorithms" label="O algoritmoch" />
        <q-route-tab to="/Problems" label="Riešenie optimalizačných problémov" />
        <q-route-tab to="/History" label="História výpočtov" />
      </q-tabs>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
export default {
  setup () {
  }
}
</script>
