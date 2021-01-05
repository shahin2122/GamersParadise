import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { AdminService } from 'src/app/_services/admin.service';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  members: Member[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.adminService.getMembers().subscribe(members =>{
      this.members = members;
    })
  }

}
