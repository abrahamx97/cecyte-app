import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper'
import { AuthProvider } from '../../providers/auth/auth'
import { JwtHelperService } from "@auth0/angular-jwt";
import { Storage } from "@ionic/storage";
import * as bcrypt from "bcryptjs";


@IonicPage()
@Component({
    selector: 'page-perfil',
    templateUrl: 'perfil.html',
})
export class PerfilPage {
    info: String = '';
    perfil: Array<any> = [];


    public type = 'password'
    public showPass = false
    public icon = 'md-eye'

    constructor(public navCtrl: NavController, public navParams: NavParams, private helperProvider: HelperProvider, private readonly storage: Storage, private jwtHelper: JwtHelperService, private readonly toastCtrl: ToastController, private authProvider: AuthProvider) {
        this.storage.get('token').then(jwt => {
            if (jwt) {
                let usuario = jwtHelper.decodeToken(jwt).usuario;
                this.getPerfil(usuario)
            }
        })
    }

    ionViewDidLoad() {
    }

    public showPassword() {
        this.showPass = !this.showPass;

        if (this.showPass) {
            this.type = 'text';
            this.icon = 'md-eye-off'
        } else {
            this.type = 'password';
            this.icon = 'md-eye'
        }
    }

    getPerfil(usuario) {
        this.helperProvider.getPerfil(usuario).subscribe(
            response => {
                this.perfil = response.body['data']
                this.info = 'personal'
            },
            error => {
                if (error.status && error.status == 401) {
                    this.authProvider.checkLoginPage()
                }
            }
        )
    }

    cambiarContrasena(form) {
        let values = form.value
        let datos = {
            contrasena: values.nueva
        }
        let contrasena = values.actual
        this.storage.get('token').then(jwt => {
            if (jwt) {
                let usuario = this.jwtHelper.decodeToken(jwt).usuario;
                let contrasena_actual = this.jwtHelper.decodeToken(jwt).contrasena
                const toast = this.toastCtrl.create({
                    message: '',
                    duration: 5000,
                    position: 'bottom'
                });
                if (bcrypt.compareSync(contrasena, contrasena_actual)) {
                    this.helperProvider.cambiarContrasena(usuario, datos).subscribe(
                        response => {
                            let token = response.body['token']
                            this.storage.set('token', token).then(
                                () => { 
                                    toast.setMessage('Se guardaron cambios.')
                                    form.reset()
                                }
                            ).catch(
                                () => { toast.setMessage('Error al guardar la contraseña en el dispositivo.') }
                                )
                        },
                        error => {
                            if (error.status && error.status == 401) {
                                this.authProvider.checkLoginPage()
                            } else {
                                toast.setMessage('No se pudo guardar cambios.')
                            }
                        }
                    )
                } else {
                    toast.setMessage('No se pudo validar la contraseña.')
                }

                toast.present()
            }
        })
    }
}
