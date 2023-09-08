import { NextFunction, Request, Response } from "express";

import { templatePrestadores } from "../utils/templates/email-prestadores";
import { templateComercios } from "../utils/templates/email-comercios";
import { templateEmpresas } from "../utils/templates/email-empresas";
import transporter from "../utils/nodemailer";
import { success } from "../network/response";
import error from "../utils/customErrorHandler";

const sendEmailController = {
  sendPrestadores: async (req: Request, res: Response) => {
    // #swagger.tags = ['Send Email']
    try {
      const {
        nombre,
        email,
        celular,
        establecimiento,
        ciudad,
        localidad,
        instagram,
        provincia,
      } = req.body;

      const info = await transporter.sendMail({
        from: `${nombre} <${email}>`,
        to: process.env.EMAIL_PRESTADORES,
        subject: "Información del formulario prestadores",
        html: templatePrestadores({
          nombre,
          email,
          celular,
          establecimiento,
          ciudad,
          localidad,
          instagram,
          provincia,
        }),
      });

      res.status(200).json({ message: "Email sent", info });
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  sendComercios: async (req: Request, res: Response) => {
    // #swagger.tags = ['Send Email']
    try {
      const {
        nombre,
        email,
        celular,
        establecimiento,
        ciudad,
        cantidadEmpleados,
      } = req.body;

      const info = await transporter.sendMail({
        from: `${nombre} <${email}>`,
        to: process.env.EMAIL_COMERCIOS,
        subject: "Información del formulario comercios",
        html: templateComercios({
          nombre,
          email,
          celular,
          establecimiento,
          ciudad,
          cantidadEmpleados,
        }),
      });

      res.status(200).json({ message: "Email sent", info });
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  sendEmpresas: async (req: Request, res: Response) => {
    // #swagger.tags = ['Send Email']
    try {
      const {
        nombre,
        email,
        celular,
        cantidadEmpleados,
        puesto,
        empresa,
        descripcion,
        dni,
      } = req.body;

      const info = await transporter.sendMail({
        from: `${nombre} <${email}>`,
        to: process.env.EMAIL_EMPRESAS,
        subject: "Información del formulario empresas",
        html: templateEmpresas({
          nombre,
          email,
          celular,
          cantidadEmpleados,
          puesto,
          empresa,
          descripcion,
          dni,
        }),
      });

      res.status(200).json({ message: "Email sent", info });
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  sendEmpresasInfo: async (req: Request, res: Response) => {
    // #swagger.tags = ['Send Email']
    try {
      const {
        nombre,
        email,
        celular,
        cantidadEmpleados,
        puesto,
        empresa,
        descripcion,
        dni,
      } = req.body;

      const info = await transporter.sendMail({
        from: `${nombre} <${email}>`,
        to: process.env.EMAIL_EMPRESAS_INFO,
        subject: "Información del formulario Empresas",
        html: templateEmpresas({
          nombre,
          email,
          celular,
          cantidadEmpleados,
          puesto,
          empresa,
          descripcion,
          dni,
        }),
      });

      res.status(200).json({ message: "Email sent", info });
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  sendApto: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Send Email']
    try {
      const { user_id, user_nombre, user_email, user_apellido, image } =
        req.body;

      if (!user_id || !user_nombre || !user_email || !user_apellido || !image)
        throw error(
          "error al enviar apto medico, por favor intenta de nuevo",
          400,
        );

      const info = await transporter.sendMail({
        from: `${user_nombre} ${user_apellido} <${user_email}>`,
        to: "carlosmedina@sportclub.team",
        subject: "Envio de apto medico",
        html: `<p>El usuario ${user_nombre} ${user_apellido} con id ${user_id} ha enviado su apto medico</p>`,
        attachments: [
          {
            filename: "apto-medico.jpg",
            content: image,
            encoding: "base64",
          },
        ],
      });

      // if (!req.files) throw error('No file were uploaded.', 400)
      //eslint-disable-next-line
      // const file = req.files as { [fieldname: string]: Express.Multer.File[] }

      success(req, res, `${info} apto medico enviado con exito`, 200);
    } catch (e) {
      next(e);
    }
  },
};

export default sendEmailController;
