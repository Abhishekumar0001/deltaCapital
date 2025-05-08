type Item = "Apple" | "Banana" | "Melon" | "Lime";
const prices: Record<Item, number> = {
    Apple: 35,
    Banana: 20,
    Melon: 50,
    Lime: 15,
};
function calculateTotal(basket: string[]): string {
    const counts: Record<Item, number> = {
        Apple: 0,
        Banana: 0,
        Melon: 0,
        Lime: 0,
    };
    for (const item of basket) {
        if (item in counts) {
            counts[item as Item]++;
        }
    }
    let total = 0;
    // Regular pricing
    total += counts.Apple * prices.Apple;
    total += counts.Banana * prices.Banana;
    // Melon: (buy one get one free)
    const melonPairs = Math.floor(counts.Melon / 2);
    const remainingMelons = counts.Melon % 2;
    total += (melonPairs + remainingMelons) * prices.Melon;
    // Lime: 3 for the price of 2
    const limeSets = Math.floor(counts.Lime / 3);
    const remainingLimes = counts.Lime % 3;
    total += (limeSets * 2 + remainingLimes) * prices.Lime;
    return `Rs ${(total / 100).toFixed(2)}`;
}
const basket = ["Apple", "Apple", "Banana", "Melon", "Melon", "Lime", "Lime", "Lime"];
console.log(calculateTotal(basket));