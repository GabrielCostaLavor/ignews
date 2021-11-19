import { NextApiRequest, NextApiResponse } from 'next';

export default (request:NextApiRequest, response:NextApiResponse) => {
  console.log(request.query);

  const users = [
    {id: 1, name: 'fernando'},
    {id: 2, name: 'bia'},
    {id: 3, name: 'arlete'},
  ];

  return response.json(users);
}