import { JwtPayload, sign, verify } from "jsonwebtoken";


export class JWT {
  private secret: string;


  constructor() {
    this.secret = process.env.SECRET_JWT!;
  }

  generate(id: number, roleId: number): string {
    const token = sign({ id, roleId }, this.secret, { expiresIn: "1d" });
    return token;
  }

  verify(token: string): JwtPayload | undefined {
    try {
      const payload = verify(token, this.secret) as JwtPayload;
      return payload;
    } catch {
      return undefined;
    }
  }
}