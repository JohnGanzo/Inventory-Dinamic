import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkuComponent } from './sku.component';

const routes: Routes = [{ path: '', component: SkuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkuRoutingModule { }
