"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const port = process.env.PORT || 5000;
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Impax Backend Swagger",
            version: "0.1.0",
            description: "Welcome to ImpaX, where innovation meets the field of sports, prioritizing the well-being of athletes. Our mission is to revolutionize athlete safety through cutting-edge impact monitoring technology.",
            license: {
                name: "MIT",
                url: "https://github.com/cepdnaclk/e19-3yp-impact-tracker/blob/main/LICENSE",
            },
            contact: {
                name: "Imapax",
                url: "https://github.com/cepdnaclk/e19-3yp-impact-tracker",
                email: "",
            },
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: [
        "./routes/*.js",
        `${__dirname}src/routes/example.ts`,
        "./dist/src/routes/example.js"
    ],
};
exports.default = options;
