'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/stores'
import { sendNotification, saveDraft } from '@/stores/slices/notificationSlice'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NotificationPreview } from './NotificationPreview'
import { RecipientSelector } from './RecipientSelector'
import { Send, Save, AlertCircle, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { NotificationType } from '@/types'

interface NotificationFormData {
  title: string
  subtitle: string
  type: NotificationType
  recipientType: 'single' | 'multiple' | 'all'
  recipientIds: string[]
  targetId?: string
  payload?: Record<string, any>
  sendType: 'immediate' | 'scheduled'
  scheduledTime?: string
}

export function SendNotificationForm() {
  const dispatch = useDispatch<AppDispatch>()
  const { sendingNotification, currentDraft } = useSelector((state: RootState) => state.notification)
  
  const [formData, setFormData] = useState<NotificationFormData>({
    title: currentDraft?.data.title || '',
    subtitle: currentDraft?.data.subtitle || '',
    type: currentDraft?.data.type || NotificationType.AnnouncementNotification,
    recipientType: currentDraft?.data.recipientUserIds && currentDraft.data.recipientUserIds.length === 1 ? 'single' : 
                   currentDraft?.data.recipientUserIds && currentDraft.data.recipientUserIds.length > 1 ? 'multiple' : 'all',
    recipientIds: currentDraft?.data.recipientUserIds || [],
    targetId: currentDraft?.data.targetId,
    payload: currentDraft?.data.payload || {},
    sendType: currentDraft?.data.scheduledAt ? 'scheduled' : 'immediate',
    scheduledTime: currentDraft?.data.scheduledAt
  })
  
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [currentTab, setCurrentTab] = useState('basic')

  const handleInputChange = (field: keyof NotificationFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveDraft = async () => {
    try {
      await dispatch(saveDraft({
        title: formData.title,
        subtitle: formData.subtitle,
        type: formData.type,
        recipientUserIds: formData.recipientIds,
        targetId: formData.targetId,
        payload: formData.payload,
        scheduledAt: formData.scheduledTime
      })).unwrap()
      toast.success('草稿已儲存')
    } catch (error) {
      toast.error('儲存草稿失敗')
    }
  }

  const handleSend = async () => {
    try {
      const recipientUserIds = formData.recipientType === 'all' 
        ? ['all-users'] // 後端會處理全體用戶的邏輯
        : formData.recipientIds

      const result = await dispatch(sendNotification({
        title: formData.title,
        subtitle: formData.subtitle,
        type: formData.type,
        recipientUserIds,
        targetId: formData.targetId,
        payload: formData.payload,
        scheduledAt: formData.sendType === 'scheduled' ? formData.scheduledTime : undefined
      })).unwrap()

      toast.success(`通知發送成功！已發送給 ${result.totalSent} 位用戶`)
      
      // 重置表單
      setFormData({
        title: '',
        subtitle: '',
        type: NotificationType.AnnouncementNotification,
        recipientType: 'all',
        recipientIds: [],
        payload: {},
        sendType: 'immediate'
      })
      setCurrentTab('basic')
    } catch (error) {
      toast.error('發送失敗，請稍後再試')
    } finally {
      setShowConfirmDialog(false)
    }
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('請輸入通知標題')
      return false
    }
    
    if (formData.recipientType === 'single' && formData.recipientIds.length === 0) {
      toast.error('請選擇接收者')
      return false
    }
    
    if (formData.sendType === 'scheduled' && !formData.scheduledTime) {
      toast.error('請選擇排程時間')
      return false
    }
    
    return true
  }

  const handleSubmit = () => {
    if (validateForm()) {
      setShowConfirmDialog(true)
    }
  }

  const getRecipientCount = () => {
    switch (formData.recipientType) {
      case 'single':
        return formData.recipientIds.length
      case 'multiple':
        return formData.recipientIds.length
      case 'all':
        return '全體用戶'
      default:
        return 0
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>發送通知</CardTitle>
              <CardDescription>向用戶發送系統通知或公告</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={currentTab} onValueChange={setCurrentTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">基本資訊</TabsTrigger>
                  <TabsTrigger value="recipients">接收者</TabsTrigger>
                  <TabsTrigger value="options">發送選項</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="space-y-2">
                    <Label>通知標題 *</Label>
                    <Input
                      placeholder="輸入通知標題"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>通知副標題</Label>
                    <Textarea
                      placeholder="輸入通知副標題或詳細內容"
                      value={formData.subtitle}
                      onChange={(e) => handleInputChange('subtitle', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>通知類型</Label>
                    <RadioGroup
                      value={formData.type.toString()}
                      onValueChange={(value) => handleInputChange('type', Number(value) as NotificationType)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={NotificationType.AnnouncementNotification.toString()} id="announcement" />
                        <Label htmlFor="announcement" className="font-normal">
                          系統公告
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={NotificationType.CommentNotification.toString()} id="comment" />
                        <Label htmlFor="comment" className="font-normal">
                          評論通知
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.type === NotificationType.CommentNotification && (
                    <div className="space-y-2">
                      <Label>目標 ID (選填)</Label>
                      <Input
                        placeholder="輸入相關評論或店家 ID"
                        value={formData.targetId || ''}
                        onChange={(e) => handleInputChange('targetId', e.target.value)}
                      />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="recipients" className="space-y-4">
                  <div className="space-y-2">
                    <Label>接收者類型</Label>
                    <RadioGroup
                      value={formData.recipientType}
                      onValueChange={(value) => handleInputChange('recipientType', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all" className="font-normal">
                          全體用戶
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="single" id="single" />
                        <Label htmlFor="single" className="font-normal">
                          指定用戶
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="multiple" id="multiple" />
                        <Label htmlFor="multiple" className="font-normal">
                          批量選擇
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.recipientType !== 'all' && (
                    <RecipientSelector
                      type={formData.recipientType}
                      selectedIds={formData.recipientIds}
                      onChange={(ids) => handleInputChange('recipientIds', ids)}
                    />
                  )}
                </TabsContent>

                <TabsContent value="options" className="space-y-4">
                  <div className="space-y-2">
                    <Label>發送時間</Label>
                    <RadioGroup
                      value={formData.sendType}
                      onValueChange={(value) => handleInputChange('sendType', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="immediate" id="immediate" />
                        <Label htmlFor="immediate" className="font-normal">
                          立即發送
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="scheduled" id="scheduled" />
                        <Label htmlFor="scheduled" className="font-normal">
                          排程發送
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.sendType === 'scheduled' && (
                    <div className="space-y-2">
                      <Label>排程時間</Label>
                      <Input
                        type="datetime-local"
                        value={formData.scheduledTime || ''}
                        onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                        min={new Date().toISOString().slice(0, 16)}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>額外資料 (JSON 格式，選填)</Label>
                    <Textarea
                      placeholder='{"key": "value"}'
                      value={JSON.stringify(formData.payload, null, 2)}
                      onChange={(e) => {
                        try {
                          const payload = JSON.parse(e.target.value)
                          handleInputChange('payload', payload)
                        } catch {
                          // 忽略 JSON 解析錯誤
                        }
                      }}
                      rows={4}
                      className="font-mono text-sm"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                >
                  <Save className="w-4 h-4 mr-2" />
                  儲存草稿
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={sendingNotification}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {formData.sendType === 'scheduled' ? '排程發送' : '立即發送'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <NotificationPreview
            title={formData.title}
            subtitle={formData.subtitle}
            type={formData.type}
            recipientCount={getRecipientCount()}
            scheduledTime={formData.scheduledTime}
          />
        </div>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確認發送通知</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>請確認以下發送資訊：</p>
              <div className="bg-muted p-3 rounded-lg space-y-1 text-sm">
                <p><strong>標題：</strong>{formData.title}</p>
                <p><strong>類型：</strong>{formData.type === NotificationType.CommentNotification ? '評論通知' : '系統公告'}</p>
                <p><strong>接收者：</strong>{getRecipientCount()} {typeof getRecipientCount() === 'number' ? '位用戶' : ''}</p>
                {formData.sendType === 'scheduled' && (
                  <p><strong>排程時間：</strong>{new Date(formData.scheduledTime!).toLocaleString()}</p>
                )}
              </div>
              <p className="text-muted-foreground">此操作無法撤銷，請確認資訊無誤。</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleSend} disabled={sendingNotification}>
              {sendingNotification ? '發送中...' : '確認發送'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}