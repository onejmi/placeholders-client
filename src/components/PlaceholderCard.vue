<template>
  <v-card shaped class="pa-3" height="350">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{ name }}</v-list-item-title>
        <v-list-item-subtitle>
          Usage: <div class="code-block" style="color: whitesmoke">{{ "{" + placeholder + "}" }}</div>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                v-clipboard="() => `{${placeholder}}`"
              >
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </template>
            <span>Copy</span>
          </v-tooltip>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar
        size="80"
      >
        <pre-image :image-file="iconUrl" width="80" height="80" :online=true></pre-image>
      </v-list-item-avatar>
    </v-list-item>
    <v-card-text class="ph-desc">
      {{ description.length > 140 ? description.substr(0, 140) + '...' : description }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-card-text class="font-weight-medium enabled" v-if="enabled">Enabled</v-card-text>
      <v-card-text class="font-weight-medium disabled" v-else>Disabled</v-card-text>
      <v-spacer></v-spacer>
      <v-switch v-model="enabled" @change="update(enabled)"/>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
  import {defineComponent, ref, watch} from "@vue/composition-api";
  import PreImage from "@/components/PreImage.vue";

    export default defineComponent({
        name: "PlaceholderCard",
        components: {
          PreImage
        },
        props: {
          name: String,
          description: String,
          placeholder: String,
          iconUrl: String,
          enabled: Boolean
        },
        setup(props) {
          const enabled = ref(props.enabled);

          const update = function(enabled: boolean) {
            fetch('http://localhost:4567/api/v1/profile/placeholders', {
              method: 'PATCH',
              credentials: 'include',
              body: JSON.stringify({ placeholder_name: props.placeholder, enabled: enabled })
            })
          }

          return { enabled, update }
        }
    })
</script>

<style scoped>
  .enabled {
    color: limegreen
  }
  .disabled {
    color: dimgrey;
  }
  .code-block {
    display: inline-block;
    border-radius: 2px;
    border-color: black;
    background-color: dimgrey;
    padding: 5px;
  }
  .ph-desc {
    height: 150px;
  }
</style>
