<template>
  <div class="markup-tables flex">
    <va-card>
      <filter-user @passDataSearch="GetData($event)" />
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
  </div>
</template>

<script>
  import FilterUser from '../filter/filterUser.vue'
  import TableUser from './tableUser.vue'
  import { useI18n } from 'vue-i18n'
  export default {
    components: { TableUser, FilterUser },
    setup() {
      const { t } = useI18n()
      return {
        t,
      }
    },
    data() {
      return {
        itemsPerPage: 5,
        currentPage: 1,
        savedFormDatas: [],
        isOpenA: false,
        isOpenB: false,
        searching: '',
        tab: 0,
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.filteredFormDatas.length / this.itemsPerPage)
      },
      filteredFormDatas() {
        const searchTerm = this.searching.toLowerCase().trim()
        const tabcurrent = this.tab
        return this.savedFormDatas.filter((formData) => {
          if (!formData.delete) {
            const simple = formData.simple.toLowerCase()
            const tabtable = formData.radioSelectedOption
            if (tabcurrent === 0) {
              return simple.includes(searchTerm)
            } else if (tabcurrent === 1) {
              return tabtable.includes(tabcurrent) && simple.includes(searchTerm)
            } else if (tabcurrent === 2) {
              return tabtable.includes(tabcurrent) && simple.includes(searchTerm)
            } else if (tabcurrent === 3) {
              return tabtable.includes(tabcurrent) && simple.includes(searchTerm)
            }
          }
        })
      },
      paginatedFormDatas() {
        // currentPage is v-model so it will change
        const startIndex = (this.currentPage - 1) * this.itemsPerPage
        const endIndex = startIndex + this.itemsPerPage
        return this.filteredFormDatas.slice(startIndex, endIndex)
      },
    },
    created() {
      this.loadFormData()
    },
    methods: {
      loadFormData() {
        const formDataJson = localStorage.getItem('formData')
        if (formDataJson) {
          this.savedFormDatas = Object.values(JSON.parse(formDataJson))
        }
      },
      GetData(data) {
        this.searching = data
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
