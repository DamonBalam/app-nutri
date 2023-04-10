<template>
  <q-layout view="lHh Lpr lFf">
    <q-img src="../assets/fondo.jpg" style="max-width: 100vw; height: 30vh;" fit="fill"/>
    <div class="row justify-center q-my-xl">
      <q-img src="../assets/logo.png" width="200px" fit="cover"/>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss"></style>
