import { Component } from '@angular/core';
import { IDepartamentos} from '../../Interfaces/idepartamentos';
import { DepartamentosService } from '../../Services/departamentos.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.css',
})
export class DepartamentosComponent {
  title = 'Departamentos';
  departamentos: IDepartamentos[];

  constructor(private departamentosServicio: DepartamentosService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.departamentosServicio.todos().subscribe((listadepartamentos) => {
      this.departamentos = listadepartamentos;
      console.log(listadepartamentos);
    });
  }
  alerta() {
    Swal.fire('Departamentos', 'Mensaje en departamentos', 'success');
  }

  eliminar(ID_departamento: number) {
    Swal.fire({
      title: 'Departamentos',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.departamentosServicio.eliminar(ID_departamento).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'Departamentos',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
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
