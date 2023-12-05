// token.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Получите токен из вашего места хранения токена (например, localStorage)
    let token = localStorage.getItem('access_token');
    token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxNCwidHlwIjoiSldUIiwiZW1haWwiOiJkZW5pc2Vyb2NoZW5rb0BnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQ0xJRU5UX1BSSVZJTEVHRSJ9XSwidHdvX2ZhY3RvciI6ZmFsc2UsInN1YiI6IlFQIiwiaXNzIjoiUUFaQVFQQVkiLCJleHAiOjE3MDE4MTI1NzN9.fGuEfhnaxOokKbP1r3J4b6P7a3LADac66KvEFYkrLDh4I5UHUCgh_2yPqteYAqfcZu2rZHku9HhaffXaLi7mRQ"



    if (token) {
      // Если токен существует, добавьте его к заголовкам запроса
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Передайте запрос следующему обработчику в цепочке
    return next.handle(request);
  }
}
