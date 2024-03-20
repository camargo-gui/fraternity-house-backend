import { createHash, randomBytes } from "crypto";

export class Password {

  public constructor(
    public readonly password: string
  ){}

  createHash(): string {
    const salt = randomBytes(16).toString("hex"); 
    const hash = createHash("sha256").update(this.password + salt).digest("hex"); 
    return `${salt}:${hash}`; 
  }

  compare(storedHash: string): boolean {
    const [salt, storedHashValue] = storedHash.split(":"); 
    const hash = createHash("sha256").update(this.password + salt).digest("hex"); 
    return hash === storedHashValue; 
  }
}