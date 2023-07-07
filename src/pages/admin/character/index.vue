<template>
  <div class="table-wrapper">
    <table class="va-table va-table--striped va-table--hoverable w--10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Alternate names</th>
          <th>Gender</th>
          <th>House</th>
          <th>Date Of Birth</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="formData in pageItems" :key="formData.id">
          <td>{{ formData.id }}</td>
          <td>
            <img :src="formData.image" width="100" height="100" />
          </td>
          <td>{{ formData.name }}</td>
          <td>{{ formData.alternate_names }}</td>
          <td>{{ formData.gender }}</td>
          <td>{{ formData.house }}</td>
          <td>{{ formData.dateOfBirth }}</td>
          <td>
            <va-button color="info" class="mr-2" @click="handleDetail(formData.id)">
              {{ t('forms.table.edit') }}
            </va-button>
          </td>
        </tr>
      </tbody>
    </table>
    <va-pagination v-model="currentPage" :pages="calculateTotalPages" input @input="updateDisplayedItems" />
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
        dataCharacter: [],
        currentPage: 1,
        totalPages: 0,
        itemsPerPage: 10,
        pageItems: [],
        detail: '',
      }
    },
    computed: {
      calculateTotalPages() {
        console.log('total pages', Math.ceil(this.dataCharacter.length / this.itemsPerPage))
        return Math.ceil(this.dataCharacter.length / this.itemsPerPage)
      },
    },
    watch: {
      currentPage() {
        this.updateDisplayedItems()
      },
    },
    mounted() {
      this.getDataAllCharacter()
    },
    methods: {
      async getDataAllCharacter() {
        try {
          const response = await fetch('https://hp-api.onrender.com/api/characters')
          this.dataCharacter = await response.json()
          this.updateDisplayedItems()
        } catch (error) {
          console.log(error)
        }
      },
      updateDisplayedItems() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage
        const endIndex = startIndex + this.itemsPerPage
        this.pageItems = this.dataCharacter.slice(startIndex, endIndex)
      },
      async handleDetail(id) {
        this.$router.push(`details/${id}`)
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
  .art__desc {
    line-height: var(--font-lineheight-2);
  }
  .art__btn {
    margin-top: var(--size-4);
  }

  .primary-btn {
    color: var(--gray-0);
    background-color: var(--gray-9);
    border: 0;
    padding: var(--size-3);
    cursor: pointer;
  }
  .primary-btn:hover {
    background-color: var(--gray-7);
  }
</style>
