import { geolocation } from '@vercel/functions';

const BLOCKED_COUNTRY = 'US';

export const config = {
  // Only run the middleware on the home route
  matcher: '/',
};

export default function middleware(request: Request) {
  const { country } = geolocation(request);
  // You can also get the country using dot notation on the function
  // const country = geolocation(request).country;
  console.log(country)

  const response = new Response(null, {
    headers: {
      'Set-Cookie': `country=${country}; Path=/;`
    }
  })
  // Return a new redirect response
  return response
}