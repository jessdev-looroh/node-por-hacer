import  { argv,command} from "yargs";

let descripcion = {
    describe: "descripcion de la tarea por hacer",
    alias:'d',
    demandOption: true,
}

let   completado= {
    describe : "True si se completo la tarea, false si la tarea esta incompleta",
    alias :'c',
    default: true
}

command("crear","Crear un elemento por hacer",{
    descripcion
});

command("actualizar","Actualiza el estado complteado de una tarea",{
    descripcion,
    completado
})
command("borrar","Borrar una tarea",{
    descripcion,
})

module.exports = {
    argv
}