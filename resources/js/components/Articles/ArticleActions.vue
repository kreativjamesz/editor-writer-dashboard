<script setup lang="ts">
import { useRoleAccess } from '@/composables/useRoleAccess';
import type { Article } from '@/types';

const props = defineProps<{
  article: Article;
}>();

const emit = defineEmits<{
  publish: [article: Article];
  delete: [article: Article];
}>();

const { isWriter, isEditor, canEditArticle } = useRoleAccess();
const canEdit = canEditArticle(props.article.status);

const handlePublish = () => {
  emit('publish', props.article);
};

const handleDelete = () => {
  emit('delete', props.article);
};
</script>

<template>
  <div class="flex gap-2">
    <!-- Writer only actions -->
    <template v-if="isWriter">
      <Button v-if="canEdit" @click="$router.push(`/articles/${article.id}/edit`)"> Edit Article </Button>
      <Button @click="$router.push('/articles/create')"> Create New </Button>
    </template>

    <!-- Editor only actions -->
    <template v-if="isEditor">
      <Button @click="handlePublish">Publish</Button>
      <Button @click="handleDelete" variant="destructive">Delete</Button>
    </template>
  </div>
</template>
