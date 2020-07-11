<template>
  <v-container>
    <h1 class="text-center">Toggle Placeholders 🔌</h1>
    <v-row class="ma-4">
      <v-col class="col-md-4 col-sm-6">
        <PlaceholderCard name="Role" placeholder="role" :description="description" :icon-url="link"/>
      </v-col>
      <v-col class="col-md-4 col-sm-6">
        <PlaceholderCard name="Random" placeholder="random" :description="longDescription" :icon-url="link"/>
      </v-col>
      <v-col class="col-md-4 col-sm-6">
        <PlaceholderCard name="Views" placeholder="views" :description="description" :icon-url="link"/>
      </v-col>
      <v-col class="col-md-4 col-sm-6">
        <PlaceholderCard name="Views" placeholder="views" :description="longDescription" :icon-url="link"/>
      </v-col>
      <v-col class="col-md-4 col-sm-6">
        <PlaceholderCard name="Views" placeholder="views" :description="description" :icon-url="link"/>
      </v-col>
      <v-col class="col-md-4 col-sm-6">
        <PlaceholderCard name="Views" placeholder="views" :description="description" :icon-url="link"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script type="ts">
    //todo game plan -> users should have X placeholder name added or removed to their list
    //then scanner will check for all placeholders that they have
    import { defineComponent } from "@vue/composition-api";
    import PlaceholderCard from "@/components/PlaceholderCard.vue";

    export default defineComponent({
        name: "Placeholders",
        components: {
          PlaceholderCard
        },
        setup() {
          const link = 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&w=1000&q=80'
          const description = 'This is just a random default description'
          const longDescription = 'This is a very long description. The point of this is to see how far this will go. Kinda crazy right.' +
            'Anyways, pretty beserk how u have to do this kindof hard work just to get something to fit on a screen' +
            'Welp. It is what it is.'

          return { link, description, longDescription }
        }
    })
</script>

<style scoped>

</style>
