import { Comment, PetFriendlyLevel, FeedbackType, VenueCategoryType } from '@/types'
import { PaginatedResponse } from '@/types'
import { mockVenues as venues } from './venues.mock'
import { mockUsers as users } from './users.mock'

// 評論假資料
export const comments: Comment[] = [
  {
    id: 'comment_1',
    userId: 'user_1',
    user: users[0],
    venueId: 'venue_1',
    venue: venues[0],
    petId: 1,
    content: '這家咖啡廳真的很適合帶毛小孩來！店員超級親切，還準備了寵物專用的小點心。環境也很乾淨，有專門的寵物活動區域。',
    petFriendlyLevel: PetFriendlyLevel.High,
    feedbackType: FeedbackType.Paw,
    rating: 5,
    isDeleted: false,
    createdAt: '2024-01-15T10:30:00Z',
    createdBy: 'user_1',
    updatedAt: '2024-01-15T10:30:00Z',
    updatedBy: 'user_1',
    files: [
      {
        id: 1,
        commentId: 'comment_1',
        fileId: 'file_1',
        file: {
          id: 'file_1',
          name: 'cafe-pet-area.jpg',
          type: 'image/jpeg',
          size: 2048576,
          s3Bucket: 'pettalk-images',
          s3Key: 'comments/comment_1/cafe-pet-area.jpg',
          uploadDate: '2024-01-15T10:30:00Z',
          uploadedBy: 'user_1',
          filePurpose: 3, // CommentImage
          isDeleted: false,
          createdAt: '2024-01-15T10:30:00Z',
          createdBy: 'user_1',
          updatedAt: '2024-01-15T10:30:00Z',
          updatedBy: 'user_1'
        },
        sortOrder: 1,
        isDeleted: false,
        createdAt: '2024-01-15T10:30:00Z',
        createdBy: 'user_1',
        updatedAt: '2024-01-15T10:30:00Z',
        updatedBy: 'user_1'
      },
      {
        id: 2,
        commentId: 'comment_1',
        fileId: 'file_2',
        file: {
          id: 'file_2',
          name: 'pet-treats.jpg',
          type: 'image/jpeg',
          size: 1536000,
          s3Bucket: 'pettalk-images',
          s3Key: 'comments/comment_1/pet-treats.jpg',
          uploadDate: '2024-01-15T10:31:00Z',
          uploadedBy: 'user_1',
          filePurpose: 3, // CommentImage
          isDeleted: false,
          createdAt: '2024-01-15T10:31:00Z',
          createdBy: 'user_1',
          updatedAt: '2024-01-15T10:31:00Z',
          updatedBy: 'user_1'
        },
        sortOrder: 2,
        isDeleted: false,
        createdAt: '2024-01-15T10:31:00Z',
        createdBy: 'user_1',
        updatedAt: '2024-01-15T10:31:00Z',
        updatedBy: 'user_1'
      }
    ]
  },
  {
    id: 'comment_2',
    userId: 'user_2',
    user: users[1],
    venueId: 'venue_2',
    venue: venues[1],
    petId: 2,
    content: '空間太小了，帶大型犬不太方便。而且沒有提供寵物用水碗，需要自己準備。',
    petFriendlyLevel: PetFriendlyLevel.Low,
    feedbackType: FeedbackType.Poop,
    rating: 2,
    isDeleted: false,
    createdAt: '2024-01-14T15:45:00Z',
    createdBy: 'user_2',
    updatedAt: '2024-01-14T15:45:00Z',
    updatedBy: 'user_2'
  },
  {
    id: 'comment_3',
    userId: 'user_3',
    user: users[2],
    venueId: 'venue_3',
    venue: venues[2],
    petId: 3,
    content: '醫生很專業，解釋病情很詳細。但是等待時間有點長，建議先預約。',
    petFriendlyLevel: PetFriendlyLevel.High,
    feedbackType: FeedbackType.Paw,
    rating: 4,
    isDeleted: false,
    createdAt: '2024-01-13T09:20:00Z',
    createdBy: 'user_3',
    updatedAt: '2024-01-13T09:20:00Z',
    updatedBy: 'user_3'
  },
  {
    id: 'comment_4',
    userId: 'user_4',
    user: users[3],
    venueId: 'venue_4',
    venue: venues[3],
    petId: 4,
    content: '美容師技術很好，我家貓咪剪完毛很漂亮。價格也合理，推薦！',
    petFriendlyLevel: PetFriendlyLevel.High,
    feedbackType: FeedbackType.Paw,
    rating: 5,
    isDeleted: false,
    createdAt: '2024-01-12T14:00:00Z',
    createdBy: 'user_4',
    updatedAt: '2024-01-12T14:00:00Z',
    updatedBy: 'user_4',
    files: [
      {
        id: 3,
        commentId: 'comment_4',
        fileId: 'file_3',
        file: {
          id: 'file_3',
          name: 'cat-grooming-result.jpg',
          type: 'image/jpeg',
          size: 1875000,
          s3Bucket: 'pettalk-images',
          s3Key: 'comments/comment_4/cat-grooming-result.jpg',
          uploadDate: '2024-01-12T14:00:00Z',
          uploadedBy: 'user_4',
          filePurpose: 3, // CommentImage
          isDeleted: false,
          createdAt: '2024-01-12T14:00:00Z',
          createdBy: 'user_4',
          updatedAt: '2024-01-12T14:00:00Z',
          updatedBy: 'user_4'
        },
        sortOrder: 1,
        isDeleted: false,
        createdAt: '2024-01-12T14:00:00Z',
        createdBy: 'user_4',
        updatedAt: '2024-01-12T14:00:00Z',
        updatedBy: 'user_4'
      }
    ]
  },
  {
    id: 'comment_5',
    userId: 'user_5',
    user: users[4],
    venueId: 'venue_5',
    venue: venues[4],
    petId: 5,
    content: '房間很大，寵物可以自由活動。但是隔音不太好，晚上會聽到其他房間的狗叫聲。',
    petFriendlyLevel: PetFriendlyLevel.Medium,
    feedbackType: FeedbackType.Paw,
    rating: 3,
    isDeleted: false,
    createdAt: '2024-01-11T18:30:00Z',
    createdBy: 'user_5',
    updatedAt: '2024-01-11T18:30:00Z',
    updatedBy: 'user_5'
  },
  {
    id: 'comment_6',
    userId: 'user_1',
    user: users[0],
    venueId: 'venue_2',
    venue: venues[1],
    petId: 1,
    content: '這是不當內容，包含廣告訊息。',
    petFriendlyLevel: PetFriendlyLevel.Low,
    feedbackType: FeedbackType.Poop,
    rating: 1,
    isDeleted: true,
    deletedReason: '垃圾內容',
    createdAt: '2024-01-10T12:00:00Z',
    createdBy: 'user_1',
    updatedAt: '2024-01-10T13:00:00Z',
    updatedBy: 'admin_1'
  },
  {
    id: 'comment_7',
    userId: 'user_2',
    user: users[1],
    venueId: 'venue_1',
    venue: venues[0],
    petId: 2,
    content: '餐點很好吃，寵物友善程度一般般。有提供寵物座位區，但空間有點擁擠。',
    petFriendlyLevel: PetFriendlyLevel.Medium,
    feedbackType: FeedbackType.Paw,
    rating: 3,
    isDeleted: false,
    createdAt: '2024-01-09T16:45:00Z',
    createdBy: 'user_2',
    updatedAt: '2024-01-09T16:45:00Z',
    updatedBy: 'user_2'
  },
  {
    id: 'comment_8',
    userId: 'user_6',
    user: users[5],
    venueId: 'venue_6',
    venue: venues[5],
    petId: 6,
    content: '環境很棒，工作人員對寵物很友善。價格偏高但物有所值。',
    petFriendlyLevel: PetFriendlyLevel.High,
    feedbackType: FeedbackType.Paw,
    rating: 4,
    isDeleted: false,
    createdAt: '2024-01-08T11:15:00Z',
    createdBy: 'user_6',
    updatedAt: '2024-01-08T11:15:00Z',
    updatedBy: 'user_6',
    files: [
      {
        id: 4,
        commentId: 'comment_8',
        fileId: 'file_4',
        file: {
          id: 'file_4',
          name: 'pet-hotel-room.jpg',
          type: 'image/jpeg',
          size: 2457600,
          s3Bucket: 'pettalk-images',
          s3Key: 'comments/comment_8/pet-hotel-room.jpg',
          uploadDate: '2024-01-08T11:15:00Z',
          uploadedBy: 'user_6',
          filePurpose: 3, // CommentImage
          isDeleted: false,
          createdAt: '2024-01-08T11:15:00Z',
          createdBy: 'user_6',
          updatedAt: '2024-01-08T11:15:00Z',
          updatedBy: 'user_6'
        },
        sortOrder: 1,
        isDeleted: false,
        createdAt: '2024-01-08T11:15:00Z',
        createdBy: 'user_6',
        updatedAt: '2024-01-08T11:15:00Z',
        updatedBy: 'user_6'
      },
      {
        id: 5,
        commentId: 'comment_8',
        fileId: 'file_5',
        file: {
          id: 'file_5',
          name: 'pet-play-area.jpg',
          type: 'image/jpeg',
          size: 1945600,
          s3Bucket: 'pettalk-images',
          s3Key: 'comments/comment_8/pet-play-area.jpg',
          uploadDate: '2024-01-08T11:16:00Z',
          uploadedBy: 'user_6',
          filePurpose: 3, // CommentImage
          isDeleted: false,
          createdAt: '2024-01-08T11:16:00Z',
          createdBy: 'user_6',
          updatedAt: '2024-01-08T11:16:00Z',
          updatedBy: 'user_6'
        },
        sortOrder: 2,
        isDeleted: false,
        createdAt: '2024-01-08T11:16:00Z',
        createdBy: 'user_6',
        updatedAt: '2024-01-08T11:16:00Z',
        updatedBy: 'user_6'
      },
      {
        id: 6,
        commentId: 'comment_8',
        fileId: 'file_6',
        file: {
          id: 'file_6',
          name: 'pet-meal.jpg',
          type: 'image/jpeg',
          size: 1658400,
          s3Bucket: 'pettalk-images',
          s3Key: 'comments/comment_8/pet-meal.jpg',
          uploadDate: '2024-01-08T11:17:00Z',
          uploadedBy: 'user_6',
          filePurpose: 3, // CommentImage
          isDeleted: false,
          createdAt: '2024-01-08T11:17:00Z',
          createdBy: 'user_6',
          updatedAt: '2024-01-08T11:17:00Z',
          updatedBy: 'user_6'
        },
        sortOrder: 3,
        isDeleted: false,
        createdAt: '2024-01-08T11:17:00Z',
        createdBy: 'user_6',
        updatedAt: '2024-01-08T11:17:00Z',
        updatedBy: 'user_6'
      }
    ]
  }
]

// 取得評論列表（支援篩選和分頁）
export const getComments = (params: {
  search?: string
  venueCategory?: VenueCategoryType
  rating?: number
  feedbackType?: FeedbackType
  petFriendlyLevel?: PetFriendlyLevel
  isDeleted?: boolean
  dateFrom?: string
  dateTo?: string
  page: number
  limit: number
}): PaginatedResponse<Comment> => {
  let filteredComments = [...comments]

  // 搜尋篩選（使用者名稱或店家名稱）
  if (params.search) {
    const searchLower = params.search.toLowerCase()
    filteredComments = filteredComments.filter(comment => 
      comment.user.name.toLowerCase().includes(searchLower) ||
      comment.venue?.name.toLowerCase().includes(searchLower)
    )
  }

  // 店家類型篩選
  if (params.venueCategory !== undefined) {
    filteredComments = filteredComments.filter(comment => 
      comment.venue?.categoryType === params.venueCategory
    )
  }

  // 評分篩選
  if (params.rating !== undefined) {
    filteredComments = filteredComments.filter(comment => 
      comment.rating === params.rating
    )
  }

  // 回饋類型篩選
  if (params.feedbackType !== undefined) {
    filteredComments = filteredComments.filter(comment => 
      comment.feedbackType === params.feedbackType
    )
  }

  // 寵物友善程度篩選
  if (params.petFriendlyLevel !== undefined) {
    filteredComments = filteredComments.filter(comment => 
      comment.petFriendlyLevel === params.petFriendlyLevel
    )
  }

  // 刪除狀態篩選
  if (params.isDeleted !== undefined) {
    filteredComments = filteredComments.filter(comment => 
      comment.isDeleted === params.isDeleted
    )
  }

  // 日期範圍篩選
  if (params.dateFrom) {
    const fromDate = new Date(params.dateFrom)
    filteredComments = filteredComments.filter(comment => 
      new Date(comment.createdAt) >= fromDate
    )
  }
  if (params.dateTo) {
    const toDate = new Date(params.dateTo)
    toDate.setHours(23, 59, 59, 999) // 設定為當天結束時間
    filteredComments = filteredComments.filter(comment => 
      new Date(comment.createdAt) <= toDate
    )
  }

  // 排序（最新的在前）
  filteredComments.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  // 分頁處理
  const total = filteredComments.length
  const totalPages = Math.ceil(total / params.limit)
  const start = (params.page - 1) * params.limit
  const end = start + params.limit
  const paginatedComments = filteredComments.slice(start, end)

  return {
    data: paginatedComments,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      totalPages,
      hasNextPage: params.page < totalPages,
      hasPreviousPage: params.page > 1
    }
  }
}

// 刪除評論
export const deleteComment = (id: string, reason: string): boolean => {
  const index = comments.findIndex(comment => comment.id === id)
  if (index !== -1) {
    comments[index] = {
      ...comments[index],
      isDeleted: true,
      deletedReason: reason,
      updatedAt: new Date().toISOString(),
      updatedBy: 'admin' // 實際應用中應該是當前管理員ID
    }
    return true
  }
  return false
}

// 恢復評論
export const restoreComment = (id: string): boolean => {
  const index = comments.findIndex(comment => comment.id === id)
  if (index !== -1) {
    comments[index] = {
      ...comments[index],
      isDeleted: false,
      deletedReason: undefined,
      updatedAt: new Date().toISOString(),
      updatedBy: 'admin' // 實際應用中應該是當前管理員ID
    }
    return true
  }
  return false
}