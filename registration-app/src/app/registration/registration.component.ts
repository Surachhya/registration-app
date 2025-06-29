import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RegistrationService, Registration } from '../services/registration.service'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  model: Registration = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    phone: '',
    campus: '',
    workshop: ''
  };

  submitting = false;
  isEditMode = false;
  requestId: string | null = null;

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id');
    if (this.requestId) {
      this.isEditMode = true;
      this.registrationService.getRegistrationById(this.requestId).subscribe({
        next: (data) => {
          this.model = data;
        },
        error: (err) => {
          console.error('Failed to load registration', err);
        }
      });
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.submitting = true;

    if (this.isEditMode && this.requestId) {
      this.registrationService.updateRegistration(this.requestId, this.model).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/requests']);
        },
        error: (error) => {
          console.error('Update failed:', error);
          alert('Failed to update registration.');
          this.submitting = false;
        }
      });
    } else {
      this.registrationService.submitRegistration(this.model).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/confirmation']);
        },
        error: (error) => {
          console.error('Error saving registration:', error);
          alert('Failed to save registration.');
          this.submitting = false;
        }
      });
    }
  }
}
