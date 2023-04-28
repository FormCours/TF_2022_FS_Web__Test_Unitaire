# Méthodologie TDD

Le TDD → Test driven development _(Developpement par les tests)_

Etape :
 1) Ecrire le test d'une fonctionnalité
 2) Verrifier le test
 3) Implementé la fonctionnalité
 4) Verrifier le test
    4.1) Echec → Retour à l'étape 3
    4.2) Si ok → On continue
 5) Refactorisation du code 
 6) Verrifier le test

Regle : 
 1) Vous ne pouvez par ecrire du code tant que vous n'avez ecrit le test de celui-ci
 2) Vous ne devez pas ecrire qu'un test unitaire en echec à la fois
 3) Vous ne devez pas ecrire plus de code que necessaire pour validé le test 