import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'solution',
        children: [
          {
            path: 'generate',
            loadComponent: () => import('./modules/solution/solution-generate/solution-generate.component').then(m => m.SolutionGenerateComponent)
          },
          {
            path: 'history',
            loadComponent: () => import('./modules/solution/solution-history/solution-history.component').then(m => m.SolutionHistoryComponent)
          }
        ]
      },
      {
        path: 'knowledge',
        loadComponent: () => import('./modules/knowledge/knowledge-manage/knowledge-manage.component').then(m => m.KnowledgeManageComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

