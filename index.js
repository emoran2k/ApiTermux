import express from 'express';
import fs from 'fs'
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
import { exec } from 'child_process';
app.get('/getData', (req, res) => {
    res.send('<title>Hello, API!</title>\n<div>Hola Usuario</div>');

});

app.post('/postData', (req, res) => {
    // El objeto JSON enviado en el cuerpo de la petición estará disponible en `req.body`
    const data = req.body;

    console.log(data);

    res.send('200 OK');
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



