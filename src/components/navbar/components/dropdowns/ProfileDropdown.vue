<template>
  <div class="profile-dropdown-wrapper">
    <va-dropdown v-model="isShown" class="profile-dropdown" stick-to-edges placement="bottom" :offset="[13, 0]">
      <template #anchor>
        <span class="profile-dropdown__anchor">
          <slot />
          <va-icon class="px-2" :name="isShown ? 'angle_up' : 'angle_down'" :color="colors.primary" />
        </span>
      </template>
      <va-dropdown-content class="profile-dropdown__content flex-column">
        <va-list-item class="pa-2 ">
          <div class="va-list-item pa-2" role="listitem" tabindex="0">
              <div class="va-list-item__inner">
                <a aria-current="page" class="router-link-active router-link-exact-active profile-dropdown__item">
                My Profile
                </a>
            </div>
          </div>
          <div class="va-list-item pa-2" role="listitem" tabindex="0">
            <div class="va-list-item__inner">
              <button @click="logout">
                <a aria-current="page" class="router-link-active router-link-exact-active profile-dropdown__item">
                  Log out
                  </a>
              </button>
          </div>
        </div>
        </va-list-item>
      </va-dropdown-content>
    </va-dropdown>
  </div>
</template>

<script>
    import { ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { useColors } from 'vuestic-ui'
    import { useGlobalStore } from '../../../../stores/global-store'

    export default {
      setup() {
        const { t } = useI18n()
        const { colors } = useColors()
        const isShown = ref(false)
        return {
          t,
          colors,
          isShown
        }
      },
      data() {
        return {
          
        }
      },
      computed: {},
      watch: {
        
      },
      async created() {
      },
      methods: {
        logout() {
          const store = useGlobalStore()
          store.clearToken()
          this.$router.push({ name: 'login' });
        }
      },
    }
  </script>

<style lang="scss" scoped>
  .profile-dropdown {
    cursor: pointer;

    &__anchor {
      display: inline-block;
    }

    &__item {
      display: block;
      color: var(--va-gray);

      &:hover,
      &:active {
        color: var(--va-primary);
      }
    }
  }
</style>
