import fs from "fs";
let fsPromises = fs.promises;
import colors from "colors";
let listadoPorHacer: PorHacer[] = [];

const actualizar = async (descripcion: string, completado = true) => {
  await leerDB();
  let index = listadoPorHacer.findIndex(
    (tarea) => tarea.descripcion.toLowerCase() === descripcion.toLowerCase()
  );
  if(index>0){
      listadoPorHacer[index].completado= completado;
      guardarDB();
      return true;
  }else{
      return false;
  }
};

const  borrarPorHacer =async (descripcion:string) =>
{
    await leerDB();
    let index = listadoPorHacer.findIndex(
      (tarea) => tarea.descripcion.toLowerCase() === descripcion.toLowerCase()
    );
    if(index>0){
        listadoPorHacer.splice(index,1);
        guardarDB();
        return true;
    }else{
        return false;
    }

}


const getListado = async (): Promise<PorHacer[]> => {
  await leerDB();
  return listadoPorHacer;
};
const leerDB = async () => {
  let data = await fsPromises.readFile("./build/db/data.json", {
    encoding: "utf8",
  });
  if (data) {
    listadoPorHacer = JSON.parse(data);
    return;
  }
  listadoPorHacer = [];
};

const guardarDB = () => {
  let data = JSON.stringify(listadoPorHacer);
  fsPromises.writeFile("./build/db/data.json", data, { encoding: "utf8" }).then(
    (data) => {
      console.log(
        `Se guardo la informacion en ${colors.green("./build/db/data.json")}`
      );
    },
    (err) => {
      console.log(`#########ERROR#########`.red);
      console.log(colors.red(err));
    }
  );
};

export interface PorHacer {
  descripcion: string;
  completado: boolean;
}

const crear = async (descripcion: string) => {
    console.log("entro a crear");
  await leerDB();
  let porHacer: PorHacer = {
    descripcion,
    completado: false,
  };
  listadoPorHacer.push(porHacer);
  guardarDB();
  return porHacer;
};

module.exports = {
  crear,
  getListado,
  actualizar,
  borrarPorHacer
};
