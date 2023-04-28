const assert = require('assert');
const ProductService = require('./../services/product.service');


describe('Product Service', () => {

  describe('Add', () => {

    it('One product (Pomme)', () => {
      // Instance du service
      const productService = new ProductService();

      // Sénario
      const product = { name: 'Pomme', price: 4.2 };
      productService.add(product);
      const products = productService.getAll();

      // Valeur attendu
      const expectedResult = [
        {
          product: { name: 'Pomme', price: 4.2 },
          quantity: 1
        }
      ];

      // Test
      assert.equal(typeof (product), 'object');
      assert.deepEqual(products, expectedResult);
    });

    it("Two product (Pomme / Poire)", () => {
      // Instance du service
      const productService = new ProductService();

      // Sénario
      const pomme = { name: 'Pomme', price: 4.2 };
      const poire = { name: 'Poire', price: 2.4 };
      productService.add(pomme);
      productService.add(poire);

      const products = productService.getAll();

      // Resultat attendu
      const expectedResult = [
        {
          product: { name: 'Pomme', price: 4.2 },
          quantity: 1
        },
        {
          product: { name: 'Poire', price: 2.4 },
          quantity: 1
        },
      ];

      // Test
      assert.equal(typeof (products), 'object');
      assert.ok(Array.isArray(products));
      assert.deepEqual(products, expectedResult);
    });

    it('Products with quantity (5 Pommes / 3 Poires)', () => {
      // Instance du service
      const productService = new ProductService();

      // Sénario
      const pomme = { name: 'Pomme', price: 4.2 };
      const poire = { name: 'Poire', price: 2.4 };

      productService.add(pomme, 5);
      productService.add(poire, 3);

      const products = productService.getAll();

      // Resultat attendu
      const expectedResult = [
        {
          product: { name: 'Pomme', price: 4.2 },
          quantity: 5
        },
        {
          product: { name: 'Poire', price: 2.4 },
          quantity: 3
        },
      ];

      // Test
      assert.equal(typeof (products), 'object');
      assert.ok(Array.isArray(products));
      assert.deepEqual(products, expectedResult);
    });

    it('Product already added', () => {
      // Instance du service
      const productService = new ProductService();

      // Sénario
      // - Initial state
      const pomme = { name: 'Pomme', price: 4.2 };
      const poire = { name: 'Poire', price: 2.4 };
      productService.add(pomme, 5);
      productService.add(poire, 3);
      // - Add already product
      const pommeDouble = { name: 'Pomme', price: 4.2 };
      productService.add(pommeDouble, 2);
      // - Recup des valeurs
      const products = productService.getAll();

      // Resultat attendu
      const expectedResult = [
        {
          product: { name: 'Pomme', price: 4.2 },
          quantity: 7
        },
        {
          product: { name: 'Poire', price: 2.4 },
          quantity: 3
        },
      ];

      // Test
      assert.equal(typeof (products), 'object');
      assert.ok(Array.isArray(products));
      assert.deepEqual(products, expectedResult);
    });

    it('Two same products with diff price', () => {
      // Instance du service
      const productService = new ProductService();

      // Sénario
      const pomme1 = { name: 'Pomme', price: 4.2 };
      const pomme2 = { name: 'Pomme', price: 6 };
      const pomme3 = { name: 'Pomme', price: 6 };

      productService.add(pomme1, 4);
      productService.add(pomme2);
      productService.add(pomme3);

      const products = productService.getAll();

      // Resultat attendu
      const expectedResult = [
        {
          product: { name: 'Pomme', price: 4.2 },
          quantity: 4
        },
        {
          product: { name: 'Pomme', price: 6 },
          quantity: 2
        }
      ];

      // Test
      assert.equal(typeof (products), 'object');
      assert.ok(Array.isArray(products));
      assert.deepEqual(products, expectedResult);
    });

    it('Product with negative price (-> Error)', () => {
      // Instance du service
      const productService = new ProductService();

      // Sénario
      const badProduct = { name: 'Test', price: -100 };

      // - Assert sur l'objet erreur
      assert.throws(() => {
        // Code à risque (Ce qui doit planté)
        productService.add(badProduct);

      }, new Error('Negative price no allow !'));
    });

    it('Bad object (-> Error)', () => {
      // Instance du service
      const productService = new ProductService();

      // Sénario
      const recipe = { name: 'Salade', score: 'A', ingredient: [] };

      // - Assert sur le message d'erreur
      assert.throws(() => {
        // Code à risque (Ce qui doit planté)
        productService.add(recipe);

      }, 'Error: The product don\'t contains "name" and "price" properties');

      assert.throws(() => {
        // Code à risque (Ce qui doit planté)
        productService.add(null);

      }, /Error: The product is required/i)

    });

  });

});