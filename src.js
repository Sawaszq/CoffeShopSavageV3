document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Americano",
        img: "coffe1.jpeg",
        price: 15000,
      },
      { id: 2, name: "Capuccino", img: "coffe2.jpeg", price: 20000 },
      { id: 3, name: "Latte", img: "coffe3.jpg", price: 25000 },
      { id: 4, name: "Robusta", img: "robusta.jpeg", price: 100000 },
      { id: 5, name: "Gayo Coffe", img: "gayo.jpeg", price: 115000 },
      { id: 6, name: "Arabica", img: "arabica.jpg", price: 110000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newitem) {
      const cartitem = this.items.find((item) => item.id === newitem.id);
      if (!cartitem) {
        this.items.push({ ...newitem, quantity: 1, total: newitem.price });
        this.quantity++;
        this.total += newitem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newitem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;

            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      const cartitem = this.items.find((item) => item.id == id);
      if (cartitem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;

            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartitem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartitem.price;
      }
    },
     
  });

  
});

const checkoutbutton = document.querySelector('.checkout-button');
checkoutbutton.disable



// Konversi ke Rupiah
function Rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

