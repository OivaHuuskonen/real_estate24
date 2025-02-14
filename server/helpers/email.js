/*import * as config from "../config.js";

const style = `
    background: #eee;
    padding: 20px;
    border-radius: 20px;
`;

export const emailTemplate = (email, content, replyTo, subject) => {
  //console.log("Sending email to: ", email); // Debugging line
  return {
    Source: config.EMAIL_FROM,
    Destination: {
     ToAddresses: [email],
    },
    ReplyToAddresses: [replyTo],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
                <html>
                    <div style="${style}">
                        <h1>Welcome to free property realization marketplace</h1>
                        ${content}
                        <p>&copy; ${new Date().getFullYear()}</p>
                    </div>
                </html>
              `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
  };
};*/

import * as config from "../config.js";

const style = `
    background: #eee;
    padding: 20px;
    border-radius: 20px;
`;

export const emailTemplate = (email, content, replyTo, subject) => {
  return {
    Source: config.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [replyTo],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <html>
              <div style="${style}">
                <h1>Welcome to free property realization marketplace</h1>
                ${content}
                <p>&copy; ${new Date().getFullYear()}</p>
              </div>
            </html>
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
  };
};

// New helper function to send emails
export const sendEmail = async (email, content, replyTo, subject) => {
  try {
    const params = emailTemplate(email, content, replyTo, subject);
    return await config.sendEmail(params);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};