# 开发指南

## 🎯 项目概览

铧正外贸AI技术方案系统是一个基于 Angular 20+ 的现代化 Web 应用，采用最新的 Angular 特性和最佳实践。

## 🏗️ 架构设计

### 模块划分

```
├── core/                    # 核心功能模块
│   ├── guards/             # 路由守卫
│   ├── interceptors/       # HTTP拦截器
│   └── services/           # 业务服务
│
├── modules/                 # 功能模块
│   ├── auth/               # 认证模块
│   ├── dashboard/          # 工作台
│   ├── layout/             # 布局
│   ├── solution/           # 方案管理
│   └── knowledge/          # 知识库
│
└── shared/                  # 共享模块
    └── components/         # 共享组件
```

### 技术选型

| 技术 | 版本 | 用途 |
|------|------|------|
| Angular | 20+ | 前端框架 |
| TypeScript | 5.6+ | 开发语言 |
| SCSS | - | 样式预处理 |
| Signals | Angular 20 | 状态管理 |
| Standalone Components | Angular 20 | 组件架构 |

## 🎨 设计系统

### 颜色规范

```scss
// 主色系
--primary-color: #2563eb;
--primary-light: #60a5fa;
--primary-dark: #1e40af;

// 辅助色
--secondary-color: #10b981;
--accent-color: #f59e0b;
--danger-color: #ef4444;
--warning-color: #f59e0b;
```

### 组件规范

1. **独立组件优先**
   - 所有新组件必须是 standalone
   - 不使用 NgModules
   - 明确声明所有依赖

2. **状态管理**
   ```typescript
   // 使用 signals
   const count = signal(0);
   const double = computed(() => count() * 2);
   
   // 更新
   count.set(5);
   count.update(v => v + 1);
   ```

3. **控制流**
   ```html
   <!-- 使用新语法 -->
   @if (condition) {
     <div>Content</div>
   }
   
   @for (item of items; track item.id) {
     <div>{{ item.name }}</div>
   }
   ```

4. **输入输出**
   ```typescript
   // 使用函数式API
   title = input.required<string>();
   action = output<void>();
   ```

## 📝 编码规范

### TypeScript

```typescript
// ✅ 好的做法
interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
}

const user = signal<User | null>(null);

// ❌ 避免
const user: any = null;
```

### 组件结构

```typescript
@Component({
  selector: 'app-example',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  // 1. 依赖注入
  private service = inject(SomeService);
  
  // 2. 输入输出
  title = input.required<string>();
  action = output<void>();
  
  // 3. Signals
  data = signal<Data[]>([]);
  
  // 4. Computed
  filtered = computed(() => {
    return this.data().filter(/* ... */);
  });
  
  // 5. 方法
  handleClick(): void {
    // ...
  }
}
```

### 样式规范

```scss
.component {
  // 使用 CSS 变量
  background: var(--bg-primary);
  color: var(--text-primary);
  
  // 嵌套不超过3层
  .child {
    .grandchild {
      // ...
    }
  }
  
  // 使用转换和过渡
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-2px);
  }
}
```

## 🔧 常用命令

### 开发
```bash
# 启动开发服务器
npm start

# 构建
npm run build

# 构建并监听
npm run watch
```

### 代码质量
```bash
# 运行测试
npm test

# 代码检查
npm run lint

# 格式化代码
npm run format
```

## 🚀 部署流程

### 开发环境
```bash
npm run build --configuration development
```

### 生产环境
```bash
npm run build --configuration production
```

输出文件位于 `dist/huazheng-ai/`

## 🐛 调试技巧

### Angular DevTools
1. 安装 Chrome 扩展
2. 打开浏览器开发者工具
3. 切换到 Angular 标签

### 常见问题

**问题：Signal 值没有更新**
```typescript
// ❌ 错误
signal.value = newValue;

// ✅ 正确
signal.set(newValue);
signal.update(v => v + 1);
```

**问题：组件没有检测到变化**
```typescript
// 确保使用 OnPush 策略
changeDetection: ChangeDetectionStrategy.OnPush

// 使用 signals 触发更新
data.set([...data(), newItem]);
```

## 📚 参考资源

- [Angular 官方文档](https://angular.dev)
- [Angular Signals](https://angular.dev/guide/signals)
- [Angular 20 新特性](https://blog.angular.io)

## 🤝 贡献指南

1. 创建功能分支
2. 遵循编码规范
3. 编写清晰的提交信息
4. 提交 Pull Request

## 📞 技术支持

遇到问题？联系开发团队：
- 邮箱：dev@huazheng.com
- 内部支持群：xxx

---

祝开发愉快！🎉

