<template>
  <div class="home">
    <v-container fluid class="mx-auto">
      <v-row>
        <v-spacer></v-spacer>
        <v-col md="col-4">
          <v-card class="ma-4 pa-4">
            <pre-image image-file="logo.png" width="128" height="128"/>
            <v-card-actions class="justify-center">
              <v-btn v-if="!processing" @click="signIn">
                Connect
                <v-icon class="mx-1" color="primary">mdi-google</v-icon>
              </v-btn>
              <v-progress-circular indeterminate v-else color="primary"></v-progress-circular>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
    <v-snackbar
    v-model="failed"
    :timeout=3000
    >
      <span>Authentication Failed <span style="font-size: 20px">😕</span></span>
      <v-btn
        color="red"
        text
        @click="failed = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import PreImage from '@/components/PreImage.vue'

export default defineComponent({
  name: 'Home',
  components: {
    PreImage
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup (props, context: any) {
    const failed = ref(false)
    const processing = ref(false)
    function displayLoginFail () {
      failed.value = true
      processing.value = false
    }
    function connect () {
      failed.value = false
      context.root.$router.push({ path: '/dashboard' })
    }
    async function signIn (): Promise<void> {
      processing.value = true
      try {
        const loggedInRes = await (
          await fetch('http://localhost:4567/auth/status', { credentials: 'include' })
        ).json()
        if (!loggedInRes.logged_in) {
          const authCode: string = await context.root.$gAuth.getAuthCode()
          const res = await fetch(
            'http://localhost:4567/authenticate',
            {
              method: 'POST',
              credentials: 'include',
              // eslint-disable-next-line @typescript-eslint/camelcase
              body: JSON.stringify({ auth_code: authCode })
            }
          )
          const parsedRes = await res.json()
          if (!parsedRes.session_id) {
            displayLoginFail()
            return
          }
          context.root.$cookies.set('ph_sid', parsedRes.session_id)
        }
        connect()
      } catch (e) {
        displayLoginFail()
      }
    }

    return { signIn, failed, processing }
  }
})
</script>
