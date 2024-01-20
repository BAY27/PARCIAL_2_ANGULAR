import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmpleado } from '../Interfaces/iempleado';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private urlBase: string =
  'http://localhost:/PARCIAL_2_ANGULAR/Inventario/Controllers/Empleados.Controller.php?op=';
  constructor(private clientePhp: HttpClient) {}

  todos(): Observable<IEmpleado[]> {
    return this.clientePhp.get<IEmpleado[]>(this.urlBase + 'todos');
  }
  insertar(empleados: IEmpleado): Observable<any> {
    var empleado = new FormData();
    empleado.append('ID_departamento', empleados.ID_departamento.toString());
    empleado.append('Nombre',empleados.Nombre.toString());
    empleado.append('Cargo',empleados.Cargo.toString());
    empleado.append('Salario',empleados.Salario.toString());
    console.log(empleado);
    return this.clientePhp.post(this.urlBase + 'insertar', empleado);
  }
  eliminar(id: number): Observable<any> {
    var empleado = new FormData();
    empleado.append('ID_empleado', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', empleado);
  }
  uno(id: number): Observable<IEmpleado> {
    var empleado = new FormData();
    empleado.append('ID_empleado', id.toString());
    return this.clientePhp.post<IEmpleado>(this.urlBase + 'uno', empleado);
  }
  actualizar(empleados: IEmpleado, id:number): Observable<any> {
    var empleado = new FormData();
    empleado.append('ID_empleado', id.toString());
    empleado.append('ID_departamento', empleados.ID_departamento.toString());
    empleado.append('Nombre',empleados.Nombre.toString());
    empleado.append('Cargo',empleados.Cargo.toString());
    empleado.append('Salario',empleados.Salario.toString());
    return this.clientePhp.post(this.urlBase + 'actualizar', empleado);
  }
}
