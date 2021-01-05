import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  member: Member;


  constructor(private adminService: AdminService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.adminService.getMember(Number(this.route.snapshot.paramMap.get('id'))).subscribe(member => {
      this.member = member;
      
    })
  }

  
}
