import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { SERVER_URL } from '../../config'
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { tap } from 'rxjs/operators/tap';
import { Storage } from "@ionic/storage";
import { AlertController } from 'ionic-angular'

@Injectable()
export class AuthProvider {

    authUser = new ReplaySubject<any>(1);

    constructor(private readonly httpClient: HttpClient,
        private readonly storage: Storage,
        private readonly jwtHelper: JwtHelperService, private alertCtrl: AlertController) {

    }

    checkLogin() {
        this.storage.get('token').then(jwt => {
            if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
                this.httpClient.get(`${SERVER_URL}`)
                    .subscribe(() => this.authUser.next(jwt),
                    (err) => this.logout());
            }
            else {
                this.logout();
            }
        });
    }

    login(values: any): Observable<any> {
        return this.httpClient.post(`${SERVER_URL}/api/v1/login/alumno`, values, { responseType: 'json', observe: 'response' })
            .pipe(tap(response => this.handleJwtResponse(response)));
    }

    logout() {
        this.storage.remove('token').then(() => this.authUser.next(null))
    }

    checkLoginPage() {
        this.storage.get('token').then(jwt => {
            if (jwt && this.jwtHelper.isTokenExpired(jwt)) {
                let alert = this.alertCtrl.create({
                    title: 'Sesión caducada',
                    message: 'Sesión caducada, ingrese de nuevo por favor.',
                    buttons: [
                        {
                            text: 'Aceptar',
                            handler:() => {
                                this.logout()
                            }
                        }
                    ]
                })

                alert.present()
            }
        })
    }
    private handleJwtResponse(response) {
        if (response.status != 200) return 0
        let token = response.body['token']
        return this.storage.set('token', token)
            .then(() => this.authUser.next(token))
            .then(() => token);
    }

}
