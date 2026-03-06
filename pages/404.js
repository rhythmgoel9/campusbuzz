import { useEffect } from 'react';
export default function NotFound() {
  useEffect(() => { if (typeof window !== 'undefined') window.location.href = '/'; }, []);
  return null;
}
