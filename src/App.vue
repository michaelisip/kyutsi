<script setup>
import { onMounted } from 'vue'
import { usePostStore } from '@/stores/posts'

import FilterRank from './components/Filters/Rank.vue'
import FilterSubreddit from './components/Filters/Subreddit.vue'
import DarkMode from './components/DarkMode.vue'
import Post from './components/Post.vue'

const posts = usePostStore()

posts.fetchSubredditPosts()

onMounted(() => {
  if (localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
});

document.addEventListener('scroll', () => {
  let scrollPosition = window.innerHeight + window.pageYOffset
  let scrollHeight = document.documentElement.scrollHeight

  // fetch posts when user has scrolled to the bottom
  if (scrollPosition >= scrollHeight) posts.fetchSubredditPosts()
})

</script>

<template>
  <div class="bg-white dark:bg-black">
    <div class="pt-6">
      <div class="flex justify-between">
        <div class="max-w-full my-6 px-8">
          <FilterSubreddit></FilterSubreddit>
          <FilterRank></FilterRank>
        </div>
        <div class="ml-4">
          <!-- dark mode -->
          <DarkMode></DarkMode>
      </div>
      </div>
      <div class="mx-auto my-6 max-w-2xl sm:px-6 md:grid md:grid-cols-2 md:max-w-full lg:grid-cols-5 md:gap-x-4 lg:gap-x-8 gap-y-8 lg:px-8">
        <div class="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg lg:block" v-for="(post, index) in posts.data" :key="index">
          <Post :post="post"></Post>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
