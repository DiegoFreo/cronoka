'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const { 'cronometro-token': token } = parseCookies();

    if (!token) {
      router.push('/');
    }
  }, []);

  return <>{children}</>;
}