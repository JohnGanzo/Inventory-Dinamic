import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkuRoutingModule } from './sku-routing.module';
import { SkuComponent } from './sku.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [SkuComponent, ProductComponent, ListComponent],
  imports: [
    CommonModule,
    SkuRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SkuModule { }
