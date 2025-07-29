import { VenueApplication, VenueCategoryType, VenueApprovalStatus, UserStatus, UserGenderType, PartnerType, MapWarningIconType, PetFriendlyLevel } from '@/types'

export const mockVenueApplications: VenueApplication[] = [
  {
    id: 'APP001',
    name: '寵物友善餐廳 - 毛小孩樂園',
    address: '台北市大安區忠孝東路四段123號',
    cityCode: 'TPE',
    districtCode: 'DA',
    petFriendlyLevel: PetFriendlyLevel.High,
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
    petFriendlyLevel: PetFriendlyLevel.High,
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
    petFriendlyLevel: PetFriendlyLevel.High,
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
    petFriendlyLevel: PetFriendlyLevel.High,
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
    petFriendlyLevel: PetFriendlyLevel.Medium,
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
    petFriendlyLevel: PetFriendlyLevel.High,
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
  },
  // 新增更多測試資料以展示分頁功能
  {
    id: 'APP007',
    name: '毛孩樂園寵物美容',
    address: '新北市中和區中山路二段515號',
    cityCode: 'NTC',
    districtCode: 'ZH',
    petFriendlyLevel: PetFriendlyLevel.High,
    categoryType: VenueCategoryType.Beauty,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: '2025-01-22T00:00:00.000Z',
    createdBy: 'user111',
    applicantUser: {
      id: 'user111',
      name: '吳美玲',
      email: 'wu@example.com',
      loginMethod: 'google',
      deviceInfo: {
        platform: 'iOS',
        version: '17.0',
        deviceId: 'device111'
      },
      status: UserStatus.Verified,
      genderType: UserGenderType.Female,
      partnerType: PartnerType.Cat,
      mapWarningIconType: MapWarningIconType.AngryPoop,
      bio: '專業寵物美容師',
      reportCount: 0,
      isSuspended: false,
      isDeleted: false,
      createdAt: '2024-02-15T00:00:00.000Z',
      updatedAt: '2024-02-15T00:00:00.000Z',
      commentCount: 28
    }
  },
  {
    id: 'APP008',
    name: '寵物天堂餐廳',
    address: '高雄市左營區博愛二路366號',
    cityCode: 'KHH',
    districtCode: 'ZY',
    petFriendlyLevel: PetFriendlyLevel.Medium,
    categoryType: VenueCategoryType.Restaurant,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: '2025-01-21T00:00:00.000Z',
    createdBy: 'user222',
    applicantUser: {
      id: 'user222',
      name: '許文彬',
      email: 'xu@example.com',
      loginMethod: 'line',
      deviceInfo: {
        platform: 'Android',
        version: '13',
        deviceId: 'device222'
      },
      status: UserStatus.Verified,
      genderType: UserGenderType.Male,
      partnerType: PartnerType.Dog,
      mapWarningIconType: MapWarningIconType.SurprisedPoop,
      bio: '餐廳經營者',
      reportCount: 0,
      isSuspended: false,
      isDeleted: false,
      createdAt: '2024-05-20T00:00:00.000Z',
      updatedAt: '2024-05-20T00:00:00.000Z',
      commentCount: 19
    }
  },
  {
    id: 'APP009',
    name: '五星級寵物旅館',
    address: '台南市東區中華東路三段336號',
    cityCode: 'TNN',
    districtCode: 'DQ',
    petFriendlyLevel: PetFriendlyLevel.High,
    categoryType: VenueCategoryType.Hotel,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: '2025-01-20T00:00:00.000Z',
    createdBy: 'user333',
    applicantUser: {
      id: 'user333',
      name: '楊雅琪',
      email: 'yang@example.com',
      loginMethod: 'email',
      deviceInfo: {
        platform: 'iOS',
        version: '16.5',
        deviceId: 'device333'
      },
      status: UserStatus.Verified,
      genderType: UserGenderType.Female,
      partnerType: PartnerType.Cat,
      mapWarningIconType: MapWarningIconType.AngryPoop,
      bio: '寵物旅館經營者',
      reportCount: 0,
      isSuspended: false,
      isDeleted: false,
      createdAt: '2024-07-10T00:00:00.000Z',
      updatedAt: '2024-07-10T00:00:00.000Z',
      commentCount: 45
    }
  },
  {
    id: 'APP010',
    name: '愛心動物醫院',
    address: '桃園市中壢區中山路128號',
    cityCode: 'TYC',
    districtCode: 'ZL',
    petFriendlyLevel: PetFriendlyLevel.High,
    categoryType: VenueCategoryType.Hospital,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: '2025-01-19T00:00:00.000Z',
    createdBy: 'user444',
    applicantUser: {
      id: 'user444',
      name: '賴明德',
      email: 'lai@example.com',
      loginMethod: 'google',
      deviceInfo: {
        platform: 'Android',
        version: '14',
        deviceId: 'device444'
      },
      status: UserStatus.Verified,
      genderType: UserGenderType.Male,
      partnerType: PartnerType.Dog,
      mapWarningIconType: MapWarningIconType.SurprisedPoop,
      bio: '獸醫師',
      reportCount: 0,
      isSuspended: false,
      isDeleted: false,
      createdAt: '2024-04-25T00:00:00.000Z',
      updatedAt: '2024-04-25T00:00:00.000Z',
      commentCount: 52
    }
  },
  {
    id: 'APP011',
    name: '狗狗運動公園餐廳',
    address: '新竹市東區光復路一段89號',
    cityCode: 'HSC',
    districtCode: 'DQ',
    petFriendlyLevel: PetFriendlyLevel.High,
    categoryType: VenueCategoryType.Restaurant,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: '2025-01-18T00:00:00.000Z',
    createdBy: 'user555',
    applicantUser: {
      id: 'user555',
      name: '鄭芳婷',
      email: 'zheng@example.com',
      loginMethod: 'facebook',
      deviceInfo: {
        platform: 'iOS',
        version: '17.1',
        deviceId: 'device555'
      },
      status: UserStatus.Verified,
      genderType: UserGenderType.Female,
      partnerType: PartnerType.Dog,
      mapWarningIconType: MapWarningIconType.AngryPoop,
      bio: '愛狗人士',
      reportCount: 0,
      isSuspended: false,
      isDeleted: false,
      createdAt: '2024-09-15T00:00:00.000Z',
      updatedAt: '2024-09-15T00:00:00.000Z',
      commentCount: 31
    }
  },
  {
    id: 'APP012',
    name: '寵物SPA美容會館',
    address: '台北市內湖區民權東路六段123號',
    cityCode: 'TPE',
    districtCode: 'NH',
    petFriendlyLevel: PetFriendlyLevel.Medium,
    categoryType: VenueCategoryType.Beauty,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: '2025-01-17T00:00:00.000Z',
    createdBy: 'user666',
    applicantUser: {
      id: 'user666',
      name: '謝佳樺',
      email: 'xie@example.com',
      loginMethod: 'line',
      deviceInfo: {
        platform: 'Android',
        version: '13',
        deviceId: 'device666'
      },
      status: UserStatus.Verified,
      genderType: UserGenderType.Female,
      partnerType: PartnerType.Cat,
      mapWarningIconType: MapWarningIconType.SurprisedPoop,
      bio: '寵物美容專家',
      reportCount: 0,
      isSuspended: false,
      isDeleted: false,
      createdAt: '2024-10-20T00:00:00.000Z',
      updatedAt: '2024-10-20T00:00:00.000Z',
      commentCount: 26
    }
  },
  {
    id: 'APP013',
    name: '毛小孩度假村',
    address: '宜蘭縣礁溪鄉德陽路156號',
    cityCode: 'ILN',
    districtCode: 'JX',
    petFriendlyLevel: PetFriendlyLevel.High,
    categoryType: VenueCategoryType.Hotel,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: '2025-01-16T00:00:00.000Z',
    createdBy: 'user777',
    applicantUser: {
      id: 'user777',
      name: '洪志豪',
      email: 'hong@example.com',
      loginMethod: 'email',
      deviceInfo: {
        platform: 'iOS',
        version: '16.3',
        deviceId: 'device777'
      },
      status: UserStatus.Verified,
      genderType: UserGenderType.Male,
      partnerType: PartnerType.Dog,
      mapWarningIconType: MapWarningIconType.AngryPoop,
      bio: '度假村經營者',
      reportCount: 0,
      isSuspended: false,
      isDeleted: false,
      createdAt: '2024-11-15T00:00:00.000Z',
      updatedAt: '2024-11-15T00:00:00.000Z',
      commentCount: 38
    }
  },
  {
    id: 'APP014',
    name: '寵物友善咖啡廳',
    address: '台中市北區進化北路369號',
    cityCode: 'TXG',
    districtCode: 'BQ',
    petFriendlyLevel: PetFriendlyLevel.Low,
    categoryType: VenueCategoryType.Restaurant,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: '2025-01-15T00:00:00.000Z',
    createdBy: 'user888',
    applicantUser: {
      id: 'user888',
      name: '江美惠',
      email: 'jiang@example.com',
      loginMethod: 'google',
      deviceInfo: {
        platform: 'Android',
        version: '14',
        deviceId: 'device888'
      },
      status: UserStatus.Verified,
      genderType: UserGenderType.Female,
      partnerType: PartnerType.Cat,
      mapWarningIconType: MapWarningIconType.SurprisedPoop,
      bio: '咖啡愛好者',
      reportCount: 0,
      isSuspended: false,
      isDeleted: false,
      createdAt: '2024-12-10T00:00:00.000Z',
      updatedAt: '2024-12-10T00:00:00.000Z',
      commentCount: 22
    }
  },
  {
    id: 'APP015',
    name: '快樂寵物醫院',
    address: '高雄市三民區建工路415號',
    cityCode: 'KHH',
    districtCode: 'SM',
    petFriendlyLevel: PetFriendlyLevel.High,
    categoryType: VenueCategoryType.Hospital,
    approvalStatus: VenueApprovalStatus.Pending,
    createdAt: '2025-01-14T00:00:00.000Z',
    createdBy: 'user999',
    applicantUser: {
      id: 'user999',
      name: '蔡宗翰',
      email: 'tsai@example.com',
      loginMethod: 'line',
      deviceInfo: {
        platform: 'iOS',
        version: '17.2',
        deviceId: 'device999'
      },
      status: UserStatus.Verified,
      genderType: UserGenderType.Male,
      partnerType: PartnerType.Dog,
      mapWarningIconType: MapWarningIconType.AngryPoop,
      bio: '資深獸醫師',
      reportCount: 0,
      isSuspended: false,
      isDeleted: false,
      createdAt: '2024-01-20T00:00:00.000Z',
      updatedAt: '2024-01-20T00:00:00.000Z',
      commentCount: 73
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