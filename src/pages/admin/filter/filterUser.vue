<template>
  <va-collapse class="mr-auto ml-4 mt-3">
    <template #header>
      <va-button class="mt-3"> {{ t('forms.table.filter') }} </va-button>
    </template>
    <div class="pa-3">
      <div class="flex md4 xs12 justify-center">
        <va-input v-model="search" label="Search" @keyup="submit">
          <template #prependInner>
            <va-icon class="icon-left input-icon" name="search" />
          </template>
        </va-input>
        <div class="flex mt-2 mb-2">
          <va-date-input
            v-model="dateInput.from"
            :label="t('forms.dateTimePicker.from')"
            :rules="[(v) => validateBirthday(v)]"
          />
        </div>
        <div class="flex">
          <va-date-input
            v-model="dateInput.to"
            :label="t('forms.dateTimePicker.to')"
            :rules="[(v) => validateBirthday(v)]"
          />
        </div>
        <va-button color="info" class="mr-2 mt-2" @click="submitDate"> Filter Date </va-button>
      </div>
    </div>
  </va-collapse>
</template>

<script>
  import { useI18n } from 'vue-i18n'
  import { ref } from 'vue'

  export default {
    emits: { passDate: null, passDataSearch: null },
    setup() {
      const { t } = useI18n()
      const dateInput = ref({})
      return {
        t,
        dateInput,
      }
    },
    data() {
      return {
        search: '',
      }
    },
    computed: {},
    created() {},
    methods: {
      submit() {
        this.$emit('passDataSearch', this.search)
      },
      submitDate() {
        // console.log('this.dateInput.from',this.dateInput.from)
        const data = [this.dateInput.from, this.dateInput.to]
        this.$emit('passDate', data)
      },
      validateBirthday(value) {
        const from = this.dateInput.from
        const to = this.dateInput.to
        if (from && to && from > to) {
          return 'The "from" date should be earlier than the "to" date.'
        }
        return true
      },
    },
  }
</script>
