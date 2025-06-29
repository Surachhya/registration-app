import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { RequestsListComponent } from './requests/requests.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationDetailComponent } from './registration-detail/registration-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'requests', component: RequestsListComponent },
    { path: 'confirmation', component: ConfirmationComponent },
    { path: 'edit/:id', component: RegistrationComponent },
    { path: 'registration/:id/view', component: RegistrationDetailComponent },
];
