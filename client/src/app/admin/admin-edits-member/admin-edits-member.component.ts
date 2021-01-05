import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-admin-edits-member',
  templateUrl: './admin-edits-member.component.html',
  styleUrls: ['./admin-edits-member.component.css']
})
export class AdminEditsMemberComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member : Member;
  user: User;
  @HostListener('window:beforeunload' , ['$event']) unloadNotification($event: any) {
    if(this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  
  constructor(private route: ActivatedRoute, private accountService: AccountService,
    private toastr: ToastrService, private adminService: AdminService) { 

   this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);

 
 }

  ngOnInit(): void {
    
    this.loadMemebr();
  }

  loadMemebr() {
    const id = (Number(this.route.snapshot.paramMap.get('id')));
    this.adminService.getMember(id).subscribe(member => {
      this.member = member;
    });
  }


  updateMember() {
    const id = (Number(this.route.snapshot.paramMap.get('id')));
    this.adminService.updateMember(this.member, id).subscribe(() => {
      this.toastr.success('ویرایش انجام شد');
      this.editForm.reset(this.member);
    });
  }
}
