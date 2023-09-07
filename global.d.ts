type User = {
  id: string
  email: string
  rol_id: number
}

declare global {
  namespace Express {
    interface Request {
      User: User
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string | number
      DB_NAME: string
      DB_URL: string
      DB_USER: string
      DB_PASSWORD: string
      CLIENT_ID: string
      CLIENT_SECRET: string
      BUCKET_NAME: string
      AWS_REGION: string
      AWS_ACCESS_KEY: string
      AWS_SECRET_KEY: string
      BUCKET_URL: string
      NODEMAILER_HOST: string | number
      NODEMAILER_PORT: string
      NODEMAILER_MAIL: string
      NODEMAILER_PASS: string
    }
  }
}
export {}
