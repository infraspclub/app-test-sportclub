import { type Email } from '../../interfaces/email'

export const templateEmpresas = ({
  nombre,
  email,
  celular,
  puesto,
  cantidadEmpleados,
  empresa,
  descripcion,
  dni,
}: Email) => {
  const template = `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta charset="UTF-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>New Template</title><!--[if (mso 16)]>
<style type="text/css">
a {text-decoration: none;}
</style>
<![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG></o:AllowPNG>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]--><!--[if !mso]><!-- -->
  <link
    href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet"><!--<![endif]-->
  <style type="text/css">
    .rollover:hover .rollover-first {
      max-height: 0px !important;
      display: none !important;
    }

    .rollover:hover .rollover-second {
      max-height: none !important;
      display: block !important;
    }

    .rollover div {
      font-size: 0;
    }

    u~div img+div>div {
      display: none;
    }

    #outlook a {
      padding: 0;
    }

    span.MsoHyperlink,
    span.MsoHyperlinkFollowed {
      color: inherit;
      mso-style-priority: 99;
    }

    a.es-button {
      mso-style-priority: 100 !important;
      text-decoration: none !important;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    .es-desk-hidden {
      display: none;
      float: left;
      overflow: hidden;
      width: 0;
      max-height: 0;
      line-height: 0;
      mso-hide: all;
    }

    .es-header-body a:hover {
      color: #000000 !important;
    }

    .es-content-body a:hover {
      color: #391484 !important;
    }

    .es-footer-body a:hover {
      color: #391484 !important;
    }

    .es-infoblock a:hover {
      color: #cccccc !important;
    }

    .es-button-border:hover>a.es-button {
      color: #000000 !important;
    }

    .container-hover:hover>table {
      background: linear-gradient(153.06deg, #7EE8FA -0.31%, #EEC0C6 99.69%) !important;
      transition: 0.3s all !important;
    }

    .es-menu.es-table-not-adapt td a:hover,
    a.es-button:hover {
      text-decoration: underline !important;
    }

    @media only screen and (max-width:600px) {
      .es-m-p15r {
        padding-right: 15px !important
      }

      .es-m-p15l {
        padding-left: 15px !important
      }

      .es-m-p20 {
        padding: 20px !important
      }

      *[class="gmail-fix"] {
        display: none !important
      }

      p,
      a {
        line-height: 150% !important
      }

      h1,
      h1 a {
        line-height: 120% !important
      }

      h2,
      h2 a {
        line-height: 120% !important
      }

      h3,
      h3 a {
        line-height: 120% !important
      }

      h4,
      h4 a {
        line-height: 120% !important
      }

      h5,
      h5 a {
        line-height: 120% !important
      }

      h6,
      h6 a {
        line-height: 120% !important
      }

      .es-header-body p {}

      .es-content-body p {}

      .es-footer-body p {}

      .es-infoblock p {}

      h1 {
        font-size: 28px !important;
        text-align: left
      }

      h2 {
        font-size: 24px !important;
        text-align: left
      }

      h3 {
        font-size: 20px !important;
        text-align: left
      }

      h4 {
        font-size: 24px !important;
        text-align: left
      }

      h5 {
        font-size: 20px !important;
        text-align: left
      }

      h6 {
        font-size: 16px !important;
        text-align: left
      }

      .es-header-body h1 a,
      .es-content-body h1 a,
      .es-footer-body h1 a {
        font-size: 28px !important
      }

      .es-header-body h2 a,
      .es-content-body h2 a,
      .es-footer-body h2 a {
        font-size: 24px !important
      }

      .es-header-body h3 a,
      .es-content-body h3 a,
      .es-footer-body h3 a {
        font-size: 20px !important
      }

      .es-header-body h4 a,
      .es-content-body h4 a,
      .es-footer-body h4 a {
        font-size: 24px !important
      }

      .es-header-body h5 a,
      .es-content-body h5 a,
      .es-footer-body h5 a {
        font-size: 20px !important
      }

      .es-header-body h6 a,
      .es-content-body h6 a,
      .es-footer-body h6 a {
        font-size: 16px !important
      }

      .es-menu td a {
        font-size: 16px !important
      }

      .es-header-body p,
      .es-header-body a {
        font-size: 16px !important
      }

      .es-content-body p,
      .es-content-body a {
        font-size: 16px !important
      }

      .es-footer-body p,
      .es-footer-body a {
        font-size: 16px !important
      }

      .es-infoblock p,
      .es-infoblock a {
        font-size: 12px !important
      }

      .es-m-txt-c,
      .es-m-txt-c h1,
      .es-m-txt-c h2,
      .es-m-txt-c h3,
      .es-m-txt-c h4,
      .es-m-txt-c h5,
      .es-m-txt-c h6 {
        text-align: center !important
      }

      .es-m-txt-r,
      .es-m-txt-r h1,
      .es-m-txt-r h2,
      .es-m-txt-r h3,
      .es-m-txt-r h4,
      .es-m-txt-r h5,
      .es-m-txt-r h6 {
        text-align: right !important
      }

      .es-m-txt-j,
      .es-m-txt-j h1,
      .es-m-txt-j h2,
      .es-m-txt-j h3,
      .es-m-txt-j h4,
      .es-m-txt-j h5,
      .es-m-txt-j h6 {
        text-align: justify !important
      }

      .es-m-txt-l,
      .es-m-txt-l h1,
      .es-m-txt-l h2,
      .es-m-txt-l h3,
      .es-m-txt-l h4,
      .es-m-txt-l h5,
      .es-m-txt-l h6 {
        text-align: left !important
      }

      .es-m-txt-r img,
      .es-m-txt-c img,
      .es-m-txt-l img,
      .es-m-txt-r .rollover:hover .rollover-second,
      .es-m-txt-c .rollover:hover .rollover-second,
      .es-m-txt-l .rollover:hover .rollover-second {
        display: inline !important
      }

      .es-m-txt-r .rollover div,
      .es-m-txt-c .rollover div,
      .es-m-txt-l .rollover div {
        line-height: 0 !important;
        font-size: 0 !important
      }

      .es-spacer {
        display: inline-table
      }

      a.es-button,
      button.es-button {
        font-size: 20px !important
      }

      .es-m-fw,
      .es-m-fw.es-fw,
      .es-m-fw .es-button {
        display: block !important
      }

      .es-m-il,
      .es-m-il .es-button,
      .es-social,
      .es-social td,
      .es-menu {
        display: inline-block !important
      }

      .es-adaptive table,
      .es-left,
      .es-right {
        width: 100% !important
      }

      .es-content table,
      .es-header table,
      .es-footer table,
      .es-content,
      .es-footer,
      .es-header {
        width: 100% !important;
        max-width: 600px !important
      }

      .adapt-img {
        width: 100% !important;
        height: auto !important
      }

      .es-mobile-hidden,
      .es-hidden {
        display: none !important
      }

      .es-desk-hidden {
        width: auto !important;
        overflow: visible !important;
        float: none !important;
        max-height: inherit !important;
        line-height: inherit !important
      }

      tr.es-desk-hidden {
        display: table-row !important
      }

      table.es-desk-hidden {
        display: table !important
      }

      td.es-desk-menu-hidden {
        display: table-cell !important
      }

      .es-menu td {
        width: 1% !important
      }

      table.es-table-not-adapt,
      .esd-block-html table {
        width: auto !important
      }

      .es-social td {
        padding-bottom: 10px
      }

      .h-auto {
        height: auto !important
      }

      .m-c-p16r {
        padding-right: 8vw
      }

      a.es-button,
      button.es-button {
        display: inline-block !important
      }

      .es-button-border {
        display: inline-block !important
      }
    }
  </style>
</head>

<body style="width:100%;height:100%;padding:0;Margin:0">
  <div class="es-wrapper-color" style="background-color:#FFFFFF"><!--<[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" color="#333333" ></v:fill>
</v:background>
<![endif]-->
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-color:#efe2e2;background-position:center top">
      <tr>
        <td valign="top" style="padding:10px;Margin:0">
          <table cellpadding="0" cellspacing="0" class="es-content" align="center"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
            <tr>
              <td class="es-m-p15r es-m-p15l" align="center" bgcolor="transparent"
                style="padding:0;Margin:0;background-color:transparent">
                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:transparent;width:640px;border-width:0"
                  bgcolor="transparent">
                  <tr>
                    <td align="left" style="padding:0;Margin:0;padding-top:30px;padding-right:40px;padding-left:40px">
                      <table cellpadding="0" cellspacing="0" width="100%"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr class="es-mobile-hidden">
                                <td align="center" height="15" style="padding:0;Margin:0"></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td class="es-m-p20" align="left" bgcolor="#ffffff"
                      style="padding:30px;Margin:0;background-color:#ffffff;border-radius:20px">
                      <table cellpadding="0" cellspacing="0" width="100%"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td align="left" style="padding:0;Margin:0;width:580px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td align="left" style="padding:0;Margin:0;font-size:0"><a target="_blank"
                                    href="https://prueba.sportclub.com.ar"
                                    style="mso-line-height-rule:exactly;text-decoration:underline;color:#391484;font-size:18px"><img
                                      src="https://xpnuia.stripocdn.email/content/guids/CABINET_ab21e72352b1df76b5a95596258b8d098aa5b2d4641c81ea70970aa7da519703/images/logosportclubnegrorojo.png"
                                      alt="logo sportclub" width="150" title="logo sportclub"
                                      style="display:block;font-size:18px;border:0;outline:none;text-decoration:none"></a>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" style="padding:20px;Margin:0;font-size:0">
                                  <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0"
                                    class="es-spacer" role="presentation"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                    <tr>
                                      <td
                                        style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px">
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" style="padding:0;Margin:0">
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px;letter-spacing:0;color:#666666;font-size:18px">
                                    <strong>Empresas:</strong>
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" style="padding:20px;Margin:0;font-size:0">
                                  <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0"
                                    class="es-spacer" role="presentation"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                    <tr>
                                      <td
                                        style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px">
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0">
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px !important;letter-spacing:0;color:#666666;font-size:18px">
                                    Nombre:&nbsp;<u>${nombre}</u></p>
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px !important;letter-spacing:0;color:#666666;font-size:18px">
                                    Email:&nbsp;<u>${email}</u><br></p>
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px !important;letter-spacing:0;color:#666666;font-size:18px">
                                    Celular:&nbsp;<u>${celular}</u></p>
                                    <p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px !important;letter-spacing:0;color:#666666;font-size:18px">
  DNI:&nbsp;<u>${dni || ''}</u>
</p>
<p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px !important;letter-spacing:0;color:#666666;font-size:18px">
  Empresa:&nbsp;<u>${empresa || ''}</u>
</p>
<p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px !important;letter-spacing:0;color:#666666;font-size:18px">
  Puesto:&nbsp;<u>${puesto || ''}</u>
</p>
                                  <p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px !important;letter-spacing:0;color:#666666;font-size:18px"> Descripción:&nbsp;<u>${
                                    descripcion || []
                                  }</u>
</p>
<p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px !important;letter-spacing:0;color:#666666;font-size:18px">
Cantidad de Empleados:&nbsp;<u>${cantidadEmpleados || ''}</u>
</p>
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px !important;letter-spacing:0;color:#666666;font-size:18px">
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" style="padding:20px;Margin:0;font-size:0">
                                  <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0"
                                    class="es-spacer" role="presentation"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                    <tr>
                                      <td
                                        style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px">
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" style="padding:0;Margin:0">
                                  <p
                                    style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:17px !important;letter-spacing:0;color:#666666;font-size:12px !important">
                                    En SportClub cuidamos tu salud, por eso te recordamos que tu apto médico es
                                    indispensable al momento de iniciar una actividad física (leyes nº 139 y
                                    12329).Copyright (c) 2022 SPORTCLUB. Todos los derechos reservados.</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style="padding:0;Margin:0;padding-right:40px;padding-left:40px;padding-top:10px">
                      <table cellpadding="0" cellspacing="0" width="100%"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr class="es-mobile-hidden">
                                <td align="center" height="15" style="padding:0;Margin:0"></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>

</html>`

  return template
}
