<template>
  <v-img :class="imgClass" :src="source" :width="width" :height="height">
    <template v-slot:placeholder>
      <v-row class="fill-height align-center justify-center">
        <v-progress-circular indeterminate :color="color"></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'pre-image',
  props: {
    imageFile: String,
    width: String,
    height: String,
    color: {
      type: String,
      default: 'primary'
    },
    imgClass: {
      type: String,
      default: 'mx-auto my-4'
    },
    online: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const source = computed(() =>
      props.online ? props.imageFile : require(`../assets/${props.imageFile}`)
    )
    return { source }
  }
})

</script>
