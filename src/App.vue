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
        <span class="mr-2">Discord Server</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      absolute
      bottom
      class="deep-purple accent-4"
      dark
      temporary
      v-model="show"
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
        dense
        nav
      >
        <v-list-item-group
          v-model="group"
        >
          <v-list-item
            :key="route.name"
            @click="$root.$router.push(route.path)"
            v-for="route in routes"
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
  import {defineComponent, ref, watch} from '@vue/composition-api'
  import {eventBus} from '@/event'

  export default defineComponent({
    name: 'App',
    setup(props, context: any) {
      const show = ref(false)
      const group = ref(null)
      const picture = ref(require('./assets/logo.png'))

      const cookies = context.root.$cookies

      if (cookies.isKey('profile_url')) {
        picture.value = cookies.get('profile_url')
      }

      const routes = [
        {name: 'Home', icon: 'mdi-view-dashboard', path: '/dashboard'},
        {name: 'Placeholders', icon: 'mdi-brush', path: '/dashboard/placeholders'},
        {name: 'Settings', icon: 'mdi-cog', path: '/dashboard/settings'}
      ]

      watch(group, (_, __) => {
        show.value = false
      })

      function showMenu() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        if (context.root.$router.currentRoute.path.startsWith('/dashboard')) {
          show.value = true
        }
        window.scrollTo(0, 0)
      }

      eventBus.$on('profile-load',
        (pictureURL: string) => {
          picture.value = pictureURL
          cookies.set('profile_url', pictureURL)
        })

      return {routes, showMenu, show, group, picture}
    }
  })
</script>
