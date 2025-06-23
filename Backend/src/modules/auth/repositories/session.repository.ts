import { Repository } from "typeorm";
import { AppData } from "../../../config/db";
import { Session } from "../entities/session.entity";

export class SessionRepository extends Repository<Session> {
  constructor() {
    super(Session, AppData.manager);
  }

  async createSession(data: Partial<Session>): Promise<Session> {
    const session = this.create(data);
    return this.save(session);
  }

  async findBySessionId(sessionId: string): Promise<Session | null> {
    return await this.createQueryBuilder("session")
      .leftJoinAndSelect("session.user", "user")
      .where("session.sessionId = :sessionId", { sessionId: sessionId })
      .getOne();
  }
}
