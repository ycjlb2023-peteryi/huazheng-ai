import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  private router = inject(Router);
  
  constructor() {
    this.loadUserFromStorage();
  }
  
  getCurrentUser() {
    return this.currentUser.asReadonly();
  }
  
  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }
  
  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }
  
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
  
  login(username: string, password: string): Promise<boolean> {
    // 模拟登录逻辑
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username && password) {
          const user: User = {
            id: '1',
            username,
            role: username === 'admin' ? 'admin' : 'user',
            email: `${username}@huazheng.com`
          };
          
          const token = `token_${Date.now()}`;
          localStorage.setItem('auth_token', token);
          localStorage.setItem('current_user', JSON.stringify(user));
          
          this.currentUser.set(user);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }
  
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
  
  private loadUserFromStorage(): void {
    const userStr = localStorage.getItem('current_user');
    const token = localStorage.getItem('auth_token');
    
    if (userStr && token) {
      try {
        const user = JSON.parse(userStr) as User;
        this.currentUser.set(user);
      } catch {
        this.logout();
      }
    }
  }
}

