# Plan — MVP SaaS La Globale Marocaine

## Résultat visé
Construire une application frontend de démonstration en français, responsive et entièrement interactive, reproduisant le parcours métier complet demandé avec des données fictives cohérentes. Chaque page affichera le footer « mvp created by izemx ».

## Architecture de l’expérience
- Écran de connexion et récupération de mot de passe simulés, avec accès direct « Voir la démo ».
- Structure applicative persistante : navigation latérale rétractable, barre supérieure, recherche globale, notifications, profil et déconnexion.
- Modules navigables : Dashboard, Service Client, Devis & Commandes, Stock, Fournisseurs & Achats, Analytics, Configuration, Notifications, Activité et Paramètres.
- Navigation interne par onglets pour regrouper les vues détaillées sans alourdir le menu principal.

## Données et comportements
- Créer un jeu de données cohérent et suffisamment dense pour clients, conversations, devis, commandes, produits, matières, fournisseurs, alertes, documents, FAQ et activités.
- Conserver les changements pendant la session côté navigateur : statuts, suppressions, créations, lectures et réglages.
- Implémenter recherches, tris, filtres, pagination, onglets, formulaires, menus, fenêtres de confirmation, notifications et états vides.
- Simuler les traitements IA avec des étapes visibles : analyse, proposition, validation humaine et action.
- Précharger un parcours démontrable reliant conversation client, commande, devis, stock critique, achat fournisseur et BDC.

## Écrans métier
1. **Dashboard** : 8 indicateurs, graphiques, alertes cliquables, activité récente et performance des agents.
2. **Service Client** : inbox en trois colonnes, filtres, chat WhatsApp simulé, génération de réponse, escalade et création de commande.
3. **Devis & Commandes** : demandes, analyse IA, scénarios comparatifs, aperçu devis, envois simulés, commandes et détail avec timeline.
4. **Stock** : indicateurs, table filtrable, alertes, prévisions IA et création de besoin d’achat.
5. **Fournisseurs & Achats** : fournisseurs, formulaire de besoin, comparaison IA, sélection humaine et aperçu BDC.
6. **Analytics** : vues par domaine, graphiques, période, comparaison et export simulé.
7. **Configuration** : FAQ, documents, règles d’alertes, modèles de devis/BDC, paramètres agents et utilisateurs/rôles simulés.
8. **Notifications, Activité, Paramètres** : centres opérationnels avec actions et filtres fonctionnels.

## Direction visuelle
- Interface industrielle premium : navy riche, bleus profonds, turquoise pour l’IA, surfaces gris clair, états vert/orange/rouge.
- Forte densité maîtrisée, tableaux lisibles, cartes compactes, graphiques contrastés et accents IA discrets.
- Animations légères, retours visuels systématiques, menu mobile et adaptation tablette.

## Détails techniques
- React, TypeScript, Tailwind et composants UI existants.
- Graphiques avec Recharts et icônes Lucide.
- Composants réutilisables pour indicateurs, badges, tables, dialogues, aperçus documentaires et états d’interface.
- Routes TanStack dédiées aux principaux modules avec métadonnées propres.
- Aucune connexion externe, aucun serveur métier et aucune authentification réelle.

## Vérification
- Contrôler l’ouverture de chaque écran, la navigation desktop/mobile et le scénario client complet.
- Vérifier les actions critiques, messages de confirmation, changements de statut, recherches et états sans résultat.
- Valider l’absence d’erreurs de compilation et d’exécution.
