<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    post: Object
})

</script>

<template>
    <video class="h-full w-full object-cover object-center" muted loop>
        <source :src="post.media.reddit_video.fallback_url" type="video/mp4">
    </video>
</template>

<style scoped>
</style>