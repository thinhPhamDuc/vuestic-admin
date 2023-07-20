<template>
  <form @submit.prevent="onsubmit">
    <va-input
      v-model="email"
      class="mb-3"
      type="email"
      :label="t('auth.email')"
    />

    <va-input
      v-model="password"
      class="mb-3"
      type="password"
      :label="t('auth.password')"
    />

    <div class="auth-layout__options d-flex align-center justify-space-between">
      <va-checkbox v-model="keepLoggedIn" class="mb-0" :label="t('auth.keep_logged_in')" />
      <router-link class="ml-1 va-link" :to="{ name: 'recover-password' }">{{
        t('auth.recover_password')
      }}</router-link>
    </div>

    <div class="d-flex justify-center mt-3">
      <va-button class="my-0" @click="onsubmit">{{ t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script>
  import { useI18n } from 'vue-i18n'
  import { ref, onMounted } from 'vue'
  import { useGlobalStore } from '../../../stores/global-store'
  export default {
    components: { },
    setup() {
      const { t } = useI18n()
      onMounted(() => {
      })
      return {
        t,
      }
    },
    data() {
      return {
        email: '',
        password: '',
        keepLoggedIn: false
      }
    },
    computed: {
    },
    watch: {
      
    },
    created() {
      // Access the Pinia store instance
      const store = useGlobalStore();
      // Retrieve the token from localStorage on page load
      const tokenFromStorage = localStorage.getItem('token');
      if (tokenFromStorage) {
        // If token exists in localStorage, set it in the store
        store.setToken(tokenFromStorage);
      } else {
        // If token does not exist in localStorage, clear it from the store
        store.clearToken();
      }
    },
    methods: {
      onsubmit() {
        if (this.email && this.password) {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            "password": this.password,
            "name": this.email
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

          fetch("https://nodeapi-mongo.onrender.com/api/admin/login", requestOptions)
          .then(response => response.json())
          .then(data => {
            const token = data.token;
            // Access the Pinia store instance
            console.log(token);
            const store = useGlobalStore();
            // Call the action to set the token
            store.setToken(token);
            // Redirect to the dashboard or any other logic you need after successful login
            this.$router.push('/dashboard'); // Replace '/dashboard' with your dashboard route path
          })
          .catch(error => console.log('error', error));
        }
      }
    },
  }
</script>
