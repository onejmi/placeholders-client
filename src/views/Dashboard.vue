<template>
  <div class="dashboard">
    <v-container v-if="profile">
      <v-row fluid class="mb-4">
        <v-col cols="4">
          <v-card class="pa-2">
            <v-card-title class="justify-center">What's up {{ profile.name }}</v-card-title>
            <pre-image :online=true :image-file="profile.image_url" width="128" height="128"></pre-image>
          </v-card>
        </v-col>
        <v-col cols="8" fill-height>
          <v-card height="90%">
            <v-content>
              <v-card-title class="justify-center" style="font-size: 2em">
                <span>
                  You have <span style="color: red;">{{ profile.subscriber_count }}</span>
                  {{ profile.subscriber_count !== 1 ? "subscribers" : "subscriber" }}!
                </span>
              </v-card-title>
            </v-content>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="8">
          <v-card v-if="videos == null" height="130" elevation="4">
            <v-row class="fill-height" align="center" justify="center">
              <v-progress-circular indeterminate color="blue"></v-progress-circular>
            </v-row>
          </v-card>
          <v-card v-else-if="videos.length > 0" elevation="4" min-height="350">
            <v-card-title class="justify-center">Your Videos</v-card-title>
            <v-slide-group
              center-active
              show-arrows
              class="pa-4 pb-8"
            >
              <v-slide-item
                v-for="video in videos"
                :key="video.title"
                class="ml-3 mr-3"
              >
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    @click.stop="openVideoDialogue(video)"
                    class="mx-auto my-12 text-center"
                    :elevation="hover ? 12 : 4"
                    width="256"
                    height="300"
                    v-ripple="{ center: true }"
                  >
                    <pre-image img-class="mx-auto my-0" :online=true :image-file="video.thumbnail_url"></pre-image>
                    <v-card-title>{{ video.title.length > 15 ? video.title.substr(0,15) + '...' : video.title }}</v-card-title>
                  </v-card>
                </v-hover>
              </v-slide-item>
            </v-slide-group>
          </v-card>
          <v-card v-else height="130" elevation="4">
            <v-card-title class="justify-center">You currently don't have any videos!</v-card-title>
            <v-card-text style="color: black;" class="text-center">
              <span style="font-size: 40px;">😭</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-dialog
        v-model="showDialogue"
        max-width="360"
      >
        <TitleEditor v-on:submit="closeDialogue" :video="currentVideo" :key="showDialogue"/>
      </v-dialog>
    </v-container>
    <v-container v-else fill-height fluid style="height: 500px">
      <v-progress-circular indeterminate class="ma-auto" size=64 width=6 color="blue"></v-progress-circular>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watchEffect, watch } from '@vue/composition-api'
import {Profile, Video, VideoUpdate} from '@/api/model/user'
import PreImage from '@/components/PreImage.vue'
import { eventBus } from '@/event'
import TitleEditor from "@/components/TitleEditor.vue";

export default defineComponent({
  name: 'Dashboard',
  components: {
    TitleEditor,
    PreImage
  },
  setup () {
    const profile: Ref<Profile | null> = ref(null)
    fetch('http://localhost:4567/api/v1/profile', { credentials: 'include' })
      .then(async (res) => { profile.value = await res.json() })

    const videos: Ref<Video[] | null> = ref(null)
    fetch('http://localhost:4567/api/v1/profile/uploads', { credentials: 'include' })
      .then(async (res) => { videos.value = await res.json() })

    const currentVideo: Ref<Video | null> = ref(null)
    const showDialogue = ref(false)

    function openVideoDialogue(video: Video) {
      currentVideo.value = video
      showDialogue.value = true
    }

    function closeDialogue() {
      showDialogue.value = false
    }

    watchEffect(() => {
      eventBus.$emit('profile-load', profile.value?.image_url)
    })
    return { profile, videos, currentVideo, showDialogue, openVideoDialogue, closeDialogue }
  }
})
</script>
