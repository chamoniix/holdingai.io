<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# HoldingAI.io — mémoire projet (agents)

> Dernière mise à jour : 2026-10-06. **À tenir à jour à chaque session.**
> Ce fichier est la source de vérité pour l'état du projet. Le lire AVANT toute action.

## 1. Le projet en une ligne

Site d'agence IA **holdingai.io** — refonte complète : design + contenu + i18n (8 langues) + SEO + tracking ads.

**Stack** : Next.js **16.2.10** (App Router, `src/app/[lang]/`), React **19.2.4**, Tailwind **4**, next-intl **4.14**, framer-motion, GSAP, lenis, three/@react-three. Hébergement **Vercel**, déploiement **via git push uniquement**.

## 2. Dépôt & branches

- Repo : `github.com/chamoniix/holdingai.io` — **PUBLIC**.
  ⚠️ **Ne jamais committer de secret, clé API, ID de compte pub, token.** Tout ce qui est poussé est visible publiquement.
- `main` = `ec440ad` → **production** (`www.holdingai.io`). Ancien design sombre + tous les correctifs (i18n next-intl, SEO, tracking). **Stable.**
- `feature/full-site` = `fe31ac9` → **preview**. Refonte claire « **Kosmos Elevated** ». Dernier commit : retrait de l'essaim de curseur.

**Divergence vérifiée avec refs fraîches (2026-10-06)** : `feature/full-site` = **13 commits d'avance, 0 de retard** sur `main`. `main` est intégralement contenu dans la feature → **merge sans risque de régression** (fast-forward), base commune `ec440ad`.

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
- **259 clés feuilles par langue, 8/8 parfaitement synchronisées** (0 manquante, 0 en trop) — vérifié le 2026-10-06.
- Règle : **zéro texte en dur** dans les composants.

## 6. SEO

- `src/app/sitemap.ts` → **80 URLs** (10 chemins × 8 langues, avec `alternates.languages` = hreflang).
- `src/app/robots.ts`, metadata par page × langue via les `layout.tsx` de segment, canonical, JSON-LD, Open Graph.

## 7. Tracking ads

- Client : `src/components/OpenAIAdsPixel.tsx` (init pixel + `measureLeadCreated`).
- Serveur : `src/app/api/conversions/route.ts` (CAPI + **quality gate** LLM → `lead_created` si score ≥ seuil, sinon `low_intent_lead`), branché sur le vrai formulaire `/contact`.
- Dédup par `event_id` entre pixel et CAPI. Consent gate RGPD avant pixel.
- Plan complet : **`local/ADS_PLAN_V2.md`** — **volontairement hors du repo public** (voir §12).

## 8. État actuel (2026-10-06)

- **En attente** : test du scroll par le fondateur sur la preview `feature/full-site` après suppression de l'essaim.
- **En suspens** : merge en prod (décision du fondateur), génération IA des images (bloquée : crédits Google AI Studio épuisés / token RunComfy manquant), cleanup dead code phase 2, Search Console.

## 9. Prochains pas possibles

1. Re-test scroll → si OK : merger `feature/full-site` dans `main`.
2. Crédits AI Studio rechargés → régénérer les images en IA (angles/branding HoldingAI).
3. Search Console : soumettre le sitemap.
4. Cleanup phase 2 (dead code, voir §10).
5. Relancer une campagne ads avec le plan V2.

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

- `docs/ADS_PLAN_V2.md` a été **retiré du repo** (il exposait l'ID du compte publicitaire et la stratégie d'enchères). Il vit désormais dans `local/` (`/local/` est dans `.gitignore`).
- ⚠️ **L'ID reste présent dans l'historique git** (commit `9f4d63c`), donc toujours lisible publiquement. Un vrai nettoyage exige une réécriture d'historique + force-push : **à ne faire qu'avec l'accord explicite du fondateur**.
- Avant tout commit : vérifier qu'aucun secret ne part (`git grep -nE "sk-|whsec_|adacct_|token"`).

## 13. Outillage de l'environnement

- `gh` **n'est pas dans le PATH** → utiliser `/opt/homebrew/bin/gh` (authentifié, compte `chamoniix`, scopes `repo`/`workflow`).
- `vercel` CLI **absent** → déploiement uniquement par `git push`.
- `gstack` : skill dans `~/.claude/skills/gstack` (navigateur local).
- Skills utiles : `openai-ads-conversions`, `ai-image-generation` (CLI RunComfy), `gstack`.
- Accès : GitHub ✅, Hostinger (DNS/mail) ✅, Zoho Mail ✅, OpenAI Ads ✅, Google AI Studio ⚠️ crédits épuisés, Atlas Cloud ❌ $0.
- ⚠️ Aucun secret n'est exporté dans l'environnement shell des agents : passer par les CLI/skills authentifiés.
