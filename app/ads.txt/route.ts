import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET() {
  const adsTxt = process.env.ADS_TXT_CONTENT?.trim();

  const body =
    adsTxt && adsTxt.length > 0
      ? adsTxt
      : '# ads.txt is not configured yet for Smart Calculator Pro.\n';

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
