import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../models/IEmployee';
import { EmployeeService } from '../myservices/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  constructor(private empService:EmployeeService, private route:Router){}
  EmpList?:IEmployee[];

  ngOnInit(): void {
   this.empService.getAllEmployees().subscribe(data => this.EmpList = data, error => alert(error));
  }

  btn_Edit(EmpId:any):void{
    //alert(EmpId+" - Redirect to Edit Page...!");
    // Persist EmpId 
    window.sessionStorage.setItem("empId", EmpId);
    //window.localStorage.setItem("empId", EmpId);
    this.route.navigate(["edit"]);
  }

  btn_Delete(EmpId:any):void{
    //alert(EmpId+" - Redirect to Delete Page...!");
    window.sessionStorage.setItem("empId", EmpId.toString());
    // window.localStorage.setItem("empId", EmpId.toString());
    this.route.navigate(["delete"]);
  }

}
