import { Component, ViewChild } from '@angular/core';
import { NavController, Nav} from 'ionic-angular';
import { NavigatorProvider } from '../../providers/navigator/navigator'
import { MateriasPage } from '../materias/materias';
import { PlaceholderPage } from '../placeholder/placeholder'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('detailNav') detailNav: Nav;
    @ViewChild('masterNav') masterNav: Nav;

    masterPage: any = null;
    detailPage: any = null;

    
    constructor(public navCtrl: NavController, public navigatorProvider: NavigatorProvider) {
    }

    ionViewDidLoad(){
        this.navigatorProvider.masterNav = this.masterNav;
        this.navigatorProvider.detailNav = this.detailNav;
        this.masterNav.setRoot(MateriasPage, { detailNavCtrl: this.detailNav });
        this.detailNav.setRoot(PlaceholderPage);
    }

}
