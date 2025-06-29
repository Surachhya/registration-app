import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RegistrationService, Registration } from '../services/registration.service';

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-registration-detail',
  templateUrl: './registration-detail.component.html',
  styleUrls: ['./registration-detail.component.css'],
})
export class RegistrationDetailComponent implements OnInit {
  registration: Registration | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.registrationService.getRegistrationById(id).subscribe({
        next: (data) => {
          this.registration = data;
          this.loading = false;
          data.isCompleted = (data as any).IsCompleted ?? data.isCompleted 
        },
        error: (err) => {
          console.error('Failed to load registration', err);
          this.loading = false;
        },
      });
    }
  }

    markComplete(id: string | undefined) {
    if (!id) return;
    this.registrationService.markComplete(id).subscribe({
      next: () => {
        if (this.registration) {
          this.registration.isCompleted = true;
        }
      },
      error: err => {
        console.error('Failed to mark complete', err);
      }
    });   
  }

  deleteRegistration(id: string | undefined) {
    if (!id) return;
    this.registrationService.deleteRegistration(id).subscribe({
      next: () => {

        this.registration = null; 
        window.history.back();      
      },
      error: err => {
        console.error('Failed to delete registration', err);
      }
    });
  }
}
