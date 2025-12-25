# 项目文件结构

## 📂 完整文件清单

```
baoding-huazheng/
│
├── 📄 配置文件
│   ├── package.json                    # 项目依赖配置
│   ├── tsconfig.json                   # TypeScript 配置
│   ├── tsconfig.app.json              # 应用 TS 配置
│   ├── angular.json                    # Angular CLI 配置
│   ├── .gitignore                      # Git 忽略文件
│   ├── README.md                       # 项目说明文档
│   ├── DEVELOPMENT.md                  # 开发指南
│   └── PROJECT_STRUCTURE.md           # 本文件
│
├── 📁 prd/                             # 产品需求文档
│   └── prd1225.txt                    # 详细 PRD
│
├── 📁 rules/                           # 开发规则
│   ├── frontend.md                    # 前端开发规范
│   └── prd.md                         # PRD 文档规范
│
└── 📁 src/                             # 源代码目录
    ├── index.html                     # HTML 入口
    ├── main.ts                        # 应用入口
    ├── styles.scss                    # 全局样式
    ├── favicon.ico                    # 网站图标
    │
    ├── 📁 assets/                      # 静态资源
    │   └── .gitkeep
    │
    ├── 📁 core/                        # 核心模块
    │   ├── 📁 guards/                  # 路由守卫
    │   │   └── auth.guard.ts          # 认证守卫
    │   │
    │   ├── 📁 interceptors/            # HTTP 拦截器
    │   │   └── auth.interceptor.ts    # 认证拦截器
    │   │
    │   └── 📁 services/                # 核心服务
    │       ├── auth.service.ts        # 认证服务
    │       ├── solution.service.ts    # 方案服务
    │       └── knowledge.service.ts   # 知识库服务
    │
    └── 📁 app/                         # 应用模块
        ├── app.component.ts           # 根组件
        ├── app.routes.ts              # 路由配置
        │
        └── 📁 modules/                 # 功能模块
            │
            ├── 📁 auth/                # 认证模块
            │   └── 📁 login/           # 登录页面
            │       ├── login.component.ts
            │       ├── login.component.html
            │       └── login.component.scss
            │
            ├── 📁 layout/              # 布局模块
            │   └── 📁 main-layout/     # 主布局
            │       ├── main-layout.component.ts
            │       ├── main-layout.component.html
            │       └── main-layout.component.scss
            │
            ├── 📁 dashboard/           # 工作台模块
            │   ├── dashboard.component.ts
            │   ├── dashboard.component.html
            │   └── dashboard.component.scss
            │
            ├── 📁 solution/            # 方案模块
            │   ├── 📁 solution-generate/   # 方案生成
            │   │   ├── solution-generate.component.ts
            │   │   ├── solution-generate.component.html
            │   │   └── solution-generate.component.scss
            │   │
            │   └── 📁 solution-history/    # 历史记录
            │       ├── solution-history.component.ts
            │       ├── solution-history.component.html
            │       └── solution-history.component.scss
            │
            ├── 📁 knowledge/           # 知识库模块
            │   └── 📁 knowledge-manage/    # 知识库管理
            │       ├── knowledge-manage.component.ts
            │       ├── knowledge-manage.component.html
            │       └── knowledge-manage.component.scss
            │
            └── 📁 shared/              # 共享模块
                └── 📁 components/      # 共享组件
                    ├── 📁 loading-spinner/
                    │   └── loading-spinner.component.ts
                    │
                    ├── 📁 page-header/
                    │   └── page-header.component.ts
                    │
                    └── 📁 empty-state/
                        └── empty-state.component.ts
```

## 📊 统计信息

### 文件类型统计
- TypeScript 文件：23 个
- HTML 模板文件：6 个
- SCSS 样式文件：6 个
- 配置文件：6 个
- 文档文件：4 个

### 模块统计
- 核心服务：3 个
- 页面组件：6 个
- 共享组件：3 个
- 路由守卫：1 个
- HTTP 拦截器：1 个

## 🎯 核心文件说明

### 1. 入口文件
- **main.ts**: 应用启动入口，配置路由、HTTP 客户端
- **app.component.ts**: 根组件，包含路由出口
- **app.routes.ts**: 路由配置，定义所有页面路由

### 2. 核心服务
- **auth.service.ts**: 用户认证、登录、权限管理
- **solution.service.ts**: 方案生成、存储、查询
- **knowledge.service.ts**: 知识库文档管理

### 3. 路由守卫
- **auth.guard.ts**: 保护需要登录的路由

### 4. 页面组件

#### 登录页面 (login)
- 精美的登录界面
- 用户名密码认证
- 角色自动识别

#### 工作台 (dashboard)
- 数据统计展示
- 快速操作入口
- 最近方案列表
- 使用提示轮播

#### 方案生成 (solution-generate)
- 客户需求输入
- AI 方案生成
- 双栏展示（技术方案 + 客户回复）
- 导出功能

#### 历史记录 (solution-history)
- 方案列表
- 搜索筛选
- 卡片式展示

#### 知识库管理 (knowledge-manage)
- 文档上传
- 表格展示
- 分类筛选
- 状态管理

#### 主布局 (main-layout)
- 侧边栏导航
- 顶部用户信息
- 响应式设计

### 5. 共享组件
- **loading-spinner**: 加载指示器
- **page-header**: 页面头部
- **empty-state**: 空状态展示

## 🔧 关键技术点

### Angular 20+ 特性
✅ Standalone Components（独立组件）
✅ Signals（信号状态管理）
✅ @if/@for（新控制流）
✅ input()/output()（函数式 API）
✅ OnPush 变更检测

### 设计模式
- 服务单例模式
- 组件组合模式
- 响应式数据流
- 路由懒加载

### 样式架构
- CSS Variables（主题变量）
- SCSS 模块化
- BEM 命名规范
- 响应式设计

## 📝 命名规范

### 文件命名
- 组件：`feature-name.component.ts`
- 服务：`feature.service.ts`
- 守卫：`feature.guard.ts`
- 拦截器：`feature.interceptor.ts`

### 类命名
- 组件：`FeatureNameComponent`
- 服务：`FeatureService`
- 接口：`IFeature` 或 `Feature`

### 样式类命名
- 使用 kebab-case
- 遵循 BEM 规范
- 避免过深嵌套

## 🚀 快速导航

### 需要修改登录逻辑？
→ `src/core/services/auth.service.ts`

### 需要调整方案生成？
→ `src/core/services/solution.service.ts`
→ `src/app/modules/solution/solution-generate/`

### 需要修改样式？
→ `src/styles.scss` (全局)
→ 各组件的 `.scss` 文件 (局部)

### 需要添加新页面？
1. 在 `modules/` 下创建新目录
2. 创建组件文件
3. 在 `app.routes.ts` 添加路由
4. 在 `main-layout` 添加导航项

## 📚 扩展资源

- [Angular 文档](https://angular.dev)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [SCSS 指南](https://sass-lang.com/guide)

---

**项目版本**: V1.0  
**更新日期**: 2024年12月25日  
**维护团队**: 铧正开发组

