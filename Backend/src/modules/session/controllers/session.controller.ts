import { MoreThan } from "typeorm";
import { catchErrors } from "../../../utils/catchErrors";
import { SessionRepository } from "../../auth/repositories/session.repository";
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  SUCCESS,
} from "../../../config/http";
import { appAssert } from "../../../utils/appAssert";
import z from "zod";

const session_repository = new SessionRepository();
export const getSessionHandler = catchErrors(async (req, res) => {
  const cur_session = await session_repository.findOne({
    where: { sessionId: req.sessionId },
    relations: ["user"],
  });
  appAssert(cur_session, NOT_FOUND, "Session not found");

  const sessions = await session_repository.find({
    where: {
      user: { userId: cur_session!.user.userId },
      expiresAt: MoreThan(new Date()),
    },
    select: ["sessionId", "userAgent", "createdAt"],
    order: { createdAt: -1 }, // Decending order
  });

  // res.status(SUCCESS).json(sessions);
  res.status(SUCCESS).json(
    sessions.map((session) => ({
      sessionId: session.sessionId,
      userAgent: session.userAgent,
      createdAt: session.createdAt,
      isCurrent: session.sessionId === req.sessionId,
    })),
  );
});

export const deleteSessionHandler = catchErrors(async (req, res) => {
  const sessionId = z.string().uuid().parse(req.params.id);

  appAssert(
    sessionId !== req.sessionId,
    INTERNAL_SERVER_ERROR,
    "Can't delete current session",
  );

  const deletedSessions = await session_repository.delete({
    sessionId: sessionId,
    user: { userId: req.userId },
  });
  appAssert(deletedSessions, NOT_FOUND, "Session not found");

  res.status(SUCCESS).json({
    message: "Session deleted",
  });
});
