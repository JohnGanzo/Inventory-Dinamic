import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@app/pages/home/products.service'
import { Descripcion, UserProduct } from '@app/shared/models/products.interface';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  
  productos:Descripcion[]= [];
  dato:string
  productForm = this.fb.group({
    codProducto: ['']
  })
  
  constructor(private productsSvc: ProductsService, private fb: FormBuilder) { }
   
  ngOnInit(): void {

  }

  onProduct(): void{
     const codeDa  = this.productForm.value;
     this.productsSvc.getProduct(codeDa.codProducto).subscribe((res)=>{
       console.log(res.descripcion)
     }) 
     this.productForm.reset();
   }

  onUpdate():void{
    const codigo = this.productForm.value;
    this.productsSvc.pathProduct(codigo).subscribe((res)=>{res})
    this.productForm.reset();
  }

}
