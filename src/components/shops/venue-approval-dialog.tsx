"use client"

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAppDispatch } from '@/stores/store'
import { approveVenueApplication } from '@/stores/slices/venueSlice'
import { VenueApplication, VenueCategoryType, VenueOpeningHour } from '@/types'
import { VenueOpeningHoursForm } from './venue-opening-hours-form'

interface VenueApprovalDialogProps {
  isOpen: boolean
  onClose: () => void
  application: VenueApplication | null
}

const categoryTypeLabels: Record<VenueCategoryType, string> = {
  [VenueCategoryType.Restaurant]: '餐廳',
  [VenueCategoryType.Hospital]: '醫院',
  [VenueCategoryType.Beauty]: '美容',
  [VenueCategoryType.Hotel]: '旅館',
}

export function VenueApprovalDialog({ isOpen, onClose, application }: VenueApprovalDialogProps) {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    website: '',
    description: '',
  })
  const [openingHours, setOpeningHours] = useState<Omit<VenueOpeningHour, 'id' | 'venueId' | 'createdAt' | 'updatedAt'>[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (application) {
      // Reset form when application changes
      setFormData({
        website: '',
        description: '',
      })
      // Initialize opening hours for 7 days
      const initialHours = Array.from({ length: 7 }, (_, i) => ({
        dayOfWeek: i,
        openTime: '09:00',
        closeTime: '18:00',
        isClosed: false,
        isDeleted: false,
        createdBy: 'admin', // TODO: Get from auth context
        updatedBy: 'admin',
      }))
      setOpeningHours(initialHours)
    }
  }, [application])

  const handleSubmit = async () => {
    if (!application) return

    setIsSubmitting(true)
    try {
      await dispatch(approveVenueApplication({
        applicationId: application.id,
        venueData: {
          name: application.name,
          categoryType: application.categoryType,
          address: application.address,
          latitude: 0, // TODO: Get from geocoding service based on address
          longitude: 0, // TODO: Get from geocoding service based on address
          phone: '', // TODO: Add phone field in form if needed
          website: formData.website,
          description: formData.description,
          isDeleted: false,
          createdBy: application.createdBy,
          updatedBy: 'admin', // TODO: Get from auth context
          openingHours: openingHours as any,
        }
      })).unwrap()
      
      onClose()
    } catch (error) {
      console.error('Failed to approve application:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!application) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>審核通過 - 填寫店家詳細資料</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] px-1">
          <div className="space-y-6">
            {/* Basic Info (Read-only) */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">基本資料</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>店家名稱</Label>
                  <Input value={application.name} disabled />
                </div>
                <div>
                  <Label>類型</Label>
                  <Input value={categoryTypeLabels[application.categoryType]} disabled />
                </div>
                <div className="col-span-2">
                  <Label>地址</Label>
                  <Input value={application.address} disabled />
                </div>
                <div>
                  <Label>城市/區域</Label>
                  <Input value={`${application.cityCode} / ${application.districtCode}`} disabled />
                </div>
                <div>
                  <Label>寵物友善度</Label>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-500">{'★'.repeat(application.petFriendlyLevel)}</span>
                    <span className="text-gray-400">{'★'.repeat(5 - application.petFriendlyLevel)}</span>
                  </div>
                </div>
                <div>
                  <Label>申請人</Label>
                  <Input value={application.applicantUser?.name || '未知'} disabled />
                </div>
              </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">詳細資料</TabsTrigger>
                <TabsTrigger value="hours">營業時間</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <div>
                  <Label htmlFor="website">官方網站</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">店家描述</Label>
                  <Textarea
                    id="description"
                    placeholder="請輸入店家描述..."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="hours">
                <VenueOpeningHoursForm
                  openingHours={openingHours}
                  onChange={setOpeningHours}
                />
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? '處理中...' : '確認通過'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}