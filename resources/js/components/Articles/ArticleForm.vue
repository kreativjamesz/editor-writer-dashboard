<template>
  <div class="">
    <Card>
      <CardHeader>
        <CardTitle class="dark:text-zinc-200">Create New Article</CardTitle>
        <CardDescription class="dark:text-zinc-400">Fill in the details to create a new article</CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Error Alert -->
          <Alert v-if="error" variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{{ error }}</AlertDescription>
          </Alert>

          <!-- Company Selection -->
          <div class="space-y-2">
            <Label for="company">Related Company</Label>
            <!-- <Select v-model="form.company_id" required>
              <option value="">Select a company</option>
              <option v-for="company in companies" :key="company.id" :value="company.id">
                {{ company.name }}
              </option>
            </Select> -->
            <CompanyDropdown :companies="companies" v-model="form.company_id" required />
          </div>

          <!-- Title -->
          <div class="space-y-2">
            <Label for="title">Title</Label>
            <Input id="title" v-model="form.title" required />
          </div>

          <!-- Image Upload -->
          <div class="space-y-2">
            <Label for="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              @change="handleImageChange"
              required
              class="file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 dark:file:bg-zinc-800 dark:file:text-zinc-200 dark:hover:file:bg-zinc-700"
            />
            <img v-if="imagePreview" :src="imagePreview" class="mt-2 max-h-40 rounded" />
          </div>

          <!-- Link -->
          <div class="space-y-2">
            <Label for="link">Link</Label>
            <Input
              id="link"
              v-model="form.link"
              type="url"
              required
              class="w-full dark:bg-zinc-800 dark:text-zinc-200"
            />
          </div>

          <!-- Published Date -->
          <div class="space-y-2">
            <Label for="published_date">Published Date</Label>
            <Input
              id="published_date"
              v-model="form.published_date"
              type="date"
              required
              class="w-full dark:bg-zinc-800 dark:text-zinc-200"
            />
          </div>

          <!-- Content -->
          <div class="space-y-2">
            <Label for="content">Content</Label>
            <Textarea
              id="content"
              v-model="form.content"
              rows="6"
              required
              class="resize-none w-full dark:bg-zinc-800 dark:text-zinc-200"
            />
          </div>

          <!-- Submit Button -->
          <Button type="submit" :disabled="loading" class="w-full">
            {{ loading ? 'Creating...' : 'Create Article' }}
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useApi } from '@/composables/useApi';
import { useCompanyStore } from '@/stores/company';

const api = useApi();
const { companies, fetchAllCompanies } = useCompanyStore();
const router = useRouter();

const form = ref({
  company_id: '',
  title: '',
  image: null as File | null,
  link: '',
  published_date: new Date().toISOString().split('T')[0],
  content: '',
});

const loading = ref(false);
const error = ref<string | null>(null);
const imagePreview = ref<string | null>(null);

// Handle image upload preview
const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    form.value.image = input.files[0];
    imagePreview.value = URL.createObjectURL(input.files[0]);
  }
};

// Handle form submission
const handleSubmit = async () => {
  loading.value = true;
  error.value = null;

  try {
    const formData = new FormData();
    Object.entries(form.value).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await api.post('/articles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    router.push('/cms/articles');
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to create article';
  } finally {
    loading.value = false;
  }
};

// Load companies on mount
onMounted(() => {
  fetchAllCompanies();
});
</script>

<style scoped></style>
