export async function onRequest(context) {
  const url = 'https://script.google.com/macros/s/AKfycbxj3wl7rhOtSvUNKacC-OnUKon4WQYYprvbEki6eq1kWNdbO0O5RQJ-nSHuRFJxotP7ng/exec';

  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders()
    });
  }

  if (context.request.method === 'GET') {
    const res = await fetch(url);
    const data = await res.text();
    return new Response(data, {
      status: 200,
      headers: corsHeaders()
    });
  }

  if (context.request.method === 'POST') {
    const body = await context.request.text();
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });
    const data = await res.text();
    return new Response(data, {
      status: 200,
      headers: corsHeaders()
    });
  }

  return new Response('Method not allowed', { status: 405 });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}
