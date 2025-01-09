<script setup lang="ts">
import type { Article } from '@/types';
import { useDateFormatter } from '@/composables/useDateFormatter';

defineProps<{
  article: Article;
  isForEdit: boolean;
}>();

const { longFormat } = useDateFormatter();
</script>

<template>
  <HoverCard>
    <HoverCardTrigger>
      <Card
        class="bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden flex flex-col justify-between transition-all hover:shadow-md hover:scale-105 cursor-pointer min-h-[160px]"
      >
        <CardHeader>
          <h1 class="text-lg font-bold capitalize truncate">{{ article.title }}</h1>
        </CardHeader>
        <CardContent>
          <p class="text-zinc-700 dark:text-zinc-400 text-xs truncate">{{ article.content }}</p>
        </CardContent>
        <CardFooter class="flex justify-start">
          <p v-if="!isForEdit" class="text-sm text-zinc-500 dark:text-teal-400 mt-2">
            Publish Date: {{ longFormat(new Date(article.published_date)) }}
          </p>
          <div v-else class="flex flex-row items-center justify-between w-full">
            <a :href="article.link" class="text-teal-500 hover:underline">
              <Button variant="link" class="dark:text-zinc-200 p-1">Read more</Button>
            </a>
            <RouterLink :to="`/cms/articles/edit/${article.id}`">
              <Button class="dark:bg-teal-800 dark:hover:bg-zinc-700 dark:text-zinc-200">Edit</Button>
            </RouterLink>
          </div>
        </CardFooter>
      </Card>
    </HoverCardTrigger>
    <HoverCardContent class="w-[250px]">
      <Card
        class="bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden flex flex-col justify-between transition-all hover:shadow-md hover:scale-105 cursor-pointer"
      >
        <CardContent class="p-4">
          <div class="image">
            <img :src="article.image" alt="Article Image" class="w-full h-48 object-cover" />
          </div>
          <div class="content">
            <h3 class="text-lg font-bold truncate">{{ article.title }}</h3>
            <p class="text-zinc-700 dark:text-zinc-400 text-xs">{{ article.content }}</p>
          </div>
          <p v-if="!isForEdit" class="text-sm text-zinc-500 dark:text-teal-400 mt-2">
            Publish Date: {{ longFormat(new Date(article.published_date)) }}
          </p>
        </CardContent>
      </Card>
    </HoverCardContent>
  </HoverCard>
</template>
