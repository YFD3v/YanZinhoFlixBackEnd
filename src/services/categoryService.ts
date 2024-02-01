import { Category } from "../models";
//Passo 16 - paginação de catergorias
export const categoryService = {
  findAllPaginated: async (page: number, perPage: number) => {
    //O offset determina quantos registros devem ser "ignorados" no início da consulta, permitindo que os resultados comecem a ser recuperados a partir do registro correto.
    //Ex: Então se eu pedir a página 2, eles vão ignorar a quantidade de items que teria pagina 1. Logo, se perPage for igual a 4 e page continuar sendo 2, ele vai pular 4 registro da primeira página.
    const offset = (page - 1) * perPage;

    const { count, rows } = await Category.findAndCountAll({
      attributes: ["id", "name", "position"],
      order: [["position", "ASC"]],

      limit: perPage,
      offset,
    });
    return {
      categories: rows,
      page: page,
      perPage: perPage,
      total: count,
    };
  },
  //Passo 17 - obtendo cursos de uma categoria
  findByIdWithCourses: async (id: string) => {
    const categoryWithCourses = await Category.findByPk(id, {
      attributes: ["id", "name"],
      //Esse include serve para fazer a busca incluindo as associações relacionadas
      include: {
        // Indica que a associação que deve ser incluída é a relação "courses" definida no modelo Category. Isso significa que os cursos associados à categoria também serão buscados.
        association: "courses",
        attributes: [
          "id",
          "name",
          "synopsis",
          //Esse array é para renomear a propriedade
          ["thumbnail_url", "thumbnailUrl"],
        ],
      },
    });
    return categoryWithCourses;
  },
};
