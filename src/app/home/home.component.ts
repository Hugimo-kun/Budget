import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  IDENTIFIANTS = {
    email: 'admin@gmail.com',
    password: 'motdepasse1234',
  };
  isVisible: boolean = false;
  isConnected: boolean = false;

  constructor(private router: Router) {}

  public form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    let formLogin = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };

    if (
      formLogin.email === this.IDENTIFIANTS.email &&
      formLogin.password === this.IDENTIFIANTS.password
    ) {
      this.isVisible = false;
      this.isConnected = true;
      this.router.navigate(['/dashboard'], {
        state: {
          isConnected: true,
        },
      });
    } else {
      this.isConnected = false;
      this.isVisible = true;
    }
  }
}
