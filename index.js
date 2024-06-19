import express from 'express';
import fs from 'fs'
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
import { exec } from 'child_process';
import open from 'open';

app.get('/getData', (req, res) => {
    res.send('<title>Hello, API!</title>\n<div>Hola Usuario</div>');

});

app.post('/postData', (req, res) => {
    // El objeto JSON enviado en el cuerpo de la petición estará disponible en `req.body`
    const data = req.body;

    console.log(data);
 
    //open('./index.html');
       
    fs.readFile('index.html', 'utf8', function(err, html) {
      if (err) {
          console.error('Ocurrió un error al leer el archivo:', err);
          res.status(500).send('Ocurrió un error al leer el archivo');
          return;
      }

      // Modifica el archivo HTML (por ejemplo, añade un nuevo elemento div con el texto enviado)
      const nuevoHtml = html.replace('</body>', `  <div>Usuario : ${data.user}</div>\n<div>Operacion : ${data.opType}</div>\n<div>Importe : ${data.importe}</div>\n<div>Metodo : ${data.metodo}</div>\n </body> `);

      // Escribe el nuevo HTML en el archivo
      fs.writeFile('index.html', nuevoHtml, 'utf8', function(err) {
          if (err) {
              console.error('Ocurrió un error al escribir en el archivo:', err);
              res.status(500).send('Ocurrió un error al escribir en el archivo');
              return;
          }

          // Abre el archivo HTML en el navegador
          open('index.html')
          .then(() => {
              // Envía una respuesta al cliente
              res.send('Archivo HTML modificado y abierto con éxito');
          })
          .catch((err) => {
              console.error('Ocurrió un error al abrir el archivo:', err);
              res.status(500).send('Ocurrió un error al abrir el archivo');
          });
      });
  });
});

app.listen(port, () => {
    exec('ngrok http --domain=emerging-apparently-adder.ngrok-free.app 3000', (ngrokError, ngrokStdout, ngrokStderr) => {
        if (ngrokError) {
          console.error(`Error ejecutando ngrok: ${ngrokError}`);
          return;
        }
    
        console.log(`ngrok ha iniciado: ${ngrokStdout}`);
      });
    console.log(`Server running on port ${port}`);
   
});



