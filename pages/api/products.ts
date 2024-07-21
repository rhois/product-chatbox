import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const data = await response.json();
  res.status(200).json(data);
};
