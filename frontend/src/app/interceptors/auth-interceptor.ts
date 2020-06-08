import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserService} from "../services/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.headers.get('noToken') !== 'true') {
      req = req.clone({
        setHeaders: {
          Authorization: this.userService.getSignedInUser().token
        }
      });
    }

    return next.handle(req);
  }

}
