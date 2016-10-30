import "reflect-metadata";
import {createExpressServer, useContainer, useExpressServer} from "routing-controllers";
import {Container} from "typedi";
import  * as oauthserver from "oauth2-server";
import models from "./model/index"
// setup routing-controllers to use typedi container. You can use any container here
useContainer(Container);

// now import all our controllers. alternatively you can specify controllerDirs in routing-controller options
import "./controllers/CategoryController";
import "./controllers/PostController";


// create express server
const app = createExpressServer({ // alternatively you can use useExpressServer with your own preconfigured express server
    // you also can do: controllerDirs: [__dirname + "/controllers"]
});

// run express app
app.listen(3000);

app.oauth = oauthserver({
    model: models.Oauth,
    grants: ['password', 'authorization_code', 'refresh_token'],
    debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.get('oauth/authorise', (req) =>{});

app.use(app.oauth.errorHandler());

console.log("Server is up and running at port 3000");