<template>
  <div class="pa-3">
    <div class="flex md4 xs12 justify-center">
      <va-input v-model="search" label="Search">
        <template #prependInner>
          <va-icon class="icon-left input-icon" name="search" />
        </template>
      </va-input>
      <va-button color="info" class="mr-2 mt-2" @click="submit(search)"> Filter Date </va-button>
    </div>
  </div>
  <div class="table-wrapper">
    <table class="va-table va-table--striped va-table--hoverable w--10">
      <thead>
        <tr>
          <th>Images</th>
          <th>original_language</th>
          <th>original_title</th>
          <th>overview</th>
          <th>release_date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <h1 v-if="dataMovies.length === 0">There are no data match right now!!!</h1>
        </tr>
        <tr v-for="formData in dataMovies" :key="formData.id">
          <td>
            <img
              :src="
                formData.poster_path
                  ? 'https://image.tmdb.org/t/p/w500' + formData.poster_path
                  : 'https://w7.pngwing.com/pngs/116/765/png-transparent-clapperboard-computer-icons-film-movie-poster-angle-text-logo-thumbnail.png'
              "
              width="100"
              height="100"
            />
          </td>
          <td>{{ formData.original_language }}</td>
          <td>{{ formData.original_title }}</td>
          <td>{{ formData.overview }}</td>
          <td>{{ formData.release_date }}</td>
          <td>
            <va-button color="info" class="mr-2" @click="handleDetail(formData.id)">
              {{ t('forms.table.edit') }}
            </va-button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="totalPages" class="mt-4 d-flex justify-end">
      <va-pagination v-model="currentPage" :pages="totalPages" @input="updateDisplayedItems" />
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
        search: '',
        dataMovies: [],
        currentPage: 1,
        totalPages: '',
      }
    },
    computed: {},
    watch: {
      currentPage(newPage) {
        this.updateDisplayedItems(newPage)
        // Call the method to fetch and display movies based on the updated current page
        this.getDataInfoMovie(this.search)
      },
    },
    async created() {},
    methods: {
      async submit(data) {
        await this.getDataInfoMovie(data)
      },
      async getDataInfoMovie(movies) {
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/search/movie',
          params: {
            query: movies,
            include_adult: 'false',
            language: 'en-US',
            page: this.currentPage,
          },
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDgxYWE1NWRlYzMxZDc3ZWUyMGI3Mzk4NmU5OWU3NCIsInN1YiI6IjY0YTc4M2RiYWYyZGE4MDEwY2FkNzEzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.53X7wnT94JljrVmYbr4diBGiYNdu4nh4nGubE1acxjc',
          },
        }

        try {
          const response = await axios.request(options)
          console.log('response.data', response.data)
          this.totalPages = response.data.total_pages
          this.dataMovies = response.data.results
        } catch (error) {
          console.error(error)
        }
      },
      updateDisplayedItems(page) {
        this.currentPage = page
      },
      async handleDetail(id) {
        this.$router.push(`detailsMovie/${id}`)
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
