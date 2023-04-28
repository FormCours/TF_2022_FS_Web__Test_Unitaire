class ProductService {

  products;

  constructor() {
    this.products = [];
  }

  getAll() {
    // Renvoi une copie des produits (deepclone)
    return structuredClone(this.products);
  }

  add(productToAdd, quantity = 1) {
    // Tests de garde
    if(!productToAdd) {
      throw new Error('The product is required');
    }

    if(productToAdd.name === undefined || productToAdd.price === undefined) {
      throw new Error('The product don\'t contains "name" and "price" properties');
    }

    if(productToAdd.price < 0) {
      throw new Error('Negative price no allow !');
    }

    // Traitement
    const productIndex = this.products.findIndex(
      p => p.product.name === productToAdd.name && p.product.price === productToAdd.price
    );

    if(productIndex === -1) {
      // On ajout le produit avec sa quantité
      this.products.push({ product: productToAdd, quantity });
    }
    else {
      this.products[productIndex].quantity += quantity
    }
  }

}

module.exports = ProductService;