<template>
  <v-form ref="form">
    <v-card>
      <v-card-title>Video Title Editor</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="videoTitle"
          label="Title"
          placeholder="Title"
          outlined
          :rules="[v => !!v || 'Required', v => v.length <= 100 || 'Max 100 characters']"
          counter
          maxLength="100"
        >
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="save" color="blue" class="ml-3 mb-3 pa-4">
          <div v-if="loading">
            <v-progress-circular indeterminate color="white"></v-progress-circular>
          </div>
          <div v-else>Save</div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
  import {defineComponent, PropType, ref, Ref} from "@vue/composition-api";
  import { Video, VideoUpdate } from '@/api/model/user'

    export default defineComponent({
      name: 'TitleEditor',
      props: {
        video: Object as PropType<Video>
      },
      setup(props, context) {
        const video = props.video as Video
        const videoTitle = ref(video.title)
        const loading = ref(false)

        const form: Ref<any> = ref(null)

        async function save() {
          if(form.value.validate()) {
            loading.value = true
            const res = await fetch('http://localhost:4567/api/v1/profile/uploads/update/title', {
              method: 'PATCH',
              credentials: 'include',
              body: JSON.stringify({ video_id: video.id, new_title: videoTitle.value })
            })
            const update: VideoUpdate = await res.json()
            video.title = update.new_title
            loading.value = false
            context.emit('submit', update)
          }
        }

        return { videoTitle, loading, form, save }
      }
    })
</script>

<style scoped>
</style>
