import { User, UserStatus, UserGenderType, PartnerType, MapWarningIconType } from '@/types'

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: '王小明',
    genderType: UserGenderType.Male,
    partnerType: PartnerType.Dog,
    mapWarningIconType: MapWarningIconType.AngryPoop,
    status: UserStatus.Verified,
    isDeleted: false,
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-02-20T00:00:00.000Z',
    loginMethod: 'google',
    commentCount: 42,
    reportCount: 0,
    lastLoginAt: '2024-02-20T10:30:00.000Z',
    deviceInfo: {
      platform: 'iOS',
      version: '17.0',
      deviceId: 'device123'
    }
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    name: '李美玲',
    genderType: UserGenderType.Female,
    partnerType: PartnerType.Cat,
    mapWarningIconType: MapWarningIconType.SurprisedPoop,
    status: UserStatus.Registered,
    isDeleted: false,
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-01T00:00:00.000Z',
    loginMethod: 'line',
    commentCount: 15,
    reportCount: 1,
    lastLoginAt: '2024-02-15T14:20:00.000Z',
    deviceInfo: {
      platform: 'Android',
      version: '14',
      deviceId: 'device456'
    }
  },
  {
    id: '3',
    email: 'disabled.user@example.com',
    name: '張大衛',
    genderType: UserGenderType.Male,
    partnerType: PartnerType.Dog,
    mapWarningIconType: MapWarningIconType.AngryPoop,
    status: UserStatus.Disabled,
    isDeleted: false,
    createdAt: '2023-12-10T00:00:00.000Z',
    updatedAt: '2024-01-30T00:00:00.000Z',
    loginMethod: 'email',
    commentCount: 128,
    reportCount: 5,
    lastLoginAt: '2024-01-25T09:15:00.000Z',
    deviceInfo: {
      platform: 'iOS',
      version: '16.5',
      deviceId: 'device789'
    }
  },
  {
    id: '4',
    email: 'deleted.user@example.com',
    name: '陳小華',
    genderType: UserGenderType.Female,
    partnerType: PartnerType.Cat,
    mapWarningIconType: MapWarningIconType.AngryPoop,
    status: UserStatus.Deleted,
    isDeleted: true,
    createdAt: '2023-11-05T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z',
    loginMethod: 'line',
    commentCount: 35,
    reportCount: 2,
    deviceInfo: {
      platform: 'Android',
      version: '13',
      deviceId: 'device321'
    }
  },
  {
    id: '5',
    email: 'michael.chen@example.com',
    name: '陳俊傑',
    genderType: UserGenderType.Male,
    partnerType: PartnerType.Dog,
    mapWarningIconType: MapWarningIconType.SurprisedPoop,
    status: UserStatus.Verified,
    isDeleted: false,
    createdAt: '2023-09-20T00:00:00.000Z',
    updatedAt: '2024-02-18T00:00:00.000Z',
    loginMethod: 'google',
    commentCount: 89,
    reportCount: 0,
    lastLoginAt: '2024-02-18T16:45:00.000Z',
    deviceInfo: {
      platform: 'iOS',
      version: '17.2',
      deviceId: 'device654'
    }
  },
  {
    id: '6',
    email: 'sarah.lin@example.com',
    name: '林詩涵',
    genderType: UserGenderType.Female,
    partnerType: PartnerType.Cat,
    mapWarningIconType: MapWarningIconType.AngryPoop,
    status: UserStatus.Verified,
    isDeleted: false,
    createdAt: '2024-01-28T00:00:00.000Z',
    updatedAt: '2024-02-19T00:00:00.000Z',
    loginMethod: 'line',
    commentCount: 23,
    reportCount: 0,
    lastLoginAt: '2024-02-19T11:30:00.000Z',
    deviceInfo: {
      platform: 'Android',
      version: '14',
      deviceId: 'device987'
    }
  }
]

// 輔助函數：根據篩選條件取得用戶
export const getFilteredUsers = (filters?: {
  search?: string
  status?: UserStatus | null
  page?: number
  limit?: number
}) => {
  let filteredUsers = [...mockUsers]

  if (filters) {
    // 搜尋篩選
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.loginMethod?.toLowerCase().includes(searchLower)
      )
    }

    // 狀態篩選
    if (filters.status !== null && filters.status !== undefined) {
      filteredUsers = filteredUsers.filter(user => user.status === filters.status)
    }
  }

  // 分頁
  const page = filters?.page || 1
  const limit = filters?.limit || 10
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  return {
    data: paginatedUsers,
    pagination: {
      page,
      limit,
      total: filteredUsers.length,
      totalPages: Math.ceil(filteredUsers.length / limit)
    }
  }
}