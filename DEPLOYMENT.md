# 部署指南 - IFSHEN2002 个人主页

## 方案一：Vercel 部署（推荐）

### 步骤 1：准备文件
确保你有以下文件：
- `index.html`
- `styles.css` 
- `script.js`
- `README.md`

### 步骤 2：访问 Vercel
1. 打开浏览器，访问 [vercel.com](https://vercel.com)
2. 点击 "Sign Up" 注册账号
3. 选择 "Continue with GitHub" 或使用邮箱注册

### 步骤 3：部署网站
1. 登录后，点击 "New Project"
2. 选择 "Browse all templates"
3. 选择 "Other" -> "Deploy"
4. 将你的项目文件夹拖拽到上传区域
5. 点击 "Deploy"

### 步骤 4：配置自定义域名
1. 部署完成后，进入项目设置
2. 点击 "Domains" 标签
3. 添加你的域名：`ifshen2002.publicvm.com`
4. 按照提示配置DNS记录

### 步骤 5：DNS配置
在你的域名管理面板中添加以下记录：
```
类型: CNAME
名称: www
值: cname.vercel-dns.com

类型: A
名称: @
值: 76.76.19.61
```

## 方案二：Netlify 部署

### 步骤 1：访问 Netlify
1. 打开 [netlify.com](https://netlify.com)
2. 点击 "Sign up" 注册账号
3. 选择 "Sign up with GitHub" 或使用邮箱

### 步骤 2：部署网站
1. 登录后，点击 "Add new site" -> "Deploy manually"
2. 将你的项目文件夹拖拽到 "Deploy manually" 区域
3. 等待部署完成

### 步骤 3：配置域名
1. 进入 "Site settings" -> "Domain management"
2. 点击 "Add custom domain"
3. 输入：`ifshen2002.publicvm.com`
4. 按照提示配置DNS

## 方案三：GitHub Pages

### 步骤 1：创建 GitHub 仓库
1. 访问 [github.com](https://github.com)
2. 创建新仓库，命名为 `ifshen2002profile`
3. 上传所有文件到仓库

### 步骤 2：启用 GitHub Pages
1. 进入仓库设置 (Settings)
2. 找到 "Pages" 部分
3. 选择 "Deploy from a branch"
4. 选择 "main" 分支
5. 保存设置

### 步骤 3：配置自定义域名
1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容：`ifshen2002.publicvm.com`
3. 提交并推送更改

## DNS 配置说明

无论选择哪个平台，你都需要在域名管理面板配置DNS：

### 对于 Vercel：
```
类型: CNAME
名称: www
值: cname.vercel-dns.com

类型: A  
名称: @
值: 76.76.19.61
```

### 对于 Netlify：
```
类型: CNAME
名称: www
值: your-site-name.netlify.app

类型: CNAME
名称: @
值: your-site-name.netlify.app
```

### 对于 GitHub Pages：
```
类型: CNAME
名称: www
值: your-username.github.io

类型: A
名称: @
值: 185.199.108.153
```

## 验证部署

部署完成后，访问你的域名：
- `https://ifshen2002.publicvm.com`
- `https://www.ifshen2002.publicvm.com`

## 常见问题

### Q: DNS 配置后多久生效？
A: 通常 5-30 分钟，最多可能需要 24 小时

### Q: 如何检查 DNS 是否生效？
A: 使用在线工具如 [whatsmydns.net](https://whatsmydns.net)

### Q: 网站显示 404 错误？
A: 确保 `index.html` 在根目录，文件名正确

### Q: HTTPS 证书问题？
A: 这些平台都自动提供免费 SSL 证书

## 推荐流程

1. **首选 Vercel**（最简单）
2. 如果 Vercel 有问题，尝试 Netlify
3. 最后选择 GitHub Pages

## 后续优化

部署成功后，你可以：
1. 添加 Google Analytics 统计
2. 配置 SEO 优化
3. 添加更多页面和功能
4. 设置自动部署

---

**注意**：所有方案都是完全免费的，选择最适合你的即可！
