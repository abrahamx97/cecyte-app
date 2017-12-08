import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { LoginPage } from '../pages/login/login';

import { AuthProvider } from '../providers/auth/auth';

@Component({
    templateUrl: 'app.html'    
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = null
    pages: Array<{ title: string, component: any }>;
    authProvider: AuthProvider = null;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, authProvider: AuthProvider) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
        });

        this.authProvider = authProvider;

        authProvider.authUser.subscribe(jwt => {
            if (jwt) {
                this.rootPage = HomePage;
            } else {
                this.rootPage = LoginPage;
            }
        })

        authProvider.checkLogin();

        this.pages = [
            { title: 'Inicio', component: HomePage },
            { title: 'Perfil', component: PerfilPage }
        ];

    }

    openPage(page) {
        //console.log(`SE CAMBIARÁ A ${page.component.name}`)
        //console.log(`ACTUAL ES ${this.nav.getActive().component.name}`)
        this.nav.setRoot(page.component);
    }

    logout(){
        this.authProvider.logout()
    }


}

