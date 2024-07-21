import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { query } = req.body;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      res.status(200).json({ response: data.response });
    } catch (error) {
      res.status(500).json({ error: 'Error querying the AI' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
