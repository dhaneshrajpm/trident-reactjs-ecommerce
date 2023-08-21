export const getTotalPrice = items => {
  const total = items.reduce((totalPrice, item) => {
    return totalPrice + (item.quantity * item.price);
  }, 0)
  return total;
}


export const getTotalCount = items => {
  const itemsCount = items.reduce((acc, currentItem) => {
    return acc + currentItem.quantity;
  }, 0);
  return itemsCount;
}