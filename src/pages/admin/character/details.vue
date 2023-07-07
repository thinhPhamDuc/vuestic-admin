<template>
  <div class="table-wrapper">
    <table class="va-table va-table--striped va-table--hoverable w--10">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Alive</th>
          <th>Name</th>
          <th>Wand</th>
          <th>Alternate names</th>
          <th>Gender</th>
          <th>House</th>
          <th>Date Of Birth</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="formData in detail" :key="formData.id">
          <td>
            <img :src="formData.image" width="100" height="100" />
          </td>
          <td>{{ formData.actor }}</td>
          <td>{{ formData.alive }}</td>
          <td>{{ formData.name }}</td>
          <td>{{ formData.wand }}</td>
          <td>{{ formData.alternate_names }}</td>
          <td>{{ formData.gender }}</td>
          <td>{{ formData.house }}</td>
          <td>{{ formData.dateOfBirth }}</td>
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
        detail: [],
      }
    },
    computed: {},
    watch: {},
    created() {
      const paramsId = this.$router.currentRoute._rawValue.params.id
      this.getDataDetail(paramsId)
    },
    methods: {
      async getDataDetail(id) {
        try {
          const response = await fetch('https://hp-api.onrender.com/api/character/' + id)
          this.detail = await response.json()
          console.log(this.detail)
        } catch (error) {
          console.log(error)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .w--10 {
    width: 100%;
  }
</style>
