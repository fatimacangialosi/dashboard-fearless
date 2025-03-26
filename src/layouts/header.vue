<template>
  <n-layout-header bordered>
    <n-button text @click="router.go(0)">
      <icon type="refresh" size="20" :depth="2" />
    </n-button>
    <n-breadcrumb>
      <n-breadcrumb-item>Dashboard</n-breadcrumb-item>
      <n-breadcrumb-item>Home</n-breadcrumb-item>
    </n-breadcrumb>
    <!-- spazio tra gli elenti a sx e quelli di dx -->
    <n-space :size="20" align="center" style="line-height: 1">
      <n-tooltip>
        <template #trigger>
          <router-link :to="{ name: 'about' }">
            <icon type="help" size="22" :depth="2" />
          </router-link>
        </template>
        Dashboard help
      </n-tooltip>
      <!-- rimando a github -->
      <n-tooltip>
        <template #trigger>
          <n-a href="https://github.com/fatimacangialosi/dashboard-fearless" target="_blank">
            <icon type="github" size="22" :depth="2" />
          </n-a>
        </template>
        View on GitHub
      </n-tooltip>
      <!-- icona notifiche -->
      <n-popover trigger="click" placement="bottom-end" :width="300">
        <template #trigger>
          <n-badge dot processing>
            <icon type="notifications" size="22" :depth="2" />
          </n-badge>
        </template>
        <n-tabs type="line" justify-content="space-evenly" style="--pane-padding: 6">
          <n-tab-pane name="notifications" tab="Notifications (9)">
            <n-list style="margin: 0">
              <n-list-item v-for="i in 9" :key="i"> Notification {{ i }} </n-list-item>
            </n-list>
          </n-tab-pane>
          <n-tab-pane name="messages" tab="Messages (3)">
            <n-list style="margin: 0">
              <n-list-item v-for="i in 3" :key="i"> Message {{ i }} </n-list-item>
            </n-list>
          </n-tab-pane>
        </n-tabs>
      </n-popover>

<!-- icona tonda con avatar -->
      <n-dropdown placement="bottom-end" show-arrow :options="options" @select="handleOptionsSelect">
        <n-avatar size="small" round :src="avatarImage" />
      </n-dropdown>
    </n-space>
  </n-layout-header>
</template>
<!-- fino a qui -->   


<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { computed, h } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { Icon } from '../components'
import { useCurrentUser } from '../composables'
import { token } from '../utils'

const router = useRouter()
const message = useMessage()
const { data: me } = useCurrentUser()

const options = computed(() => [
  { key: 'me', label: `Hey, ${me.value?.name as string}!` },
  { key: 'divider', type: 'divider' },
  { key: 'profile', label: () => h(RouterLink, { to: '/profile' }, 'Your Profiles') },
  { key: 'settings', label: () => h(RouterLink, { to: '/profile/settings' }, 'Settings') },
  { key: 'divider', type: 'divider' },
  { key: 'logout', label: 'Sign out' }
])

import avatarImage from '@/assets/my-avatar-github.jpg';


const handleOptionsSelect = async (key: unknown): Promise<void> => {
  if ((key as string) === 'logout') {
    await token.revoke()
    await router.push({ name: 'login' })
  } else if ((key as string) === 'me') {
    message.success(`Welcome back, ${me.value?.name as string}!`)
  }
}
</script>

<style scoped>
.n-layout-header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 9px 18px;
}

.n-button {
  margin-right: 15px;
}

.n-space {
  margin-left: auto;
}
</style>
