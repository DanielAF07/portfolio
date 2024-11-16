export const config = {
  matcher: '/',
};

export default function middleware(request) {
  const country = request.geo?.country || 'Unknown';

  // Set a cookie with the detected country
  const response = new Response(null, {
    headers: {
      'Set-Cookie': `country=${country}; Path=/;`,
    },
  });

  return response;
}