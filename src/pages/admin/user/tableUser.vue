<template>
  <div class="table-wrapper">
    <table class="va-table va-table--striped va-table--hoverable w--10">
      <thead>
        <tr>
          <th>{{ t('forms.table.name') }}</th>
          <th>{{ t('forms.table.chosen_country') }}</th>
          <th>{{ t('forms.table.multi_select_model') }}</th>
          <th>{{ t('forms.table.multi_search_select_model') }}</th>
          <th>{{ t('forms.table.from') }}</th>
          <th>{{ t('forms.table.to') }}</th>
          <th>{{ t('forms.table.status') }}</th>
          <th>{{ t('forms.table.action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="formData in data" :key="formData.id">
          <td>{{ formData.simple }}</td>
          <td>{{ formData.chosenCountry }}</td>
          <td>{{ getMultiSelectDescription(formData.multiSelectModel) }}</td>
          <td>{{ formData.multiSearchableSelectModel.toString() }}</td>
          <td>{{ formData.dateInput.from }}</td>
          <td>{{ formData.dateInput.to }}</td>
          <td>
            <va-badge
              :text="getText(formData.radioSelectedOption)"
              :color="getStatusColor(formData.radioSelectedOption)"
            />
          </td>
          <td>
            <va-button color="info" class="mr-2" @click="$router.push('edit-users')">
              {{ t('forms.table.edit') }}
            </va-button>
            <va-button color="danger" @click="deleteModal(formData.simple)"> {{ t('forms.table.delete') }} </va-button>
          </td>
        </tr>
      </tbody>
      <va-modal v-model="showModal" hide-default-actions overlay-opacity="0.2">
        <template #header>
          <h2 class="mb-4">{{ t('forms.table.delete_user') }}</h2>
        </template>
        <div>{{ t('forms.table.delete_confirm') }}</div>
        <template #footer>
          <va-button color="grey" class="mr-2" @click="showModal = false"> {{ t('forms.table.cancel') }} </va-button>
          <va-button color="warning" @click="forceDelete()"> {{ t('forms.table.delete') }} </va-button>
        </template>
      </va-modal>
    </table>
  </div>
</template>
<script>
  import { useI18n } from 'vue-i18n'
  export default {
    props: ['data'],
    setup() {
      const { t } = useI18n()
      return {
        t,
      }
    },
    data() {
      return {
        search: '',
        showModal: false,
        userid: '',
        newArray: [],
      }
    },
    methods: {
      deleteModal(id) {
        this.showModal = !this.showModal
        this.userid = id
      },
      forceDelete: function () {
        // for change put to api
        const removeUser = this.userid
        this.data.filter(function (obj) {
          if (obj.simple === removeUser) {
            return (obj.delete = true)
          }
        })
        // for localstorage
        const formDataString = localStorage.getItem('formData')
        let formData = JSON.parse(formDataString)

        for (const key in formData) {
          if (formData.hasOwnProperty(key) && formData[key].simple === removeUser) {
            formData[key].delete = true
          }
        }

        const updatedFormDataString = JSON.stringify(formData)

        localStorage.setItem('formData', updatedFormDataString)
        this.showModal = false
      },
      getMultiSelectDescription(options) {
        return options.map((option) => option.description).join(', ')
      },
      getStatusColor(status) {
        if (status === '1') {
          return 'success'
        }

        if (status === '3') {
          return 'info'
        }

        return 'danger'
      },
      getText(status) {
        if (status === '1') {
          return 'PAID'
        }

        if (status === '3') {
          return 'PROCESSING'
        }

        return 'REJECTED'
      },
    },
  }
</script>
<style lang="scss" scoped>
  .w--10 {
    width: 100%;
  }
</style>
