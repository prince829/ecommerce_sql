import { createTransport } from "nodemailer";
import Email from "email-templates";
import { config } from "../config/config.js";
import path from 'path'

class Mailer {
    protected _transport;
    constructor() {
        this._transport = createTransport({
            service: 'gmail',
            auth: {
                user: config.email.userName,
                pass: config.email.password,
            }
        })
    };
    /**
     * //@Method:sendMail
     * //@Description:To send email
     */
    async sendMail(from: string, to: string, subject: string, tplName: string, locals: any) {
        try {

            const mailer = new Mailer();
            const templateDir = path.join(process.cwd(),`/views/email-templates/${tplName}/html`);
            
            const email = new Email({
                message: {
                    from: from
                },
                transport: {
                    jsonTransport: true
                },
                views: {
                    root: '',
                    options: {
                        extension: 'ejs'
                    }
                }
            });

            let getResponse = await email.render(templateDir, locals);


            if (getResponse) {
                let options = {
                    from: from,
                    to: to,
                    subject: subject,
                    html: getResponse
                };

                let mailresponse = await mailer._transport.sendMail(options);


                if (mailresponse) {
                    return true;
                } else {
                    return false;
                }
            }

        } catch (err) {
            console.log(err, 'mail error')
            return false;
        }
    }
};
export{Mailer};