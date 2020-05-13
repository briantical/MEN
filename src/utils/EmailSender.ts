import _ from 'lodash';
import path from 'path';
import jade from 'jade';
import nodemailer from 'nodemailer';

import logger from '../../logger';
import config from '../../config';

/**
 * Send email for users
 *
 * Provides rendering email templates ana sending emails for users
 *
 * Example of usage
 *
 * new EmailSender('your subject', 'template_name', res, {}).
 *       sendFor(['email1', 'email2'], err => ...);
 *
 * @constructor
 *
 * @param {String}
 * @param {String} name of template for rendering from private/templates
 * @param {Object} data for template
 * @param {Object} res from api
 */

class EmailSender {
  _subject: string;
  _templateName: string;
  _templateDate: any;
  _transporter: any;
  constructor(subject: string, templateName: string, templateDate: any) {
    this._subject = subject;
    this._templateName = templateName;
    this._templateDate = templateDate;
    this._transporter = nodemailer.createTransport();
    this._sendEmail = this._sendEmail.bind(this);
  }
  /**
   * Send Email
   *
   * @private
   * @param {String}
   * @param {Function}
   */
  _sendEmail(recipient: any, callback: () => void) {
    const fileName = path.resolve(__dirname, '../../views', `./${this._templateName}.jade`);

    const html = jade.renderFile(fileName, {
      // subject: this._subject,
      // otherProperty: this._templateDate
    });
    const mailData = {
      html,
      from: 'userxxx',
      to: recipient,
      subject: this._subject
    };
    this._transporter.sendMail(mailData, (error: any) => {
      if (!error) {
        logger.info(`EmailSender [${this._templateName}]`, { error });
      }
      callback();
    });
  }
  /**
   * Send email for email addresses
   *
   * @param [Object] email addresses
   */
  sendFor(recipients: any, callback: any) {
    const emails = _.isArray(recipients) ? recipients : [recipients];
    emails.forEach((email) => this._sendEmail(email, callback));
  }

  static hrefFor(
    req: { protocol: any; get: (arg0: string) => any },
    localPath: any,
    data: { [x: string]: any },
    asParams: any
  ) {
    const protocol = process.env.NODE_ENV === 'production' ? 'http' : req.protocol;
    const rootUrl = `${protocol}://${req.get('host')}`;
    const domainPath = (rootUrl.slice(-1) === '/' && rootUrl) || `${rootUrl}/`;
    const dataToPath = !asParams
      ? (key: string | number) => `/${data[key]}/`
      : (key: string | number) => `?${key}=${data[key]};`;
    const datePath = data ? Object.keys(data).map(dataToPath).join('') : '';

    return `${domainPath}${localPath}${datePath}`;
  }
}

export = EmailSender;
