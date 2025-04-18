import Express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'

const app: Application = Express()

//parser
app.use(Express.json())
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://medi-sphere-five.vercel.app',
      'http://localhost:5174',
    ],
    credentials: true,
  }),
)

// App Api Routes
app.use('/api', router)
app.get('/', (req: Request, res: Response) => {
  res.send('Medi-Sphere App Is Running')
})

export default app
