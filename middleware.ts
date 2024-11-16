import { next } from '@vercel/edge';
import { geolocation } from '@vercel/functions';

const BLOCKED_COUNTRY = 'US';

export const config = {
  // Only run the middleware on the home route
  matcher: '/',
};

export default function middleware(request: Request) {
  const { country } = geolocation(request);
  console.log(country)
  return next({
    headers: {
      'Set-Cookie': `country=${country}; Path=/;`
    }
  })
}