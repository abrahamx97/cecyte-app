import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MateriaPage } from './materia';

@NgModule({
  declarations: [
    MateriaPage,
  ],
  imports: [
    IonicPageModule.forChild(MateriaPage),
  ],
  exports: [
      MateriaPage,
  ]
})
export class MateriaPageModule {}
