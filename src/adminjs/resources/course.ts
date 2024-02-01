// Quinto passo - colocando no painel
import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions, BaseRecord } from "adminjs";
import path from "path";
import * as fs from "fs";

export const courseResourceOptions: ResourceOptions = {
  navigation: "Catálogo",
  editProperties: [
    "name",
    "synopsis",
    "uploadThumbnail",
    "featured",
    "categoryId",
  ],
  filterProperties: [
    "name",
    "synopsis",
    "featured",
    "categoryId",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["id", "name", "featured", "categoryId"],
  showProperties: [
    "id",
    "name",
    "synopsis",
    "featured",
    "thumbnailUrl",
    "categoryId",
    "createdAt",
    "updatedAt",
  ],
};

//Passo  9 - fazendo upload das capas dos cursos
export const courseResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, "../../../public"),
        opts: {},
      },
    },
    properties: {
      key: "thumbnailUrl",
      file: "uploadThumbnail",
    },
    uploadPath: (record, filename) =>
      `thumbnails/course-${record.get("id")}/${filename}`,
  }),
];
