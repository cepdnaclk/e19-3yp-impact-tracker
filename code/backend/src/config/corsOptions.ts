import cors from 'cors';
import allowedOrigins from './allowedOrigins';

const options: cors.CorsOptions = {
    origin: allowedOrigins
};
  
export default options;