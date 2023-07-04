<template>
  <div class="markup-tables flex">
    <va-card>
      <filter-user @passDataSearch="GetData($event)" @passDate="GetDate($event)" />
      <div class="d-flex" style="top: 0; right: 0; position: absolute">
        <va-button class="ml-auto mr-4 mt-3" @click="$router.push('add-users')"> {{ t('forms.table.add') }} </va-button>
      </div>
      <va-tabs v-model="tab" stateful grow>
        <template #tabs>
          <va-tab v-for="tab in ['ALL', 'PAID', 'REJECTED', 'PROCESSING']" :key="tab">
            {{ tab }}
          </va-tab>
        </template>
      </va-tabs>
      <va-card-content>
        <table-user :data="paginatedFormDatas" />
        <div v-if="totalPages" class="mt-4 d-flex justify-end">
          <va-pagination v-model="currentPage" :pages="totalPages" @input="updateDisplayedItems" />
        </div>
      </va-card-content>
    </va-card>
    <va-button v-show="false" id="button" class="mr-2 mb-2" @click=""> Basic notification </va-button>
    <va-button v-show="false" id="button" class="mr-2 mb-2" @click="handleButtonClick"> Basic notification </va-button>
  </div>
</template>

<script>
  import FilterUser from '../filter/filterUser.vue'
  import TableUser from './tableUser.vue'
  import { useI18n } from 'vue-i18n'
  import { useColors, useToast } from 'vuestic-ui'
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  export default {
    components: { TableUser, FilterUser },
    setup() {
      const { t } = useI18n()
      const color = ref(null)
      const initToast = ref(null)
      onMounted(() => {
        const { color: colorFunc } = useColors()
        const { init: initToastFunc } = useToast()
        color.value = colorFunc
        initToast.value = initToastFunc
      })
      return {
        t,
        initToast,
      }
    },
    data() {
      return {
        itemsPerPage: 10,
        currentPage: 1,
        savedFormDatas: [],
        isOpenA: false,
        isOpenB: false,
        searching: '',
        tab: 0,
        from: '',
        to: '',
        fact: '',
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.filteredFormDatas.length / this.itemsPerPage)
      },
      filteredFormDatas() {
        const searchTerm = this.searching.toLowerCase().trim()
        const tabcurrent = this.tab
        const from = this.from
        const to = this.to

        return this.savedFormDatas.filter((formData) => {
          if (formData.delete) {
            return false
          }

          const simple = formData.simple.toLowerCase()
          const tabtable = formData.radioSelectedOption
          const dateFrom = new Date(formData.dateInput.from).toString()
          const dateTo = new Date(formData.dateInput.to).toString()

          if (tabcurrent === 0) {
            return simple.includes(searchTerm) && dateFrom.includes(from) && dateTo.includes(to)
          }

          return (
            tabtable.includes(tabcurrent) &&
            simple.includes(searchTerm) &&
            dateFrom.includes(from) &&
            dateTo.includes(to)
          )
        })
      },
      paginatedFormDatas() {
        // currentPage is v-model so it will change
        const startIndex = (this.currentPage - 1) * this.itemsPerPage
        const endIndex = startIndex + this.itemsPerPage
        return this.filteredFormDatas.slice(startIndex, endIndex)
      },
    },
    watch: {
      tab(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.currentPage = 1
          this.updateDisplayedItems(this.currentPage)
        }
      },
    },
    created() {
      this.loadFormData()
      this.getDataFactCat()
      setInterval(this.getDataFactCat, 5000) // Call getData() every 3 seconds
      setInterval(this.handleButtonClick, 5000)
    },
    methods: {
      handleButtonClick() {
        this.initToast({ message: this.fact.fact, color: this.color })
      },
      async getDataFactCat() {
        try {
          let response = await fetch('https://catfact.ninja/fact')
          this.fact = await response.json()
        } catch (error) {
          console.log(error)
        }
      },
      loadFormData() {
        const formDataJson = localStorage.getItem('formData')
        if (formDataJson) {
          this.savedFormDatas = Object.values(JSON.parse(formDataJson))
        }
      },
      GetData(data) {
        console.log(data)
        this.searching = data
      },
      GetDate(data) {
        this.from = data[0]
        this.to = data[1]
      },
      updateDisplayedItems(page) {
        this.currentPage = page
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
</style>
