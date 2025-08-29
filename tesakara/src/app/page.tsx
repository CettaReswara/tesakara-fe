import Template1View from "@/components/Template1View";
import NoCopy from "./nocopy";

type InviteProps = {
  searchParams?: {
    bride?: string;
    groom?: string;
    to?: string;
    date?:string;
  };
};

export default function Home({ searchParams }: InviteProps) {
  const bride = (searchParams?.bride ?? "Tesa").trim();
  const groom = (searchParams?.groom ?? "Kara").trim();
  const invitee = (searchParams?.to ?? "Muhammad dan Pasangan").trim();
  const date = "31-08-2025"

  return (
    <NoCopy>
      <Template1View 
        bride={bride}//(searchParams?.bride ?? "Tesa").trim()}
        groom={groom}//{(searchParams?.groom ?? "Kara").trim()}
        to={invitee}//{(searchParams?.to ?? "Nama Undangan").trim()}
        date={date}
      >
      </Template1View>
    </NoCopy>
  );
}
