<template>
    <div class="table-wrapper">
      <table class="va-table va-table--striped va-table--hoverable w--10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>   
            <td>{{ product.price }}</td> 
            <td>{{ product.quantity }}</td> 
            <td>
              <va-button color="info" class="mr-2" @click="handleDetail(product._id)">
                {{ t('forms.table.edit') }}
              </va-button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="totalPages" class="mt-4 d-flex justify-end">
        <va-pagination v-model="currentPage" :pages="totalPages" @input="updateDisplayedItems" />
      </div>
    </div>
  </template>
  
  <script>
    import { useI18n } from 'vue-i18n'
    import { ref, onMounted } from 'vue'
    import { useGlobalStore } from '../../../stores/global-store'
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
          currentPage: 1,
          totalPages: '',
          products: [],
          limit : 5
        }
      },
      computed: {},
      async created() {
        await this.fetchData()
      },
      watch: {
        currentPage(newPage) {
          this.updateDisplayedItems(newPage)
          this.fetchData()
        },
      },
      methods: {
        async fetchData() {
          var myHeaders = new Headers();
          const store = useGlobalStore();
          const tokenFromStore =  "Bearer " + store.getToken;
          myHeaders.append("Authorization", tokenFromStore);

          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

          console.log('fetch data');
          const url = "https://nodeapi-mongo.onrender.com/api/admin/product?page=" + (this.currentPage-1) + "&limit=" + this.limit
          fetch(url, requestOptions)
            .then(response => response.text())
            .then(data => {
              this.products = JSON.parse(data).product
              this.totalPages = (JSON.parse(data).total / this.limit).toFixed()
            })
            .catch(error => console.log('error', error));
        },
        updateDisplayedItems(page) {
          this.currentPage = page
        },
        async handleDetail(id) {
          this.$router.push(`detailsProducts/${id}`)
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
  