import { User } from "../models";
import { EpisodeInstance } from "../models/Episode";
import { UserCreationAttributes } from "../models/User";

//Passo 35 - obtendo a lista de continuar assistindo

function filterLastEpisodeByCourse(episodes: EpisodeInstance[]) {
  const coursesOnList: number[] = [];

  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!coursesOnList.includes(episode.courseId)) {
      coursesOnList.push(episode.courseId);
      currentList.push(episode);
      return currentList;
    }

    const episodeFromSameCourse = currentList.find(
      (ep) => ep.courseId === episode.courseId
    );
    if (episodeFromSameCourse!.order > episode.order) return currentList;

    const listWithoutEpisodeFromSameCourse = currentList.filter(
      (ep) => ep.courseId !== episode.courseId
    );
    listWithoutEpisodeFromSameCourse.push(episode);
    return listWithoutEpisodeFromSameCourse;
  }, [] as EpisodeInstance[]);
  return lastEpisodes;
}
//Passo 23 - Registro de usuários
export const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({ where: { email } });
    return user;
  },
  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes);
    return user;
  },
  //Passo 35 - Obtendo a lista de continuar assistindo
  getKeepWatchingList: async (id: number) => {
    const userWithWatchingEpisodes = await User.findByPk(id, {
      include: {
        attributes: [
          "id",
          "name",
          "order",
          ["seconds_long", "secondsLong"],
          ["video_url", "videoUrl"],
          ["course_id", "courseId"],
        ],
        association: "Episodes",
        include: [
          {
            attributes: [
              "id",
              "name",
              "synopsis",
              ["thumbnail_url", "thumbnailUrl"],
            ],
            association: "Course",
          },
        ],
        through: {
          as: "watchTime",
          attributes: ["seconds", ["updated_at", "updatedAt"]],
        },
      },
    });
    if (!userWithWatchingEpisodes) throw new Error("Usuário não encontrado");
    const keepWatchingList = filterLastEpisodeByCourse(
      userWithWatchingEpisodes.Episodes!
    );

    keepWatchingList.sort((a, b) =>
      // @ts-ignore
      a.watchTime.upddatedAt < b.watchTime.updatedAt ? 1 : -1
    );
    return keepWatchingList;
  },
  //Passo 37 - atualizando informações do usuário
  update: async (
    id: number,
    attributes: {
      firstName: string;
      lastName: string;
      phone: string;
      birth: Date;
      email: string;
    }
  ) => {
    //Esse returning serve para ele retornar o resultado do banco de dados (SO no POSTGRESS)
    const [affectedRows, updatedUsers] = await User.update(attributes, {
      where: { id },
      returning: true,
    });
    return updatedUsers[0];
  },
  //Passo 38 - Atualizando a senha
  updatePassword: async (id: number, password: string) => {
    const [affectedRows, updatedUsers] = await User.update(
      { password },
      { where: { id }, returning: true, individualHooks: true }
      //Esse individualHooks serve para executar os hooks Before e after
      //Então ele fará a criptografia da senha, pois no model User foi colocado um hook de before para que antes de a senha ser salva ela fosse criptografada
    );
  },
};
