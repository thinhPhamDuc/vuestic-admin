<template>
  <div class="markup-tables flex">
    <va-card>
      <va-collapse class="mr-auto ml-4 mt-3">
        <template #header>
          <va-button class="mt-3">
            Filter
          </va-button>
        </template>
        <div class="pa-3">
          <va-input
            v-model="simple"
            placeholder="Text Input"
            label="Name"
          />
        </div>
      </va-collapse>
      <div class="d-flex" style="top: 0; right: 0;position: absolute">
        <va-button class="ml-auto mr-4 mt-3" @click="$router.push('manage-users')"> ADD </va-button>
      </div>
      <va-card-content>
        <div class="table-wrapper">
          <table class="va-table va-table--striped va-table--hoverable">
            <thead>
              <tr>
                <th>Name</th>
                <th>ChosenCountry</th>
                <th>MultiSelectModel</th>
                <th>MultiSearchableSelectModel</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="formData in paginatedFormDatas" :key="formData.id">
                <td>{{ formData.simple }}</td>
                <td>{{ formData.chosenCountry }}</td>
                <td>{{ getMultiSelectDescription(formData.multiSelectModel) }}</td>
                <td>{{ formData.multiSearchableSelectModel.toString() }}</td>
                <!--                <td> {{formData}}</td>-->
                <td>
                  <va-collapse>
                    <template #header>
                      <va-badge
                        :text="formData.radioSelectedOption"
                        :color="getStatusColor(formData.radioSelectedOption)"
                      />
                    </template>
                    <div>
                      <td>{{ formData.simple }}</td>
                      <br />
                      <td>{{ formData.chosenCountry }}</td>
                      <br />
                      <td>{{ getMultiSelectDescription(formData.multiSelectModel) }}</td>
                      <br />
                      <td>{{ formData.multiSearchableSelectModel.toString() }}</td>
                      <br />
                    </div>
                  </va-collapse>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4 d-flex justify-end">
          <va-pagination v-model="currentPage" :pages="totalPages" @input="updateDisplayedItems" />
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
  import { useI18n } from 'vue-i18n'
  import TreeViewBasicPreview from '../ui/tree-view/TreeViewBasicPreview.vue'

  export default {
    // components: { TreeViewBasicPreview },
    setup() {
      const { t } = useI18n()
      const expanded = [1]
      return {
        t,
        expanded,
      }
    },
    data() {
      return {
        itemsPerPage: 5,
        currentPage: 1,
        savedFormDatas: [],
        isOpenA: false,
        isOpenB: false,
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.savedFormDatas.length / this.itemsPerPage)
      },
      paginatedFormDatas() {
        // currentPage is v-model so it will change
        const startIndex = (this.currentPage - 1) * this.itemsPerPage
        const endIndex = startIndex + this.itemsPerPage
        return this.savedFormDatas.slice(startIndex, endIndex)
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
          console.log(this.savedFormDatas)
        }
      },
      updateDisplayedItems(page) {
        this.currentPage = page
      },
      getMultiSelectDescription(options) {
        return options.map((option) => option.description).join(', ')
      },
      getStatusColor(status) {
        // Provide the logic to determine the color based on the status
        // Example logic:
        if (status === 'paid') {
          return 'success'
        }

        if (status === 'processing') {
          return 'info'
        }

        return 'danger'
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
