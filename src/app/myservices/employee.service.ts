import { Injectable } from '@angular/core';
import { IEmployee } from '../models/IEmployee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getAllEmployees(): Observable<IEmployee[]>{    
    // Write a logic to make api call and get the data from database
    return this.http.get<IEmployee[]>("http://localhost:19373/api/EmpWebAPI/AllEmployees");
  }

  getEmployeeByEmpId(EmpId:number): Observable<IEmployee>{
    return this.http.get<IEmployee>("http://localhost:19373/api/EmpWebAPI/EmployeeByEmpId?EmpId="+EmpId);
  }

  insertEmployee(Emp:IEmployee):Observable<number>{
    debugger;
    return this.http.post<number>("http://localhost:19373/api/EmpWebAPI/InsertEmployee", Emp);
  }

  updateEmployee(Emp:IEmployee):Observable<string>{
    return this.http.put<string>("http://localhost:19373/api/EmpWebAPI/UpdateEmployee", Emp);
  }

  deleteEmployee(EmpId:number):Observable<string>{
    return this.http.delete<string>("http://localhost:19373/api/EmpWebAPI/DeleteEmployee?EmpId="+EmpId);
  }
}
