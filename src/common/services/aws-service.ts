/* eslint-disable @typescript-eslint/no-explicit-any */
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.ACCESS_KEY_SECRET,
  region: process.env.REGION,
});

export default class AwsService {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3();
  }

  /**
   * Faz o upload de um arquivo para um bucket S3.
   *
   * @param bucket - O nome do bucket S3.
   * @param key - A chave do objeto S3 (caminho/nome do arquivo no bucket).
   * @param body - O conteúdo do arquivo a ser enviado.
   * @returns Uma promessa que resolve com o resultado do upload.
   */
  async uploadFile(
    bucket: string,
    key: string,
    body: Buffer | Uint8Array | Blob | string | ReadableStream<any>
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucket,
      Key: key,
      Body: body,
      ACL: "public-read",
    };

    try {
      return this.s3.upload(params).promise();
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao fazer upload do arquivo");
    }
  }
}
