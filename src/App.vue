<script setup>
import { usePostStore } from '@/stores/posts'

const posts = usePostStore()

posts.fetchSubredditPosts()

document.addEventListener('scroll', () => {
  let scrollPosition = window.innerHeight + window.pageYOffset
  let scrollHeight = document.documentElement.scrollHeight

  if (scrollPosition >= scrollHeight) posts.fetchSubredditPosts()
})

const fetchPosts = (e) => {
  let subreddit = e.target.value

  posts.setSelectedSubreddit(subreddit)
  posts.fetchSubredditPosts()
}

const changeFilter = (e) => {
  let filter = e.target.value

  posts.setFilter(filter)
  posts.fetchSubredditPosts()
}

</script>

<template>
  <div class="bg-white">
    <div class="pt-6">
      <div class="max-w-full my-6 px-8">
        <select class="select bg-inherit mr-2" @change="fetchPosts">
          <option v-for="(subreddit, index) in posts.subreddits" :key="index" :value="subreddit" :selected="posts.selected_subreddit === subreddit">{{ `r/${subreddit}` }}</option>
        </select>
        <select class="select bg-inherit" @change="changeFilter">
          <option disabled selected>Filter</option>
          <option value="hot">Hot</option>
          <option value="new">New</option>
          <option value="top">Top</option>
        </select>
      </div>
      <div class="mx-auto my-6 max-w-2xl sm:px-6 md:grid md:grid-cols-2 md:max-w-full lg:grid-cols-5 md:gap-x-4 lg:gap-x-8 gap-y-8 lg:px-8">
        <div class="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg lg:block" v-for="(post, index) in posts.data" :key="index">
          <video class="h-full w-full object-cover object-center" autoplay muted loop>
            <source :src="post.media.reddit_video.fallback_url" type="video/mp4">
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
