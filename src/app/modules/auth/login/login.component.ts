import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  username = signal('');
  password = signal('');
  isLoading = signal(false);
  errorMessage = signal('');
  
  async onSubmit(): Promise<void> {
    if (!this.username() || !this.password()) {
      this.errorMessage.set('请输入用户名和密码');
      return;
    }
    
    this.isLoading.set(true);
    this.errorMessage.set('');
    
    try {
      const success = await this.authService.login(this.username(), this.password());
      
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage.set('用户名或密码错误');
      }
    } catch (error) {
      this.errorMessage.set('登录失败，请稍后重试');
    } finally {
      this.isLoading.set(false);
    }
  }
  
  updateUsername(value: string): void {
    this.username.set(value);
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }
  
  updatePassword(value: string): void {
    this.password.set(value);
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }
}

