import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html'
})
export class EditarProductoComponent {
  producto: Producto = new Producto();
  id: number;

  constructor(private productoServicio: ProductoService, 
    private ruta: ActivatedRoute, private enrutador: Router){};

  ngOnInit(){
    this.id = this.ruta.snapshot.params['id'];
    this.productoServicio.obtenerProdcutoPorId(this.id).subscribe(
      {
        next:(datos)=>
          this.producto = datos
        ,
        error:(error:any)=>console.log(error)
      }
    )
  }

  onSubmit(){
    this.guardarProducto();
  }

  guardarProducto(){
    this.productoServicio.editarProdcuto(this.id, this.producto).subscribe(
      {
        next:(datos)=> this.irProductoLista(),
        error:(errores) => console.log(errores)
      }
    );
  }

  irProductoLista(){
    this.enrutador.navigate(['/productos']);
  }
}
