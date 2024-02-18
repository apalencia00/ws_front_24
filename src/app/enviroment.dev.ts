import 'dotenv/config'
export let environment = {
    production: false,
    env: 'dev',
    EMPRESA_URL         : 'http://localhost:9095/',
    PRODUCTO_URL        : 'http://localhost:8084/',
    INVENTARIO_URL      : 'http://localhost:8095/',
    ORDEN_URL           : 'http://localhost:8087/',
    PERSONAL_URL        : 'http://localhost:8081/',
    AUTENTICACION_URL   : 'http://localhost:9098/api/auth/',
    PARAMETRIZACION     : 'http://localhost:10020/'
};