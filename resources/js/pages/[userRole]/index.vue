<template>
  <router-view />
</template>

<script setup lang="ts">
const router = useRouter();
const { isWriter, isEditor } = useRoleAccess();

// Make sure to redirect into /writer/dashboard if user role is writer
if (isWriter.value) {
  router.push('/writer/dashboard');
}

// Make sure to redirect into /editor/dashboard if user role is editor
if (isEditor.value) {
  router.push('/editor/dashboard');
}
</script>
