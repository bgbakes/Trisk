// app/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import WelcomePage from './welcome';

export default async function HomePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect('/track');
  return <WelcomePage />;
}
