import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.css'],
  imports: [ReactiveFormsModule]
})
export class EditRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  registrationId!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationId = this.route.snapshot.paramMap.get('id')!;
    this.registrationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      emailAddress: [''],
      phone: [''],
      campus: [''],
      workshop: [''],
    });

    this.registrationService.getRegistrationById(this.registrationId).subscribe(data => {
      this.registrationForm.patchValue(data);
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.registrationService.updateRegistration(this.registrationId, this.registrationForm.value)
        .subscribe(() => {
          this.router.navigate(['/requests']);
        });
    }
  }
}
