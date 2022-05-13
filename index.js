import 'dotenv/config' 
import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js"
import Busquedas from "./models/busquedas.js"


const main = async() => {

    const busquedas = new Busquedas()
    let opt

    do {
        opt = await inquirerMenu()
        switch (opt) {
            case 1:
                //mostrar mensaje
                const termino = await leerInput('Ciudad: ')
                //buscar los lugares
                const lugares = await busquedas.ciudad(termino)
                //seleccionar el lugar
                const id = await listarLugares(lugares)
                if (id === '0') continue
                const lugarSel = lugares.find(l => l.id === id)
                //Guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre)
                //clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)
                //mostrar resultados
                console.clear()
                console.log('\nInformación de la ciudad\n'.green)
                console.log('Ciudad:', lugarSel.nombre.green)
                console.log('Lat:', lugarSel.lat)
                console.log('Long:', lugarSel.lng)
                console.log('Temperatura:', clima.temp)
                console.log('Mínima:', clima.min)
                console.log('Máxima:', clima.max)
                console.log('Cómo está el clima:', clima.desc.green)
                break

            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green
                    console.log(`${idx} ${lugar}`)
                })
                break
        }

        if(opt !== 0) await pausa()

    }while (opt !== 0)

}

main()