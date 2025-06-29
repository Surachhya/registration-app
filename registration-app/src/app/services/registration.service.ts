import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Registration {
  _id?: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phone: string;
  campus: string;
  workshop: string;
  isCompleted?: boolean;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  //private apiUrl = 'http://localhost:3000/api/request-info';
  private apiUrl = 'https://registration-app-osrf.onrender.com/api/request-info';

  constructor(private http: HttpClient) { }

  submitRegistration(data: Registration): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  getRegistrations() : Observable<Registration[]> {
  return this.http.get<Registration[]>(this.apiUrl);
  }
  deleteRegistration(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateRegistration(id: string, data: Registration): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  markComplete(id: string): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${id}/complete`, {});
  }
  getRegistrationById(id: string): Observable<Registration> {
  return this.http.get<Registration>(`${this.apiUrl}/${id}`);
}

}
