//Sétimo passo - incluindo a episode no painel adminjs

import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const episodeResourceOptions: ResourceOptions = {
  navigation: "Catálogo",
  editProperties: [
    "name",
    "synopsis",
    "courseId",
    "order",
    "uploadVideo",
    "secondsLong",
  ],
  filterProperties: [
    "name",
    "synopsis",
    "courseId",
    "secondsLong",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["id", "name", "courseId", "order", "secondsLong"],
  showProperties: [
    "id",
    "name",
    "synopsis",
    "courseId",
    "order",
    "videoUrl",
    "secondsLong",
    "createdAt",
    "updatedAt",
  ],
};
//Para fazer o upload necessário ter o package do admin js de upload

export const episodeResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    //Onde ficara os arquivos
    provider: {
      local: {
        bucket: path.join(__dirname, "..", "..", "..", "uploads"),
        opts: {},
      },
    },

    properties: {
      //Nome da propriedade que será referência no banco de dados, no caso, da instãncia
      key: "videoUrl",
      //Representa o input onde vai fazer o upload la no painel administrastivo
      //Por isso nao existe a propriedade UploadVideo no episodeResourceOptions
      //Pois não se envia vídeo para o banco de dados e sim para algum armazenamento externo
      file: "uploadVideo",
    },
    uploadPath: (record, filename) => {
      //É o caminho que vem depois da caminho do bucket, da pasta uploads
      //Customizando o nome do arquivo e como ele será salvo na pasta upload
      return `videos/course-${record.get("courseId")}/${filename}`;
    },
  }),
];
