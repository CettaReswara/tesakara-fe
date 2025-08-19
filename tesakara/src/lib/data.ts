// sementara dummy in-memory; 
// to-do: ganti ke query DB (Supabase)
const sample: Record<string, any> = {
  'budi-laras': {
    title: 'Undangan Pernikahan Budi & Laras',
    date: '2025-11-10',
    location: 'Hotel Semarang',
    brideName: 'Laras',
    groomName: 'Budi',
  },
  'asya-rizky': {
    title: 'Undangan Pernikahan Asya & Rizky',
    date: '2025-10-20',
    location: 'Gedung Jakarta',
    brideName: 'Asya',
    groomName: 'Rizky',
  },
}

export async function getInvitationBySubdomain(sub: string) {
  // NANTI: SELECT * FROM invitations WHERE subdomain = sub AND syariah_status='approved'
  return sample[sub] ?? null
}
