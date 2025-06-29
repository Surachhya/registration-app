import { Component, OnInit } from '@angular/core';
import { Registration, RegistrationService } from '../services/registration.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-requests-list',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  imports: [CommonModule, RouterModule],
})
export class RequestsListComponent implements OnInit {
  requests: Registration[] = [];

  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.registrationService.getRegistrations().subscribe(data => {
      this.requests = data.map(item => ({
        ...item,
        isCompleted: (item as any).IsCompleted ?? item.isCompleted 
      }));
    });
  }
  markComplete(id: string | undefined) {
    if (!id) return;

    this.registrationService.markComplete(id).subscribe({
      next: () => {

        const request = this.requests.find(r => r._id === id);
        if (request) {
          request.isCompleted = true;
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
        this.requests = this.requests.filter(r => r._id !== id);
      },
      error: err => {
        console.error('Failed to delete registration', err);
      }
    });
  }
}
