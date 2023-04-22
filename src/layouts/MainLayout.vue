<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-white text-primary">
        <!-- <q-toolbar-title> Natalia Segura </q-toolbar-title> -->
        <div class="q-pt-md q-pl-md">
          <q-img
            src="../assets/logo.png"
            width="150px"
            fit="cover"

          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="" style="border-top: 1px solid #fefefe">
      <q-tabs v-model="tab" :mobile-arrows="true" class="bg-white text-primary">
        <q-route-tab
          to="/perfil"
          exact
          name="perfil"
          icon="o_person"
          label="Perfil"
        />
        <q-route-tab
          to="/alimentos"
          exact
          name="alimentos"
          icon="o_restaurant"
          label="Alimentos"
        />
        <q-route-tab
          to="/plan"
          exact
          name="plan"
          icon="o_format_list_bulleted"
          label="Plan"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue'

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

const leftDrawerOpen = ref(false)
const tab = ref('alimentos')
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
