import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDepartamentos } from '../Interfaces/idepartamentos';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private urlBase: string =
  'http://localhost:/PARCIAL_2_ANGULAR/Inventario/Controllers/Departamentos.Controller.php?op=';
  constructor(private clientePhp: HttpClient) {}

  todos(): Observable<IDepartamentos[]> {
    return this.clientePhp.get<IDepartamentos[]>(this.urlBase + 'todos');
  }
  insertar(departamentos: IDepartamentos): Observable<any> {
    var depa = new FormData();
    depa.append('Nombre',departamentos.Nombre.toString());
    depa.append('Ubicacion',departamentos.Ubicacion.toString());
    depa.append('Presupuesto',departamentos.Presupuesto.toString());
    console.log(depa);
    return this.clientePhp.post(this.urlBase + 'insertar', depa);
  }
  eliminar(id: number): Observable<any> {
    var depa = new FormData();
    depa.append('ID_empleado', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', depa);
  }
  uno(id: number): Observable<IDepartamentos> {
    var depa = new FormData();
    depa.append('ID_empleado', id.toString());
    return this.clientePhp.post<IDepartamentos>(this.urlBase + 'uno', depa);
  }
  actualizar(departamentos: IDepartamentos, id:number): Observable<any> {
    var depa = new FormData();
    depa.append('ID_departamento',departamentos.ID_departamento.toString());
    depa.append('Nombre',departamentos.Nombre.toString());
    depa.append('Ubicacion',departamentos.Ubicacion.toString());
    depa.append('Presupuesto',departamentos.Presupuesto.toString());
    return this.clientePhp.post(this.urlBase + 'actualizar', depa);
  }
}
