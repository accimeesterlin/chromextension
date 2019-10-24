import { Base64 } from 'js-base64';
import selectn from 'selectn';

const log = console.log;

export const createEmailPayload = (state) => {
    const payload = {};
    const subject = selectn('email.receiverDetails.subject', state) ||  selectn('templates.currentTemplate.templateSubject', state);
    const msg = selectn('email.receiverDetails.msg', state) || selectn('templates.currentTemplate.templateContent', state);
    const receiverEmail = selectn('email.receiverDetails.email', state);
    const senderEmail = selectn('tutor.emailAddress', state);

    if (!subject && !receiverEmail && !senderEmail) {
        throw new Error('Please provide the following required params subject, receiver, sender, and message');
    }
  
    payload.receiver = receiverEmail;
    payload.sender = senderEmail;
    payload.subject = subject;
    payload.message = msg;

    const rfc2822Format = createRf2822Format(payload);

    const raw = Base64.encode(rfc2822Format).replace(/\+/g, "-") // base64Url

    return {
        raw
    };
}

export const createRf2822Format = ({ sender, receiver, subject, message }) => {
    // RFC 2822 format
    let rfc2822Format = `From: ${sender}\n`
        rfc2822Format += `To: ${receiver}\n`
        rfc2822Format += `Subject: ${subject}\n`
        rfc2822Format += `Content-Type: text/html\n`
        rfc2822Format += `Content-Transfer-Encoding: base64\n\n`

        rfc2822Format += `${message}`;
    log('RFC2822 Format: ', rfc2822Format);
    return rfc2822Format;
};
