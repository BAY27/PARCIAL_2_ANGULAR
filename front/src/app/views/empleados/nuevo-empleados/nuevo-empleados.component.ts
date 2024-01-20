import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { RouterLink,Router,ActivatedRoute } from '@angular/router';
import { EmpleadosService } from '../../../Services/empleados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-empleados',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './nuevo-empleados.component.html',
  styleUrl: './nuevo-empleados.component.css'
})
export class NuevoEmpleadosComponent {
  title = 'Nuevo Empleado';
  id!:number;

  empleados: FormGroup = new FormGroup({
    ID_departamento: new FormControl('', Validators.required),
    Nombre: new FormControl('', Validators.required),
    Cargo: new FormControl('', Validators.required),
    Salario: new FormControl('', Validators.required),
  });
 constructor(private empleadosServicio:EmpleadosService, private rutas:Router,private parametros:ActivatedRoute){}
 ngOnInit() {
  this.id = this.parametros.snapshot.params['id'];
  console.log(this.id);
  if (this.id == 0 || this.id == undefined) {
    this.title = 'Nuevo Empleado';
  } else {
    this.title = 'Actualizar Empleado';
    this.empleadosServicio.uno(this.id).subscribe((res) => {
      console.log(res);
      this.empleados.patchValue({
        // Corrige el nombre de la propiedad ProductoId a ID_departamento
        ID_departamento: res.ID_departamento,
        Nombre: res.Nombre,
        Cargo: res.Cargo,
        Salario: res.Salario,
      });
    });
  }
  }
  get f(){
    return this.empleados.controls;
  }
  grabar() {
    Swal.fire({
      title: 'Empleados',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.empleadosServicio
            .insertar(this.empleados.value, )
            .subscribe((res) => {
              Swal.fire({
                title: 'Empleado',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/empleados']);
              this.id = 0;
            });
        } else {
          this.empleadosServicio
            .actualizar(this.empleados.value,this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'Empleados',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/empleados']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'Empleados',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }


}
