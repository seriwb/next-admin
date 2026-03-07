import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "@/lib/aws";

// メール送信ユーティリティ
export const sendMail = async (to: string, subject: string, html: string): Promise<void> => {
  const from = process.env.MAIL_FROM ?? "no-reply@example.com";
  const command = new SendEmailCommand({
    Source: from,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: html,
          Charset: "UTF-8",
        },
      },
    },
  });
  await sesClient.send(command);
};
