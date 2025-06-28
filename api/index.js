import fetch from 'node-fetch';

export default async function handler(req, res) {
  const data = {
    amount: 499,
    currency: 'USD',
    invoice: 'Meta Certified Course - Talentdu',
    externalId: Date.now(),
    successCallbackUrl: 'https://www.talentdu.com/thank-you',
    failureCallbackUrl: 'https://www.talentdu.com/payment-error',
    successRedirectUrl: 'https://www.talentdu.com/thank-you',
    failureRedirectUrl: 'https://www.talentdu.com/payment-error'
  };

  try {
    const response = await fetch('https://lb.sandbox.whish.money/itel-service/api/payment/whish', {
      method: 'POST',
      headers: {
        'channel': '10195592',
        'secret': '06f452d144664c2a9bdb81c206fbcc94',
        'websiteurl': 'talentdu.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    const whishUrl = result?.data?.whishUrl;

    if (whishUrl) {
      res.status(200).json({ whishUrl });
    } else {
      res.status(500).json({ error: 'No link returned from Whish' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate payment link.' });
  }
}
