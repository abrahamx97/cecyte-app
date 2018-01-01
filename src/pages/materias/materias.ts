import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigatorProvider } from '../../providers/navigator/navigator'
import { HelperProvider } from '../../providers/helper/helper'
import { AuthProvider } from '../../providers/auth/auth'
import { JwtHelperService } from "@auth0/angular-jwt";
import { _MasterPage } from '../_MasterPage'; 
import { MateriaPage } from '../materia/materia' 
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
    selector: 'page-materias',
    templateUrl: 'materias.html',
})
export class MateriasPage extends _MasterPage {

    materias: Array<any> = [  ];

    constructor(public navCtrl: NavController, public navParams: NavParams, private navigatorProvider: NavigatorProvider, private helperProvider: HelperProvider, private readonly storage: Storage, jwtHelper: JwtHelperService, private authProvider: AuthProvider) {
        super();
        this.storage.get('token').then(jwt => {
            if(jwt){
                let usuario = jwtHelper.decodeToken(jwt).usuario
                this.getCalificaciones(usuario) 
            }
        })
    }

    ionViewDidLoad() {

    }

    getCalificaciones(usuario){
        this.helperProvider.getCalificaciones(usuario).subscribe(
            response => {
                this.materias=response.body['data']
            },
            error => {
                if(error.status && error.status==401){
                    this.authProvider.checkLoginPage()
                }
            }
        )
    }

    onDetallesMateria(materia) {
        this.navigatorProvider.pushDetail(MateriaPage, materia)
    }

}
