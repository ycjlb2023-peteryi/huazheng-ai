import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KnowledgeService, type KnowledgeDocument } from '../../../../core/services/knowledge.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-knowledge-manage',
  imports: [CommonModule, FormsModule, PageHeaderComponent, EmptyStateComponent, LoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './knowledge-manage.component.html',
  styleUrls: ['./knowledge-manage.component.scss']
})
export class KnowledgeManageComponent {
  private knowledgeService = inject(KnowledgeService);
  
  documents = this.knowledgeService.getDocuments();
  categories = this.knowledgeService.getCategories();
  
  searchKeyword = signal('');
  selectedCategory = signal('all');
  showUploadModal = signal(false);
  isUploading = signal(false);
  
  // 上传表单
  uploadForm = signal({
    name: '',
    type: 'pdf' as 'pdf' | 'word' | 'excel' | 'standard',
    category: '产品方案',
    applicableProducts: '',
    priority: 1,
    uploadedBy: '管理员',
    status: 'active' as 'active' | 'archived'
  });
  
  selectedFile = signal<File | null>(null);
  
  filteredDocuments = computed(() => {
    const docs = this.documents();
    const keyword = this.searchKeyword().toLowerCase();
    const category = this.selectedCategory();
    
    return docs.filter(doc => {
      if (category !== 'all' && doc.category !== category) {
        return false;
      }
      
      if (keyword) {
        return doc.name.toLowerCase().includes(keyword) ||
               doc.category.toLowerCase().includes(keyword) ||
               doc.applicableProducts.some(p => p.toLowerCase().includes(keyword));
      }
      
      return true;
    });
  });
  
  stats = computed(() => {
    const docs = this.documents();
    return {
      total: docs.length,
      active: docs.filter(d => d.status === 'active').length,
      byCategory: this.categories().map(cat => ({
        name: cat,
        count: docs.filter(d => d.category === cat).length
      }))
    };
  });
  
  openUploadModal(): void {
    this.showUploadModal.set(true);
  }
  
  closeUploadModal(): void {
    this.showUploadModal.set(false);
    this.resetUploadForm();
  }
  
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile.set(input.files[0]);
      
      // 自动推断文件类型
      const fileName = input.files[0].name.toLowerCase();
      if (fileName.endsWith('.pdf')) {
        this.updateFormField('type', 'pdf');
      } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
        this.updateFormField('type', 'word');
      } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        this.updateFormField('type', 'excel');
      }
      
      // 自动填充名称
      if (!this.uploadForm().name) {
        this.updateFormField('name', input.files[0].name);
      }
    }
  }
  
  async submitUpload(): Promise<void> {
    const file = this.selectedFile();
    if (!file) {
      alert('请选择文件');
      return;
    }
    
    const form = this.uploadForm();
    if (!form.name || !form.category) {
      alert('请填写完整信息');
      return;
    }
    
    this.isUploading.set(true);
    
    try {
      const products = form.applicableProducts
        .split(',')
        .map(p => p.trim())
        .filter(p => p);
      
      await this.knowledgeService.uploadDocument(file, {
        name: form.name,
        type: form.type,
        category: form.category,
        applicableProducts: products,
        priority: form.priority,
        uploadedBy: form.uploadedBy,
        status: form.status
      });
      
      this.closeUploadModal();
      alert('上传成功！');
    } catch (error) {
      alert('上传失败，请重试');
    } finally {
      this.isUploading.set(false);
    }
  }
  
  deleteDocument(id: string): void {
    if (confirm('确定要删除这个文档吗？')) {
      this.knowledgeService.deleteDocument(id);
    }
  }
  
  toggleDocumentStatus(doc: KnowledgeDocument): void {
    const newStatus = doc.status === 'active' ? 'archived' : 'active';
    this.knowledgeService.updateDocument(doc.id, { status: newStatus });
  }
  
  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
  
  formatDate(date: Date): string {
    return date.toLocaleDateString('zh-CN');
  }
  
  getFileIcon(type: string): string {
    const icons: Record<string, string> = {
      pdf: '📕',
      word: '📘',
      excel: '📊',
      standard: '📜'
    };
    return icons[type] || '📄';
  }
  
  updateSearchKeyword(value: string): void {
    this.searchKeyword.set(value);
  }
  
  updateCategory(value: string): void {
    this.selectedCategory.set(value);
  }
  
  updateFormField(field: string, value: any): void {
    this.uploadForm.update(form => ({ ...form, [field]: value }));
  }
  
  resetUploadForm(): void {
    this.uploadForm.set({
      name: '',
      type: 'pdf',
      category: '产品方案',
      applicableProducts: '',
      priority: 1,
      uploadedBy: '管理员',
      status: 'active'
    });
    this.selectedFile.set(null);
  }
}

