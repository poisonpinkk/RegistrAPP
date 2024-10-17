import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; //importar para obtener los datos de la api
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://6702d65abd7c8c1ccd3ffe2d.mockapi.io/usuarios';  // URL de la API
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); // Inicialmente en false ya que el usuario no esta inicializado
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();  //expone el estado de autenticacion (true o false) como un observable para que otros componentes puedan reaccionar a los cambios 

  private currentUserSubject = new BehaviorSubject<any>(null);  // Almacena el usuario actual
  currentUser$ = this.currentUserSubject.asObservable();       // Expone el usuario actual como un Observable

  constructor(private http: HttpClient) {}  //inyectamos el servicio httpclient para las solicitudes de la api 

  // Método para buscar el usuario en la API y validar la contraseña
  buscarBD(usuario: string, clave: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${usuario}`) //solicitud get con el parametro username, devuelve una lista de usuarios que coincidan con el nombre proporcionado
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
    return this.currentUserSubject.getValue();  //obtiene el valor actual del currentusersubject
  }
}