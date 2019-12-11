const path = require('path'); //Nos permite acceder a los archvios que tenemos loccalmente
const webpack = require('webpack');

nodule.exports={
    entry: './public/js/app.js',
    output: {
        filename:'bundle.js', //Archivo de salida
        path: path.join(__dirname,"./public/dist") //Creamos una nueva carptea
    },
    module:{
        rules:[
            {
                test: /\.m?js$/, //Busca todos los archovos js en la carpeta designada
                use :{
                    loader: 'babel-loader',//Indicamos que puglin queremos utilizar
                    options:{
                        presets :['@babel/preset-env']
                    }
                }
            }
        ]
    }
}