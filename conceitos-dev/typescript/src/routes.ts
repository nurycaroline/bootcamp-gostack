import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: 'nurycaroline@gmail.com',
    password: '123456',
    techs: [
      'NodeJS',
      'React',
      { title: 'Javascript', experience: 100 }
    ]
  });

  return response.json({ message: 'Hello World' });
}