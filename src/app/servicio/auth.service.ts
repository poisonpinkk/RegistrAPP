import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://6702d65abd7c8c1ccd3ffe2d.mockapi.io/usuarios';  // URL de la API
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); // Inicialmente en false
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>(null);  // Almacena el usuario actual
  currentUser$ = this.currentUserSubject.asObservable();       // Expone el usuario actual como un Observable

  constructor(private http: HttpClient) {}

  // Método para buscar el usuario en la API y validar la contraseña
  buscarBD(usuario: string, clave: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${usuario}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            const user = users[0];
            if (user.password === clave) {  // Validamos si la contraseña coincide
              this.isAuthenticatedSubject.next(true);
              this.currentUserSubject.next(user);  // Almacena el usuario actual
              return true;
            }
          }
          this.isAuthenticatedSubject.next(false);
          return false;
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