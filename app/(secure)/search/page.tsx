"use client"
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();

  // E.g. `/dashboard?page=2&order=asc`
  const page = searchParams.get('page');
  const order = searchParams.get('order');

  return (
    <div>
      <p>Page: {page}</p>
      <p>Order: {order}</p>
    </div>
  );
}