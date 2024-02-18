import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { environment } from '../../../enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  
  apiURL = environment.AUTENTICACION_URL;
  constructor(private http: HttpClient) {}

   /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // HttpClient API get() method => Fetch CredencialesPermisos list
  getCredencialesPermisos(permisos : any): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' ,
          'Authorization' : 'bearer '+permisos.token
        })
    };

    return this.http
      .get<any>(this.apiURL + 'allows/' + permisos.role, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}


