<template>
  <div class="home">
    <v-container fluid class="mx-auto">
      <v-row>
        <v-spacer></v-spacer>
        <v-col md="col-4">
          <v-card class="ma-4 pa-4">
            <v-img class="mx-auto my-4" src="../assets/logo.png" width="128" height="128">
              <template v-slot:placeholder>
                <v-row class="fill-height align-center justify-center">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-card-actions class="justify-center">
              <v-btn @click="signIn">
                Connect
                <v-icon class="mx-1" color="primary">mdi-google</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Home',
  components: {},
  setup (props, context) {
    async function signIn (): Promise<void> {
      const authCode: string = await (context.root as any).$gAuth.getAuthCode()
      const res = await fetch(
        'http://localhost:4567/authenticate',
        {
          method: 'POST',
          // eslint-disable-next-line @typescript-eslint/camelcase
          body: JSON.stringify({ auth_code: authCode })
        }
      )
      console.log(await res.text())
    }

    return { signIn }
  }
})
</script>
