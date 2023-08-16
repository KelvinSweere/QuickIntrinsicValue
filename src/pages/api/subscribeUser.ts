import fetch from 'isomorphic-unfetch';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  console.log({ email });

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const DATACENTER = process.env.MAILCHIMP_API_SERVER;

    // Check if the user is already a member
    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${encodeURIComponent(
        email
      )}`,
      {
        headers: {
          Authorization: `apikey ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }
    );

    if (response.status === 200) {
      // User is already a member, handle accordingly
      return res.status(409).json({ message: 'User is already subscribed' });
    } else if (response.status === 404) {
      // User is not a member, proceed to subscribe
      const data = {
        email_address: email,
        status: 'subscribed',
      };

      const subscribeResponse = await fetch(
        `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
        {
          body: JSON.stringify(data),
          headers: {
            Authorization: `apikey ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }
      );

      if (subscribeResponse.status >= 400) {
        return res.status(400).json({
          error: `There was an error subscribing to the newsletter.
          Hit me up peter@peterlunch.com and I'll add you the old fashioned way :(.`,
        });
      }

      return res.status(201).json({ message: 'User subscribed successfully' });
    } else {
      // Handle other response statuses
      return res.status(500).json({
        error: 'An unexpected error occurred while checking the user status',
      });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
