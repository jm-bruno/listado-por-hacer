const fs = require('fs');

let listadoPorHacer = [];

const guardarBD = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar. ', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');

    } catch (e) {
        listadoPorHacer = [];
    }

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const crear = (descripcion) => {

    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(porHacer);
    guardarBD();

    return porHacer;
}

const actualizar = (descp, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descp);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarBD();
        return true;
    } else return false;
}

const borrar = (descp) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descp);

    if (listadoPorHacer.length > nuevoListado.length) {
        listadoPorHacer = nuevoListado;
        guardarBD();
        return true;
    } else return false;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}