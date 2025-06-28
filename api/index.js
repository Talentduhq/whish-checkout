export default async function handler(req, res) {
  const axios = await import('axios').then(mod => mod.default);

  const headers = {
    'channel': '10195592',
    'secret': '06f452d144664c2a9bdb81c206fbcc94',
    'websiteurl': 'talentdu.com',
    'Content-Type': 'application/json'
  };

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
    const response = await axios.post(
      'https://lb.sandbox.whish.money/itel-service/api/payment/whish',
      data,
      { headers }
    );
    const whishUrl = response.data?.data?.whishUrl;
    res.status(200).json({ whishUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate payment link.' });
  }
}
