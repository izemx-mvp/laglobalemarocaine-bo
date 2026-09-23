# Global AI Insights

client : la globale marocaine 
# OBJECTIF DU PROJET

Créer un **MVP frontend complet, moderne et fonctionnel** d’une plateforme SaaS de gestion assistée par IA pour **La Globale Marocaine**, entreprise industrielle spécialisée dans les emballages plastiques.

Le MVP doit présenter une plateforme permettant de centraliser plusieurs **agents IA métiers** :

1. Agent IA Service Client
2. Agent IA Devis & Commandes Clients
3. Agent IA Stock & Matières Premières
4. Agent IA Fournisseurs & Achats
5. Dashboard Analytics & Reporting
6. Espace Configuration / Administration

IMPORTANT :

* **Frontend uniquement**
* Aucun backend réel
* Aucune vraie intégration WhatsApp, email, ERP, CRM ou fournisseur
* Utiliser uniquement des **mock data réalistes**
* Toutes les interactions doivent fonctionner côté frontend
* Les boutons doivent avoir des comportements réalistes
* Les formulaires doivent être interactifs
* Les filtres, recherches, tris, tabs, modals, dropdowns, notifications et changements de statuts doivent fonctionner
* L’authentification est uniquement simulée côté frontend
* Le produit doit donner l’impression d’un SaaS réel prêt pour une démonstration client

---

# 1. DIRECTION DESIGN

Créer une interface SaaS premium, moderne, professionnelle et industrielle, adaptée à une entreprise B2B.

Style :

* Premium
* Moderne
* Technologique mais pas futuriste excessif
* Professionnel
* Clean
* Dashboard SaaS
* Forte hiérarchie visuelle
* Beaucoup de données mais interface facile à comprendre

Éviter :

* Design trop générique de template
* Interface trop blanche et vide
* Design trop « chatbot »
* Trop de gradients
* Effets 3D excessifs
* Néons
* Look crypto / gaming

### Palette

Utiliser principalement :

* Navy / bleu nuit
* Bleu profond
* Bleu moyen
* Teal / turquoise comme couleur IA
* Blanc
* Gris clair
* Gris foncé
* Vert pour les succès
* Orange pour les avertissements
* Rouge pour les alertes
* Violet uniquement comme accent IA lorsque nécessaire

Les couleurs doivent être riches et élégantes.

Créer une identité visuelle cohérente entre :

* Sidebar
* Dashboard
* Tables
* Cards
* Badges
* Modals
* Charts
* Agents IA

---

# 2. STRUCTURE GLOBALE DE L’APPLICATION

Créer une application avec :

### Sidebar principale

Logo : **la globale marocaine**

Navigation :

* Dashboard
* Service Client
* Devis & Commandes
* Stock & Matières premières
* Fournisseurs & Achats
* Analytics & Reporting
* Configuration
* Notifications
* Activité
* Paramètres

En bas :

* Profil utilisateur
* Nom : **Admin**
* Rôle : Administrateur
* Bouton déconnexion

La sidebar doit être :

* Collapsible
* Avec icons
* Tooltips lorsqu’elle est réduite
* Active state clair
* Navigation fonctionnelle entre les pages

Topbar :

* Breadcrumb
* Recherche globale
* Icône notifications
* Avatar utilisateur
* Date / contexte
* éventuellement bouton « Assistant IA »

---

# 3. AUTHENTIFICATION FRONTEND

Créer un écran Login premium.

Champs :

* Email
* Mot de passe

Options :

* Se souvenir de moi
* Mot de passe oublié
* Se connecter

Créer aussi un écran de mot de passe oublié simulé.

L’authentification doit être **uniquement frontend**.

Utiliser des identifiants mock :
Email : [admin@laglobalemarocaine.ma](mailto:admin@laglobalemarocaine.ma)
Mot de passe : Admin123!

Après connexion → Dashboard.

Ajouter aussi un bouton :
**« Voir la démo »**
qui permet d’entrer directement dans l’application sans authentification réelle.

---

# 4. DASHBOARD PRINCIPAL

Créer un dashboard très riche.

Titre :

**Bonjour Admin 👋**

Sous-titre :

**Voici l’état actuel de votre activité et de vos agents IA.**

### KPI cards

Afficher par exemple :

* Leads actifs : 128
* Commandes du mois : 86
* Devis en attente : 24
* Stock critique : 7
* Achats en cours : 16
* Demandes clients aujourd’hui : 43
* Temps économisé par les agents : 126 h
* Taux d’automatisation : 68 %

Chaque KPI doit avoir :

* valeur
* évolution %
* indicateur ↑ ↓
* mini graphique éventuellement
* hover state

### Graphiques

Créer plusieurs graphiques avec mock data :

1. Évolution des commandes
2. Évolution du chiffre d’affaires
3. Volume des demandes clients
4. Performance des agents IA
5. Évolution du stock
6. Répartition des achats par fournisseur

### Section « Alertes importantes »

Exemples :

* Stock critique : Film PE basse densité
* Retard fournisseur : Plastique Maroc
* 5 demandes clients sans réponse
* 3 devis nécessitent une validation
* 2 commandes nécessitent une intervention humaine

Chaque alerte doit être cliquable.

### Section « Activité récente »

Afficher une timeline :

* Devis #DEV-2026-018 validé
* Commande #CMD-2026-041 créée
* Agent Service Client a répondu à une demande
* Alerte stock déclenchée
* Bon de commande #BDC-2026-012 généré
* Fournisseur sélectionné

---

# 5. AGENT IA SERVICE CLIENT

Créer une page :

**Agent IA — Service Client**

L’objectif est de simuler un assistant client principalement via WhatsApp.

IMPORTANT :
Il ne doit pas y avoir d’intégration WhatsApp réelle.

Créer une interface simulant une inbox WhatsApp.

### Layout

3 colonnes :

COLONNE 1 :
Liste des conversations.

Chaque conversation :

* Nom client
* entreprise
* dernier message
* heure
* badge non lu
* statut
* priorité

Exemples :

* Atlas Packaging
* AgroMaroc
* Seafood Export
* GreenFarm
* Pack Solutions

Filtres :

* Toutes
* Non lues
* En attente
* Priorité haute
* Résolues

Recherche fonctionnelle.

COLONNE 2 :
Chat conversationnel.

Afficher de vrais messages mockés. depuis interface wtsp mockes 

Exemple :

Client :
« Bonjour, je voudrais connaître le délai pour 5000 sacs personnalisés. »

Agent IA :
« Bonjour, selon les informations disponibles, le délai estimatif est de 5 à 7 jours ouvrables… »

Ajouter une indication :
**Réponse générée par IA**

Afficher éventuellement :

* source utilisée : wtsp 
* confiance IA
* heure

COLONNE 3 :
Informations client.

Afficher :

* Client
* Entreprise
* Email
* Téléphone
* Historique commandes
* Historique devis
* Statut client
* Dernière interaction

### Actions

Boutons fonctionnels :

* Répondre
* Générer une réponse IA
* Régénérer
* Modifier la réponse
* Envoyer
* Assigner à un commercial
* Marquer comme résolu
* Escalader à un humain
* Créer une commande

### Prise de commande

Ajouter un workflow :

**Créer une commande**

Formulaire :

* Client
* Produit
* Référence
* Quantité
* Dimensions
* Matière
* Personnalisation
* Date souhaitée
* Commentaire

Bouton :
**Créer la commande**

Après validation :
→ notification
→ création mockée de la commande
→ statut « À valider »

---

# 6. AGENT IA DEVIS & COMMANDES CLIENTS

Créer une page dédiée.

Titre :

**Agent IA — Devis & Commandes**

Créer des tabs :

* Demandes
* Devis
* Commandes
* Historique

---

## A. DEMANDES CLIENTS

Afficher une table :

Colonnes :

* ID
* Client
* Produit
* Quantité
* Date
* Source
* Statut
* Action

Filtres :

* Date
* Client
* Produit
* Statut
* Source

Search + sort fonctionnels.

---

## B. SCÉNARIO DE DEVIS IA

Créer une interface permettant à l’utilisateur de sélectionner une demande.

Une fois sélectionnée :

Afficher :

**Analyse IA de la demande**

L’agent analyse les données mockées puis propose des devis historiques similaires.

Exemple :

### Devis similaire #DEV-2025-091

Client : AgroMaroc
Produit : Sachet PE
Quantité : 10 000
Prix : 1.95 DH
Délai : 7 jours

### Devis similaire #DEV-2026-017

Client : Atlas Packaging
Produit : Sachet PE
Quantité : 12 000
Prix : 1.88 DH
Délai : 6 jours

Afficher :

**3 scénarios recommandés par l’IA**

Scénario 1 :

* Prix estimé
* Quantité
* Délai
* Marge estimée
* Similarité historique
* Justification IA

Scénario 2 :
idem

Scénario 3 :
idem

Bouton :
**Sélectionner ce scénario**

---

## C. GÉNÉRATION DU DEVIS

Après sélection :

Afficher le devis généré dans une modal ou une page preview.

Informations :

* Logo entreprise
* Numéro de devis
* Client
* Produits
* Quantité
* Prix
* TVA
* Total
* Conditions
* Délai
* Validité

Boutons :

* Modifier
* Prévisualiser
* Valider
* Envoyer par Email
* Envoyer par WhatsApp
* Télécharger PDF

Les boutons doivent simuler leur action.

Par exemple :
Après « Envoyer par Email » :

Toast :
**Devis envoyé avec succès à [client@email.com](mailto:client@email.com)**

Après WhatsApp :
**Devis envoyé sur WhatsApp**

---

# 7. COMMANDES CLIENTS

Créer une page/table des commandes.

Colonnes :

* N° commande
* Client
* Produit
* Quantité
* Montant
* Date
* Livraison prévue
* Statut
* Source

Statuts :

* Nouvelle
* À valider
* Confirmée
* En production
* Expédiée
* Livrée
* Annulée

Créer une page détail commande.

Afficher :

* Informations client
* Produits
* Timeline de commande
* Paiement
* Livraison
* Notes
* Historique des actions

Boutons :

* Valider
* Modifier
* Annuler
* Contacter client
* Télécharger
* Marquer comme expédiée

---

# 8. AGENT IA STOCK & MATIÈRES PREMIÈRES

Créer une page :

**Agent IA — Stock & Matières premières**

### KPI

* Stock total
* Matières critiques
* Produits en rupture
* Alertes actives
* Valeur stock

### Onglets

* Vue globale
* Matières premières
* Produits finis
* Alertes
* Historique

---

## TABLE STOCK

Colonnes :

* Référence
* Matière / produit
* Catégorie
* Stock actuel
* Stock minimum
* Stock maximum
* Unité
* Statut
* Dernière mise à jour

Statuts :

🟢 Normal
🟠 Faible
🔴 Critique
⚫ Rupture

Ajouter :

* Search
* Filters
* Sort
* Pagination

---

## ALERTES STOCK

Créer un système de règles configurable.

Exemple :

**Film PE basse densité**
Stock actuel : 450 kg
Seuil : 500 kg
→ Alerte critique

Afficher :

* niveau de priorité
* date
* matière
* seuil
* action recommandée

Boutons :

* Traiter
* Ignorer
* Reporter
* Créer demande d’achat

---

## ANALYSE IA

Créer une card :

**Analyse IA**

Exemple :

« La consommation du Film PE basse densité a augmenté de 14 % au cours des 4 dernières semaines. Au rythme actuel, le stock pourrait atteindre le seuil critique dans environ 5 jours. »

Afficher :

* tendance
* prévision mockée
* recommandation

Bouton :

**Créer un scénario d’achat**

---

# 9. AGENT IA FOURNISSEURS & ACHATS

Créer une page :

**Agent IA — Fournisseurs & Achats**

Tabs :

* Fournisseurs
* Besoins d’achat
* Scénarios IA
* Bons de commande
* Historique

---

## FOURNISSEURS

Table :

* Fournisseur
* Matière
* Prix d’achat
* Délai moyen
* Fiabilité
* Dernière commande
* Statut

Ajouter filtres et recherche.

---

# 10. SCÉNARIOS FOURNISSEURS

Créer une interface :

**Nouveau besoin d’achat**

Champs :

* Matière première
* Quantité
* Date souhaitée
* Niveau de priorité

Bouton :

**Analyser avec l’IA**

L’interface affiche :

### Scénario A

Fournisseur : Fournisseur A
Prix achat : 11.80 DH/kg
Délai : 3 jours
Fiabilité : 96 %
Coût total : ...
Recommandation IA : ...

### Scénario B

Fournisseur : Fournisseur B
Prix achat : 11.20 DH/kg
Délai : 6 jours
Fiabilité : 91 %

### Scénario C

Fournisseur : Fournisseur C
Prix achat : 12.10 DH/kg
Délai : 2 jours
Fiabilité : 98 %

Chaque scénario possède :

**Sélectionner**

Après sélection :

**Validation du scénario**

Puis :

**Générer le BDC**

---

# 11. BON DE COMMANDE FOURNISSEUR

Créer une preview du BDC.

Afficher :

* Logo
* Numéro BDC
* Fournisseur
* Matière
* Quantité
* Prix
* Conditions
* Livraison
* Total

Boutons :

* Modifier
* Valider
* Générer PDF
* Envoyer par Email
* Envoyer au fournisseur
* Annuler

Simuler l’envoi avec des toasts.

---

# 12. ANALYTICS & REPORTING

Créer une page très riche :

**Analytics & Reporting**

Tabs :

* Commercial
* Clients
* Commandes
* Stock
* Achats
* Fournisseurs
* Performance IA

Créer des charts interactifs mockés.

### Commercial

* Nombre de demandes
* Taux de conversion devis → commande
* Valeur devis
* Performance commerciale

### Clients

* Nouveaux clients
* Clients actifs
* Top clients
* Fréquence commandes

### Stock

* Évolution stock
* Matières critiques
* Consommation
* Ruptures

### Achats

* Dépenses
* Prix moyen par matière
* Fournisseurs
* Évolution des coûts

### IA

* Nombre de conversations traitées
* % réponses automatisées
* Nombre de devis générés
* Commandes prises par IA
* Alertes générées
* Temps économisé
* Taux d’escalade vers humain

Ajouter :

* filtre période
* export bouton
* date range picker
* comparaison période précédente

---

# 13. ESPACE CONFIGURATION

Créer une section complète :

**Configuration**

Sidebar interne :

* FAQ
* Base de connaissance
* Documents
* Alertes
* Modèles de devis
* Modèles BDC
* Paramètres agents
* Utilisateurs & rôles

---

## FAQ

CRUD frontend :

* Ajouter une FAQ
* Modifier
* Supprimer
* Rechercher
* Catégorie
* Statut actif/inactif

Colonnes :

* Question
* Réponse
* Catégorie
* Dernière modification
* Statut

---

# 14. BASE DE CONNAISSANCE

Créer une interface permettant d’ajouter des documents et connaissances.

Mock documents :

* Catalogue produits.pdf
* Fiches techniques.pdf
* Conditions commerciales.pdf
* Procédure SAV.pdf
* Politique livraison.pdf
* Conditions fournisseurs.pdf

Afficher :

* Nom
* Type
* Taille
* Date
* Catégorie
* Statut indexation

Boutons :

* Ajouter document
* Voir
* Modifier
* Supprimer
* Activer / désactiver

Simuler un statut :

**Indexé par l’IA**

---

# 15. ALERTES — CONFIGURATION

Créer une page permettant de définir les règles.

Exemple :

### Règle

Nom :
Stock critique matière première

Condition :
Stock < seuil minimum

Seuil :
500 kg

Canal :

* Dashboard
* Email
* WhatsApp

Priorité :
Haute

Statut :
Actif

Boutons :

* Modifier
* Dupliquer
* Désactiver
* Supprimer

Ajouter plusieurs règles mockées.

---

# 16. MODÈLES DE DEVIS

Créer une galerie de templates.

Cards :

* Devis standard
* Devis grands comptes
* Devis personnalisé

Actions :

* Aperçu
* Modifier
* Définir par défaut
* Dupliquer

Créer une preview réaliste du devis.

---

# 17. MODÈLES DE BDC

Même logique :

* BDC standard
* BDC matière première
* BDC fournisseur

Actions :

* Aperçu
* Modifier
* Définir par défaut
* Dupliquer

---

# 18. NOTIFICATIONS

Créer une page notification center.

Catégories :

* Stock
* Clients
* Devis
* Commandes
* Fournisseurs
* Agents IA
* Système

Chaque notification peut être :

* Lue
* Non lue
* Prioritaire

Créer des interactions :

* Marquer comme lu
* Tout marquer comme lu
* Filtrer
* Supprimer

---

# 19. ACTIVITÉ / AUDIT LOG

Créer une page :

**Journal d’activité**

Exemples :

* Admin a validé le devis DEV-2026-018
* Agent IA a créé la commande CMD-2026-041
* Stock critique détecté
* BDC BDC-2026-012 généré
* Agent Service Client a escaladé une conversation
* Document ajouté à la base de connaissance

Colonnes :

* Date
* Utilisateur / Agent
* Action
* Module
* Objet
* Statut

---

# 20. PARAMÈTRES AGENTS IA

Créer une page permettant de simuler la configuration des agents.

Pour chaque agent :

### Agent Service Client

* Actif / Inactif
* Ton de réponse
* Langue
* Escalade humaine
* Temps avant relance

### Agent Devis

* Actif / Inactif
* Utiliser historique
* Seuil de confiance minimum
* Validation humaine obligatoire

### Agent Stock

* Actif / Inactif
* Fréquence de surveillance
* Niveau d’alerte
* Notifications

### Agent Fournisseur

* Actif / Inactif
* Critères de sélection
* Priorité prix / délai / fiabilité
* Validation humaine obligatoire

---

# 21. GLOBAL SEARCH

Ajouter une recherche globale accessible depuis la topbar.

La recherche doit pouvoir trouver dans les mock data :

* clients
* commandes
* devis
* fournisseurs
* matières
* documents
* conversations

Afficher les résultats regroupés par catégorie.

---

# 22. INTERACTIONS ET UX

IMPORTANT :

Le MVP doit être réellement navigable et démontrable.

Tous ces éléments doivent fonctionner côté frontend :

* Buttons
* Forms
* Modal
* Drawer
* Tabs
* Dropdowns
* Search
* Filters
* Sort
* Pagination
* Toggle
* Toast notifications
* Confirmation dialogs
* Hover states
* Tooltips
* Expand / collapse
* Sidebar collapse
* Breadcrumbs
* Date picker
* Status changes
* Create / edit / delete mock records

Lorsqu’un utilisateur réalise une action, afficher une conséquence réaliste.

Exemple :

Bouton :
**Valider le devis**

→ statut devient **Validé**

→ notification :

**Devis DEV-2026-018 validé avec succès**

---

# 23. ÉTATS À PRÉVOIR

Pour donner une vraie impression de produit :

Créer également :

* Loading state
* Skeleton loaders
* Empty state
* Error state
* No search result
* No notification
* No alert
* No conversation
* No document
* Confirmation modal avant suppression
* Confirmation avant validation importante

---

# 24. MOCK DATA

Utiliser beaucoup de mock data réalistes.

Créer au minimum :

* 20 clients
* 30 conversations
* 25 devis
* 30 commandes
* 20 produits
* 15 matières premières
* 12 fournisseurs
* 15 alertes
* 20 documents
* 20 FAQ
* 15 activités
* plusieurs scénarios de fournisseurs
* plusieurs modèles de devis
* plusieurs modèles BDC

Les données doivent être cohérentes entre les modules.

Exemple :
Un client présent dans les commandes doit également apparaître dans les conversations et les devis.

---

# 25. RESPONSIVE DESIGN

L'application doit être responsive.

Desktop :
priorité principale.

Tablet :
adapter tables et layouts.

Mobile :
sidebar transformée en menu mobile et cards empilées.

Les dashboards doivent rester lisibles.

---

# 26. TECHNOLOGIES FRONTEND

Utiliser une stack moderne :

* React
* TypeScript
* Tailwind CSS
* composants UI modernes
* charts interactifs
* icons cohérentes

Architecture propre et réutilisable.

Créer des composants réutilisables pour :

* KPI cards
* Tables
* Badges
* Modals
* AI cards
* Alerts
* Status badges
* Charts
* Empty states
* Toasts

---

# 27. IMPORTANT — LOGIQUE DES AGENTS DANS LE MVP

Les agents sont **simulés par des workflows frontend**.

Il faut donner l’impression qu’ils fonctionnent réellement.

Exemple :

Clique sur :

**« Analyser avec l’IA »**

→ afficher un petit état de traitement :

« Analyse des données... »

→ puis afficher :

« Analyse terminée »

→ afficher les scénarios générés à partir des mock data.

Même principe pour :

* Génération de devis
* Réponse IA
* Analyse stock
* Analyse fournisseurs
* Génération BDC
* Reporting IA

---

# 28. MICRO-COPY

Utiliser des textes réalistes et professionnels.

Éviter les textes génériques comme :

* Lorem ipsum
* Test
* Example
* Button
* Data

Utiliser plutôt :

* « Générer une réponse »
* « Analyser la demande »
* « Créer un scénario »
* « Sélectionner ce scénario »
* « Valider le devis »
* « Générer le BDC »
* « Traiter l’alerte »
* « Escalader vers un collaborateur »
* « Ajouter à la base de connaissance »

---

# 29. IMPORTANT — HIÉRARCHIE MÉTIER

L’interface doit faire comprendre que les agents ne remplacent pas totalement l’humain.

Afficher à certains endroits :

**IA → Analyse / Proposition → Validation humaine → Action**

Exemple :

Demande client
→ Agent IA analyse
→ Scénario proposé
→ Responsable valide
→ Devis envoyé

Même logique pour :

* commandes
* achats
* fournisseurs
* alertes importantes

---

# 30. FINAL POLISH

Le résultat final doit ressembler à un **véritable SaaS B2B commercialisable**, et non à un simple prototype scolaire.

Priorités :

1. Très bonne hiérarchie visuelle
2. Interface riche mais pas surchargée
3. Données réalistes
4. Workflows clairs
5. Agents IA bien différenciés
6. Dashboard impressionnant pour une démonstration
7. Animations légères et professionnelles
8. Hover states
9. Feedback utilisateur après chaque action
10. Cohérence graphique totale

Le produit doit être suffisamment complet pour permettre une **démonstration client de bout en bout** :

**Client contacte → Agent Service Client répond → commande créée → demande de devis → Agent Devis analyse l’historique → scénario sélectionné → devis généré → envoi simulé → stock surveillé → alerte stock → besoin d’achat → Agent Fournisseur compare les fournisseurs → scénario sélectionné → BDC généré → Dashboard affiche les résultats.**

Créer également quelques **données interconnectées et un scénario de démonstration préchargé** permettant de présenter ce parcours facilement.


dans toute les footer des pages : tu met "mvp created by izemx "

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eed2b8a9-5c62-45df-9034-00e5ce2d001a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
