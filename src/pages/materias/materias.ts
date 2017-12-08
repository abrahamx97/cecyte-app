import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigatorProvider } from '../../providers/navigator/navigator'
import { HelperProvider } from '../../providers/helper/helper'
import { _MasterPage } from '../';
import { MateriaPage } from '../'

@IonicPage()
@Component({
    selector: 'page-materias',
    templateUrl: 'materias.html',
})
export class MateriasPage extends _MasterPage {

    materias: Array<any> = [
        { id: 0, nombre: 'List Item Zero' },
        { id: 1, nombre: 'List Item One' },
        { id: 2, nombre: 'List Item Two' },
        { id: 3, nombre: 'List Item Three' },
        { id: 4, nombre: 'List Item Four' },
        { id: 5, nombre: 'List Item Five' },
        { id: 6, nombre: 'List Item Six' },
        { id: 7, nombre: 'List Item Seven' },
        { id: 8, nombre: 'List Item Eight' },
        { id: 9, nombre: 'List Item Nine' },
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams, private navigatorProvider: NavigatorProvider, private helperProvider: HelperProvider) {
        super();
        this.getCalificaciones('16427070078841')
    }

    ionViewDidLoad() {

    }

    getCalificaciones(matricula){
        this.helperProvider.getCalificaciones(matricula).subscribe(
            response => {
                console.log(`EL RESPONSE ES ${response.body['data'][0].docente}`)
            },
            error => {

            }
        )
    }

    onDetallesMateria(materia) {
        this.navigatorProvider.pushDetail(MateriaPage, materia)
    }

}
