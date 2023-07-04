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
      </div>
    </div>
  </va-collapse>
</template>

<script>
  import { useI18n } from 'vue-i18n'

  export default {
    setup() {
      const { t } = useI18n()
      return {
        t,
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
    },
  }
</script>
