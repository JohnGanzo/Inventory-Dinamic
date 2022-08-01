import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '@app/pages/home/products.service';
import { Descripcion } from '@app/shared/models/products.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  
  subscripcion: Subscription; 
  nombreProducto:string;

  constructor(public producto:ProductsService, private router:Router) {
    this.subscripcion = this.producto.getProducto().subscribe(data=>{
      console.log(data.descripcionProducto);
      this.nombreProducto = data.descripcionProducto
    })
  }

  ngOnInit():void{ 
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

}
