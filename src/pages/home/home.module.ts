import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavigatorProvider } from '../../providers/navigator/navigator'
import { HomePage } from './home';
import { MateriasPage } from '../'
import { MateriaPage } from '../'
import { PlaceholderPage } from '../'


@NgModule({
  declarations: [
    HomePage,
    MateriasPage,
    MateriaPage,
    PlaceholderPage,    
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  entryComponents: [
    HomePage,
    MateriasPage,
    MateriaPage,
    PlaceholderPage,
  ],
  providers: [
      NavigatorProvider,
  ]
})
export class HomePageModule {}
