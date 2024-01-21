import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DepartamentosService } from '../../../Services/departamentos.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevo-departamentos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-departamentos.component.html',
  styleUrl: './nuevo-departamentos.component.css',
})
export class NuevoDepartamentosComponent {
  title = '';
  id!: number;

  departamentos: FormGroup = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Ubicacion: new FormControl('', Validators.required),
    Presupuesto: new FormControl('', Validators.required),
  });
  constructor(
    private departamentosServicio: DepartamentosService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ) {}
  ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo Departamento';
    } else {
      this.title = 'Actualizar Departamento';
      this.departamentosServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.departamentos.patchValue({
          Nombre: res.Nombre,
          Ubicacion: res.Ubicacion,
          Presupuesto: res.Presupuesto,
        });
      });
    }
  }
  get f() {
    return this.departamentos.controls;
  }

  grabar() {
    Swal.fire({
      title: 'Departamentos',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.departamentosServicio
            .insertar(this.departamentos.value, )
            .subscribe((res) => {
              Swal.fire({
                title: 'Departamentos',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/departamentos']);
              this.id = 0;
            });
        } else {
          this.departamentosServicio
            .actualizar(this.departamentos.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'Departamentos',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/departamentos']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'Departamentos',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
