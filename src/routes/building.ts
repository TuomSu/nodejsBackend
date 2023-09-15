import express, { Response, Request } from 'express';
import { successHandler } from '../responseHandler/index.js';
import { validate, validateIdObl, validateNameObl } from '../validationHandler/index.js';

const building = express.Router();
const buildingList = [
    {id:3001,name:"Päärakennus",description:""},
    {id:3002,name:"Sivurakennus",description:""},
    {id:3003,name:"Lato",description:""} 
];

//get all buildings
building.get(
  '/',
  (req: Request, res: Response) => {
        successHandler(
          req,
          res,
          buildingList,
          'Successfully read the buildings from DB',
        );
  }
);

building.get(
    '/:id',
    validateIdObl,
    [validate],
    (req: Request, res: Response) => {

        const matchingOnes = buildingList.filter(
            (value) => value.id === Number(req.params.id)
        );

          successHandler(
            req,
            res,
            matchingOnes,
            'Successfully read one building',
          );
    }
  );

  building.post(
    '/',
    validateIdObl,
    validateNameObl,
    [validate],
    (req: Request, res: Response) => {
          successHandler(
            req,
            res,
            3004,
            'Successfully read the buildings from DB',
          );
    }
  );




export default building;