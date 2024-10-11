import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://6702d65abd7c8c1ccd3ffe2d.mockapi.io/usuarios';  // URL de la API
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>(null);  // Para almacenar el usuario actual
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Método para buscar el usuario en la API
  buscarBD(usuario: string, clave: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${usuario}&password=${clave}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            this.isAuthenticatedSubject.next(true);
            this.currentUserSubject.next(users[0]);  // Almacena el usuario actual
            return true;
          } else {
            this.isAuthenticatedSubject.next(false);
            return false;
          }
        })
      );
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);  // Resetea el usuario actual
  }

  getCurrentUser() {
    return this.currentUserSubject.getValue();
  }
}