<template>
  <div class="table-wrapper">
    <table class="va-table va-table--striped va-table--hoverable w--10">
      <thead>
        <tr>
          <th>Original image</th>
          <th>Original language</th>
          <th>Original title</th>
          <th>Overview</th>
          <th>Release date</th>
          <th>Production Countries</th>
          <th>Status</th>
          <th>Vote average</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <img
              :src="
                dataMovies.poster_path
                  ? 'https://image.tmdb.org/t/p/w500' + dataMovies.poster_path
                  : 'https://w7.pngwing.com/pngs/116/765/png-transparent-clapperboard-computer-icons-film-movie-poster-angle-text-logo-thumbnail.png'
              "
              width="100"
              height="100"
            />
          </td>
          <td>{{ dataMovies.original_language }}</td>
          <td>{{ dataMovies.original_title }}</td>
          <td>{{ dataMovies.overview }}</td>
          <td>{{ dataMovies.release_date }}</td>
          <td>
            <ul v-for="formData in dataMovies.production_countries" :key="formData.id">
              <li>{{ formData.name }}</li>
            </ul>
          </td>
          <td>{{ dataMovies.status }}</td>
          <td>{{ dataMovies.vote_average }}</td>
        </tr>
      </tbody>
    </table>
    <h1>Cast :</h1>
    <table class="va-table va-table--striped va-table--hoverable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Original name</th>
          <th>profile_path</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="formData in dataCredit.cast" :key="formData.id">
          <td>
            <div @click="handleDetail(formData.id)">{{ formData.character }}</div>
          </td>
          <td>{{formData.id}}</td>
          <td>{{ formData.original_name }}</td>
          <td>
            <img
              :src="
                formData.profile_path
                  ? 'https://image.tmdb.org/t/p/w500' + formData.profile_path
                  : 'https://w7.pngwing.com/pngs/116/765/png-transparent-clapperboard-computer-icons-film-movie-poster-angle-text-logo-thumbnail.png'
              "
              width="100"
              height="100"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <h1 class="mt-2">Production companies :</h1>
    <div class="d-flex mt-4">
      <div v-for="formData in dataMovies.production_companies" :key="formData.id" class="mx-auto">
        <img
          :src="
            formData.logo_path
              ? 'https://image.tmdb.org/t/p/w500' + formData.logo_path
              : 'https://w7.pngwing.com/pngs/116/765/png-transparent-clapperboard-computer-icons-film-movie-poster-angle-text-logo-thumbnail.png'
          "
          width="100"
          height="100"
        />
      </div>
    </div>
  </div>
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
        dataMovies: '',
        dataCredit: '',
      }
    },
    computed: {},
    watch: {},
    async created() {
      const paramsId = this.$router.currentRoute._rawValue.params.id
      await this.getDataDetail(paramsId)
      await this.getDataCredit(paramsId)
    },
    methods: {
      async getDataDetail(id) {
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/movie/' + id,
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
          this.dataMovies = response.data
          console.log(this.dataMovies)
        } catch (error) {
          console.error(error)
        }
      },
      async getDataCredit(id) {
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/movie/' + id + '/credits',
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
          this.dataCredit = response.data
        } catch (error) {
          console.error(error)
        }
      },
      async handleDetail(id) {
        this.$router.push(`/detailsCharacter/${id}`)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .markup-tables {
    .table-wrapper {
      overflow: auto;
    }

    .va-table {
      width: 100%;
    }
  }
  .w--10 {
    width: 100%;
  }
  .art__desc {
    line-height: var(--font-lineheight-2);
  }
  .art__btn {
    margin-top: var(--size-4);
  }

  .primary-btn {
    color: var(--gray-0);
    background-color: var(--gray-9);
    border: 0;
    padding: var(--size-3);
    cursor: pointer;
  }
  .primary-btn:hover {
    background-color: var(--gray-7);
  }
</style>
