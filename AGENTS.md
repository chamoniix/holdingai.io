<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# HoldingAI.io — mémoire projet (agents)

> Dernière mise à jour : 2026-10-15. **À tenir à jour à chaque session.**
> Ce fichier est la source de vérité pour l'état du projet. Le lire AVANT toute action.

## 1. Le projet en une ligne

Site d'agence IA **holdingai.io** — refonte complète : design + contenu + i18n (8 langues) + SEO + tracking ads.

**Stack** : Next.js **16.2.10** (App Router, `src/app/[lang]/`), React **19.2.4**, Tailwind **4**, next-intl **4.14**, framer-motion, GSAP, lenis, three/@react-three. Hébergement **Vercel**, déploiement **via git push uniquement**.

## 2. Dépôt & branches

- Repo : `github.com/chamoniix/holdingai.io` — **PUBLIC**.
  ⚠️ **Ne jamais committer de secret, clé API, ID de compte pub, token.** Tout ce qui est poussé est visible publiquement.
- `main` → **production** (`www.holdingai.io`). Ancien design sombre + tous les correctifs (i18n next-intl, SEO, tracking) + retrait du plan ads. **Stable.**
- `feature/full-site` → **preview**. Refonte claire « **Kosmos Elevated** ».

⚠️ **Ne pas figer les SHA dans ce fichier** : committer ce fichier change le SHA de la branche. Interroger le distant, qui seul fait foi :

```bash
git fetch origin --prune
git ls-remote origin refs/heads/main refs/heads/feature/full-site
git rev-list --left-right --count origin/main...origin/feature/full-site   # main-only / feature-only
```

**État du 2026-10-06** : `main` a 1 commit que la feature n'a pas (le patch sécurité) ; la feature porte tout le reste. `main` est donc intégralement contenu dans la feature → **merge sans régression**. Test à blanc vérifié **sans aucun conflit** :
`git merge-tree --write-tree origin/main origin/feature/full-site`

## 3. Workspaces

| Chemin | Branche | État |
|---|---|---|
| `/Users/chamoonix/chamoonix/projets/Holdingai.io` | `feature/full-site` | **Espace de travail canonique** — arbre identique à `origin`, `node_modules` réinstallé proprement |
| `/tmp/holdingai-fresh` | `feature/full-site` | Clone secondaire (`/tmp` = volatile, ne pas y mettre le travail de fond) |
| `.phantom-backup-2026-10-06/` | — | Sauvegarde de l'ancien clone fantôme (patch + inventaire). **Ignoré par git** (`.git/info/exclude`), conservé par précaution |

## 4. Process de mise en ligne

```
édition locale
  → tsc --noEmit + next build (vérification obligatoire)
  → git commit + push
  → Vercel déploie AUTOMATIQUEMENT (main = prod, autre branche = preview)
  → vérification en ligne (curl + navigateur gstack + agents vision)
```

**Règles** : jamais de push direct sur `main` sans GO explicite du fondateur ; toujours lancer le build de vérification avant de pousser.

## 5. i18n

- 8 locales : `en` (défaut), `fr`, `de`, `es`, `it`, `pt`, `fi`, `no` — `localePrefix: 'always'`.
- Routing : `src/i18n/routing.ts`. Traductions : `src/messages/*.json` (next-intl, `useTranslations('<namespace>')`).
- **543 clés feuilles par langue, 8/8 parfaitement synchronisées** — blog, articles SEO et page SaaS vérifiés le 2026-10-15.
- Règle : **zéro texte en dur** dans les composants.

## 6. SEO

- `src/app/sitemap.ts` → **112 URLs** (14 chemins × 8 langues, avec `alternates.languages` = hreflang, dont 4 articles blog).
- `src/app/robots.ts`, metadata par page × langue via les `layout.tsx` de segment, canonical, JSON-LD, Open Graph.

## 7. Tracking ads

- Client : `src/components/OpenAIAdsPixel.tsx` (init pixel + `measureLeadCreated`).
- Serveur : `src/app/api/conversions/route.ts` (CAPI + **quality gate** LLM → `lead_created` si score ≥ seuil, sinon `low_intent_lead`), branché sur le vrai formulaire `/contact`.
- Dédup par `event_id` entre pixel et CAPI. Consent gate RGPD avant pixel.
- Plan complet : **`local/ADS_PLAN_V2.md`** — **volontairement hors du repo public** (voir §12).

## 8. État actuel (2026-10-15)

- `feature/full-site` porte la refonte claire, les visuels révisés et quatre articles IA complets en 8 langues, avec carousel horizontal, SEO, hreflang, données structurées et routes statiques. La preview est `noindex`; la production (`main`) n’a pas été modifiée.
- La page `/services/saas` a été enrichie en 8 langues avec les enjeux, fondations produit, cas d’usage, processus, FAQ et CTA. Les anciennes affirmations non vérifiées sur l’uptime/SOC2 ont été retirées.
- Ajout local de deux visuels décoratifs SaaS : `public/images/kosmos/saas-workspace.webp` après le hero et `public/images/kosmos/saas-in-context.webp` avant la FAQ. Le design clair « Kosmos Elevated » est conservé.
- Les deux visuels utilisent `next/image` avec `fill`, chargement différé et `sizes` responsive distincts pour le panneau pleine largeur et le panneau partagé (largeurs déclarées maximales : 1184 px et 681 px).
- Mouvement limité au scroll : translation verticale de +12 à −12 px ; avec réduction des animations, translation nulle, reveals sans déplacement ni durée et nouvelles figures sans état initial masqué.
- Vérification locale de l’audit documentaire : diff incrémental limité à la page SaaS et aux deux WebP, empreintes conformes au candidat et `git diff --check` sans erreur. Build, TypeScript et contrôle navigateur restent à valider par le parent ; cet audit ne les a pas exécutés.
- Au contrôle distant du 2026-10-15, ces ajouts SaaS ne sont pas encore poussés sur `feature/full-site`. Aucun push, déploiement ou changement de `main` effectué par cet audit ; publication de la preview sous responsabilité du parent.
- Les quatre portraits de `TeamSection` (`public/images/kosmos/equipe-1.webp`, `equipe-2.webp`, `equipe-5.webp`, `equipe-6-wide.webp`) sont des **placeholders fictifs générés par IA**. Le fondateur fournira ensuite les vraies photos ; remplacer ces placeholders avant tout merge vers `main`/live. Ne jamais les présenter comme les vrais membres.
- **En attente** : revue par le fondateur de la preview blog/articles et des portraits temporaires.
- **En suspens** : merge en prod (décision du fondateur), remplacement des portraits TeamSection par les photos authentiques fournies, cleanup dead code phase 2, Search Console.

## 9. Prochains pas possibles

1. Faire vérifier par le fondateur la preview `feature/full-site` : SaaS, carousel blog et les 4 articles localisés.
2. Quand le fondateur fournit les vraies photos de l’équipe, remplacer les quatre placeholders listés en §8.
3. Attendre le GO explicite avant de merger `feature/full-site` vers `main`.
4. Search Console : soumettre le sitemap.
5. Cleanup phase 2 (dead code, voir §10) et relancer une campagne ads avec le plan V2.

## 10. Dead code connu (cleanup phase 2)

Composants **orphelins (0 import)** :
- `src/components/canvas/NeuralCloud.tsx`
- `src/components/ui/Atmosphere.tsx`
- `src/components/CustomCursor.tsx` (orphelin depuis le retrait de l'essaim)

⚠️ `CustomCursor` est **non monté** : vérifier qu'il n'est pas réintroduit par erreur.

## 11. Pièges & décisions verrouillées

- ❌ **Essaim de particules suivant le curseur** : testé puis **retiré** — trop subtil + saccades au scroll. **Ne pas le réintroduire.** Parallaxe / magnetic / reveals sont conservés.
- ❌ **`LuxuryText` avec blur + gradient-clip** : titres fantômes/invisibles selon le navigateur → couleur solide uniquement. Idem `mix-blend-difference` sur les eyebrows.
- ✅ Images : **photographie réaliste propre**, zéro robot d'usine, **zéro marque tierce**. Toute nouvelle image doit passer cet audit.
- ✅ Thème clair **ivoire** sur la refonte ; l'ancien thème sombre appartient à `main`.
- ⚠️ **Toujours `git fetch` / `git ls-remote` avant de raisonner sur les branches.** Leçon du 2026-10-06 : un clone local avait une ref `origin/main` vieille de 3 mois, ce qui a fait croire à tort à un bug i18n en production. **Vérifier la prod en direct (curl) plutôt que déduire d'un état local.**
- Docs de référence : `CREATIVE_BIBLE.md`, `PHASE_2_DESIGN_MOTION_BIBLE.md`, `local/ADS_PLAN_V2.md`.

## 12. Sécurité — repo public

- `docs/ADS_PLAN_V2.md` a été **retiré des deux branches** — `main` (production) et `feature/full-site` — car il exposait l'ID du compte publicitaire et toute la stratégie d'enchères sur un repo public. Il avait d'abord été repéré sur la feature, puis **retrouvé intact sur `main`, la branche par défaut indexée par GitHub**.
- Le document vit désormais dans `local/ADS_PLAN_V2.md`, et `/local/` est ajouté au `.gitignore` sur les deux branches (fichier rendu identique de part et d'autre pour que le merge reste sans conflit).
- ⚠️ **L'ID reste présent dans l'historique git** (commit `9f4d63c`), donc toujours lisible publiquement. Un vrai effacement exige une réécriture d'historique (`git filter-repo`) + force-push sur les deux branches : **à ne faire qu'avec l'accord explicite du fondateur**, et à coordonner avec Vercel.
- Sévérité : un ID de compte publicitaire seul ne permet pas de piloter le compte sans la clé API. **Un scan complet des secrets dans tout l'historique n'a pas encore été fait** (reporté par le fondateur).
- Avant tout commit : vérifier qu'aucun secret ne part (`git grep -nE "sk-|whsec_|adacct_|token"`).

## 13. Outillage de l'environnement

- `gh` **n'est pas dans le PATH** → utiliser `/opt/homebrew/bin/gh` (authentifié, compte `chamoniix`, scopes `repo`/`workflow`).
- `vercel` CLI **absent** → déploiement uniquement par `git push`.
- `gstack` : skill dans `~/.claude/skills/gstack` (navigateur local).
- Skills utiles : `openai-ads-conversions`, `ai-image-generation` (CLI RunComfy), `gstack`.
- Accès : GitHub ✅, Hostinger (DNS/mail) ✅, Zoho Mail ✅, OpenAI Ads ✅, Google AI Studio ⚠️ crédits épuisés, Atlas Cloud ❌ $0.
- ⚠️ Aucun secret n'est exporté dans l'environnement shell des agents : passer par les CLI/skills authentifiés.
