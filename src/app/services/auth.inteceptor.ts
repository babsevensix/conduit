import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { UserService } from "./users.service";
import { ToastrService } from "ngx-toastr";


export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): 
        Observable<HttpEvent<unknown>> => {
    const userService = inject(UserService);

    const toastrService = inject(ToastrService);

    let newReq = req.clone();

    if (userService.Token){
        newReq = req.clone({
            headers: req.headers.set('Authorization', `Token ${userService.Token}` ),
        })
    }

    console.log(' NewREQ: ' ,newReq);
    return next(newReq).pipe(
        catchError((error)=>{
            if (error instanceof HttpErrorResponse && error.status === 401){
                // Fare qualcosa
                console.error(' ACCESSO NON COSENTITO AGLI UTENTI NON AUTORIZZATI')
                toastrService.error(' ACCESSO NON COSENTITO AGLI UTENTI NON AUTORIZZATI')
            }

            return throwError(()=> new Error(error));
        })
    );
}