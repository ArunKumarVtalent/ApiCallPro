import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDepartment } from '../models/IDepartment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }

  getAllDepartments():Observable<IDepartment[]>{
    return this.http.get<IDepartment[]>("http://localhost:19373/api/DeptWebAPI/AllDepartments");
  }
}
