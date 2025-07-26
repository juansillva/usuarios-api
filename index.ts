import  express, {Express} from 'express';
import router from './src/routes/usuario.routes'

import 'dotenv/config';

const port = process.env.PORT

const app: Express = express();

app.use(express.json());

app.use(router)

app.listen(port, () => {
    console.log(`Servidor rodando em ${port}`)
})


