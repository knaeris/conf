import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class UnAuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(map(event => {
      if (event instanceof HttpResponse) {
        if (event.status == 401) {
          this.userService.signOut();
        }
      }
      return event;
    }));
  }
}
