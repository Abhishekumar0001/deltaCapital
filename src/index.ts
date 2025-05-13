// Enum for item names
enum ItemType {
    Apple = "Apple",
    Banana = "Banana",
    Melon = "Melon",
    Lime = "Lime"
}
// Base interface for pricing strategy
interface PricingStrategy {
    calculatePrice(count: number, unitPrice: number): number;
}
// Concrete strategies
class StandardPricing implements PricingStrategy {
    calculatePrice(count: number, unitPrice: number): number {
        return count * unitPrice;
    }
}
class BuyOneGetOneFree implements PricingStrategy {
    calculatePrice(count: number, unitPrice: number): number {
        const payableCount = Math.floor(count / 2) + (count % 2);
        return payableCount * unitPrice;
    }
}
class ThreeForTwo implements PricingStrategy {
    calculatePrice(count: number, unitPrice: number): number {
        const setsOfThree = Math.floor(count / 3);
        const remaining = count % 3;
        return (setsOfThree * 2 + remaining) * unitPrice;
    }
}
// Generic Item class
class Item<T extends ItemType> {
    constructor(
        public readonly name: T,
        public readonly price: number,
        public readonly strategy: PricingStrategy
    ) { }
}
// Shopping cart
class ShoppingCart {
    private itemMap = new Map<ItemType, number>();
    constructor(private readonly catalog: Map<ItemType, Item<ItemType>>) { }
    add(itemName: string): void {
        const key = itemName as ItemType;
        if (this.catalog.has(key)) {
            this.itemMap.set(key, (this.itemMap.get(key) || 0) + 1);
        }
    }
    calculateTotal(): string {
        let total = 0;
        for (const [itemType, count] of this.itemMap.entries()) {
            const item = this.catalog.get(itemType)!;
            total += item.strategy.calculatePrice(count, item.price);
        }
        return `Rs ${(total / 100).toFixed(2)}`;
    }
}


const catalog = new Map<ItemType, Item<ItemType>>([
    [ItemType.Apple, new Item(ItemType.Apple, 35, new StandardPricing())],
    [ItemType.Banana, new Item(ItemType.Banana, 20, new StandardPricing())],
    [ItemType.Melon, new Item(ItemType.Melon, 50, new BuyOneGetOneFree())],
    [ItemType.Lime, new Item(ItemType.Lime, 15, new ThreeForTwo())],
]);
const cart = new ShoppingCart(catalog);
const basket = ["Apple", "Apple", "Banana", "Melon", "Melon", "Lime", "Lime", "Lime"];
basket.forEach(item => cart.add(item));
console.log(cart.calculateTotal());