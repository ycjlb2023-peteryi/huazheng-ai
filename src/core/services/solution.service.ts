import { Injectable, signal } from '@angular/core';

export interface SolutionRequest {
  customerRequirement: string;
  knownParameters?: Record<string, string>;
  language: 'zh' | 'en';
}

export interface SolutionResponse {
  id: string;
  productJudgment: string;
  recommendedConfig: {
    standard: string[];
    optional: string[];
  };
  technicalBasis: string[];
  questionsForCustomer: string[];
  customerReply: string;
  createdAt: Date;
  status: 'draft' | 'completed';
}

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  private solutions = signal<SolutionResponse[]>([]);
  private isGenerating = signal(false);
  
  getSolutions() {
    return this.solutions.asReadonly();
  }
  
  getIsGenerating() {
    return this.isGenerating.asReadonly();
  }
  
  async generateSolution(request: SolutionRequest): Promise<SolutionResponse> {
    this.isGenerating.set(true);
    
    // 模拟AI生成过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const solution: SolutionResponse = {
      id: `sol_${Date.now()}`,
      productJudgment: '根据客户需求，推荐使用TY系列真空滤油机，适用于变压器油、透平油等高粘度油品的深度净化处理。',
      recommendedConfig: {
        standard: [
          '双级真空系统',
          '三维立体闪蒸技术',
          '高效精密过滤器',
          '自动温控系统',
          '智能PLC控制'
        ],
        optional: [
          '在线监测系统',
          '远程控制模块',
          '防爆配置',
          '移动底座'
        ]
      },
      technicalBasis: [
        'GB/T 7595-2008 运行中变压器油质量标准',
        '企业技术方案 TY-2024-001',
        'IEC 60422 矿物绝缘油维护指南'
      ],
      questionsForCustomer: [
        '请确认处理油品的粘度范围',
        '是否需要配置在线监测功能？',
        '设备使用环境是否有防爆要求？',
        '预期日处理量是多少吨？'
      ],
      customerReply: this.generateEnglishReply(request),
      createdAt: new Date(),
      status: 'completed'
    };
    
    this.solutions.update(sols => [solution, ...sols]);
    this.isGenerating.set(false);
    
    return solution;
  }
  
  getSolutionById(id: string): SolutionResponse | undefined {
    return this.solutions().find(s => s.id === id);
  }
  
  updateSolution(id: string, updates: Partial<SolutionResponse>): void {
    this.solutions.update(sols => 
      sols.map(s => s.id === id ? { ...s, ...updates } : s)
    );
  }
  
  deleteSolution(id: string): void {
    this.solutions.update(sols => sols.filter(s => s.id !== id));
  }
  
  private generateEnglishReply(request: SolutionRequest): string {
    return `Dear Customer,

Thank you for your inquiry regarding our oil purification equipment.

Based on your requirements, we recommend our TY Series Vacuum Oil Purifier, which is specifically designed for deep purification of transformer oil, turbine oil, and other high-viscosity oils.

Recommended Configuration:
- Dual-stage vacuum system
- 3D flash evaporation technology
- High-efficiency precision filters
- Automatic temperature control
- Intelligent PLC control system

Optional Features:
- Online monitoring system
- Remote control module
- Explosion-proof configuration
- Mobile chassis

Technical Standards:
- GB/T 7595-2008 (Transformer Oil Quality Standard)
- IEC 60422 (Mineral Insulating Oil Maintenance Guide)
- Company Technical Solution TY-2024-001

To provide you with the most accurate quotation and technical proposal, could you please confirm:
1. The viscosity range of the oil to be processed
2. Whether online monitoring is required
3. If explosion-proof configuration is needed
4. Expected daily processing capacity (tons)

We look forward to your reply and are ready to provide detailed technical documentation.

Best regards,
Huazheng Technical Team`;
  }
}

