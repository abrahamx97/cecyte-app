import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { SERVER_URL } from '../../config'
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { tap } from 'rxjs/operators/tap';
import { Storage } from "@ionic/storage";

@Injectable()
export class AuthProvider {

    private jwtTokenName = 'token';
    authUser = new ReplaySubject<any>(1);

    constructor(private readonly httpClient: HttpClient,
        private readonly storage: Storage,
        private readonly jwtHelper: JwtHelperService) {

    }

    checkLogin() {   
        this.storage.get(this.jwtTokenName).then(jwt => {
            if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
                this.httpClient.get(`${SERVER_URL}`)
                    .subscribe(() => this.authUser.next(jwt),
                    (err) => this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null)));
            }
            else {
                this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
            }
        });
    }

    login(values: any): Observable<any> {
        return this.httpClient.post(`${SERVER_URL}/api/v1/login/alumno`, values, { responseType: 'json', observe: 'response' } )
            .pipe(tap(response => this.handleJwtResponse(response)));
    }

    logout() {
        this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
    }

    private handleJwtResponse(response) {
        if (response.status != 200) return 0
        let token = response.body['token']
        return this.storage.set(this.jwtTokenName, token)
            .then(() => this.authUser.next(token))
            .then(() => token);
    }

}
