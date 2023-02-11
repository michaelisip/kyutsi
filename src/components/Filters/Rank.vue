<script setup>
import { usePostStore } from '@/stores/posts'

const posts = usePostStore()

const changeFilter = (e) => {
  let filter = e.target.value

  posts.setFilter(filter)
  posts.fetchSubredditPosts()
}

</script>

<template>
    <select class="select bg-inherit dark:text-slate-400" @change="changeFilter">
        <option disabled selected>Filter</option>
        <option value="hot">Hot</option>
        <option value="new">New</option>
        <option value="top">Top</option>
    </select>
</template>

<style scoped>
</style>