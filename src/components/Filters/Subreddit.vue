<script setup>
import { usePostStore } from '@/stores/posts'

const posts = usePostStore()

const fetchPosts = (e) => {
  let subreddit = e.target.value

  posts.setSelectedSubreddit(subreddit)
  posts.fetchSubredditPosts()
}

</script>

<template>
    <select class="select bg-inherit mr-2 dark:text-slate-400" @change="fetchPosts">
        <option v-for="(subreddit, index) in posts.subreddits" :key="index" :value="subreddit" :selected="posts.selected_subreddit === subreddit">{{ `r/${subreddit}` }}</option>
    </select>
</template>

<style scoped>
</style>