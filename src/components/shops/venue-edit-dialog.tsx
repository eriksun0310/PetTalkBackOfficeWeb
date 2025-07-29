"use client"

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertTriangle } from 'lucide-react'
import { useAppDispatch } from '@/stores/store'
import { updateVenue } from '@/stores/slices/venueSlice'
import { Venue, VenueCategoryType, VenueOpeningHour } from '@/types'
import { VenueOpeningHoursForm } from './venue-opening-hours-form'
import { useToast } from '@/hooks/use-toast'
import { VENUE_CATEGORY_LABELS } from '@/shared/constants/venue.constants'

interface VenueEditDialogProps {
  isOpen: boolean
  onClose: () => void
  venue: Venue | null
}

interface FormData {
  name: string
  categoryType: VenueCategoryType
  address: string
  latitude: number
  longitude: number
  phone: string
  website: string
  description: string
}

interface FormErrors {
  name?: string
  address?: string
  latitude?: string
  longitude?: string
  phone?: string
  website?: string
}

export function VenueEditDialog({ isOpen, onClose, venue }: VenueEditDialogProps) {
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    categoryType: VenueCategoryType.Restaurant,
    address: '',
    latitude: 0,
    longitude: 0,
    phone: '',
    website: '',
    description: ''
  })
  const [openingHours, setOpeningHours] = useState<Omit<VenueOpeningHour, 'id' | 'venueId' | 'createdAt' | 'updatedAt'>[]>([])
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form data when venue changes
  useEffect(() => {
    if (venue) {
      setFormData({
        name: venue.name,
        categoryType: venue.categoryType,
        address: venue.address,
        latitude: venue.latitude,
        longitude: venue.longitude,
        phone: venue.phone || '',
        website: venue.website || '',
        description: venue.description || ''
      })

      // Initialize opening hours
      if (venue.openingHours && venue.openingHours.length > 0) {
        const hours = venue.openingHours.map(hour => ({
          dayOfWeek: hour.dayOfWeek,
          openTime: hour.openTime,
          closeTime: hour.closeTime,
          isClosed: hour.isClosed,
          isDeleted: false,
          createdBy: hour.createdBy,
          updatedBy: 'admin' // TODO: Get from auth context
        }))
        setOpeningHours(hours)
      } else {
        // Initialize default opening hours for 7 days
        const initialHours = Array.from({ length: 7 }, (_, i) => ({
          dayOfWeek: i,
          openTime: '09:00',
          closeTime: '18:00',
          isClosed: false,
          isDeleted: false,
          createdBy: 'admin', // TODO: Get from auth context
          updatedBy: 'admin'
        }))
        setOpeningHours(initialHours)
      }
    }
    setErrors({})
  }, [venue])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = '店家名稱為必填項目'
    }

    if (!formData.address.trim()) {
      newErrors.address = '店家地址為必填項目'
    }

    if (formData.phone && !/^[\d\-\(\)\+\s]+$/.test(formData.phone)) {
      newErrors.phone = '請輸入有效的電話號碼格式'
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = '請輸入有效的網址格式 (需以 http:// 或 https:// 開頭)'
    }

    if (isNaN(formData.latitude) || formData.latitude < -90 || formData.latitude > 90) {
      newErrors.latitude = '緯度必須在 -90 到 90 之間'
    }

    if (isNaN(formData.longitude) || formData.longitude < -180 || formData.longitude > 180) {
      newErrors.longitude = '經度必須在 -180 到 180 之間'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string | VenueCategoryType | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async () => {
    if (!venue || !validateForm()) return

    setIsSubmitting(true)
    try {
      await dispatch(updateVenue({
        id: venue.id,
        data: {
          ...formData,
          openingHours: openingHours as any
        }
      })).unwrap()
      
      toast({
        title: "更新成功",
        description: `店家「${formData.name}」的資料已成功更新`,
      })
      
      onClose()
    } catch (error) {
      console.error('Failed to update venue:', error)
      toast({
        title: "更新失敗",
        description: "無法更新店家資料，請稍後再試",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>編輯店家資料</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="basic">基本資料</TabsTrigger>
              <TabsTrigger value="hours">營業時間</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              {/* 基本資訊區塊 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">基本資訊</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">店家名稱 *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="請輸入店家名稱"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoryType">店家類型</Label>
                  <Select
                    value={formData.categoryType.toString()}
                    onValueChange={(value) => handleInputChange('categoryType', parseInt(value) as VenueCategoryType)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(VENUE_CATEGORY_LABELS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">位置資訊</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">店家地址 *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="請輸入完整地址"
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    {errors.address}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">緯度 *</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="0.0000001"
                    value={formData.latitude}
                    onChange={(e) => handleInputChange('latitude', parseFloat(e.target.value) || 0)}
                    placeholder="例：25.0339687"
                    className={errors.latitude ? 'border-red-500' : ''}
                  />
                  {errors.latitude && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      {errors.latitude}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longitude">經度 *</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="0.0000001"
                    value={formData.longitude}
                    onChange={(e) => handleInputChange('longitude', parseFloat(e.target.value) || 0)}
                    placeholder="例：121.5644722"
                    className={errors.longitude ? 'border-red-500' : ''}
                  />
                  {errors.longitude && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      {errors.longitude}
                    </div>
                  )}
                  </div>
                </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">聯絡資訊</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">聯絡電話</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="例：02-1234-5678"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      {errors.phone}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">官方網站</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://example.com"
                    className={errors.website ? 'border-red-500' : ''}
                  />
                  {errors.website && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      {errors.website}
                    </div>
                  )}
                </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">詳細資訊</h3>
                <div className="space-y-2">
                  <Label htmlFor="description">店家描述</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="請輸入店家詳細描述、特色服務等..."
                    rows={5}
                    className="resize-none"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hours" className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">營業時間設定</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  設定每週的營業時間，可以使用快速複製功能來設定重複的時間。
                </p>
                <VenueOpeningHoursForm
                  openingHours={openingHours}
                  onChange={setOpeningHours}
                />
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>

        <DialogFooter className="border-t pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            取消
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="min-w-[100px]"
          >
            {isSubmitting ? '儲存中...' : '儲存變更'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}