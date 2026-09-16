import { byJourney } from "@/lib/experienceRegistry";

// Pendant la migration : les expériences pas encore portées en Next sont ouvertes
// sur le site actuel (déjà en ligne), pour zéro « 404 » et une navigation complète.
const STATIC_BASE = "https://pour-toi-site.vercel.app";
// routes déjà portées nativement dans la V2 Next (servies en interne)
const NATIVE = new Set([]);

export default function JourneyHub({ journey }) {
  const items = byJourney(journey);
  return (
    <div className="grille">
      {items.map((x) => {
        const interne = NATIVE.has(x.route);
        const href = interne ? x.route : STATIC_BASE + x.route;
        return (
          <a key={x.id} className="xp" href={href}>
            <span className="ic">{x.icon}</span>
            <span className="t">{x.title}</span>
            <span className="d">{x.desc}</span>
          </a>
        );
      })}
    </div>
  );
}
