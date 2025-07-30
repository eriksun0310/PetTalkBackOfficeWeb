import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'super_admin' | 'admin' | 'moderator'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  permissions: string[]
  login: (user: User) => void
  logout: () => void
  checkPermission: (permission: string) => boolean
}

const rolePermissions: Record<UserRole, string[]> = {
  super_admin: [
    'users.read',
    'users.write',
    'users.suspend',
    'comments.read',
    'comments.moderate',
    'shops.read',
    'shops.write',
    'shops.delete',
    'shops.approve',
    'notifications.read',
    'notifications.send',
    'settings.manage',
    'admins.manage',
  ],
  admin: [
    'users.read',
    'users.suspend',
    'comments.read',
    'comments.moderate',
    'shops.read',
    'shops.write',
    'shops.approve',
    'notifications.read',
    'notifications.send',
    'settings.read',
  ],
  moderator: [
    'users.read',
    'comments.read',
    'comments.moderate',
    'shops.read',
    'notifications.read',
  ],
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      permissions: [],
      
      login: (user: User) => {
        const permissions = rolePermissions[user.role] || []
        set({
          user,
          isAuthenticated: true,
          permissions,
        })
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          permissions: [],
        })
      },
      
      checkPermission: (permission: string) => {
        const { permissions } = get()
        return permissions.includes(permission)
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)