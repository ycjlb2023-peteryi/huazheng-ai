import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SolutionService, type SolutionResponse } from '../../../../core/services/solution.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-solution-history',
  imports: [CommonModule, FormsModule, PageHeaderComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './solution-history.component.html',
  styleUrls: ['./solution-history.component.scss']
})
export class SolutionHistoryComponent {
  private router = inject(Router);
  private solutionService = inject(SolutionService);
  
  allSolutions = this.solutionService.getSolutions();
  searchKeyword = signal('');
  selectedFilter = signal<'all' | 'completed' | 'draft'>('all');
  
  filteredSolutions = computed(() => {
    const solutions = this.allSolutions();
    const keyword = this.searchKeyword().toLowerCase();
    const filter = this.selectedFilter();
    
    return solutions.filter(solution => {
      // 状态过滤
      if (filter !== 'all' && solution.status !== filter) {
        return false;
      }
      
      // 关键词搜索
      if (keyword) {
        return solution.productJudgment.toLowerCase().includes(keyword);
      }
      
      return true;
    });
  });
  
  stats = computed(() => {
    const solutions = this.allSolutions();
    return {
      total: solutions.length,
      completed: solutions.filter(s => s.status === 'completed').length,
      draft: solutions.filter(s => s.status === 'draft').length
    };
  });
  
  viewSolution(id: string): void {
    this.router.navigate(['/solution/generate'], { queryParams: { id } });
  }
  
  deleteSolution(id: string, event: Event): void {
    event.stopPropagation();
    
    if (confirm('确定要删除这个方案吗？')) {
      this.solutionService.deleteSolution(id);
    }
  }
  
  createNew(): void {
    this.router.navigate(['/solution/generate']);
  }
  
  formatDate(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    
    return date.toLocaleDateString('zh-CN');
  }
  
  updateSearchKeyword(value: string): void {
    this.searchKeyword.set(value);
  }
  
  updateFilter(value: string): void {
    this.selectedFilter.set(value as 'all' | 'completed' | 'draft');
  }
}

