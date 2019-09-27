import { Injectable,Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Employee } from './employee';
import {DOCUMENT} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee: Employee;
  waffles: Employee[];
  readonly URL_API = 'http://'+this.document.location.hostname+':3000/apii';

  constructor(@Inject(DOCUMENT) private document: Document,private http: HttpClient) { 
    this.selectedEmployee = new Employee();
  }

  getEmployees() {
    return this.http.get(this.URL_API);
  }

  getfruits() {
    return this.http.get(this.URL_API +`/fruits`);
  }
  
  getcoffee() {
    return this.http.get(this.URL_API +`/coffee`);
  }

  getPastries() {
    return this.http.get(this.URL_API +`/Pastries`);
  }

  postEmployee(waffle: Employee) {
    return this.http.post(this.URL_API, waffle);
  }

  putEmployee(waffle: Employee) {
    return this.http.put(this.URL_API + `/${waffle._id}`, waffle);
  }



}
