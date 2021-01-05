import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AdminService } from 'src/app/_services/admin.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member : Member;
  user: User;
  @HostListener('window:beforeunload' , ['$event']) unloadNotification($event: any) {
    if(this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

    constructor(private route: ActivatedRoute, private accountService: AccountService,
       private toastr: ToastrService, private memberService: MemberService) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    }

    ngOnInit(): void {
      this.loadMember();
    }
  
    loadMember() {
      
        this.memberService.getMember(this.user.id).subscribe(member => {
         this.member = member;
        }) 
      }
     
    

    updateMember() {

    
        console.log('self edit for member :' + this.user.id);
        this.memberService.updateMember(this.member).subscribe(() => {
          this.toastr.success('ویرایش انجام شد');
          this.editForm.reset(this.member);
        })
      
    }
  
  }
