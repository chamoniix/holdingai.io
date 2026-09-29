# PLAN V2 — « Lead Quality Loop » — Suivi des conversions & optimisation ChatGPT Ads

> Projet : HoldingAI.io | Compte ads : adacct_6abb6d7005948194832383150ad040aa
> Date : 2026-09-29 | Statut : validé par le fondateur, exécution en attente de GO phase 1

## L'idée directrice

Pour un studio IA premium, la ressource rare n'est pas les clics, c'est les **leads qualifiés**.
Tout le système est construit pour que l'algorithme d'OpenAI optimise vers la **qualité du lead**, pas le volume.

## Architecture en 7 blocs

### 1. Conversion à étages avec QUALITY GATE (le cœur)

- La route CAPI (serveur) reçoit chaque formulaire → un mini-LLM score le lead (projet ? budget mentionné ? entreprise ? urgence ?) → score 0-100, coût quasi nul.
- Score **≥ seuil** → événement `lead_created` (celui que l'algo optimise).
- Score **< seuil** → événement custom `low_intent_lead` (mesure seule).
- Vérifié dans la spec API : pas d'enchères sur valeur (tROAS) — seulement `maximize_conversions`.
  Le quality gate est le moyen vérifié d'optimiser sur des leads qualifiés sans value-bidding.

### 2. Double chemin de conversion

- **Chemin A (existant)** : ad → landing page service → formulaire → CAPI.
- **Chemin B (Lead Sync Subscription)** : endpoint webhook vérifié dans la spec (`destination_url` + `signing_secret` format `whsec_`). OpenAI pousse les leads directement vers un endpoint → route sur le site qui route chaque lead vers la boîte Zoho + alerte Slack/Telegram.
- Note : pas de format créa « lead form » listé (seulement `chat_card` et `product_ad_template`) — chemin B à activer/vérifier côté compte.

### 3. Retargeting par Custom Audience (small audiences)

- La CAPI envoie `emails_sha256` de chaque lead → audience « Visiteurs + Leads » construite progressivement.
- Spec vérifiée : audience vide possible quand « small audiences » est activé sur le compte → retargeting possible même à petit volume.

### 4. Structure de campagne par service (3 ad groups)

- **AI Agents**, **Automation**, **SaaS** — chacun : context hints alignés + landing page dédiée (`/services/…`) + 2-3 créas (dynamic creative ON) + UTM `{campaign_id}/{ad_id}`.
- Phase 1 (2 semaines) : `maximize_clicks` → collecter du signal pas cher.
- Phase 2 : `maximize_conversions` sur le `lead_created` qualifié.

### 5. Sandbox pre-validation des créas

- `/sandbox/ad_eligibility_jobs` avant chaque lancement → zéro rejet, mise en ligne maximale.

### 6. Pilotage hebdo automatisé

- Script hebdo : `insights` par ad group (CPA, CTR par créa) + `conversions/insights` → rapport + proposition de réallocation du budget.

### 7. Hygiène RGPD (France)

- Consent gate avant pixel, préservation `oppref`/`obref`, `source_url` sanitisée, dédup `event_id`.
- Couvert par le skill officiel `openai-ads-conversions` (installé dans `~/.claude/skills/openai-ads-conversions/`).

## Delta vs V1 (plan basique pixel + CAPI)

| V1 (basique) | V2 (ce plan) |
|---|---|
| Pixel + CAPI + oCPC | + Quality gate LLM → optimisation sur leads **qualifiés** |
| Formulaire landing seul | + Lead Sync webhook → 2ᵉ chemin sans friction |
| Pas de retargeting | + Custom audience small → retargeting visiteurs chauds |
| Lancement direct | + Sandbox pre-check → zéro rejet |
| 1 campagne générique | + 3 ad groups par service, budget piloté au CPA |

## Roadmap

- **Phase 1** (dès GO) : pixel + CAPI avec quality gate + consent RGPD + audience retargeting.
  Fichiers : `src/app/[lang]/layout.tsx` (oaiq init + page_viewed), `src/components/ContactSection.tsx`
  (lead_created après submit), nouvelle route `src/app/api/conversions/route.ts` (CAPI + score LLM),
  vars d'env Vercel `OPENAI_ADS_PIXEL_ID` + clé CAPI.
- **Phase 2** (après ~10 leads qualifiés) : restructure 3 ad groups + sandbox + flip `maximize_conversions` + automation hebdo.

## Prérequis API vérifiés (spec openapi.json)

- Bidding : `fixed_bid` | `automated_bid` | `maximize_clicks` | `maximize_conversions`
- Objectifs campagne : `reach` | `clicks` | `conversions`
- Formats créa : `chat_card` (title 3-50, body ≤100, image ≥640×640) | `product_ad_template`
- Événements CAPI : `event_data_json` libre (valeur, emails_sha256, oppref…)
- Insights : champs `ad.*`, `campaign.*`, `ad_group.*`, `time_ranges[]={"type":"unix_range",...}`
