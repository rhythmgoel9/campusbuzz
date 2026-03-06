// pages/index.js — serves the full CampusBuzz frontend
import fs from 'fs';
import path from 'path';

export default function Home() { return null; }

export async function getServerSideProps({ res }) {
  const file = path.join(process.cwd(), 'public', 'app.html');
  const html = fs.readFileSync(file, 'utf-8');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
  res.write(html);
  res.end();
  return { props: {} };
}
