const nodemailer = require("nodemailer")

async function sendVerificationMail(user, callback) {
    let testAccount =  nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port : 2525,
        auth: {
        user: "04d67c0ae66f1f",
        pass: "a052f0c5299171"
  }
    })

    let mailOption = {
        from : "'FX-JOURNAL'", // semder address
        to: user.email,
        subject : 'Verify Account',
        html : ` <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html>
          <head>
            <!-- Compiled with Bootstrap Email version: 1.3.1 --><meta http-equiv="x-ua-compatible" content="ie=edge">
            <meta name="x-apple-disable-message-reformatting">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <style>
            @font-face {
              font-family: 'Fira Sans'; font-style: normal; font-weight: 300; font-display: swap; src: url('https://fonts.gstatic.com/s/firasans/v16/va9B4kDNxMZdWfMOD5VnPKruQQ.ttf') format('truetype');
              }
              @font-face {
              font-family: 'Fira Sans'; font-style: normal; font-weight: 400; font-display: swap; src: url('https://fonts.gstatic.com/s/firasans/v16/va9E4kDNxMZdWfMOD5VfkA.ttf') format('truetype');
              }
              @font-face {
              font-family: 'Rubik'; font-style: italic; font-weight: 300; font-display: swap; src: url('https://fonts.gstatic.com/s/rubik/v21/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8sDE0Uw.ttf') format('truetype');
              }
              @font-face {
              font-family: 'Rubik'; font-style: italic; font-weight: 900; font-display: swap; src: url('https://fonts.gstatic.com/s/rubik/v21/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8v0FEUw.ttf') format('truetype');
              }
              @font-face {
              font-family: 'Rubik'; font-style: normal; font-weight: 300; font-display: swap; src: url('https://fonts.gstatic.com/s/rubik/v21/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-WYi1UA.ttf') format('truetype');
              }
              @font-face {
              font-family: 'Rubik'; font-style: normal; font-weight: 600; font-display: swap; src: url('https://fonts.gstatic.com/s/rubik/v21/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-2Y-1UA.ttf') format('truetype');
              }
              @font-face {
              font-family: 'Rubik'; font-style: normal; font-weight: 700; font-display: swap; src: url('https://fonts.gstatic.com/s/rubik/v21/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-4I-1UA.ttf') format('truetype');
              }
              @font-face {
              font-family: 'Rubik'; font-style: normal; font-weight: 800; font-display: swap; src: url('https://fonts.gstatic.com/s/rubik/v21/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-h4-1UA.ttf') format('truetype');
              }
              @font-face {
              font-family: 'Rubik'; font-style: normal; font-weight: 900; font-display: swap; src: url('https://fonts.gstatic.com/s/rubik/v21/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-ro-1UA.ttf') format('truetype');
              }
            </style>          <style type="text/css">
              body,table,td{font-family:Helvetica,Arial,sans-serif !important}.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:150%}a{text-decoration:none}*{color:inherit}a[x-apple-data-detectors],u+#body a,#MessageViewBody a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit}img{-ms-interpolation-mode:bicubic}table:not([class^=s-]){font-family:Helvetica,Arial,sans-serif;mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;border-collapse:collapse}table:not([class^=s-]) td{border-spacing:0px;border-collapse:collapse}@media screen and (max-width: 600px){.w-full,.w-full>tbody>tr>td{width:100% !important}*[class*=s-lg-]>tbody>tr>td{font-size:0 !important;line-height:0 !important;height:0 !important}.s-2>tbody>tr>td{font-size:8px !important;line-height:8px !important;height:8px !important}.s-3>tbody>tr>td{font-size:12px !important;line-height:12px !important;height:12px !important}.s-5>tbody>tr>td{font-size:20px !important;line-height:20px !important;height:20px !important}.s-10>tbody>tr>td{font-size:40px !important;line-height:40px !important;height:40px !important}}
            </style>
          </head>
          <body class="bg-light" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#f7fafc">
            <table class="bg-light body" valign="top" role="presentation" border="0" cellpadding="0" cellspacing="0" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#f7fafc">
              <tbody>
                <tr>
                  <td valign="top" style="line-height: 24px; font-size: 16px; margin: 0;" align="left" bgcolor="#f7fafc">
                    <table class="container" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                      <tbody>
                        <tr>
                          <td align="center" style="line-height: 24px; font-size: 16px; margin: 0; padding: 0 16px;">
                            <!--[if (gte mso 9)|(IE)]>
                              <table align="center" role="presentation">
                                <tbody>
                                  <tr>
                                    <td width="600">
                            <![endif]-->
                            <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
                              <tbody>
                                <tr>
                                  <td style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                                    <table class="s-10 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                      <tbody>
                                        <tr>
                                          <td style="line-height: 40px; font-size: 40px; width: 100%; height: 40px; margin: 0;" align="left" width="100%" height="40">
                                            &#160;
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table class="card" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-radius: 6px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 1px solid #e2e8f0;" bgcolor="#ffffff">
                                      <tbody>
                                        <tr>
                                          <td style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;" align="left" bgcolor="#ffffff">
                                            <table class="card-body" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                                              <tbody>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 20px;" align="left">
                                                    <h1 class="h3  rubik text-center fw-bold" style="padding-top: 0; padding-bottom: 0; font-weight: bold; vertical-align: baseline; font-size: 28px; line-height: 33.6px; font-family: 'Rubik', sans-serif; margin: 0;" align="center"> Fx Journal</h1>
                                                    <table class="s-2 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                      <tbody>
                                                        <tr>
                                                          <td style="line-height: 8px; font-size: 8px; width: 100%; height: 8px; margin: 0;" align="left" width="100%" height="8">
                                                            &#160;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                      <tbody>
                                                        <tr>
                                                          <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                                            &#160;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    <table class="hr" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                                                      <tbody>
                                                        <tr>
                                                          <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; height: 1px; width: 100%; margin: 0;" align="left">
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                      <tbody>
                                                        <tr>
                                                          <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                                            &#160;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    <div class="space-y-3">
                                                      <p class="text-gray-700 rubik" style="line-height: 24px; font-size: 16px; color: #4a5568; width: 100%; font-family: 'Rubik', sans-serif; font-weight: bold; margin: 0;" align="left"> Hello ${user.lastname}, </p>
                                                      <table class="s-3 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                        <tbody>
                                                          <tr>
                                                            <td style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" align="left" width="100%" height="12">
                                                              &#160;
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <p class="text-gray-700" style="line-height: 24px; font-size: 16px; color: #4a5568; width: 100%; font-family: 'Fira Sans', sans-serif; margin: 0;" align="left">
                                                        To complete your registration on Fx Journal, please confirm your email address. This is to ensure we have the right email address
                                                      </p>
                                                      <table class="s-3 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                        <tbody>
                                                          <tr>
                                                            <td style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" align="left" width="100%" height="12">
                                                              &#160;
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                        <tbody>
                                                          <tr>
                                                            <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                                              &#160;
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <p class="text-gray-700" style="line-height: 24px; font-size: 16px; color: #4a5568; width: 100%; font-family: 'Fira Sans', sans-serif; margin: 0;" align="left"> Please click the button below to complete verification </p>
                                                      <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                        <tbody>
                                                          <tr>
                                                            <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                                              &#160;
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </div>
                                                    <table class="btn btn-success" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-radius: 6px; border-collapse: separate !important;">
                                                      <tbody>
                                                        <tr>
                                                          <td style="line-height: 24px; font-size: 16px; border-radius: 6px; margin: 0;" align="center" bgcolor="#198754">
                                                            <a href="http://localhost:3000/auth/emailVerification/${user.email}" target="_blank" style="color: #ffffff; font-size: 16px; font-family: Helvetica, Arial, sans-serif; text-decoration: none; border-radius: 6px; line-height: 20px; display: block; font-weight: normal; white-space: nowrap; background-color: #198754; padding: 8px 12px; border: 1px solid #198754;"> Verify Account </a>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    <table class="s-2 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                      <tbody>
                                                        <tr>
                                                          <td style="line-height: 8px; font-size: 8px; width: 100%; height: 8px; margin: 0;" align="left" width="100%" height="8">
                                                            &#160;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    <p class="text-gray-700" style="line-height: 24px; font-size: 16px; color: #4a5568; width: 100%; font-family: 'Fira Sans', sans-serif; margin: 0;" align="left"> if you did not create account no further action required </p>
                                                    <table class="s-2 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                      <tbody>
                                                        <tr>
                                                          <td style="line-height: 8px; font-size: 8px; width: 100%; height: 8px; margin: 0;" align="left" width="100%" height="8">
                                                            &#160;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                      <tbody>
                                                        <tr>
                                                          <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                                            &#160;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    <div class="">
                                                      <p class="text-gray-700" style="line-height: 24px; font-size: 16px; color: #4a5568; width: 100%; font-family: 'Fira Sans', sans-serif; margin: 0;" align="left"> Thank you, </p>
                                                      <h5 class="text-gray-700 rubik" style="color: #4a5568; padding-top: 0; padding-bottom: 0; font-weight: bold; vertical-align: baseline; font-size: 20px; line-height: 24px; font-family: 'Rubik', sans-serif; margin: 0;" align="left"> Fx Journal </h5>
                                                    </div>
                                                    <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                      <tbody>
                                                        <tr>
                                                          <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                                            &#160;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table class="s-10 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                      <tbody>
                                        <tr>
                                          <td style="line-height: 40px; font-size: 40px; width: 100%; height: 40px; margin: 0;" align="left" width="100%" height="40">
                                            &#160;
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!--[if (gte mso 9)|(IE)]>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                            <![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>
        `
    }

    // send mail with defined transporter
    let info = await transporter.sendMail(mailOption);

    callback(info)
}


module.exports = sendVerificationMail