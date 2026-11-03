# Configuration GA4

Dans Vercel, configurer `VITE_GA_MEASUREMENT_ID=G-Q1F6WRV1N4` dans l'environnement cible puis reconstruire et redéployer : Vite intègre cette valeur au build. Sans cette variable, le tag n'est pas chargé.

Pour une Preview de test uniquement, définir `VITE_GA_DEBUG_MODE=true` et reconstruire. Laisser cette variable absente ou à `false` en production. Le mode debug ne donne aucun consentement et ne contourne aucune étape du parcours.

Dans une session de test où la personne a elle-même accepté Analytics, contrôler le chargement de gtag puis une requête `/g/collect` avec `tid=G-Q1F6WRV1N4`, `en=page_view` et le signal debug (habituellement `_dbg=1`). Ouvrir DebugView dans la propriété possédant ce flux. Ne pas copier les identifiants visiteurs dans des rapports publics.

Seules `/Home` et `/ImmediateHelp` sont suivies. L'absence de collecte sur `/AgeContent`, le questionnaire ou le récapitulatif est volontaire. Les vues automatiques sont désactivées ; le suivi React envoie la vue de la page autorisée après consentement et à chaque changement de route.

Vérifications locales : `node scripts/test-analytics.mjs` (Node 22.13+), `npm run build`. Les tests Analytics simulent le navigateur et n'envoient aucune requête à Google.

Références : https://developers.google.com/tag-platform/gtagjs/install et https://support.google.com/analytics/answer/7201382?hl=fr
