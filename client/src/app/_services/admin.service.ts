import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

baseUrl = environment.BaseApiUrl;

  constructor(private http: HttpClient) {}


   getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(id: number){
    return this.http.get<Member>(this.baseUrl + 'users/' + id);
  }

  updateMember(member: Member, userId: number) {
    return this.http.put(this.baseUrl + 'users/' + userId , member);

 
  }
}
