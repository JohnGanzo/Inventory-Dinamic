import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProductsService } from '@app/pages/home/products.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit, OnInit {
 

  displayedColumns: string[] = ['codProducto', 'descripcion', 'saldo'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  constructor(private productsSvc: ProductsService) {}
  ngOnInit(): void {
    this.productsSvc.getInvent().subscribe((produtos)=>{
      this.dataSource.data = produtos
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
