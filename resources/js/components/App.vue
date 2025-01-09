<template>
  <router-view v-if="initialized"></router-view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { useAuthInit } from '@/composables/useAuthInit';

const initialized = ref(false);
// const { authStore } = useAuthInit();

onMounted(async () => {
  // await authStore.fetchUser().catch(() => {
  //   authStore.clearAuth();
  // });
  initialized.value = true;
});
</script>
