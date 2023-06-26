<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card>
          <va-card-title>Form</va-card-title>
          <va-card-content>
            <va-form ref="formRef">
              <div class="flex md4 sm6 xs12">
                <va-input v-model="simple" placeholder="Text Input" label="Name" />
              </div>
              <div>
                <div class="flex md4 sm6 xs12">
                  <va-date-input v-model="dateInput.from" :label="t('forms.dateTimePicker.from')" />
                </div>
                <div class="flex md4 sm6 xs12">
                  <va-date-input v-model="dateInput.to" :label="t('forms.dateTimePicker.to')" />
                </div>
              </div>
              <div class="flex md6 xs12">
                <va-select
                  v-model="simpleSelectModel"
                  :label="t('forms.selects.simple')"
                  text-by="description"
                  track-by="id"
                  :options="simpleOptions"
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
                />
              </div>
              <div class="flex md6 xs12">
                <va-select v-model="chosenCountry" :label="t('forms.selects.country')" :options="countriesList" />
              </div>
              <div class="flex md6 xs12">
                <va-select
                  v-model="multiSelectCountriesModel"
                  :label="t('forms.selects.countryMulti')"
                  multiple
                  :options="countriesList"
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
                />
              </div>
              <div class="flex md6 xs12">
                <fieldset>
                  <va-radio v-model="radioSelectedOption" option="PROCESSING" label="PROCESSING" />
                  <va-radio v-model="radioSelectedOption" option="REJECTED" label="REJECTED" />
                  <va-radio v-model="radioSelectedOption" option="PAID" label="PAID" />
                </fieldset>
                <va-checkbox
                  v-model="checkbox.unselected"
                  label="Please check confirm"
                  class="d-flex align-items-center text-center mt-2"
                />
              </div>
              <va-button class="mr-4"> SUBMIT </va-button>
              <va-button color="warning" @click="$router.push('table-users')"> CANCEL </va-button>
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
  // import { useForm } from 'vuestic-ui'

  export default {
    props: {
      // Props definition
    },
    setup() {
      const { t } = useI18n()
      // const { isValid, validate, reset, resetValidation } = useForm('formRef')

      const dateInput = ref({})
      const countriesList = ref(CountriesList)
      const chosenCountry = ref('')
      const simple = ref('')
      const withDescription = ref('')
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
    created() {
      // Initialization logic
    },
    mounted() {
      // DOM-related logic
    },
    methods: {
      // Component methods
    },
  }
</script>

<style lang="css"></style>
