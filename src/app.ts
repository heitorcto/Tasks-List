import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import path from "path";

import indexRoutes from "./routes";
import taskRoutes from "./routes/tasks";

class Application {
   
    app: express.Application;

    constructor() {
        this.app = express();
        this.settings();
        this.middleware();
        this.routes();
    }

    settings() {
        this.app.set('port', 3000);
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('.hbs', engine({
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true
            }
        }));
        this.app.set('view engine', 'hbs');
    }

    middleware() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use("/tasks", taskRoutes);

        this.app.use(express.static(path.join(__dirname, "public")));
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Servidor Rodando na porta", this.app.get('port'));
        });
    }
}

export default Application;