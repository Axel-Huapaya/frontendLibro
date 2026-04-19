import { Component, OnInit } from '@angular/core';
import { LibroService } from './services/libro.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false
})
export class AppComponent implements OnInit { 
  libro: any = { titulo: '', autor: '', precio: 0, imagen: '' };
  libros: any[] = [];
  indexEditando: number = -1;

  constructor(private libroService: LibroService) {}

  ngOnInit() { this.cargarLibros(); }

  cargarLibros() {
    this.libroService.getLibros().subscribe({
      next: (data) => this.libros = data,
      error: (err) => console.error('Error al cargar libros', err)
    });
  }

  agregarLibro() {
    if (this.indexEditando > -1) {
     
      const id = this.libros[this.indexEditando].id;
      this.libroService.updateLibro(id, this.libro).subscribe({
        next: () => {
          this.cargarLibros(); 
          this.resetFormulario();
          alert('¡Libro actualizado!');
        }
      });
    } else {
      
      this.libroService.saveLibro(this.libro).subscribe({
        next: () => {
          this.cargarLibros();
          this.resetFormulario();
          alert('¡Libro guardado!');
        }
      });
    }
  }

  seleccionarLibro(index: number) {
    
    this.libro = { ...this.libros[index] };
    this.indexEditando = index;
  }

  
  eliminarLibro(index: number) {
  const id = this.libros[index].id; 
  
  this.libroService.deleteLibro(id).subscribe({
    next: () => {
      this.cargarLibros(); 
      alert('Eliminado de la base de datos');
    },
    error: (err: any) => console.error(err)
  });
}


  resetFormulario() {
    this.libro = { titulo: '', autor: '', precio: 0, imagen: '' };
    this.indexEditando = -1;
  }
}