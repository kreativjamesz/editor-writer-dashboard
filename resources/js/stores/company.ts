import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCompanies } from '@/composables/useCompanies';
import type { Company } from '@/types';

const { retrieveCompanies, viewCompany, createCompany, updateCompany, deleteCompany } = useCompanies();

export const useCompanyStore = defineStore('company', () => {
  const companies = ref<Company[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    total: 0,
  });

  // Fetch all companies (accessible by both Writer and Editor)
  const fetchAllCompanies = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await retrieveCompanies();
      companies.value = response.data;
      return response;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error fetching companies';
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  // Get specific company
  const getCompany = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await viewCompany(id);
      return response;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error getting company';
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  // Create company (Editor only)
  const createNewCompany = async (data: Partial<Company>) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await createCompany(data);
      return response;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error creating company';
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  // Update company (Editor only)
  const updateExistingCompany = async (id: number, data: Partial<Company>) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await updateCompany(id, data);
      return response;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error updating company';
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  // Delete company (Editor only)
  const deleteExistingCompany = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await deleteCompany(id);
      return response;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error deleting company';
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  return {
    companies,
    loading,
    error,
    pagination,
    fetchAllCompanies,
    getCompany,
    createNewCompany,
    updateExistingCompany,
    deleteExistingCompany,
  };
});
