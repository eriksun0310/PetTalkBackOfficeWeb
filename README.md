# PTalk 後台管理系統

基於 Next.js 15 建構的 Pet Talk App 後台管理系統，提供完整的用戶、評論、店家和通知管理功能。
claude --dangerously-skip-permissions
## 🚀 功能特色

### 核心功能
- **用戶管理** - 用戶清單、詳細資料、帳號控制
- **評論管理** - 評論清單、被檢舉評論處理
- **店家管理** - 店家清單、審核、地點管理
- **通知管理** - 系統通知發送、記錄查看
- **系統設定** - 第三方登入、API 管理

### 技術特色
- **現代化架構** - Next.js 15 + App Router
- **完整類型支援** - TypeScript 完整覆蓋
- **響應式設計** - Tailwind CSS + shadcn/ui
- **暗/亮主題** - 自動切換支援
- **權限控制** - 基於角色的權限系統
- **狀態管理** - Zustand + 持久化

## 🛠 技術堆疊

- **框架**: Next.js 15
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **UI 組件**: shadcn/ui
- **狀態管理**: Zustand
- **圖標**: Lucide React
- **主題**: next-themes

## 📁 專案結構

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 認證相關頁面
│   │   └── login/
│   ├── (dashboard)/              # 後台主要頁面
│   │   ├── dashboard/            # 儀表板
│   │   ├── users/               # 用戶管理
│   │   ├── comments/            # 評論管理
│   │   ├── shops/               # 店家管理
│   │   ├── notifications/       # 通知管理
│   │   └── settings/            # 系統設定
│   ├── api/                     # API 路由
│   └── globals.css              # 全局樣式
├── components/                   # React 組件
│   ├── ui/                      # shadcn/ui 基礎組件
│   ├── layout/                  # 布局組件
│   ├── auth/                    # 認證組件
│   ├── dashboard/               # 儀表板組件
│   ├── users/                   # 用戶管理組件
│   ├── comments/                # 評論管理組件
│   ├── shops/                   # 店家管理組件
│   ├── notifications/           # 通知管理組件
│   └── settings/                # 設定組件
├── hooks/                       # React Hooks
├── stores/                      # Zustand 狀態管理
├── types/                       # TypeScript 類型定義
└── lib/                         # 工具函數
```

## 🚦 快速開始

### 環境要求
- Node.js 18.0 或以上
- npm 或 yarn

### 安裝依賴
```bash
npm install
# 或
yarn install
```

### 開發模式
```bash
npm run dev
# 或
yarn dev
```

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

### 建構產品版本
```bash
npm run build
# 或
yarn build
```

### 類型檢查
```bash
npm run type-check
# 或
yarn type-check
```

### 代碼檢查
```bash
npm run lint
# 或
yarn lint
```

## 🔐 權限系統

系統包含三個權限層級：

### Super Admin
- 完整系統權限
- 用戶管理（讀取、寫入、停用）
- 評論審核
- 店家審核
- 通知發送
- 系統設定
- 管理員管理

### Admin
- 一般管理權限
- 用戶管理（讀取、停用）
- 評論審核
- 店家審核
- 通知發送
- 系統設定（讀取）

### Moderator
- 內容審核權限
- 用戶資料讀取
- 評論審核
- 店家資料讀取

## 🎨 UI 設計

### 主要布局
- **側邊欄導航** - 功能分類清晰
- **頂部導航** - 用戶信息、主題切換
- **麵包屑** - 清楚顯示當前位置
- **響應式設計** - 支援桌面和行動裝置

### 設計原則
- **一致性** - 統一的設計語言
- **可用性** - 直觀的操作流程
- **可存取性** - 無障礙設計支援
- **效能** - 優化的載入體驗

## 📊 儀表板功能

### 統計概覽
- 用戶總數與成長趨勢
- 評論數量與活躍度
- 店家統計與審核狀態
- 通知發送統計

### 圖表分析
- 用戶成長趨勢圖
- 評論活躍度圖表
- 系統使用統計

### 最近活動
- 管理員操作記錄
- 系統事件追蹤
- 實時狀態更新

## 🔧 開發指南

### 添加新頁面
1. 在 `src/app/(dashboard)/` 下建立新目錄
2. 建立 `page.tsx` 檔案
3. 更新 `src/components/layout/sidebar.tsx` 導航
4. 更新 `src/components/layout/breadcrumb.tsx` 麵包屑

### 建立新組件
1. 在對應的 `src/components/` 子目錄建立組件
2. 遵循現有的命名慣例
3. 添加適當的 TypeScript 類型
4. 確保組件的可重用性

### 權限控制
```typescript
// 頁面層級權限
<ProtectedRoute requiredPermission="users.write">
  <UserManagement />
</ProtectedRoute>

// 組件層級權限
const { checkPermission } = useAuth()
if (checkPermission('users.suspend')) {
  // 顯示停用按鈕
}
```

## 📝 待辦事項

- [ ] 實作完整的資料表格組件
- [ ] 添加圖表庫整合 (Chart.js 或 Recharts)
- [ ] 實作 API 整合
- [ ] 添加表單驗證
- [ ] 實作檔案上傳功能
- [ ] 添加匯出功能
- [ ] 實作即時通知
- [ ] 添加單元測試
- [ ] 實作 E2E 測試
- [ ] 效能優化

## 🤝 貢獻指南

1. Fork 此專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權

此專案使用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 📞 聯絡方式

如有問題或建議，請聯絡開發團隊：
- Email: dev@pettalk.com
- GitHub Issues: [專案議題](https://github.com/your-org/pet-talk-backoffice/issues)
