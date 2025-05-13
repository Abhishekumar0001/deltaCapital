"use strict";
// Enum for item names
var ItemType;
(function (ItemType) {
    ItemType["Apple"] = "Apple";
    ItemType["Banana"] = "Banana";
    ItemType["Melon"] = "Melon";
    ItemType["Lime"] = "Lime";
})(ItemType || (ItemType = {}));
// Concrete strategies
class StandardPricing {
    calculatePrice(count, unitPrice) {
        return count * unitPrice;
    }
}
class BuyOneGetOneFree {
    calculatePrice(count, unitPrice) {
        const payableCount = Math.floor(count / 2) + (count % 2);
        return payableCount * unitPrice;
    }
}
class ThreeForTwo {
    calculatePrice(count, unitPrice) {
        const setsOfThree = Math.floor(count / 3);
        const remaining = count % 3;
        return (setsOfThree * 2 + remaining) * unitPrice;
    }
}
// Generic Item class
class Item {
    constructor(name, price, strategy) {
        this.name = name;
        this.price = price;
        this.strategy = strategy;
    }
}
// Shopping cart
class ShoppingCart {
    constructor(catalog) {
        this.catalog = catalog;
        this.itemMap = new Map();
    }
    add(itemName) {
        const key = itemName;
        if (this.catalog.has(key)) {
            this.itemMap.set(key, (this.itemMap.get(key) || 0) + 1);
        }
    }
    calculateTotal() {
        let total = 0;
        for (const [itemType, count] of this.itemMap.entries()) {
            const item = this.catalog.get(itemType);
            total += item.strategy.calculatePrice(count, item.price);
        }
        return `Rs ${(total / 100).toFixed(2)}`;
    }
}
const catalog = new Map([
    [ItemType.Apple, new Item(ItemType.Apple, 35, new StandardPricing())],
    [ItemType.Banana, new Item(ItemType.Banana, 20, new StandardPricing())],
    [ItemType.Melon, new Item(ItemType.Melon, 50, new BuyOneGetOneFree())],
    [ItemType.Lime, new Item(ItemType.Lime, 15, new ThreeForTwo())],
]);
const cart = new ShoppingCart(catalog);
const basket = ["Apple", "Apple", "Banana", "Melon", "Melon", "Lime", "Lime", "Lime"];
basket.forEach(item => cart.add(item));
console.log(cart.calculateTotal());
