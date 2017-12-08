import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { _DetailPage } from '../'

@IonicPage()
@Component({
    selector: 'page-materia',
    templateUrl: 'materia.html',
})
export class MateriaPage extends _DetailPage {

    materia: any = null
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        super();
        this.materia = navParams.data
    }

    ionViewDidLoad() {
        
    }

}
