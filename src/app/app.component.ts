import { Component, OnInit } from '@angular/core';
import { LibroService } from './services/libro.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false
})
export class AppComponent implements OnInit { 

  libro = {
    titulo: '',
    autor: '',
    precio: 0,
    imagen: ''
  };

  libros: any[] = [];
  indexEditando: number = -1;

  // Inyectamos el servicio en el constructor
  constructor(private libroService: LibroService) {}

  // Al iniciar, traemos los libros de la base de datos
  ngOnInit() {
    this.cargarLibros();
  }

  cargarLibros() {
    this.libroService.getLibros().subscribe({
      next: (data) => this.libros = data,
      error: (err) => console.error('Error al cargar libros', err)
    });
  }

  agregarLibro() {
    if (this.indexEditando > -1) {
     
      this.libros[this.indexEditando] = { ...this.libro };
      this.indexEditando = -1;
      this.resetFormulario();
    } else {
      // ENVIAR AL BACKEND (POST)
      this.libroService.saveLibro(this.libro).subscribe({
        next: (libroGuardado) => {
          console.log('Guardado en DB:', libroGuardado);
          this.libros.push(libroGuardado); 
          this.resetFormulario();
          alert('¡Libro guardado en la Base de Datos!');
        },
        error: (err) => console.error('Error al guardar', err)
      });
    }
  }

  seleccionarLibro(index: number) {
    this.libro = { ...this.libros[index] };
    this.indexEditando = index;
  }

  eliminarLibro(index: number) {
    
    this.libros.splice(index, 1);
    if (this.indexEditando === index) {
      this.resetFormulario();
    }
  }

  resetFormulario() {
    this.libro = {
      titulo: '',
      autor: '',
      precio: 0,
      imagen: ''
    };
    this.indexEditando = -1;
  }
}