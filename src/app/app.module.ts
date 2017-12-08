import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage, IonicStorageModule} from "@ionic/storage";
import {CustomFormsModule} from 'ng2-validation';
import {HttpClientModule} from "@angular/common/http";
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { MateriasPage } from '../pages/'
import { MateriaPage } from '../pages/'
import { PlaceholderPage } from '../pages/'
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { NavigatorProvider } from '../providers/navigator/navigator';
import { HelperProvider } from '../providers/helper/helper';

export function jwtOptionsFactory(storage: Storage) {
    return {
      tokenGetter: () => storage.get('token'),
      whitelistedDomains: ['localhost:1337']
    }
  }
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PerfilPage,
    MateriasPage,
    MateriaPage,
    PlaceholderPage,
    LoginPage
  ],
  imports: [                                                  
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CustomFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, 
    HomePage,
    PerfilPage,
    MateriasPage,
    MateriaPage,
    PlaceholderPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    NavigatorProvider,
    HelperProvider    
  ]
})
export class AppModule {}
