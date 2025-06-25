import { useAuthStore } from '@/stores/auth-store'

export function useAuth() {
  const { user, isAuthenticated, login, logout, checkPermission } = useAuthStore()
  
  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkPermission,
  }
}