import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit{


  public user = new User();

  constructor(private adminService : AdminService , private router : Router){}

  ngOnInit(): void {
    
  }

  

}
