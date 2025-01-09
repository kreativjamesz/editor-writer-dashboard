<template>
  <router-view />
</template>

<script setup lang="ts">
const router = useRouter();
// Make sure to redirect into /cms/dashboard if manually visit /cms
router.push('/cms/dashboard');
</script>
