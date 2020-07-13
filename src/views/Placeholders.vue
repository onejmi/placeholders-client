<template>
  <v-container>
    <h1 class="text-center">Toggle Placeholders 🔌</h1>
    <v-row class="ma-4">
      <v-col
        v-for="placeholder in placeholders"
        :key="placeholder.placeholder"
        class="col-md-4 col-sm-6">
        <PlaceholderCard
          :name="placeholder.name"
          :placeholder="placeholder.placeholder"
          :description="placeholder.description"
          :icon-url="placeholder.image_url"
          :enabled="placeholder.enabled"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
    //todo game plan -> users should have X placeholder name added or removed to their list
    //then scanner will check for all placeholders that they have
    import {defineComponent, onMounted, Ref, ref} from "@vue/composition-api";
    import PlaceholderCard from "@/components/PlaceholderCard.vue";
    import { Placeholder } from "@/api/model/placeholder";

    export default defineComponent({
        name: "Placeholders",
        components: {
          PlaceholderCard
        },
        setup() {
          const placeholders : Ref<Placeholder[]> = ref([])
          onMounted(async () => {
            const res = await fetch('http://localhost:4567/api/v1/placeholders', { credentials: 'include' })
            const global : Placeholder[] = await res.json()
            const currPlaceholders : string[] | null =
              await (await fetch('http://localhost:4567/api/v1/profile/placeholders', { credentials: 'include'})).json()
            if(currPlaceholders != null) {
              global.forEach(entry => {
                entry.enabled = currPlaceholders.includes(entry.placeholder);
                placeholders.value.push(entry)
              })
            }
          })
          return { placeholders }
        }
    })
</script>

<style scoped>

</style>
