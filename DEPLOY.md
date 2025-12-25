# 🚀 部署到 Vercel

## 快速部署指南

### 方法 1: 使用 Vercel CLI（推荐）

1. **安装 Vercel CLI**
```bash
npm install -g vercel
```

2. **登录 Vercel**
```bash
vercel login
```

3. **部署项目**
```bash
vercel
```

首次部署时会询问一些配置问题：
- Set up and deploy? → **Yes**
- Which scope? → 选择您的账号
- Link to existing project? → **No**
- What's your project's name? → **huazheng-ai** (或自定义)
- In which directory is your code located? → **./** (按回车)
- Want to override the settings? → **No**

4. **部署到生产环境**
```bash
vercel --prod
```

### 方法 2: 通过 GitHub 自动部署

1. **创建 GitHub 仓库**
```bash
# 如果还没有远程仓库
git remote add origin https://github.com/你的用户名/huazheng-ai.git
git branch -M main
git push -u origin main
```

2. **连接 Vercel**
   - 访问 https://vercel.com
   - 点击 "New Project"
   - 导入您的 GitHub 仓库
   - Vercel 会自动检测 Angular 项目
   - 点击 "Deploy"

3. **自动部署**
   - 每次推送到 `main` 分支时自动部署
   - Pull Request 会创建预览部署

## 📋 部署配置

项目已配置以下文件：

### `vercel.json`
```json
{
  "version": 2,
  "name": "huazheng-ai",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/huazheng-ai/browser"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### `package.json` 添加了构建脚本
```json
"vercel-build": "ng build --configuration production"
```

## 🔧 环境变量（如需要）

如果需要配置环境变量：

1. **在 Vercel Dashboard**
   - 进入项目设置
   - 找到 "Environment Variables"
   - 添加变量

2. **本地开发**
   - 创建 `.env.local` 文件
   - 添加环境变量

## ✅ 部署检查清单

- [x] Git 仓库已初始化
- [x] 代码已提交
- [x] `vercel.json` 已配置
- [x] `package.json` 构建脚本已添加
- [x] `.vercelignore` 已创建
- [ ] 选择部署方法（CLI 或 GitHub）
- [ ] 执行部署命令
- [ ] 验证部署结果

## 🌐 部署后访问

部署成功后，Vercel 会提供：
- **生产环境 URL**: `https://huazheng-ai.vercel.app`
- **预览 URL**: 每次部署都有唯一的预览链接

## 🔍 常见问题

### 构建失败？
```bash
# 本地测试生产构建
npm run build

# 检查是否有错误
```

### 路由 404？
- 确保 `vercel.json` 中的路由配置正确
- Angular 路由需要重定向到 `index.html`

### 部署很慢？
- Vercel 首次部署需要安装依赖
- 后续部署会使用缓存，速度更快

## 📊 性能优化

部署后的优化建议：

1. **启用压缩**（Vercel 自动启用）
2. **CDN 加速**（Vercel 全球 CDN）
3. **缓存策略**（已在构建中优化）

## 🎉 部署成功！

部署完成后：
1. 访问提供的 URL
2. 使用演示账号登录测试
3. 分享给团队成员

---

**祝部署顺利！** 🚀

如有问题，请查看 [Vercel 文档](https://vercel.com/docs)

