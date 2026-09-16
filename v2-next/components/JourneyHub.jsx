import Link from "next/link";
import { byJourney } from "@/lib/experienceRegistry";

// Les expériences existantes (site actuel) restent servies par le site statique.
// En attendant la migration page par page, ces liens pointent vers ces routes.
export default function JourneyHub({ journey }) {
  const items = byJourney(journey);
  return (
    <div className="grille">
      {items.map((x) => (
        <a key={x.id} className="xp" href={x.route}>
          <span className="ic">{x.icon}</span>
          <span className="t">{x.title}</span>
          <span className="d">{x.desc}</span>
        </a>
      ))}
    </div>
  );
}
