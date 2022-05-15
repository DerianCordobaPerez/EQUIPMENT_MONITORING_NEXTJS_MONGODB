export const DB_HOST = process.env.NEXT_PUBLIC_ENV_DB_HOST || 'localhost'
export const DB_USER = process.env.NEXT_PUBLIC_ENV_DB_USER || 'root'
export const DB_PASSWORD = process.env.NEXT_PUBLIC_ENV_DB_PASSWORD || 'root'
export const DB_PORT = process.env.NEXT_PUBLIC_ENV_DB_PORT || 27017
export const DB_NAME = process.env.NEXT_PUBLIC_ENV_DB_NAME || 'monitoring_db'
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const MONGODB_URI =
  NODE_ENV === 'production'
    ? `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
    : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

export const URL = process.env.NEXT_PUBLIC_ENV_URL || 'localhost'
export const API_COMPUTERS = `http://${URL}:3000/api/computers`
