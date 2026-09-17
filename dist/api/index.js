"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// in the .env file can the following variables be included
// JWT_SECRET = 'secret'
// NODE_ENV = 'development' # development | production
// CLIENT_URL = 'http://localhost:4000'
// Middleware
// Reads a request body sent as JSON text and turns it into a real JavaScript
// object, which Express hands us as req.body. Without this line req.body is
// undefined - that is what our controllers check for first.
app.use(express_1.default.json());
// Reads the browser's Cookie header and splits it into req.cookies, so
// verifyToken can reach the token as req.cookies.accessToken.
app.use((0, cookie_parser_1.default)());
// CORS only concerns requests from OTHER origins. Our own client lives in
// public/ and is served from the same origin as this API, so the browser never
// treats it as cross-origin and never applies any of these rules to it.
// The two options below are a pair, and only matter for an external client:
//   origin      -> WHICH other domain is allowed to call us
//   credentials -> whether that domain may also be logged in (send the cookie)
// With CLIENT_URL empty, no CORS headers are sent at all and only our own
// same-origin client can use the API from a browser.
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // This makes the Express server accept requests from other domains
    credentials: true, // Allows cookies sent to this API
}));
// Serve the static client (the HTML/CSS/JS in public/).
// Read the line from the inside out:
//
//   process.cwd()  "current working directory" - the folder npm was started
//                  from, i.e. the project root (.../03-auth-app).
//                  We use this instead of __dirname (the folder THIS file sits
//                  in) because that folder moves: it is api/ when we run the
//                  source with tsx, but dist/api/ after `npm run build`.
//                  __dirname would then point at dist/public, which does not
//                  exist. cwd is the project root in both cases.
//
//   path.join()    Glues path pieces together with the right separator for the
//                  operating system (/ on Mac/Linux, \ on Windows) instead of
//                  us hardcoding "/" in a string. Result: .../03-auth-app/public
//
//   express.static() A built-in middleware that takes a folder and turns every
//                  file inside it into a downloadable URL. The folder name
//                  itself is NOT part of the URL - it is the new "root":
//                      public/index.html      -> GET /
//                      public/protected.html  -> GET /protected.html
//                      public/js/login.js     -> GET /js/login.js
//                      public/css/style.css   -> GET /css/style.css
//                  index.html is special: it is served automatically for "/".
//                  If no matching file exists, the middleware does nothing and
//                  passes the request on to the routes below.
//
//   app.use()      Registers it for every incoming request (no path given).
//
// Why serve the client from the API at all? So both live on the SAME origin
// (http://localhost:3000). The accessToken cookie is then a first-party cookie
// that the browser stores and returns without any CORS involvement.
//
// On Vercel this line is mostly a local convenience - the platform serves
// public/ by itself, before a request ever reaches this function.
app.use(express_1.default.static(path_1.default.join(process.cwd(), 'public')));
// Routes
const auth_1 = __importDefault(require("../src/routes/auth"));
const reviewRoutes_1 = __importDefault(require("../src/routes/reviewRoutes"));
const bookRoutes_1 = __importDefault(require("../src/routes/bookRoutes"));
const users_1 = __importDefault(require("../src/routes/users"));
app.use('/api/auth', auth_1.default);
app.use('/api/reviews', reviewRoutes_1.default);
app.use('/api/books', bookRoutes_1.default);
app.use('/api/users', users_1.default);
// Connect To DB
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.MONGODB_URL || '');
// Start the express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
