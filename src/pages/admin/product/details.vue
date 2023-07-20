<template>
    <h1>ádasdalsdlasdl</h1>
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
          
        }
      },
      computed: {},
      watch: {},
      async created() {
        const paramsId = this.$router.currentRoute._rawValue.params.id
        await this.getDataDetail(paramsId)
      },
      methods: {
        getDataDetail(id) {
            var myHeaders = new Headers();
            const store = useGlobalStore();
            const tokenFromStore =  "Bearer " + store.getToken;
            myHeaders.append("Authorization", tokenFromStore);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            const url = "https://nodeapi-mongo.onrender.com/api/admin/product/" + id

            fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        }
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
  