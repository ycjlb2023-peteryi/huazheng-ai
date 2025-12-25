import { Component, signal, computed, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SolutionService, type SolutionRequest, type SolutionResponse } from '../../../../core/services/solution.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-solution-generate',
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './solution-generate.component.html',
  styleUrls: ['./solution-generate.component.scss']
})
export class SolutionGenerateComponent implements OnInit {
  private solutionService = inject(SolutionService);
  private route = inject(ActivatedRoute);
  
  // 表单数据
  customerRequirement = signal('');
  selectedLanguage = signal<'zh' | 'en'>('en');
  
  // 状态管理
  isGenerating = this.solutionService.getIsGenerating();
  currentSolution = signal<SolutionResponse | null>(null);
  showResult = signal(false);
  
  // AI提示问题
  suggestedQuestions = signal([
    '客户需要处理什么类型的油品？',
    '设备的日处理量需求是多少？',
    '使用环境有什么特殊要求？',
    '是否需要在线监测功能？'
  ]);
  
  // 导出选项
  exportOptions = [
    { label: '导出为Word', icon: '📄', action: () => this.exportWord() },
    { label: '导出为PDF', icon: '📋', action: () => this.exportPDF() },
    { label: '复制文本', icon: '📝', action: () => this.copyText() }
  ];
  
  ngOnInit(): void {
    // 如果有ID参数，加载对应的方案
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        const solution = this.solutionService.getSolutionById(params['id']);
        if (solution) {
          this.currentSolution.set(solution);
          this.showResult.set(true);
        }
      }
    });
  }
  
  async generateSolution(): Promise<void> {
    if (!this.customerRequirement().trim()) {
      return;
    }
    
    const request: SolutionRequest = {
      customerRequirement: this.customerRequirement(),
      language: this.selectedLanguage()
    };
    
    try {
      const solution = await this.solutionService.generateSolution(request);
      this.currentSolution.set(solution);
      this.showResult.set(true);
    } catch (error) {
      console.error('生成方案失败:', error);
    }
  }
  
  resetForm(): void {
    this.customerRequirement.set('');
    this.currentSolution.set(null);
    this.showResult.set(false);
  }
  
  addSuggestedQuestion(question: string): void {
    const current = this.customerRequirement();
    this.customerRequirement.set(current ? `${current}\n${question}` : question);
  }
  
  exportWord(): void {
    // 模拟导出Word
    alert('导出Word功能开发中...');
  }
  
  exportPDF(): void {
    // 模拟导出PDF
    alert('导出PDF功能开发中...');
  }
  
  copyText(): void {
    if (!this.currentSolution()) return;
    
    const solution = this.currentSolution()!;
    const text = `${solution.customerReply}`;
    
    navigator.clipboard.writeText(text).then(() => {
      alert('已复制到剪贴板！');
    });
  }
  
  updateRequirement(value: string): void {
    this.customerRequirement.set(value);
  }
  
  updateLanguage(value: string): void {
    this.selectedLanguage.set(value as 'zh' | 'en');
  }
}

