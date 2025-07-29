import { Venue, VenueCategoryType, VenueApprovalStatus, VenueOpeningHour } from '@/types'

// 營業時間假資料生成器
const generateOpeningHours = (venueId: string): VenueOpeningHour[] => {
  const baseHours = [
    { dayOfWeek: 0, openTime: '10:00', closeTime: '21:00', isClosed: false }, // 週日
    { dayOfWeek: 1, openTime: '09:00', closeTime: '22:00', isClosed: false }, // 週一
    { dayOfWeek: 2, openTime: '09:00', closeTime: '22:00', isClosed: false }, // 週二
    { dayOfWeek: 3, openTime: '09:00', closeTime: '22:00', isClosed: false }, // 週三
    { dayOfWeek: 4, openTime: '09:00', closeTime: '22:00', isClosed: false }, // 週四
    { dayOfWeek: 5, openTime: '09:00', closeTime: '23:00', isClosed: false }, // 週五
    { dayOfWeek: 6, openTime: '10:00', closeTime: '23:00', isClosed: false }, // 週六
  ]

  return baseHours.map((hour, index) => ({
    id: index + 1,
    venueId,
    ...hour,
    isDeleted: false,
    createdAt: '2024-01-01T00:00:00.000Z',
    createdBy: 'admin',
    updatedAt: '2024-01-01T00:00:00.000Z',
    updatedBy: 'admin'
  }))
}

export const mockVenues: Venue[] = [
  {
    id: 'VEN001',
    name: '毛孩友善咖啡廳',
    categoryType: VenueCategoryType.Restaurant,
    address: '台北市大安區忠孝東路四段181巷40弄20號',
    latitude: 25.0418679,
    longitude: 121.5533012,
    phone: '02-2778-1234',
    website: 'https://pet-cafe-taipei.com',
    description: '專為寵物家庭打造的溫馨咖啡廳，提供寵物專用餐點和遊戲區。店內設有寵物洗腳區、飲水設施，並定期舉辦寵物聚會活動。',
    approvalStatus: VenueApprovalStatus.Approved,
    approvedAt: '2024-01-15T00:00:00.000Z',
    approvedBy: 'admin',
    isDeleted: false,
    createdAt: '2024-01-10T00:00:00.000Z',
    createdBy: 'user123',
    updatedAt: '2024-01-15T00:00:00.000Z',
    updatedBy: 'admin',
    openingHours: generateOpeningHours('VEN001')
  },
  {
    id: 'VEN002',
    name: '汪汪動物醫院',
    categoryType: VenueCategoryType.Hospital,
    address: '台北市信義區基隆路一段155號',
    latitude: 25.0339687,
    longitude: 121.5644722,
    phone: '02-2345-6789',
    website: 'https://wangwang-vet.com.tw',
    description: '24小時急診服務，專業醫療團隊，設備齊全。提供內外科、預防醫學、牙科、眼科等完整醫療服務。',
    approvalStatus: VenueApprovalStatus.Approved,
    approvedAt: '2024-01-05T00:00:00.000Z',
    approvedBy: 'admin',
    isDeleted: false,
    createdAt: '2024-01-01T00:00:00.000Z',
    createdBy: 'user456',
    updatedAt: '2024-01-05T00:00:00.000Z',
    updatedBy: 'admin',
    openingHours: [
      ...Array.from({ length: 7 }, (_, i) => ({
        id: i + 1,
        venueId: 'VEN002',
        dayOfWeek: i,
        openTime: '00:00',
        closeTime: '23:59',
        isClosed: false,
        isDeleted: false,
        createdAt: '2024-01-01T00:00:00.000Z',
        createdBy: 'admin',
        updatedAt: '2024-01-01T00:00:00.000Z',
        updatedBy: 'admin'
      }))
    ]
  },
  {
    id: 'VEN003',
    name: '寵愛美容沙龍',
    categoryType: VenueCategoryType.Beauty,
    address: '台北市松山區民生東路五段69巷2弄5號',
    latitude: 25.0589928,
    longitude: 121.5644886,
    phone: '02-2767-3456',
    website: 'https://pet-beauty-salon.tw',
    description: '專業寵物美容服務，包含洗澡、剪毛、SPA、指甲修剪等。使用天然無毒美容產品，溫柔對待每一位毛孩。',
    approvalStatus: VenueApprovalStatus.Approved,
    approvedAt: '2024-02-01T00:00:00.000Z',
    approvedBy: 'admin',
    isDeleted: false,
    createdAt: '2024-01-28T00:00:00.000Z',
    createdBy: 'user789',
    updatedAt: '2024-02-01T00:00:00.000Z',
    updatedBy: 'admin',
    openingHours: [
      ...Array.from({ length: 7 }, (_, i) => ({
        id: i + 1,
        venueId: 'VEN003',
        dayOfWeek: i,
        openTime: i === 1 ? undefined : '10:00', // 週一公休
        closeTime: i === 1 ? undefined : '19:00',
        isClosed: i === 1,
        isDeleted: false,
        createdAt: '2024-01-28T00:00:00.000Z',
        createdBy: 'admin',
        updatedAt: '2024-01-28T00:00:00.000Z',
        updatedBy: 'admin'
      }))
    ]
  },
  {
    id: 'VEN004',
    name: '悠活寵物旅館',
    categoryType: VenueCategoryType.Hotel,
    address: '新北市板橋區文化路二段182巷3弄10號',
    latitude: 25.0170747,
    longitude: 121.4635815,
    phone: '02-2968-7890',
    website: 'https://yoho-pet-hotel.com',
    description: '五星級寵物住宿服務，24小時監控照護，獨立套房設計，每日戶外活動時間。提供接送服務。',
    approvalStatus: VenueApprovalStatus.Approved,
    approvedAt: '2024-01-20T00:00:00.000Z',
    approvedBy: 'admin',
    isDeleted: false,
    createdAt: '2024-01-18T00:00:00.000Z',
    createdBy: 'user321',
    updatedAt: '2024-01-20T00:00:00.000Z',
    updatedBy: 'admin',
    openingHours: generateOpeningHours('VEN004')
  },
  {
    id: 'VEN005',
    name: '狗狗樂園餐廳',
    categoryType: VenueCategoryType.Restaurant,
    address: '台北市內湖區瑞光路513巷22弄5號',
    latitude: 25.0794486,
    longitude: 121.5690786,
    phone: '02-8797-6543',
    website: '',
    description: '大型犬友善餐廳，設有室內外活動空間，提供人寵共食餐點。每週末有寵物訓練課程。',
    approvalStatus: VenueApprovalStatus.Pending,
    approvedAt: undefined,
    approvedBy: undefined,
    isDeleted: false,
    createdAt: '2024-03-01T00:00:00.000Z',
    createdBy: 'user654',
    updatedAt: '2024-03-01T00:00:00.000Z',
    updatedBy: 'user654',
    openingHours: generateOpeningHours('VEN005')
  },
  {
    id: 'VEN006',
    name: '貓咪專科醫院',
    categoryType: VenueCategoryType.Hospital,
    address: '台北市中山區民權東路三段35號',
    latitude: 25.0625935,
    longitude: 121.5438402,
    phone: '02-2515-2222',
    website: 'https://cat-specialist.tw',
    description: '專門診治貓咪的動物醫院，醫師團隊皆具備貓科專業認證。診間設計考量貓咪習性，降低就醫壓力。',
    approvalStatus: VenueApprovalStatus.Approved,
    approvedAt: '2024-02-15T00:00:00.000Z',
    approvedBy: 'admin',
    isDeleted: false,
    createdAt: '2024-02-10T00:00:00.000Z',
    createdBy: 'user987',
    updatedAt: '2024-02-15T00:00:00.000Z',
    updatedBy: 'admin',
    openingHours: [
      ...Array.from({ length: 7 }, (_, i) => ({
        id: i + 1,
        venueId: 'VEN006',
        dayOfWeek: i,
        openTime: i === 0 || i === 6 ? '09:00' : '10:00', // 週末早開
        closeTime: i === 0 || i === 6 ? '17:00' : '21:00', // 週末早關
        isClosed: false,
        isDeleted: false,
        createdAt: '2024-02-10T00:00:00.000Z',
        createdBy: 'admin',
        updatedAt: '2024-02-10T00:00:00.000Z',
        updatedBy: 'admin'
      }))
    ]
  },
  {
    id: 'VEN007',
    name: '寵物造型工作室',
    categoryType: VenueCategoryType.Beauty,
    address: '台中市西區民權路217號',
    latitude: 24.1404966,
    longitude: 120.6650867,
    phone: '04-2301-8888',
    website: '',
    description: '創意寵物造型設計，參加比賽專業造型，日韓風格修剪。需提前預約。',
    approvalStatus: VenueApprovalStatus.Rejected,
    approvedAt: '2024-02-20T00:00:00.000Z',
    approvedBy: 'admin',
    rejectionReason: '營業執照已過期，請更新後重新申請',
    isDeleted: false,
    createdAt: '2024-02-18T00:00:00.000Z',
    createdBy: 'user111',
    updatedAt: '2024-02-20T00:00:00.000Z',
    updatedBy: 'admin',
    openingHours: generateOpeningHours('VEN007')
  },
  {
    id: 'VEN008',
    name: '毛小孩度假村',
    categoryType: VenueCategoryType.Hotel,
    address: '宜蘭縣礁溪鄉玉龍路二段406號',
    latitude: 24.8316649,
    longitude: 121.7689435,
    phone: '03-988-5555',
    website: 'https://pet-resort.com.tw',
    description: '佔地3000坪的寵物度假村，設有游泳池、草地運動場、室內遊戲室。提供寵物訓練、美容、安親等服務。',
    approvalStatus: VenueApprovalStatus.Approved,
    approvedAt: '2024-01-25T00:00:00.000Z',
    approvedBy: 'admin',
    isDeleted: false,
    createdAt: '2024-01-22T00:00:00.000Z',
    createdBy: 'user222',
    updatedAt: '2024-01-25T00:00:00.000Z',
    updatedBy: 'admin',
    openingHours: generateOpeningHours('VEN008')
  },
  {
    id: 'VEN009',
    name: 'Paw Paw 寵物友善餐酒館',
    categoryType: VenueCategoryType.Restaurant,
    address: '台北市大同區赤峰街47巷16號',
    latitude: 25.0538171,
    longitude: 121.5194909,
    phone: '02-2558-9999',
    website: 'https://pawpaw-bistro.com',
    description: '結合餐酒館與寵物友善空間，晚上提供調酒服務。每月舉辦寵物主題派對。',
    approvalStatus: VenueApprovalStatus.Approved,
    approvedAt: '2024-03-05T00:00:00.000Z',
    approvedBy: 'admin',
    isDeleted: false,
    createdAt: '2024-03-02T00:00:00.000Z',
    createdBy: 'user333',
    updatedAt: '2024-03-05T00:00:00.000Z',
    updatedBy: 'admin',
    openingHours: [
      ...Array.from({ length: 7 }, (_, i) => ({
        id: i + 1,
        venueId: 'VEN009',
        dayOfWeek: i,
        openTime: '12:00',
        closeTime: i >= 4 ? '02:00' : '00:00', // 週五六營業到凌晨2點
        isClosed: i === 1, // 週一公休
        isDeleted: false,
        createdAt: '2024-03-02T00:00:00.000Z',
        createdBy: 'admin',
        updatedAt: '2024-03-02T00:00:00.000Z',
        updatedBy: 'admin'
      }))
    ]
  },
  {
    id: 'VEN010',
    name: '愛心動物醫院（已歇業）',
    categoryType: VenueCategoryType.Hospital,
    address: '高雄市左營區博愛二路638號',
    latitude: 22.6739706,
    longitude: 120.3099673,
    phone: '07-556-1234',
    website: '',
    description: '提供完整的寵物醫療服務',
    approvalStatus: VenueApprovalStatus.Approved,
    approvedAt: '2023-06-01T00:00:00.000Z',
    approvedBy: 'admin',
    isDeleted: true, // 已刪除/歇業
    createdAt: '2023-05-28T00:00:00.000Z',
    createdBy: 'user444',
    updatedAt: '2024-02-28T00:00:00.000Z',
    updatedBy: 'admin',
    openingHours: generateOpeningHours('VEN010')
  }
]

// 取得店家列表（可過濾）
export const getVenues = (filters?: {
  search?: string
  categoryType?: VenueCategoryType
  approvalStatus?: VenueApprovalStatus
  isDeleted?: boolean
  page?: number
  limit?: number
}) => {
  let filteredVenues = [...mockVenues]

  // 過濾邏輯
  if (filters) {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredVenues = filteredVenues.filter(venue =>
        venue.name.toLowerCase().includes(searchLower) ||
        venue.address.toLowerCase().includes(searchLower) ||
        venue.description?.toLowerCase().includes(searchLower)
      )
    }

    if (filters.categoryType !== undefined) {
      filteredVenues = filteredVenues.filter(venue => venue.categoryType === filters.categoryType)
    }

    if (filters.approvalStatus !== undefined) {
      filteredVenues = filteredVenues.filter(venue => venue.approvalStatus === filters.approvalStatus)
    }

    if (filters.isDeleted !== undefined) {
      filteredVenues = filteredVenues.filter(venue => venue.isDeleted === filters.isDeleted)
    }
  }

  // 分頁
  const page = filters?.page || 1
  const limit = filters?.limit || 10
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedVenues = filteredVenues.slice(startIndex, endIndex)

  return {
    data: paginatedVenues,
    pagination: {
      page,
      limit,
      total: filteredVenues.length,
      totalPages: Math.ceil(filteredVenues.length / limit)
    }
  }
}

// 取得單一店家
export const getVenueById = (id: string): Venue | undefined => {
  return mockVenues.find(venue => venue.id === id)
}

// 更新店家
export const updateVenue = (id: string, updates: Partial<Venue>): Venue | undefined => {
  const index = mockVenues.findIndex(venue => venue.id === id)
  if (index === -1) return undefined

  mockVenues[index] = {
    ...mockVenues[index],
    ...updates,
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin'
  }

  return mockVenues[index]
}

// 刪除店家（軟刪除）
export const deleteVenue = (id: string): boolean => {
  const index = mockVenues.findIndex(venue => venue.id === id)
  if (index === -1) return false

  mockVenues[index] = {
    ...mockVenues[index],
    isDeleted: true,
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin'
  }

  return true
}