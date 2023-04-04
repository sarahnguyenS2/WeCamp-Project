const menu = [
  {
    id: 1,
    title: "Bell Pepper",
    category: "Vegetables",
    price: 15.99,
    img: "/WeCamp-Project/Assets/peper.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "strawberry",
    category: "Fruits",
    price: 13.99,
    img: "/WeCamp-Project/Assets/strawbery.jpeg",
    desc: `vaporware mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "Tomatoe",
    category: "Vegetables",
    price: 6.99,
    img: "/WeCamp-Project/Assets/tomato.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "Fruit juice",
    category: "Juice",
    price: 20.99,
    img: "/WeCamp-Project/Assets/juice.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "Brocolli",
    category: "Vegetables",
    price: 22.99,
    img: "/WeCamp-Project/Assets/brocolli.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "Apple",
    category: "Fruits",
    price: 18.99,
    img: "/WeCamp-Project/Assets/apple.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "Almonds",
    category: "Dried",
    price: 8.99,
    img: "/WeCamp-Project/Assets/product-1.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "Carrots",
    category: "Vegetables",
    price: 12.99,
    img: "/WeCamp-Project/Assets/carrot.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "Orange Juice",
    category: "Juice",
    price: 16.99,
    img: "/WeCamp-Project/Assets/juice.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "Cashews",
    category: "Dried",
    price: 39.99,
    img: "/WeCamp-Project/Assets/product-1.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];
const productSection = document.querySelector(".product-section");
const productContainer = document.querySelector(".product-container");
const btnContainer = document.querySelector(".btn-container");
const btnCategory = btnContainer.querySelectorAll(".btn-category");
// console.log(btnContainer);
// console.log(btnCategory);
// console.log(productContainer);
window.addEventListener("DOMContentLoaded", () => {
  displayMenuProducts(menu);
  displayCategory();
});
function displayCategory() {
  const categories = menu.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      // console.log(values);
      return values;
    },
    ["All"]
  );
  // console.log(categories);

  btnCategory.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let categoryId = e.currentTarget.dataset.id;
      // console.log(category);
      let menuCategory = menu.filter((product) => {
        if (product.category === categoryId) {
          return product;
        }
      });
      // console.log(menuCategory);

      if (categoryId === "All") {
        displayMenuProducts(menu);
      } else {
        displayMenuProducts(menuCategory);
      }
    });
  });
}

function displayMenuProducts(list) {
  let displayMenu = list
    .map((item) => {
      // console.log(item);
      return `<div class="product-detail">
    <a href="#" class=""
      ><img
        class="product-img"
        src=${item.img}
        alt=""
      />
    </a>
    <div class="product-text">
      <h3>${item.title}</h3>

      <div class="product-price">
        <span class="pricing">$${item.price}</span>
      </div>

      <div class="d-flex flex-justify product-icons">
        <a href="#" class="">
          <i class="fa-solid fa-bars"></i>
        </a>
        <a href="#" class="">
          <span><i class="fa-solid fa-cart-plus"></i></span>
        </a>
      </div>
    </div>
  </div>`;
    })
    .join("");
  productContainer.innerHTML = displayMenu;
}
