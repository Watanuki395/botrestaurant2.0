const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


function sendEmail(xto,FName,NumSeg,xDate,xHora){
    
    const msg = {
      templateId: "d-4d6ba1d6ed7e41d6a172170ec7e65a56",
      to: xto, // Change to your recipient
      from: 'info@galer-ia.com', // Change to your verified sender
      subject: 'Recuperación de contraseña',
      dynamic_template_data:{
        FName,NumSeg,xDate,xHora
      }
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log(`Email sent to ${xto}`);
      })
      .catch((error) => {
        console.error(error)
      });
};


module.exports =  {
    sendEmail : sendEmail
}