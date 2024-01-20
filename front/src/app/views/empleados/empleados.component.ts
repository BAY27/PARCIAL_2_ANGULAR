import { Component } from '@angular/core';
import { IEmpleado} from '../../Interfaces/iempleado';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { EmpleadosService } from '../../Services/empleados.service';
@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css',
})
export class EmpleadosComponent {
  title = 'Empleados';
  empleados: IEmpleado[];

  constructor(private empleadosServicio: EmpleadosService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.empleadosServicio.todos().subscribe((listaempleados) => {
      this.empleados = listaempleados;
      console.log(listaempleados);
    });
  }
  alerta() {
    Swal.fire('Empleados', 'Mensaje en Empleados', 'success');
  }

  eliminar(ID_empleado: number) {
    Swal.fire({
      title: 'Empleados',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadosServicio.eliminar(ID_empleado).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'Empleados',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
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
