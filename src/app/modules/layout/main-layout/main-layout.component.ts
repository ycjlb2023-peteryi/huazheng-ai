import { Component, signal, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  adminOnly?: boolean;
}

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  currentUser = this.authService.getCurrentUser();
  sidebarCollapsed = signal(false);
  
  navItems: NavItem[] = [
    { label: '工作台', path: '/dashboard', icon: '🏠' },
    { label: '生成方案', path: '/solution/generate', icon: '⚡' },
    { label: '历史记录', path: '/solution/history', icon: '📋' },
    { label: '知识库', path: '/knowledge', icon: '📚', adminOnly: true }
  ];
  
  filteredNavItems = computed(() => {
    const isAdmin = this.authService.isAdmin();
    return this.navItems.filter(item => !item.adminOnly || isAdmin);
  });
  
  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }
  
  logout(): void {
    this.authService.logout();
  }
  
  isActive(path: string): boolean {
    return this.router.url.startsWith(path);
  }
}

