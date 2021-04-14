import { Router, Request, Response } from 'express'

import { getTasks, saveTask, getTask, updateTask, finishedTask, RemoveTask } from './controller/TasksController';

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Tasks World -2'})
})

routes.get('/tasks', getTasks)
routes.get('/tasks/:id', getTask)
routes.post('/tasks', saveTask)
routes.put('/tasks/:id', updateTask)
routes.patch('/tasks/:id', finishedTask)
routes.delete('/tasks/:id', RemoveTask)

export default routes;