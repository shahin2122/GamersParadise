import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseUrl = environment.BaseApiUrl;

  constructor(private http: HttpClient) {}

  getMember(id: number){
    return this.http.get<Member>(this.baseUrl + 'users/' + id);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users/' , member);
  }
  
}
