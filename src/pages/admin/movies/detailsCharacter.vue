<template>
  <h1>Name :</h1>
  <p>{{ detailsCharacters.name }}</p>
  <h1>Place of birth :</h1>
  <p>{{ detailsCharacters.place_of_birth }}</p>
  <h1>Birthday :</h1>
  <p>{{ detailsCharacters.birthday }}</p>
  <h1>Bio :</h1>
  <p>{{ detailsCharacters.biography }}</p>
  <h1>Profile path :</h1>
  <img
    :src="
      detailsCharacters.profile_path
        ? 'https://image.tmdb.org/t/p/w500' + detailsCharacters.profile_path
        : 'https://w7.pngwing.com/pngs/116/765/png-transparent-clapperboard-computer-icons-film-movie-poster-angle-text-logo-thumbnail.png'
    "
    width="100"
    height="100"
  />
</template>

<script>
  import { useI18n } from 'vue-i18n'
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  export default {
    setup() {
      const { t } = useI18n()

      onMounted(() => {})
      return {
        t,
      }
    },
    data() {
      return {
        detailsCharacters: '',
      }
    },
    computed: {},
    watch: {},
    async created() {
      const paramsId = this.$router.currentRoute._rawValue.params.id
      await this.getDataDetail(paramsId)
    },
    methods: {
      async getDataDetail(id) {
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/person/' + id,
          params: {
            language: 'en-US',
          },
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDgxYWE1NWRlYzMxZDc3ZWUyMGI3Mzk4NmU5OWU3NCIsInN1YiI6IjY0YTc4M2RiYWYyZGE4MDEwY2FkNzEzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.53X7wnT94JljrVmYbr4diBGiYNdu4nh4nGubE1acxjc',
          },
        }

        try {
          const response = await axios.request(options)
          this.detailsCharacters = response.data
          console.log('this.detailsCharacters')

          console.log(this.detailsCharacters)
        } catch (error) {
          console.error(error)
        }
      },
    },
  }
</script>

<style lang="scss" scoped></style>
