import { Component } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { finalize } from 'rxjs/operators/finalize'
import { AuthProvider } from '../../providers/auth/auth'


@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    protected type = 'password'
    protected showPass = false
    protected icon = 'md-eye'

    constructor(private readonly loadingCtrl: LoadingController, private readonly toastCtrl: ToastController, private authProvider: AuthProvider) {
    }

    login(value: any) {
        let loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Autenticando ...'
        });

        loading.present();

        this.authProvider
            .login(value)
            .pipe(finalize(() => loading.dismiss()))
            .subscribe(
            () => { },
            err => this.handleError(err));
    }

    protected showPassword() {
        this.showPass = !this.showPass;

        if (this.showPass) {
            this.type = 'text';
            this.icon = 'md-eye-off'
        } else {
            this.type = 'password';
            this.icon = 'md-eye'
        }
    }

    handleError(error: any) {
        let mensaje: string;
        if (error.status && error.status == 401) {
            mensaje = 'Contraseña incorrecta';
        } else if (error.status && error.status == 404) {
            mensaje = 'Usuario incorrecto'
        } else {
            console.log(error)
            mensaje = `Error inesperado: ${error.statusText}`;
        }

        const toast = this.toastCtrl.create({
            message: mensaje,
            duration: 5000,
            position: 'bottom'
        });

        toast.present();
    }

}
