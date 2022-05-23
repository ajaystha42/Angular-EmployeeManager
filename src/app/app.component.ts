import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EMPLOYEE_BASE_URL } from './employee/constants/employee.constant';

import { Employee } from './employee/model/employee.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'employeeManager-client';
  employees:Employee[] = []
  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    // this.getEmployees().subscribe((res:any)=> {
    //   this.employees = res;
    // });
 
  }

  // onAddBtnClick () {
  //   this.addEmployee().subscribe((res:Employee) => [
  //     console.log({res})
      
  //   ]);
  // }
  
  // getEmployees(): Observable<Employee> {
  //   return this.httpClient.get<Employee>(`${EMPLOYEE_BASE_URL}`);
  // }



  // addEmployee() : Observable<Employee> {
  //   let employee: Employee = { email:'test@gmail.com',name:'TEst Name' ,  imageUrl:'/abc' , jobTitle:"TEst" ,  phone:'123'} 
  //    return this.httpClient.post<Employee>(`${EMPLOYEE_BASE_URL}/add` , employee);

  // }
}
