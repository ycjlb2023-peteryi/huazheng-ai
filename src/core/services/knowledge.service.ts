import { Injectable, signal } from '@angular/core';

export interface KnowledgeDocument {
  id: string;
  name: string;
  type: 'pdf' | 'word' | 'excel' | 'standard';
  category: string;
  applicableProducts: string[];
  priority: number;
  uploadedAt: Date;
  uploadedBy: string;
  size: number;
  status: 'active' | 'archived';
}

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {
  private documents = signal<KnowledgeDocument[]>([
    {
      id: 'doc_1',
      name: 'TY系列滤油机技术方案.pdf',
      type: 'pdf',
      category: '产品方案',
      applicableProducts: ['滤油机', 'TY系列'],
      priority: 1,
      uploadedAt: new Date('2024-01-15'),
      uploadedBy: '管理员',
      size: 2.5 * 1024 * 1024,
      status: 'active'
    },
    {
      id: 'doc_2',
      name: 'GB-T 7595-2008 变压器油质量标准.pdf',
      type: 'standard',
      category: '国家标准',
      applicableProducts: ['滤油机', '变压器油处理'],
      priority: 2,
      uploadedAt: new Date('2024-01-10'),
      uploadedBy: '管理员',
      size: 1.8 * 1024 * 1024,
      status: 'active'
    },
    {
      id: 'doc_3',
      name: '产品参数配置表.xlsx',
      type: 'excel',
      category: '产品参数',
      applicableProducts: ['全部产品'],
      priority: 1,
      uploadedAt: new Date('2024-02-01'),
      uploadedBy: '技术部',
      size: 0.8 * 1024 * 1024,
      status: 'active'
    }
  ]);
  
  private categories = signal<string[]>([
    '产品方案',
    '国家标准',
    '产品参数',
    '案例库',
    '技术文档'
  ]);
  
  getDocuments() {
    return this.documents.asReadonly();
  }
  
  getCategories() {
    return this.categories.asReadonly();
  }
  
  async uploadDocument(file: File, metadata: Omit<KnowledgeDocument, 'id' | 'uploadedAt' | 'size'>): Promise<KnowledgeDocument> {
    // 模拟上传
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const doc: KnowledgeDocument = {
      ...metadata,
      id: `doc_${Date.now()}`,
      uploadedAt: new Date(),
      size: file.size
    };
    
    this.documents.update(docs => [...docs, doc]);
    return doc;
  }
  
  updateDocument(id: string, updates: Partial<KnowledgeDocument>): void {
    this.documents.update(docs =>
      docs.map(doc => doc.id === id ? { ...doc, ...updates } : doc)
    );
  }
  
  deleteDocument(id: string): void {
    this.documents.update(docs => docs.filter(doc => doc.id !== id));
  }
  
  searchDocuments(keyword: string): KnowledgeDocument[] {
    const lower = keyword.toLowerCase();
    return this.documents().filter(doc =>
      doc.name.toLowerCase().includes(lower) ||
      doc.category.toLowerCase().includes(lower) ||
      doc.applicableProducts.some(p => p.toLowerCase().includes(lower))
    );
  }
}

