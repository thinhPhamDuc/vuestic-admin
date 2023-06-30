<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card>
          <va-card-title>Edit form</va-card-title>
          <va-card-content>
            <va-form ref="formRef">
              <div class="flex md4 sm6 xs12">
                <va-input
                  v-model="simple"
                  placeholder="Text Input"
                  label="Name"
                  :rules="[(value) => (value && value.length > 0) || 'Name is required']"
                />
              </div>
              <div>
                <div class="flex md4 sm6 xs12">
                  <va-date-input
                    v-model="dateInput.from"
                    :label="t('forms.dateTimePicker.from')"
                    :rules="[(v) => validateBirthday(v)]"
                  />
                </div>
                <div class="flex md4 sm6 xs12">
                  <va-date-input
                    v-model="dateInput.to"
                    :label="t('forms.dateTimePicker.to')"
                    :rules="[(v) => validateBirthday(v)]"
                  />
                </div>
              </div>
              <div class="flex md6 xs12">
                <va-select
                  v-model="simpleSelectModel"
                  :label="t('forms.selects.simple')"
                  text-by="description"
                  track-by="id"
                  :options="simpleOptions"
                  :rules="[(value) => value || 'Simple select is required']"
                />
              </div>
              <div class="flex md6 xs12">
                <va-select
                  v-model="multiSelectModel"
                  :label="t('forms.selects.multi')"
                  text-by="description"
                  track-by="id"
                  multiple
                  :options="simpleOptions"
                  :rules="[(value) => (value && value.length > 0) || 'Multiple select is required']"
                />
              </div>
              <div class="flex md6 xs12">
                <va-select
                  v-model="chosenCountry"
                  :label="t('forms.selects.country')"
                  :options="countriesList"
                  :rules="[(value) => (value && value.length > 0) || 'Country select is required']"
                />
              </div>
              <div class="flex md6 xs12">
                <va-select
                  v-model="multiSelectCountriesModel"
                  :label="t('forms.selects.countryMulti')"
                  multiple
                  :options="countriesList"
                  :rules="[(value) => (value && value.length > 0) || 'Country multiple is required']"
                />
              </div>
              <div class="flex md6 xs12">
                <va-select
                  v-model="searchableSelectModel"
                  :label="t('forms.selects.searchable')"
                  searchable
                  text-by="description"
                  track-by="id"
                  :options="simpleOptions"
                  :rules="[(value) => value || 'Country search select is required']"
                />
              </div>
              <div class="flex md6 xs12">
                <va-select
                  v-model="multiSearchableSelectModel"
                  :label="t('forms.selects.searchableMulti')"
                  text-by="description"
                  searchable
                  multiple
                  :options="countriesList"
                  :rules="[(value) => (value && value.length > 0) || 'Country multiple search select is required']"
                />
              </div>
              <div class="flex md6 xs12">
                <fieldset>
                  <va-radio v-model="radioSelectedOption" option="3" label="PROCESSING" />
                  <va-radio v-model="radioSelectedOption" option="2" label="REJECTED" />
                  <va-radio v-model="radioSelectedOption" option="1" label="PAID" />
                </fieldset>
                <va-checkbox
                  v-model="checkbox.unselected"
                  label="Please check confirm"
                  :rules="[(v) => v || 'You must agree with terms and conditions']"
                  class="d-flex align-items-center text-center mt-2"
                />
              </div>
              <va-button @click="submit()"> Submit </va-button>
              <va-button color="warning" @click="$router.push('manage-users')"> {{ t('forms.table.cancel') }} </va-button>
            </va-form>
          </va-card-content>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import CountriesList from '../forms/data/CountriesList'

  export default {
    props: {
      // Props definition
    },
    setup() {
      const { t } = useI18n()
      const dateInput = ref({})
      const countriesList = ref(CountriesList)
      const chosenCountry = ref('')
      const simple = ref('')
      const withDescription = ref('')
      const simpleSelectModel = ref('')
      const multiSelectModel = ref([])
      const multiSelectCountriesModel = ref([])
      const searchableSelectModel = ref('')
      const multiSearchableSelectModel = ref([])
      const clearableText = ref('Vasili Savitski')
      const successfulEmail = ref('andrei@dreamsupport.io')
      const wrongEmail = ref('andrei@dreamsupport')
      const radioSelectedOption = ref('option1')
      const messages = ref([
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
          'incididunt ut labore et dolore magna aliqua.',
      ])
      const checkbox = ref({
        unselected: false,
      })
      const errorMessages = ref(['Field should contain a valid email'])
      const simpleOptions = ref([
        {
          id: 1,
          description: 'First option',
        },
        {
          id: 2,
          description: 'Second option',
        },
        {
          id: 3,
          description: 'Third option',
        },
      ])
      return {
        t,
        simpleSelectModel,
        multiSelectModel,
        multiSelectCountriesModel,
        searchableSelectModel,
        multiSearchableSelectModel,
        dateInput,
        countriesList,
        chosenCountry,
        simple,
        withDescription,
        clearableText,
        successfulEmail,
        wrongEmail,
        messages,
        errorMessages,
        simpleOptions,
        radioSelectedOption,
        checkbox,
      }
    },
    watch: {
      // Watchers
    },
    created() {},
    mounted() {
      // DOM-related logic
    },
    methods: {
      // Component methods
      validateBirthday(value) {
        if (!value) {
          return 'Field is required'
        }
        const from = this.dateInput.from
        const to = this.dateInput.to

        if (from && to && from > to) {
          return 'The "from" date should be earlier than the "to" date.'
        }
        return true
      },
      submit() {
        if (
          this.simple &&
          this.dateInput.from &&
          this.dateInput.to &&
          this.simpleSelectModel &&
          this.multiSelectModel &&
          this.chosenCountry &&
          this.multiSelectCountriesModel &&
          this.searchableSelectModel &&
          this.multiSearchableSelectModel &&
          this.radioSelectedOption &&
          this.checkbox.unselected
        ) {
          // Generate a unique identifier for the form data key
          const formDataKey = 'formData' + Date.now()

          // Retrieve existing form data from local storage
          const savedFormData = localStorage.getItem('formData')
          let formDataObject = {}
          if (savedFormData) {
            formDataObject = JSON.parse(savedFormData)
          }

          // Add the current form data to the object
          formDataObject[formDataKey] = {
            simple: this.simple,
            dateInput: this.dateInput,
            simpleSelectModel: this.simpleSelectModel,
            multiSelectModel: this.multiSelectModel,
            chosenCountry: this.chosenCountry,
            multiSelectCountriesModel: this.multiSelectCountriesModel,
            searchableSelectModel: this.searchableSelectModel,
            multiSearchableSelectModel: this.multiSearchableSelectModel,
            radioSelectedOption: this.radioSelectedOption,
            checkbox: this.checkbox,
          }

          // Save the updated form data object in local storage
          localStorage.setItem('formData', JSON.stringify(formDataObject))

          alert('Submit success !!')
          this.$router.push({ path: 'manage-users' })
        } else {
          alert('Please submit!!!')
        }
      },
    },
  }
</script>

<style lang="css"></style>
