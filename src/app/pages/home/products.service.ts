import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { Barcode, UserProduct, Descripcion, UserInv } from '@shared/models/products.interface'
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productos:Descripcion[] = [];
  userIdInv = null;
  private nomnbreProducto$ = new Subject<any>();

  constructor(private http:HttpClient, private authSvc:AuthService) { }

  getProduct(codeData:string): Observable<UserProduct>{
    return this.http
    .get<any>(`${environment.API_URL}/products/${codeData}`)
    .pipe(catchError(this.handlerError));
  } 

  pathProduct(codeData:Barcode): Observable<UserProduct | void >{
    // se omite no es requerido de acuerdo a pruebas 
    // this.userIdInv = this.authSvc.userValue.userId
    // console.log(this.userIdInv)

    return this.http
    .patch<UserProduct>(`${environment.API_URL}/products/updateSaldo`,codeData)
    .pipe(
      map((res:any)=>{
        this.nomnbreProducto$.next(res)
        localStorage.removeItem('productos');
        this.addProductos(res.descripcionProducto)
        this.saveProduct(this.productos)
        
        //return res.descripcionProducto;
        // Guardar en el localstorage 1:26:18/1:52:27
      }),
      catchError((err)=>this.handlerError(err))
    )
  }

  private saveProduct( productos):void{
    localStorage.setItem('productos', productos)
  }
  
  getInvent():Observable<UserInv[]>{
    return this.http
      .get<UserInv[]>(`${environment.API_URL}/invent`)
      .pipe(catchError(this.handlerError))
  }

  addProductos(producto:Descripcion){
    this.productos.push(producto)
  }

  getProducto():Observable<any>{
    return this.nomnbreProducto$.asObservable();
  }

  private handlerError(err):Observable<never>{
    let  errorMessage = 'An error occurred retrienving data';
    if(err){
      errorMessage=`Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}