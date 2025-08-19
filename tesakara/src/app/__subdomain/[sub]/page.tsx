// import { notFound } from 'next/navigation'
// import InvitationView from '@/components/Template1View'
// import { getInvitationBySubdomain } from '@/lib/data'

// // ISR: regenerate tiap 60 detik (sesuaikan)
// export const revalidate = 60

// export default async function SubPage({ params }: { params: { sub: string } }) {
//   const data = await getInvitationBySubdomain(params.sub)
//   if (!data) return notFound()
//   return <InvitationView data={data} />
// }

// debug
// src/app/__subdomain/[sub]/page.tsx
export default function Page({ params }: { params: { sub: string } }) {
  return (
    <div style={{ padding: 24, fontFamily: 'ui-sans-serif, system-ui' }}>
      <h1>Wildcard works ✅</h1>
      <p>Subdomain: <b>{params.sub}</b></p>
      <p>If you see this, the route is correct.</p>
    </div>
  )
}
