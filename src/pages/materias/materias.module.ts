import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MateriasPage } from './materias';

@NgModule({
  declarations: [
    MateriasPage,
  ],
  imports: [
    IonicPageModule.forChild(MateriasPage),
  ],
  exports: [
      MateriasPage,
  ]
})
export class MateriasPageModule {}
