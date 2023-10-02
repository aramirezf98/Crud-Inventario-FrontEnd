import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
})
export class ProductoListaComponent {
  productos: Producto[];

  constructor(private productoServicio: ProductoService, 
    private enrutador: Router) {}
  
  ngOnInit(){
    //Cargamos los Productos
    this.obtenerProductos();
  }

  private obtenerProductos(){
    this.productoServicio.obtenerProductoLista().subscribe(
      (datos => {
        this.productos = datos;
      })
    )
  } 

  editarProducto(id: number){
    this.enrutador.navigate(['editar-producto', id])
  }

  eliminarProducto(id: number){
    this.productoServicio.elimianrProducto(id).subscribe(
      {
        next: (datos) => this.obtenerProductos(),
        error: (errores) => console.log(errores)
      }
    )
  }
    
}
