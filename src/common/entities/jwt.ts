import { JwtPayload, sign, verify } from "jsonwebtoken";


export class JWT {
  private secret: string;


  constructor() {
    this.secret = process.env.JWT_SECRET!;
  }

  generate(id: number): string {
    const token = sign({ id }, this.secret);
    return token;
  }

  verify(token: string): JwtPayload | undefined {
    try {
      const payload = verify(token, process.env.SECRET_JWT!) as JwtPayload;
      return payload;
    } catch {
      return undefined;
    }
  }
}