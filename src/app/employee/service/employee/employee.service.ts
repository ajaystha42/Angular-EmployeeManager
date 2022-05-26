import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../../model/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly EMPLOYEE_BASE_URL = environment.EMPLOYEE_BASE_URL;
  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.EMPLOYEE_BASE_URL}/all`);
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.httpClient.get<Employee>(
      `${this.EMPLOYEE_BASE_URL}/${employeeId}`
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(
      `${this.EMPLOYEE_BASE_URL}/add`,
      employee
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(
      `${this.EMPLOYEE_BASE_URL}/update`,
      employee
    );
  }

  deleteEmployee(employeeId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.EMPLOYEE_BASE_URL}/delete/${employeeId}`
    );
  }
}
