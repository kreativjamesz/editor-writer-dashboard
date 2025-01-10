import { useApi } from './useApi';
import { ref } from 'vue';
import type { Company, PaginatedResponse } from '@/types';

export function useCompanies() {
  const api = useApi();
  const companies = ref<Company[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // For retrieving companies (both Writer and Editor)
  const retrieveCompanies = async () => {
    loading.value = true;
    error.value = null;

    try {
      const endpoint = '/companies';
      const response = await api.get(endpoint);
      companies.value = response.data;
      return response;
    } catch (error) {
      console.error('Error retrieving companies:', error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  // View specific company
  const viewCompany = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get(`/companies/${id}`);
      return response;
    } catch (error) {
      console.error('Error viewing company:', error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  // Create company (Editor only)
  const createCompany = async (data: Partial<Company>) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.post('/companies', data);
      return response;
    } catch (error) {
      console.error('Error creating company:', error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  // Update company (Editor only)
  const updateCompany = async (id: number, data: Partial<Company>) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.put(`/companies/${id}`, data);
      return response;
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  // Delete company (Editor only)
  const deleteCompany = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      await api.delete(`/companies/${id}`);
    } catch (error) {
      console.error('Error deleting company:', error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return {
    companies,
    loading,
    error,
    retrieveCompanies,
    viewCompany,
    createCompany,
    updateCompany,
    deleteCompany,
  };
}
