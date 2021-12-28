import categoriesjson from './categories.json';

interface Categories {
  [key: string]: Array<string>;
}

const CategoryManager = () => {
  const categories: Categories = categoriesjson;

  const getCategory = (name: string) => {
    return categories[name];
  };

  const getAllCategories = () => {
    return categories;
  };

  return {
    getAllCategories,
    getCategory,
  };
};

export default CategoryManager;
export type {Categories};
