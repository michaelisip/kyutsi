import { defineStore } from 'pinia'

export const usePostStore = defineStore('posts', {
    state: () => {
        let subreddits = import.meta.env.VITE_SUBREDDITS            

        return  {
            subreddits: subreddits.split(','),
            selected_subreddit: subreddits.split(',')[0],
            filter: 'hot', // hot, new, top
            after: null,
            data: []
        }
    },
    actions: {
        async fetchSubredditPosts() {
            let endpoint = `${this.selected_subreddit}/${this.filter}`

            const response = await fetch(`https://www.reddit.com/r/${endpoint}.json?after=${this.after}`)
            const result = await response.json()

            let posts = result.data.children.filter((post) => post.data.is_video).map((post) => post.data)

            this.after = result.data.after
            this.data.push(...posts)

            /** on load, refetch if videos are not enough for scroll */
            if (this.data.length < 10) this.fetchSubredditPosts()
        },
        setSelectedSubreddit(subreddit) {
            this.data = []
            this.selected_subreddit = subreddit
        },
        setFilter(filter) {
            this.data = []
            this.filter = filter
        },
    }
});
