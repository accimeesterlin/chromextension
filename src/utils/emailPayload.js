import { Base64 } from 'js-base64';


export const createEmailPayload = ({ subject, receiver, sender, message, threadId }) => {
    if (!subject && !subject && !receiver && !sender) {
        throw new Error('Please provide the following required params subject, receiver, sender, and message');
    }
    const payload = {
        subject,
        receiver,
        sender,
        message
    };
  
    const rfc2822Format = createRf2822Format(payload);

    payload.raw = Base64.encode(rfc2822Format).replace(/\+/g, "-") // base64Url

    if (threadId) {
        payload.threadId = threadId;
    }

    return payload;
}

export const createRf2822Format = ({ sender, receiver, subject, message }) => {
    // RFC 2822 format
    let rfc2822Format = `From: ${sender}\n`
        rfc2822Format += `To: ${receiver}\n`
        rfc2822Format += `Subject: ${subject}\n`
        rfc2822Format += `Content-Type: text/html\n`
        rfc2822Format += `Content-Transfer-Encoding: base64\n\n`

        rfc2822Format += `${message}`;
    return rfc2822Format;
};
