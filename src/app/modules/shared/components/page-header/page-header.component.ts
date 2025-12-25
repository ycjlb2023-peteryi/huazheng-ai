import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">{{ title() }}</h1>
          @if (subtitle()) {
            <p class="page-subtitle">{{ subtitle() }}</p>
          }
        </div>
        <div class="header-right">
          <ng-content select="[actions]"></ng-content>
        </div>
      </div>
      @if (showDivider()) {
        <div class="divider"></div>
      }
    </div>
  `,
  styles: [`
    .page-header {
      background: var(--bg-primary);
      border-bottom: 1px solid var(--border-color);
    }
    
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 32px;
      gap: 24px;
    }
    
    .header-left {
      flex: 1;
    }
    
    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }
    
    .page-subtitle {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 0;
    }
    
    .header-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .divider {
      height: 1px;
      background: var(--border-color);
      margin: 0 32px;
    }
  `]
})
export class PageHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>('');
  showDivider = input<boolean>(false);
}

