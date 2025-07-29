import { VenueApplication, VenueCategoryType, VenueApprovalStatus, UserStatus, UserGenderType, PartnerType, MapWarningIconType } from '@/types'

export const mockVenueApplications: VenueApplication[] = [
  {
    id: 'APP001',
    name: '寵物友善餐廳 - 毛小孩樂園',
    address: '台北市大安區忠孝東路四段123號',
    cityCode: 'TPE',
    districtCode: 'DA',
    petFriendlyLevel: 5,
    categoryType: VenueCategoryType.Restaurant,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: '2025-01-28T00:00:00.000Z',
    createdBy: 'user123',
    applicantUser: {
      id: 'user123',
      name: '王小明',
      email: 'wang@example.com',
      loginMethod: 'google',
      deviceInfo: {
        platform: 'iOS',
        version: '17.0',
        deviceId: 'device123'
      },
      status: UserStatus.Verified,
      genderType: UserGenderType.Male,
      partnerType: PartnerType.Dog,
      mapWarningIconType: MapWarningIconType.AngryPoop,
      bio: '寵物愛好者',
      reportCount: 0,
      isSuspended: false,
      isDeleted: false,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      commentCount: 15
    }
  },
  {
    id: 'APP002',
    name: '汪喵寵物醫院 - 24小時急診',
    address: '台北市信義區信義路五段789號',
    cityCode: 'TPE',
    districtCode: 'XY',
    petFriendlyLevel: 5,
    categoryType: VenueCategoryType.Hospital,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: '2025-01-27T00:00:00.000Z',
    createdBy: 'user456',
    applicantUser: {
      id: 'user456',
      name: '李美華',
      email: 'lee@example.com',
      loginMethod: 'email',
      deviceInfo: {
        platform: 'Android',
        version: '14',
        deviceId: 'device456'
      },
      status: UserStatus.Verified,
      genderType: UserGenderType.Female,
      partnerType: PartnerType.Cat,
      mapWarningIconType: MapWarningIconType.SurprisedPoop,
      bio: '專業獸醫師',
      reportCount: 0,
      isSuspended: false,
      isDeleted: false,
      createdAt: '2023-12-01T00:00:00.000Z',
      updatedAt: '2023-12-01T00:00:00.000Z',
      commentCount: 23
    }
  },
  {
    id: 'APP003',
    name: '毛茸茸寵物美容沙龍',
    address: '台北市松山區南京東路三段256號',
    cityCode: 'TPE',
    districtCode: 'SS',
    petFriendlyLevel: 5,
    categoryType: VenueCategoryType.Beauty,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: '2025-01-26T00:00:00.000Z',
    createdBy: 'user789',
    applicantUser: {
      id: 'user789',
      name: '張雅婷',
      email: 'zhang@example.com',
      loginMethod: 'line',
      deviceInfo: {
        platform: 'iOS',
        version: '17.2',
        deviceId: 'device789'
      },
      status: UserStatus.Verified,
      genderType: UserGenderType.Female,
      partnerType: PartnerType.Cat,
      mapWarningIconType: MapWarningIconType.AngryPoop,
      bio: '國際寵物美容師認證',
      reportCount: 0,
      isSuspended: false,
      isDeleted: false,
      createdAt: '2024-06-15T00:00:00.000Z',
      updatedAt: '2024-06-15T00:00:00.000Z',
      commentCount: 42
    }
  },
  {
    id: 'APP004',
    name: '汪星人度假旅館',
    address: '新北市板橋區文化路二段458號',
    cityCode: 'NTC',
    districtCode: 'BQ',
    petFriendlyLevel: 5,
    categoryType: VenueCategoryType.Hotel,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: '2025-01-25T00:00:00.000Z',
    createdBy: 'user321',
    applicantUser: {
      id: 'user321',
      name: '陳建宏',
      email: 'chen@example.com',
      loginMethod: 'google',
      deviceInfo: {
        platform: 'Android',
        version: '13',
        deviceId: 'device321'
      },
      status: UserStatus.Verified,
      genderType: UserGenderType.Male,
      partnerType: PartnerType.Dog,
      mapWarningIconType: MapWarningIconType.SurprisedPoop,
      bio: '專業寵物照護',
      reportCount: 0,
      isSuspended: false,
      isDeleted: false,
      createdAt: '2024-03-20T00:00:00.000Z',
      updatedAt: '2024-03-20T00:00:00.000Z',
      commentCount: 8
    }
  },
  {
    id: 'APP005',
    name: '貓咪咖啡廳 - 喵喵森林',
    address: '台北市中山區民生東路二段88號',
    cityCode: 'TPE',
    districtCode: 'ZS',
    petFriendlyLevel: 4,
    categoryType: VenueCategoryType.Restaurant,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: '2025-01-24T00:00:00.000Z',
    createdBy: 'user654',
    applicantUser: {
      id: 'user654',
      name: '林怡君',
      email: 'lin@example.com',
      loginMethod: 'facebook',
      deviceInfo: {
        platform: 'iOS',
        version: '16.5',
        deviceId: 'device654'
      },
      status: UserStatus.Verified,
      genderType: UserGenderType.Female,
      partnerType: PartnerType.Cat,
      mapWarningIconType: MapWarningIconType.AngryPoop,
      bio: '貓奴一枚',
      reportCount: 0,
      isSuspended: false,
      isDeleted: false,
      createdAt: '2024-08-10T00:00:00.000Z',
      updatedAt: '2024-08-10T00:00:00.000Z',
      commentCount: 35
    }
  },
  {
    id: 'APP006',
    name: '寵愛動物醫院',
    address: '台中市西區台灣大道二段309號',
    cityCode: 'TXG',
    districtCode: 'XQ',
    petFriendlyLevel: 5,
    categoryType: VenueCategoryType.Hospital,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: '2025-01-23T00:00:00.000Z',
    createdBy: 'user987',
    applicantUser: {
      id: 'user987',
      name: '黃志明',
      email: 'huang@example.com',
      loginMethod: 'email',
      deviceInfo: {
        platform: 'Android',
        version: '14',
        deviceId: 'device987'
      },
      status: UserStatus.Verified,
      genderType: UserGenderType.Male,
      partnerType: PartnerType.Dog,
      mapWarningIconType: MapWarningIconType.SurprisedPoop,
      bio: '獸醫師執業20年',
      reportCount: 0,
      isSuspended: false,
      isDeleted: false,
      createdAt: '2023-11-05T00:00:00.000Z',
      updatedAt: '2023-11-05T00:00:00.000Z',
      commentCount: 67
    }
  }
]

// 取得待審核申請（可篩選）
export const getPendingApplications = (filters?: {
  search?: string
  categoryType?: VenueCategoryType
  page?: number
  limit?: number
}) => {
  let filteredApplications = [...mockVenueApplications]

  // 過濾邏輯
  if (filters) {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredApplications = filteredApplications.filter(app =>
        app.name.toLowerCase().includes(searchLower) ||
        app.address.toLowerCase().includes(searchLower) ||
        app.applicantUser?.name?.toLowerCase().includes(searchLower) ||
        app.applicantUser?.email?.toLowerCase().includes(searchLower)
      )
    }

    if (filters.categoryType !== undefined) {
      filteredApplications = filteredApplications.filter(app => app.categoryType === filters.categoryType)
    }
  }

  // 只返回待審核的申請
  filteredApplications = filteredApplications.filter(app => app.approvalStatus === VenueApprovalStatus.Pending)

  // 分頁
  const page = filters?.page || 1
  const limit = filters?.limit || 10
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedApplications = filteredApplications.slice(startIndex, endIndex)

  return {
    data: paginatedApplications,
    pagination: {
      page,
      limit,
      total: filteredApplications.length,
      totalPages: Math.ceil(filteredApplications.length / limit)
    }
  }
}