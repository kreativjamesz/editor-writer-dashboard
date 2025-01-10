import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

export function useRoleAccess() {
  const auth = useAuthStore();

  const isWriter = computed(() => auth.user?.type === 'Writer');
  const isEditor = computed(() => auth.user?.type === 'Editor');

  const canAccess = (roles: ('Writer' | 'Editor')[]) => {
    return computed(() => {
      if (!auth.user) return false;
      return roles.includes(auth.user.type);
    });
  };

  const writerAccessOnly = () => {
    return computed(() => {
      if (!auth.user) return false;
      return isWriter.value;
    });
  };

  const editorAccessOnly = () => {
    return computed(() => {
      if (!auth.user) return false;
      return isEditor.value;
    });
  };

  const canCreateArticle = (roles: ('Writer' | 'Editor')[]) => {
    return computed(() => {
      if (!auth.user) return false;
      return roles.includes(auth.user.type);
    });
  };

  const canEditArticle = (articleStatus: 'For Edit' | 'Published') => {
    return computed(() => {
      if (!auth.user) return false;
      if (isEditor.value) return true;
      return isWriter.value && articleStatus === 'For Edit';
    });
  };

  const canDeleteArticle = (articleStatus: 'For Edit' | 'Published') => {
    return computed(() => {
      if (!auth.user) return false;
      if (isEditor.value) return true;
      return isWriter.value && articleStatus === 'For Edit';
    });
  };

  return {
    isWriter,
    isEditor,
    canAccess,
    canCreateArticle,
    canEditArticle,
    canDeleteArticle,
  };
}
