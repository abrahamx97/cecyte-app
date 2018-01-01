import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavigatorProvider } from '../../providers/navigator/navigator'
import { HomePage } from './home';
import { MateriasPage } from '../materias/materias' 
import { MateriaPage } from '../materia/materia' 
import { PlaceholderPage } from '../placeholder/placeholder' 


@NgModule({
  declarations: [
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
