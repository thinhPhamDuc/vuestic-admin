<template>
  <form>
    <div class="row">
      <div class="flex md6 xs12">
        <va-select
          v-model="simpleSelectModel"
          :label="t('forms.selects.simple')"
          text-by="description"
          track-by="id"
          :options="simpleOptions"
          searchable
        />
      </div>
    </div>
  </form>

  <div class="table-wrapper">
    <table class="va-table va-table--striped va-table--hoverable w--10">
      <thead>
        <tr>
          <th>Area</th>
          <th>Capital</th>
          <th>Continents</th>
          <th>Flag</th>
          <th>Name</th>
          <th>TimeZone</th>
          <th>Side car</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <h1 v-if="dataCorrect.length === 0">There are no data match right now!!!</h1>
        </tr>
        <tr v-for="formData in dataCorrect" :key="formData.id">
          <td>{{ formData.area }}</td>
          <td>{{ formData.capital ? formData.capital[0] : 'null' }}</td>
          <td>{{ formData.continents[0] }}</td>
          <td>
            <img :src="formData.flags.png" />
          </td>
          <td>{{ formData.name.official }}</td>
          <td>{{ formData.timezones[0] }}</td>
          <td>{{ formData.car.side }}</td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th>Web pages</th>
          <th>Domains</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <h1 v-if="dataCorrectSchool.length === 0">There are no data match right now!!!</h1>
        </tr>
        <tr v-for="formData in dataCorrectSchool" :key="formData.id">
          <td>{{ formData.web_pages[0] }}</td>
          <td>{{ formData.domains[0] }}</td>
          <td>{{ formData.name }}</td>
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
      const simpleOptions = ref([])
      onMounted(() => {})
      return {
        t,
        simpleOptions,
      }
    },
    data() {
      return {
        simpleSelectModel: '',
        dataCorrect: '',
        dataCorrectSchool: '',
      }
    },
    computed: {},
    watch: {
      simpleSelectModel(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.getDataInfoCountry(this.simpleSelectModel.description)
          this.getDataInfoCountrySchool(this.simpleSelectModel.description)
        }
      },
    },
    async created() {
      this.getListCountry()
    },
    methods: {
      async getDataInfoCountry(location) {
        try {
          let response = await fetch('https://restcountries.com/v3.1/name/' + location)
          const data = response.json()
          const promiseData = Promise.resolve(data)
          promiseData.then((value) => {
            this.functionGetDataCorrect(value)
          })
        } catch (error) {
          console.log(error)
        }
      },
      async getDataInfoCountrySchool(location) {
        try {
          let response = await fetch('http://universities.hipolabs.com/search?country=' + location)
          const data = response.json()
          const promiseData = Promise.resolve(data)
          promiseData.then((value) => {
            this.functionGetDataCorrectSchool(value)
          })
        } catch (error) {
          console.log(error)
        }
      },
      async getListCountry() {
        try {
          let response = await fetch('https://restcountries.com/v3.1/all')
          const data = response.json()
          const promiseData = Promise.resolve(data)
          promiseData.then((value) => {
            this.functionGetDataCorrectListCountry(value)
          })
        } catch (error) {
          console.log(error)
        }
      },
      functionGetDataCorrect(data) {
        this.dataCorrect = Array.from(data)
      },
      functionGetDataCorrectSchool(data) {
        this.dataCorrectSchool = this.removeDuplicates(Array.from(data))
      },
      removeDuplicates(array) {
        return Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse)
      },
      functionGetDataCorrectListCountry(data) {
        this.simpleOptions = data
          .map((country) => ({
            description: country.name.common,
          }))
          .filter((obj) => obj.description !== undefined)
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
</style>
