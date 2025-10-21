import  express, {Express} from 'express';
import router from './src/routes/user.routes'
import { setupSwagger} from './src/routes/swagger';

import cors from 'cors';

import 'dotenv/config';

const port = process.env.PORT || 3000

const app: Express = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

setupSwagger(app);

app.use(express.json());

app.use(router)


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:3001/ a porta é ${port}`)
})


