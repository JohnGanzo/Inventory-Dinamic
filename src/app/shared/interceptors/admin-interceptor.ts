import { AuthService } from '@auth/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}
  //0:48:13/2:42:29
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('users') || req.url.includes('products') || req.url.includes('invent')) {
      const userValue = this.authSvc.userValue;
      
      const authReq = req.clone({
        setHeaders: {
          auth: userValue.token,
          
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
