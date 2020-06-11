<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="showMenu"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="show"
      class="deep-purple accent-4"
      dark
      absolute
      bottom
      temporary
    >
      <v-list-item>

        <v-list-item-avatar>
          <img
            :src="picture"
            alt="Profile Image"
          >
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="title">
            Placeholders
          </v-list-item-title>
          <v-list-item-subtitle>
            Navigation
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
        >
          <v-list-item
            v-for="route in routes"
            :key="route.name"
          >
            <v-list-item-icon>
              <v-icon>{{ route.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ route.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'
import { eventBus } from '@/event'

export default defineComponent({
  name: 'App',
  setup (props, context) {
    const show = ref(false)
    const group = ref(null)
    const picture = ref(require('./assets/logo.png'))
    const routes = [
      { name: 'Home', icon: 'mdi-view-dashboard', path: '/dashboard' },
      { name: 'Settings', icon: 'mdi-cog', path: '/settings' }
    ]

    watch(group, (_, __) => {
      show.value = false
    })

    function showMenu () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      if (context.root.$router.currentRoute.path.startsWith('/dashboard')) { show.value = true }
    }

    eventBus.$on('profile-load',
      (pictureURL: string) => { picture.value = pictureURL })

    return { routes, showMenu, show, group, picture }
  }
})
</script>
