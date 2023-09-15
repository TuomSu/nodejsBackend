import express from 'express';
import building from './building.js';

const routes = express.Router();

routes.use('/building', building);

export default routes;