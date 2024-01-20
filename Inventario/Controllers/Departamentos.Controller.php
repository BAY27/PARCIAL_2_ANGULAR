<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../Models/Departamentos.model.php');
$departamentos = new Clase_Departamentos;
switch ($_GET["op"]) {
   // ...

case 'todos':
    $datos = array(); // defino un arreglo
    $datos = $departamentos->todos(); // llamo al modelo de usuarios e invoco al procedimiento todos y almaceno en una variable
    $todos = array(); // inicializo $todos como un arreglo vacío
    while ($fila = mysqli_fetch_assoc($datos)) { // recorro el arreglo de datos
        $todos[] = $fila;
    }
    echo json_encode($todos); // devuelvo el arreglo en formato json
    break;

// ...

    case "uno":
        $ID_departamento = $_POST["ID_departamento"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $departamentos->uno($ID_departamento); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
    case 'insertar':
        $Nombre = $_POST["Nombre"];
        $Ubicacion = $_POST["Ubicacion"];
        $Presupuesto = $_POST["Presupuesto"];
        $datos = array(); //defino un arreglo
        $datos = $departamentos->insertar($Nombre, $Ubicacion, $Presupuesto); //llamo al modelo de usuarios e invoco al procedimiento insertar
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
    case 'actualizar':
        $ID_departamento = $_POST["ID_departamento"];
        $Nombre = $_POST["Nombre"];
        $Ubicacion = $_POST["Ubicacion"];
        $Presupuesto = $_POST["Presupuesto"];
        $datos = array(); //defino un arreglo
        $datos = $departamentos->actualizar($ID_departamento, $Nombre, $Ubicacion, $Presupuesto); //llamo al modelo de usuarios e invoco al procedimiento actual
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;

    case 'eliminar':
        $ID_departamento = $_POST["ID_departamento"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $departamentos->eliminar($ID_departamento); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
}