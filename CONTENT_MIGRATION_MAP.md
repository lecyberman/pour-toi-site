# CONTENT_MIGRATION_MAP — V2

_Mapping de toutes les expériences vers les 3 parcours. **Aucun contenu supprimé.** Les anciennes URLs restent valides ; si une page est absorbée, on ajoute une redirection dans `vercel.json`. Rédigé le 15/09/2026._

Légende action : **Garder** (route dédiée inchangée) · **Regrouper** (accessible via un hub de parcours) · **Fusionner** (réunie avec une autre expérience) · **Rediriger** (ancienne URL → nouvelle).

## Parcours 1 — « J'ai besoin de toi » (réconfort / présence)
| Route actuelle | Action | Données conservées |
|---|---|---|
| `/cocon` | Regrouper (entrée du parcours) | localStorage / aucune BD critique |
| `/dormir` | Regrouper | écoutes localStorage |
| `/journal` | Garder (éphémère, localStorage) | oui |
| `/toi` | Regrouper | `wellbeing_checkins`, `site_requests`, `site_ideas` |
| `/humeurs` | Regrouper | localStorage |
| `/chansons` | Regrouper | liens BD |
| `/fleurs` | Regrouper | logique quotidienne |
| `/pioche` | Regrouper | messages inline (extensible BD) |
| `/ciel` | Regrouper (aussi pertinent P2) | `localisation` |
| `/calin` (Phase 5) | Regrouper | tables Phase 5 |
| `/bonne-nuit` (Phase 5) | Regrouper | tables Phase 5 |
| `/au-cas-ou` | Regrouper | audio |
| `/pour-lui` | Regrouper | textes |

Entrée du parcours : « Comment tu te sens ce soir ? » → choix visuels → **une** expérience adaptée.

## Parcours 2 — « Retrouver notre histoire » (mémoire, monde navigable)
| Route actuelle | Action | Données conservées |
|---|---|---|
| `/histoire` (notre-histoire) | Garder = « chemin lumineux » (chronologie) | oui |
| `/univers` | Fusionner dans la scène « monde » (constellation) | jalons |
| `/etoile` | Garder (rituel quotidien) | `etoile` |
| `/nous-deux` | **Garder (phare)** | photos `/img/nous/*` |
| `/nuit` | **Garder (phare)** = étoile majeure 15 juillet | oui |
| `/galerie` | Garder + optimiser (miniatures, lightbox) | photos |
| `/album` (photos+voix) | Garder | `medias` + Storage |
| `/papillons` | Garder + devient signature du monde | — |
| `/mots` | Regrouper | `dico` |
| `/livre` | Regrouper (compilation) | `mots`/`lettres`/`dico` |
| `/petits-riens` | Regrouper | `petits_riens` |
| `/souvenirs` (carnet) | Regrouper | `medias`/souvenirs |
| `/reves` + `/voyages` | **Fusionner** = un globe (vécus + rêvés) | `voyagesData` |
| `/fil` (Phase 5) | Regrouper (fil invisible) | tables Phase 5 |
| `/portrait` | Regrouper | textes |
| `/bibliotheque` | Regrouper | PDF |

Présentation : un « monde » à explorer (constellation / planète / lumières / polaroïds), pas une grille.

## Parcours 3 — « Surprends-moi » (découverte / jeu / futur)
| Route actuelle | Action | Données conservées |
|---|---|---|
| `/le-15` (anniv) | Garder + **événement du monde** le 15 | oui |
| `/coffret` (Phase 5) | Regrouper | tables Phase 5 |
| `/capsules` | Garder | `capsules` |
| `/souhaits` | Regrouper (rêves à deux) | `souhaits` |
| `/retrouvailles` | Regrouper + décompte intégré au décor | `retrouvailles` |
| `/jeux` | Regrouper | BD jeux |
| `/dramas` | Regrouper | BD |
| `/creations` | Regrouper | BD |
| `/ensemble` | Regrouper (temps réel) | présence |
| `/messages` (chat éphémère) | Regrouper | `messages` |
| `/mer` | **Garder (phare)** | compte à rebours |
| `/jardin`, `/feu`, `/ocean` | Regrouper (ambiances) | — |
| `/demande` | Regrouper | `site_requests` |

## Système / privé (hors 3 portes)
| Route | Action |
|---|---|
| `/` accueil | **Refonte** → intro + 3 portes (ancien hub complet gardé en « tout voir ») |
| `/dadoucherie` | Garder (sa page) |
| `/courrier`, `/recu` | Garder (gated Mathieu) |
| `/admin` | Garder + durcir (PIN client → vérif serveur) |
| `/moi` | Garder (bascule identité) |

## Redirections à ajouter (quand implémenté, dans `vercel.json`)
Aucune suppression immédiate. Exemples prévus : `/univers` → scène monde (P2) ; `/voyages` → globe fusionné ; les ambiances (`/jardin`,`/feu`,`/ocean`) restent accessibles mais aussi atteignables depuis leurs parcours. Les phares (`/nous-deux`,`/nuit`,`/mer`,`/etoile`,`/le-15`) gardent leurs URLs.

## Garantie
Chaque ligne « Données conservées » = table Supabase / Storage / localStorage inchangés. La refonte ne touche qu'à la **présentation et la navigation**, pas au schéma de données. Toute évolution de schéma se ferait par migration additive (jamais destructive).
