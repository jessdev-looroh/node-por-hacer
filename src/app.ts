import { PorHacer } from './por-hacer/por-hacer';
const {argv} = require("./config/yargs");
const {crear,getListado,actualizar,borrarPorHacer} = require('./por-hacer/por-hacer');
let comando = argv._[0];
switch (comando) {
  case "crear":
    let tarea= crear(argv.descripcion);
    break;
  case "listar":
    getListado().then((tareas:PorHacer[])=>{
      tareas.forEach(t=>{
        console.log("=============== Por Hacer ============".green);
        console.log(t.descripcion);
        console.log(`Estado : `, t.completado);
        console.log("======================================".green);
      })
    });
    console.log("Mostrar todas las tareas por hacer");
    break;
  case  "actualizar" : 
     actualizar(argv.descripcion).then(console.log);
    break;
  case  "borrar" : 
    borrarPorHacer(argv.descripcion).then(console.log);
    break;
  default:
      console.log("Comando no es reconocido");
    break;
}
