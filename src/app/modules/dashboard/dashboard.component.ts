import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SolutionService } from '../../../core/services/solution.service';
import { PageHeaderComponent } from '../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../shared/components/empty-state/empty-state.component';

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  action: () => void;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, PageHeaderComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private solutionService = inject(SolutionService);
  
  currentUser = this.authService.getCurrentUser();
  recentSolutions = computed(() => this.solutionService.getSolutions()().slice(0, 5));
  
  stats = signal([
    { label: '今日方案', value: 12, icon: '📊', color: '#2563eb' },
    { label: '本月方案', value: 156, icon: '📈', color: '#10b981' },
    { label: '平均响应', value: '2.5分钟', icon: '⚡', color: '#f59e0b' },
    { label: '知识库文档', value: 48, icon: '📚', color: '#8b5cf6' }
  ]);
  
  quickActions: QuickAction[] = [
    {
      title: '生成新方案',
      description: '开始为客户生成技术方案',
      icon: '⚡',
      action: () => this.router.navigate(['/solution/generate']),
      color: '#2563eb'
    },
    {
      title: '查看历史',
      description: '浏览所有历史方案记录',
      icon: '📋',
      action: () => this.router.navigate(['/solution/history']),
      color: '#10b981'
    },
    {
      title: '知识库管理',
      description: '上传和管理企业知识文档',
      icon: '📚',
      action: () => this.router.navigate(['/knowledge']),
      color: '#f59e0b'
    }
  ];
  
  tips = signal([
    '💡 输入客户需求时，描述越详细，AI生成的方案越精准',
    '🎯 记得在方案中标注不确定项，提醒客户确认',
    '🌐 AI会自动生成英文回复，可直接复制发送给客户',
    '📚 定期更新知识库，保持AI方案的准确性'
  ]);
  
  currentTipIndex = signal(0);
  
  constructor() {
    // 定时切换提示
    setInterval(() => {
      this.currentTipIndex.update(i => (i + 1) % this.tips().length);
    }, 5000);
  }
  
  formatDate(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    return `${days}天前`;
  }
  
  viewSolution(id: string): void {
    this.router.navigate(['/solution/generate'], { queryParams: { id } });
  }
}

