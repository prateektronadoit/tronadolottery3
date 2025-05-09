'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push('/verify-age');
  }, [router]);

  return null; // No need to render anything as we're redirecting
}
