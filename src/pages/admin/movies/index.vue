<template>
  <div class="pa-3">
    <div class="flex md4 xs12 justify-center">
      <va-input v-model="search" label="Search" @keyup="submit">
        <template #prependInner>
          <va-icon class="icon-left input-icon" name="search" />
        </template>
      </va-input>
    </div>
  </div>
  <div class="table-wrapper">
    <table class="va-table va-table--striped va-table--hoverable w--10">
      <thead>
        <tr>
          <th>Image original</th>
          <th>Name</th>
          <th>Language</th>
          <th>Genres</th>
          <th>Status</th>
          <th>Ended</th>
          <th>Rating</th>
          <th>Summary</th>
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
                formData.show.image
                  ? formData.show.image.original
                  : 'https://w7.pngwing.com/pngs/116/765/png-transparent-clapperboard-computer-icons-film-movie-poster-angle-text-logo-thumbnail.png'
              "
              width="100"
              height="100"
            />
          </td>
          <td>{{ formData.show.name }}</td>
          <td>{{ formData.show.language }}</td>
          <td>{{ formData.show.genres[0] }}</td>
          <td>{{ formData.show.status }}</td>
          <td>{{ formData.show.ended }}</td>
          <td>{{ formData.show.rating.average }}</td>
          <td id="artDesc" class="art__desc">
            {{ changeDescription(formData.show.summary) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { useI18n } from 'vue-i18n'
  import { ref, onMounted } from 'vue'
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
      }
    },
    computed: {},
    watch: {},
    async created() {},
    methods: {
      async submit() {
        await this.getDataInfoMovie(this.search)
      },
      async getDataInfoMovie(movies) {
        try {
          let response = await fetch('https://api.tvmaze.com/search/shows?q=' + movies)
          const data = response.json()
          const promiseData = Promise.resolve(data)
          promiseData.then((value) => {
            this.functionGetDataCorrect(value)
          })
        } catch (error) {
          console.log(error)
        }
      },
      functionGetDataCorrect(data) {
        this.dataMovies = data
      },
      changeDescription(description) {
        const htmlString = description
        const temporaryElement = document.createElement('div')
        temporaryElement.innerHTML = htmlString
        return temporaryElement.textContent || temporaryElement.innerText
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
