import { createId } from "@paralleldrive/cuid2";
import Notification from "../models/Notification";
import { sendNotificationType } from "../types/utils";

export default async ({ type, title, body, ref, to }: sendNotificationType) => {
  //  firebase stuff

  // const notification = await Notification.create({
  //   user_id:to,
  //   uuid:createId(),
  //   type,
  //   title,
  //   body,
  //   ref,
  // });

  // await notification.save()
};
