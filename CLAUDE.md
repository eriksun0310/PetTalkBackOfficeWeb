# CLAUDE.md - PTalk 後台管理系統

## 專案概述

PTalk 後台管理系統是一個現代化的寵物社群應用程式後台管理平台，基於 Next.js 15 建構。本系統為 PTalk App 提供完整的後台管理功能，包括用戶管理、內容審核、店家管理、通知推送等核心功能模組。

### 技術堆疊
- **前端框架**: Next.js 15 (App Router)
- **程式語言**: TypeScript
- **樣式框架**: Tailwind CSS
- **UI 組件庫**: shadcn/ui
- **狀態管理**: Zustand
- **圖標庫**: Lucide React
- **主題系統**: next-themes

## 專案結構

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 認證相關頁面
│   │   └── login/                # 登入頁面
│   ├── (dashboard)/              # 後台主要功能
│   │   ├── dashboard/            # 儀表板首頁
│   │   ├── users/               # 用戶管理
│   │   │   └── [id]/            # 用戶詳細頁面
│   │   ├── comments/            # 評論管理
│   │   │   └── reported/        # 被檢舉評論
│   │   ├── shops/               # 店家管理
│   │   │   ├── pending/         # 待審核店家
│   │   │   └── locations/       # 地點管理
│   │   ├── notifications/       # 通知管理
│   │   │   ├── send/            # 發送通知
│   │   │   └── history/         # 發送記錄
│   │   └── settings/            # 系統設定
│   │       ├── auth/            # 第三方登入設定
│   │       ├── api/             # API 管理
│   │       └── admins/          # 管理員管理
│   ├── api/                     # API 路由 (待實作)
│   └── globals.css              # 全域樣式
├── components/                   # React 組件
│   ├── ui/                      # shadcn/ui 基礎組件
│   ├── layout/                  # 布局相關組件
│   ├── auth/                    # 認證相關組件
│   ├── dashboard/               # 儀表板組件
│   ├── users/                   # 用戶管理組件
│   ├── comments/                # 評論管理組件
│   ├── shops/                   # 店家管理組件
│   ├── notifications/           # 通知管理組件
│   └── settings/                # 系統設定組件
├── hooks/                       # 自定義 React Hooks
├── stores/                      # Zustand 狀態管理
├── types/                       # TypeScript 類型定義
└── lib/                         # 工具函數
```

## 核心功能模組

### 1. 用戶管理機制
- **用戶清單**: 搜尋、排序、篩選功能
- **用戶詳情**: 完整資料顯示、裝置資訊、登入方式
- **帳號控制**: 停用/封鎖、違規標記
- **第三方登入**: Google、LINE 綁定資料檢視

### 2. 評論管理機制
- **評論清單**: 關鍵字搜尋、用戶篩選
- **檢舉處理**: 被檢舉評論管理、下架操作
- **審核功能**: 評論狀態管理

### 3. 店家與地點管理
- **店家審核**: 待審核清單、審核/駁回操作
- **地點管理**: 店家地址、地圖資訊
- **分類管理**: 店家類別設定

### 4. 通知與訊息管理
- **系統推播**: Push Notification 發送
- **站內訊息**: 個別/分類發送
- **發送記錄**: 歷史記錄查詢、統計分析

### 5. 系統設定
- **第三方登入**: API 金鑰管理
- **對外 API**: 合作夥伴 API 設定
- **管理員管理**: 權限控制、角色分配

## 權限系統

### 權限層級
1. **Super Admin**: 完整系統權限
2. **Admin**: 一般管理權限  
3. **Moderator**: 內容審核權限

### 權限對應表
```typescript
const rolePermissions = {
  super_admin: [
    'users.read', 'users.write', 'users.suspend',
    'comments.read', 'comments.moderate',
    'shops.read', 'shops.approve',
    'notifications.send', 'settings.manage', 'admins.manage'
  ],
  admin: [
    'users.read', 'users.suspend',
    'comments.read', 'comments.moderate', 
    'shops.read', 'shops.approve',
    'notifications.send', 'settings.read'
  ],
  moderator: [
    'users.read', 'comments.read', 'comments.moderate', 'shops.read'
  ]
}
```

## 開發指令

### 基本指令
```bash
# 安裝依賴
npm install

# 開發模式 (支援 WSL)
npm run dev

# 產品建構
npm run build

# 啟動產品版本
npm run start

# 程式碼檢查
npm run lint

# TypeScript 類型檢查
npm run type-check
```

### 開發伺服器資訊
- **本地地址**: http://localhost:3000
- **網路地址**: http://0.0.0.0:3000
- **WSL 環境**: http://172.26.92.113:3000

## 元件開發規範

### 新增頁面
1. 在 `src/app/(dashboard)/` 建立目錄
2. 建立 `page.tsx` 檔案
3. 更新側邊欄導航 (`src/components/layout/sidebar.tsx`)
4. 更新麵包屑映射 (`src/components/layout/breadcrumb.tsx`)

### 新增組件
1. 在對應的 `src/components/` 子目錄建立
2. 使用 TypeScript 介面定義 props
3. 遵循 shadcn/ui 設計規範
4. 添加 "use client" 指令（如需要）

### 權限控制範例
```typescript
// 頁面層級
<ProtectedRoute requiredPermission="users.write">
  <UserManagement />
</ProtectedRoute>

// 組件層級
const { checkPermission } = useAuth()
if (checkPermission('users.suspend')) {
  // 顯示停用按鈕
}
```

## 檔案命名規範

### 頁面檔案
- `page.tsx` - 頁面主要組件
- `layout.tsx` - 布局組件
- `loading.tsx` - 載入狀態
- `error.tsx` - 錯誤頁面
- `not-found.tsx` - 404 頁面

### 組件檔案
- 使用 kebab-case: `user-list.tsx`
- 組件名稱使用 PascalCase: `UserList`
- 檔案與組件名稱對應

### 類型定義
- 介面使用 PascalCase: `interface User`
- 類型別名使用 PascalCase: `type UserRole`
- 集中在 `src/types/index.ts`

## 樣式指南

### Tailwind CSS 類別順序
1. 布局 (flex, grid, position)
2. 尺寸 (w-, h-, p-, m-)
3. 文字 (text-, font-)
4. 顏色 (bg-, text-color)
5. 效果 (shadow-, rounded-)
6. 狀態 (hover:, focus:, dark:)

### 顏色系統
- **主色調**: blue (藍色系)
- **成功**: green (綠色系)  
- **警告**: yellow (黃色系)
- **錯誤**: red (紅色系)
- **中性**: gray (灰色系)

## 資料管理

### 狀態管理 (Zustand)
```typescript
// 認證狀態
const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false })
}))
```

### 資料類型
- 所有介面定義在 `src/types/index.ts`
- 使用嚴格的 TypeScript 類型檢查
- API 回應格式統一

## 測試策略

### 單元測試 (待實作)
- 組件測試: React Testing Library
- 工具函數測試: Jest
- 狀態管理測試: Zustand testing

### E2E 測試 (待實作)
- 主要使用者流程測試
- 權限控制測試
- 跨瀏覽器測試

## 部署與環境

### 環境變數
```bash
# 開發環境
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_ENV=development

# 生產環境  
NEXT_PUBLIC_API_URL=https://api.pettalk.com
NEXT_PUBLIC_APP_ENV=production
```

### 建構最佳化
- 自動程式碼分割
- 圖片最佳化
- CSS 最小化
- TypeScript 編譯檢查

## 已知問題與限制

### 目前狀態
- ✅ 基礎架構完成
- ✅ 所有頁面路由建立
- ✅ 權限系統實作
- ✅ 響應式設計
- ⏳ 資料表格組件 (待實作)
- ⏳ 表單驗證 (待實作)
- ⏳ API 整合 (待實作)
- ⏳ 圖表組件 (待實作)

### 技術債務
- [ ] 新增圖表庫 (Chart.js 或 Recharts)
- [ ] 實作資料分頁功能
- [ ] 新增檔案上傳組件
- [ ] 實作即時通知功能
- [ ] 新增匯出功能

## 效能最佳化

### 已實作
- Next.js 自動程式碼分割
- 組件懶載入
- 靜態生成頁面
- 圖片最佳化

### 待實作
- [ ] 虛擬化長列表
- [ ] API 回應快取
- [ ] 組件記憶化
- [ ] Bundle 分析

## 安全性考量

### 已實作
- 基於角色的權限控制
- 路由保護機制
- XSS 防護 (React 內建)
- CSRF 防護 (待實作)

### 最佳實務
- 不在前端儲存敏感資訊
- 所有 API 請求需要認證
- 輸入驗證與清理
- 安全的會話管理

## 貢獻指南

### Pull Request 流程
1. Fork 專案
2. 建立功能分支: `git checkout -b feature/new-feature`
3. 提交變更: `git commit -m 'Add new feature'`
4. 推送分支: `git push origin feature/new-feature`
5. 建立 Pull Request

### 程式碼審查標準
- TypeScript 類型安全
- 遵循 ESLint 規則
- 組件可重用性
- 效能考量
- 可存取性 (Accessibility)

## 聯絡資訊

- **專案維護者**: PTalk 開發團隊
- **技術支援**: dev@pettalk.com
- **問題回報**: GitHub Issues
- **文件版本**: v1.0.0
- **最後更新**: 2025-06-25

---

> 此文件為 AI 助手提供專案資訊的參考文件，包含完整的開發指南與專案規範。