import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MasterService } from './master.service';
import { APIConstant } from '../constants/api.constant';
import { environment } from '../../../environments/environment';
import { UserInterface } from '../models/interfaces/user.interface';
import { UserRespInterface } from '../models/interfaces/userResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string
  currentUserSig = signal<UserInterface | null | undefined>(undefined) // We don't know if we're loggedIn or not == undefined, we know we're not loggedIn == null, we know we loggedIn == UserInterface

  constructor(private masterService: MasterService) { 
    this.baseUrl = environment.config.apiURL
  }

  register(body: {user: {username: string, email: string, password: string}}): Observable<UserInterface> {
    const url: string  = `${this.baseUrl}/${APIConstant.users.REGISTER}`
    return this.masterService.post<UserRespInterface>(url, body).pipe(map(resp => resp.user))
  }

  login(body: {user: {email: string, password: string}}): Observable<UserInterface> {
    const url: string  = `${this.baseUrl}/${APIConstant.users.LOGIN}`
    return this.masterService.post<UserRespInterface>(url, body).pipe(map(resp => resp.user))
  }

  getCurrentUser(): Observable<UserInterface> {
    const url: string  = `${this.baseUrl}/${APIConstant.users.GET_CURRENT_USER}`
    return this.masterService.get<UserRespInterface>(url).pipe(map(resp => resp.user))
  }
  
}
