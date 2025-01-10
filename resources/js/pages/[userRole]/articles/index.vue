<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { userRole } = useAuth();

router.push(`/${userRole.value.toLowerCase()}/articles/create`);
</script>
