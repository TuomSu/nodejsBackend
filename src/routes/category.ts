import express, { Response, Request } from 'express';
import { successHandler } from '../responseHandler/index.js';
import { validate, validateId, validateName } from '../validationHandler/index.js';

const category = express.Router();
const categoryList = [
    {id:4001,name:"Rakennuksen nimi",description:""},
    {id:4002,name:"Käyttötarkoitus",description:""},
    {id:4003,name:"Rakennustapa",description:""} 
];


category.get(
  '/',
  (req: Request, res: Response) => {
        successHandler(
          req,
          res,
          categoryList,
          'Successfully read the categories from DB',
        );
  }
);

category.get(
    '/:id',
    validateId,
    [validate],
    (req: Request, res: Response) => {

        const matchingOnes = categoryList.filter(
            (value) => value.id === Number(req.params.id)
        );

          successHandler(
            req,
            res,
            matchingOnes,
            'Successfully read one category',
          );
    }
  );

 // POST - lisää uusi kategoria

  category.post(
    '/',
    validateId,
    validateName,
    [validate],
    (req: Request, res: Response) => {
      const { id, name, description } = req.body;
      const existingCategory = categoryList.find((category) => category.name === name);

    if (existingCategory) {
      return res.status(400).json({ message: 'Category with the same name already exists' });
    }
      const newCategory = { id, name, description };
      categoryList.push(newCategory);
          successHandler(
            req,
            res,
            categoryList,
            'Successfully read the categories from DB and added new one',
          );
    }
  );

  // PUT - muokkaa tietokannassa olevaa kategoriaa id:n perusteella

  function updateCategory(categoryId: number, updatedData: { name: string, description: string }): any {
    const categoryIndex = categoryList.findIndex((category) => category.id === categoryId);
    
    categoryList[categoryIndex] = {
      id: categoryId,
      name: updatedData.name,
      description: updatedData.description,
    };
    return categoryList[categoryIndex];
  }

  category.put(
    '/:id',
    validateId,
    validateName,
    [validate],
    (req: Request, res: Response) => {
      const updatedCategory = updateCategory(parseInt(req.params.id,10), req.body);
      if(updatedCategory){
       {
          successHandler(
            req,
            res,
            categoryList,
            'Successfully updated category in DB',
          );
          
        }}
      }
  );

  // DELETE - poista tietokannasta id:n perusteella

  function deleteCategory(categoryId: number) {
    const categoryIndex = categoryList.findIndex((category) => category.id === categoryId);
  
    categoryList.splice(categoryIndex, 1);

    return categoryId;
  }

  category.delete(
    '/:id',
    validateId,
    [validate],
    (req: Request, res: Response) => {
      const deletedCategoryId = deleteCategory(parseInt(req.params.id,10));
      if (deletedCategoryId !== null){
          successHandler(
            req,
            res,
            categoryList,
            'Successfully deleted from DB',
          );
    }
  }
  );



export default category;