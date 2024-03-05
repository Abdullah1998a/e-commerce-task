// Importing products data from a module
import { products } from "../data/db.js";

// Function to generate product template HTML and display it on the page
const productTemp = document.querySelector(".products");
products.forEach((product) => {
  getProductTemplate(productTemp, product);
});

// Selecting elements from the DOM
const cartItemsTemp = document.querySelector(".cart-items");
const itemsCart = document.querySelector(".items .btn");
const paymentBtn = document.querySelector(".payment-button");
const orderSummary = document.querySelector(".order-summary");
const checkoutBtns = document.querySelectorAll(".checkout-btn");

// Looping through checkout buttons and adding click event listeners
checkoutBtns.forEach((checkoutBtn) => {
  checkoutBtn.onclick = () => {
    // Enabling payment button
    paymentBtn.disabled = false;

    // Fetching product data and updating cart accordingly
    let certainProduct = getProductsData(products, checkoutBtn);
    insertData(certainProduct, 1, certainProduct.colors[0]);
    updateItemsNumber(itemsList, itemsCart);
    getCartItemsTemplate(cartItemsTemp, itemsList);

    // Adding event listeners for increasing and decreasing items in the cart
    const moreBtns = document.querySelectorAll(".more");
    const amountTemps = document.querySelectorAll(".amount-items-list");
    moreBtns.forEach((moreBtn, ind) => {
      moreBtn.onclick = () =>
        increaseCartItems(
          itemsList,
          moreBtn,
          amountTemps,
          ind,
          itemsCart,
          orderSummary
        );
    });
    const lessBtns = document.querySelectorAll(".less");
    lessBtns.forEach((lessBtn, ind) => {
      lessBtn.onclick = () =>
        decreaseCartItems(
          itemsList,
          lessBtn,
          amountTemps,
          ind,
          itemsCart,
          cartItemsTemp,
          orderSummary,
          paymentBtn
        );
    });

    // Calculating total price and updating order summary
    getTotalPriceTemplate(orderSummary, itemsList);
    const removeBtns = document.querySelectorAll(".close-button");

    // Looping through remove buttons and adding click event listeners
    removeBtns.forEach((removeBtn) => {
      removeBtn.onclick = () =>
        removeItem(
          itemsList,
          removeBtn,
          itemsCart,
          cartItemsTemp,
          orderSummary,
          paymentBtn,
          removeItemModal
        );
    });

    // Adding event listener for payment button click
    paymentBtn.onclick = () => {
      // Clearing items list, cart and hiding modals
      itemsList = [];
      clear(itemsList, itemsCart, cartItemsTemp, orderSummary, paymentBtn);
      toggleInnerPages(productsTemp, detailsTemp, "return-home");
      hideModal(paymentDoneModal, 3000);
    };

    // Hiding add item modal
    hideModal(addItemModal);
  };
});

// Selecting elements from the DOM
const detailsBtns = document.querySelectorAll(".details-btn");
const featuresTemp = document.querySelector(".details-temp main");

// Function to handle click event on details button
detailsBtns.forEach((detailsBtn) => {
  detailsBtn.onclick = () => {
    // Fetching product data and displaying details page
    let certainProduct = getProductsData(products, detailsBtn);
    toggleInnerPages(productsTemp, detailsTemp, "details");
    getFeaturesTemplate(featuresTemp, certainProduct);
    const slides = document.querySelectorAll(".slider .slide");
    const indicators = document.querySelectorAll(".indicators li");

    // Adding event listeners for sliders
    indicators.forEach((indicator, index) => {
      indicator.onclick = () => {
        removeActive(slides, indicators);
        indicator.classList.add("active");
        slides[index].classList.add("active");
      };
    });
    // Adding event listeners for color selection
    let colorsBtns = document.querySelectorAll(".colors ul li");
    colorsBtns.forEach((colorsBtn) => {
      colorsBtn.onclick = () => {
        removeActive(colorsBtns);
        colorsBtn.classList.add("active");
      };
    });
    const quantity = document.querySelector(".quantity span");
    const increaseQuantityBtn = document.querySelector(".quantity .plus");

    // Adding event listeners for quantity buttons
    increaseQuantityBtn.onclick = () =>
      increaseAmount(quantity, checkoutBtn, decreaseQuantityBtn);
    const decreaseQuantityBtn = document.querySelector(".quantity .minus");
    decreaseQuantityBtn.onclick = () =>
      decreaseAmount(quantity, checkoutBtn, decreaseQuantityBtn);
    const checkoutBtn = document.querySelector(".shopping .checkout-btn");

    // adding click event listener on checkout button
    checkoutBtn.onclick = () => {
      // Enabling payment button
      paymentBtn.disabled = false;

      // Fetching product data and updating cart accordingly
      colorsBtns.forEach((colorsBtn) => {
        if (colorsBtn.classList.contains("active")) {
          insertData(
            certainProduct,
            parseInt(quantity.getAttribute("data-quantity")),
            colorsBtn.getAttribute("style").split(": ")[1]
          );
        }
      });
      updateItemsNumber(itemsList, itemsCart);
      getCartItemsTemplate(cartItemsTemp, itemsList);

      // Adding event listeners for increasing and decreasing items in the cart
      const moreBtns = document.querySelectorAll(".more");
      const amountTemps = document.querySelectorAll(".amount-items-list");
      moreBtns.forEach((moreBtn, ind) => {
        moreBtn.onclick = () =>
          increaseCartItems(
            itemsList,
            moreBtn,
            amountTemps,
            ind,
            itemsCart,
            orderSummary
          );
      });
      const lessBtns = document.querySelectorAll(".less");
      lessBtns.forEach((lessBtn, ind) => {
        lessBtn.onclick = () =>
          decreaseCartItems(
            itemsList,
            lessBtn,
            amountTemps,
            ind,
            itemsCart,
            cartItemsTemp,
            orderSummary,
            paymentBtn
          );
      });

      // Calculating total price and updating order summary
      getTotalPriceTemplate(orderSummary, itemsList);

      // Looping through remove buttons and adding click event listeners
      const removeBtns = document.querySelectorAll(".close-button");
      removeBtns.forEach((removeBtn) => {
        removeBtn.onclick = () =>
          removeItem(
            itemsList,
            removeBtn,
            itemsCart,
            cartItemsTemp,
            orderSummary,
            paymentBtn,
            removeItemModal
          );
      });

      // Reseting quantity buttons to their initial status
      amountBtnsStatus(quantity, checkoutBtn, decreaseQuantityBtn, "reset");

      // Adding event listener for payment button click
      paymentBtn.onclick = () => {
        // Clearing items list, cart and hiding modals
        clear(itemsList, itemsCart, cartItemsTemp, orderSummary, paymentBtn);
        // Toggling between details and products pages
        toggleInnerPages(productsTemp, detailsTemp, "return-home");
        hideModal(paymentDoneModal, 2000);
      };
      hideModal(addItemModal);
    };
  };
});

// Return to products page function
let returnProductsBtn = document.querySelector(".details-temp header button");
returnProductsBtn.onclick = () =>
  toggleInnerPages(productsTemp, detailsTemp, "return");

// Remove active class from any array's items
function removeActive(...args) {
  args.forEach((arr) => {
    arr.forEach((item) => {
      item.classList.remove("active");
    });
  });
}

// Showing menu navigation in mobile size
const toggle = document.querySelector(".toggle");
const links = document.querySelector(".links");
const linksMenu = document.querySelectorAll(".links li a");
toggle.onclick = () => {
  links.classList.toggle("show");
  toggle.classList.toggle("active");
  if (links.classList.contains("show")) {
    document.body.classList.add("no-scrolling");
  } else {
    document.body.classList.remove("no-scrolling");
  }
};
linksMenu.forEach((linkMenu) => {
  linkMenu.onclick = () => {
    links.classList.remove("show");
    toggle.classList.remove("active");
    document.body.classList.remove("no-scrolling");
  };
});

// Converting English numbers to Arabic ones
function getArabicNumbers(num) {
  let arabicNumber = num.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
  return arabicNumber;
}

// Converting Arabic numbers to English ones
function getEnglishNumbers(num) {
  let englishNumber = num.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
  return englishNumber;
}

// Validating contact and subscribe form 
(function validateContact() {
  const forms = document.querySelectorAll(".needs-validation");
  forms.forEach((form, ind) => {
    if (ind == 0) {
      form.addEventListener(
        "submit",
        (event) => {
          form.classList.add("was-validated");
          if (form.checkValidity()) {
            form.classList.remove("was-validated");
          } else {
            event.preventDefault();
            event.stopPropagation();
          }
        },
        false
      );
    } else {
      form.addEventListener(
        "submit",
        (event) => {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add("was-validated");
          if (form.checkValidity()) {
            form.querySelector("input").value = "";
            form.classList.remove("was-validated");
          }
        },
        false
      );
    }
  });
})();

// Making sure that there are no duplicates items in the cart (which have the same color and device's name)
function checkDuplicates(array) {
  let idCounts = {};
  array.forEach((item) => {
    let id = `${item.id}-${item.color}`;
    if (idCounts[id]) {
      idCounts[id].amount += item.amount;
    } else {
      idCounts[id] = { ...item };
    }
  });
  return Object.values(idCounts);
}

// Rendering HTML to products page
function getProductTemplate(container, data) {
  const {
    id,
    name,
    brand,
    images: {
      back_front_img: { src },
    },
    price,
  } = data;
  container.innerHTML += `
    <div class="col-11 col-sm-9 col-md-5 col-lg-3 bg-light rounded position-relative shadow-sm overflow-hidden d-flex justify-content-center align-items-center product">
      <div class="img-holder">
        <img class="img-fluid" src=${src} alt="صورة أماميّة وخلفيّة للجِهاز">
      </div>
      <div class="w-100 h-100 position-absolute start-0 top-0 py-3 d-flex flex-column justify-content-end align-items-start content">
        <h3 class="h4 text-light px-3 mb-2">${brand} ${name}<span class="d-block mt-3">${price} دولاراً أمريكيّاً</span></h3>
        <div class="w-100 d-flex justify-content-between px-3">
          <button data-id=${id} class="btn btn-light details-btn">تَفاصيل</button>
          <button data-id=${id} class="btn btn-danger px-3 checkout-btn" data-bs-toggle="modal" data-bs-target="#addItemModal"><img src="../assets/images/icons/add-item.svg" alt="أيقونَة إضَافة لِلسلّة"></button>
        </div>
      </div>
    </div>
  `;
  return container;
}

// Rendering HTML to the cart section from checkout page
function getCartItemsTemplate(container, data) {
  container.innerHTML = "";
  for (let index = 0; index < data.length; index++) {
    container.innerHTML += `
      <li class="list-group-item d-flex px-1 justify-content-between align-items-start position-relative">
        <button class="btn-close bg-danger rounded-circle close-button" data-remove-id=${
          data[index].UID
        } data-bs-toggle="modal" data-bs-target="#removeItemModal"></button>
        <div class="ms-2 me-auto">
          <div class="fw-bold">${getArabicNumbers(index + 1)}. ${
      data[index].brand
    } ${data[index].name}</div>
          <p><span class="text-danger fs-3">${
            data[index].price
          }</span> دولار أمريكي</p>
        </div>
        <div class="align-self-stretch d-flex flex-column justify-content-between align-items-center info">
          <span class="badge bg-danger px-3 rounded-pill amount-items-list">×${getArabicNumbers(
            data[index].amount
          )}</span>
          <div class="badge rounded-circle" style="background: ${
            data[index].color
          }"></div>
        </div>
        <div class="align-self-stretch d-flex flex-column align-items-center justify-content-between ms-2">
          <span class="bg-danger rounded-circle more" data-uid=${
            data[index].UID
          }></span>
          <span class="bg-danger rounded-circle less" data-uid=${
            data[index].UID
          }></span>
        </div>
      </li>
    `;
  }
  return container;
}

// Rendering HTML to the colors section from details page
function getColorsTemplate(colors) {
  let data = colors.map((color, ind) => {
    if (ind === 0) {
      return `<li class="active" style="--bg-color: ${color}"></li>`;
    } else {
      return `<li style="--bg-color: ${color}"></li>`;
    }
  });
  return data;
}

// Rendering HTML to details page for a certain product
function getFeaturesTemplate(container, data) {
  let {
    id,
    name,
    brand,
    images: { back_front_img, colors_img },
    features: { processor, ram, storage, camera, screen, battery, system },
    colors,
    price,
  } = data;
  let colorsTemp = getColorsTemplate(colors);
  container.innerHTML = `
    <div class="position-relative d-flex justify-content-center align-items-end slider">
      <div class="position-absolute slide active">
        <img class="position-absolute top-50 start-50 translate-middle" src=${
          back_front_img.src
        } alt="صورة أمامية وخلفيّة للجِهاز"/>
      </div>
      <div class="position-absolute slide">
        <img class="position-absolute top-50 start-50 translate-middle" src=${
          colors_img.src
        } alt="الألوان المُتوفرة للجِهاز" />
      </div>
      <ul class="list-unstyled d-flex justify-content-between align-items-center gap-2 indicators">
        <li class="w-50 h-100 rounded active" style="--img-url: url(${
          back_front_img.src
        })"></li>
        <li class="w-50 h-100 rounded" style="--img-url: url(${
          colors_img.src
        })"></li>
      </ul>
    </div> 
    <div class="details">
      <header class="col-12">
        <span class="bg-danger text-light rounded py-1 px-3 smartphone">الهَاتِف الذّكي</span>
        <h3 class="text-danger mt-2">${brand} ${name}</h3>
      </header> 
      <div class="row justify-content-evenly align-items-center mt-3 gap-4 content">
        <div class="col-12 row d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 features">
          <h4 class="col-12 p-0">مُميّزات الجِهَاز</h4>
          <div class="col col-md-6 bg-light py-2 rounded shadow-sm" style="--icon-url: url('../assets/images/icons/processor.svg');">
            <span>المُعَالِج: </span>
            <span>${processor}</span>
          </div>
          <div class="col col-md-5 bg-light py-2 rounded shadow-sm" style="--icon-url: url('../assets/images/icons/ram.svg')">
            <span>الرام: </span>
            <span>${ram}</span>
          </div>
          <div class="col col-md-6 bg-light py-2 rounded shadow-sm" style="--icon-url: url('../assets/images/icons/storage.svg');">
            <span>التَخزين: </span>
            <span>${storage}</span>
          </div>
          <div class="col col-md-5 bg-light py-2 rounded shadow-sm" style="--icon-url: url('../assets/images/icons/camera.svg')">
            <span>الكَاميرا: </span>
            <span>${camera}</span>
          </div>
          <div class="col col-md-6 bg-light py-2 rounded shadow-sm" style="--icon-url: url('../assets/images/icons/screen.svg')">
            <span>حَجم الشَاشة: </span>
            <span>${screen}</span>
          </div>
          <div class="col col-md-5 bg-light py-2 rounded shadow-sm" style="--icon-url: url('../assets/images/icons/system.svg')">
            <span>نِظام التَشغيل: </span>
            <span>${system}</span>
          </div>
          <div class="col col-md-6 bg-light py-2 rounded shadow-sm" style="--icon-url: url('../assets/images/icons/battery.svg');">
            <span>البطاريّة: </span>
            <span>${battery}<span>
          </div>
        </div>
        <div class="col-7 col-sm-4 col-lg-5 mt-4 mb-2 text-center colors">
          <h4>الأَلوان المُتَوفِّرة</h4>
          <ul class="list-unstyled d-flex align-items-center justify-content-center gap-2">
            ${colorsTemp.join("")}
          </ul> 
        </div> 
        <div class="col-6 col-sm-4 text-center price">
          <h4>سِعر الجِهَاز</h4>  
          <div>
            <span class="text-danger fs-2">${price}</span> دولاراً أمريكيّاً
          </div> 
        </div> 
        <div class="col-12 col-md-6 d-flex justify-content-between align-items-center mt-2 shopping">
          <div class="btn-group d-flex align-items-streach quantity">
            <button type="button" class="btn btn-danger minus" disabled><img src="assets/images/icons/disabled/minus.svg" alt="إيقونة إنقاص الكمية"></button>
            <span data-quantity='0' class="d-flex px-3 bg-light justify-content-center align-items-center">٠</span>
            <button type="button" class="btn btn-danger plus"><img src="assets/images/icons/plus.svg" alt="أيقونة زيادة الكمية"></button>
          </div> 
          <button data-id=${id} class="btn btn-danger text-light px-3 checkout-btn" data-bs-toggle="modal" data-bs-target="#addItemModal" disabled>
            <img src="/assets/images/icons/disabled/add-item.svg" alt="إضافة لِلسلّة" /> 
          </button> 
        </div> 
      </div> 
    </div>
  `;
  return container;
}

// Calculating total price and updating order summary
function getTotalPriceTemplate(container, data) {
  let totalPrice = 0;
  data.forEach(({ price, amount }) => {
    totalPrice += parseInt(getEnglishNumbers(price)) * amount;
  });
  container.innerHTML = `
    <div class="card-body text-center">
      المَبْلَغ الكُلّي <span class="text-danger fs-3">${getArabicNumbers(
        totalPrice
      )}</span> دولار أمريكي
    </div>
  `;
  return container;
}

// Fetching product data and updating cart accordingly
let itemsList = [];
function insertData(data, amount, color) {
  itemsList.push({
    UID: Date.now(),
    id: data.id,
    brand: data.brand,
    name: data.name,
    price: data.price,
    amount,
    color,
  });
  itemsList = checkDuplicates(itemsList);
  return itemsList;
}

// Removing a certain product data from the cart
function removeData(UID) {
  itemsList = itemsList.filter((item) => item.UID !== UID);
  return itemsList;
}

// Fetching products data from the database (I design the database file from scratch because I didn't find a satisfying API)
function getProductsData(database, dataID) {
  let data = database.filter(
    (item) => item.id === dataID.getAttribute("data-id")
  )[0];
  return data;
}

// Toggling between details and details pages with automatic scrolling 
const mainProducts = document.getElementById("products");
const productsTemp = document.querySelector(".products-temp");
const detailsTemp = document.querySelector(".details-temp");
function toggleInnerPages(firstPage, secondPage, mode) {
  switch (mode) {
    case "return":
      firstPage.classList.add("active");
      secondPage.classList.remove("active");
      window.scrollTo(0, mainProducts.offsetTop);
      break;
    case "return-home":
      firstPage.classList.add("active");
      secondPage.classList.remove("active");
      window.scrollTo(0, 0);
      break;
    case "details":
      firstPage.classList.remove("active");
      secondPage.classList.add("active");
      window.scrollTo(0, mainProducts.offsetTop);
      break;
    default:
      console.log("حدث خطأ ما");
  }
}

// Updating amount in details page depends on quantity buttons
function updateAmountValue(quantity, mode = "increase") {
  switch (mode) {
    case "increase":
      quantity.textContent = getArabicNumbers(
        parseInt(quantity.getAttribute("data-quantity")) + 1
      );
      quantity.setAttribute(
        "data-quantity",
        `${getEnglishNumbers(quantity.textContent)}`
      );
      break;
    case "decrease":
      quantity.setAttribute(
        "data-quantity",
        `${parseInt(quantity.getAttribute("data-quantity")) - 1}`
      );
      quantity.textContent = getArabicNumbers(
        quantity.getAttribute("data-quantity")
      );
      break;
    default:
      console.log("حدث خطأ ما");
  }
}

// Status of quantity buttons (initial state minus and checkout buttons are disabled if I incresed quantity they will turn into active stats automaticlly)
function amountBtnsStatus(
  quantity,
  checkoutBtn,
  decreaseQuantityBtn,
  mode = "set"
) {
  switch (mode) {
    case "set":
      checkoutBtn.disabled = false;
      checkoutBtn.querySelector("img").src = "assets/images/icons/add-item.svg";
      decreaseQuantityBtn.disabled = false;
      decreaseQuantityBtn.querySelector("img").src =
        "assets/images/icons/minus.svg";
      break;
    case "reset":
      quantity.textContent = "٠";
      quantity.setAttribute("data-quantity", "0");
      checkoutBtn.disabled = true;
      checkoutBtn.querySelector("img").src =
        "assets/images/icons/disabled/add-item.svg";
      decreaseQuantityBtn.disabled = true;
      decreaseQuantityBtn.querySelector("img").src =
        "assets/images/icons/disabled/minus.svg";
      break;
    default:
      console.log("حدث خطأ ما");
  }
}

// Updating the total number of items and adding it to the menu navigation specificly on checkout's bubble  
function updateItemsNumber(listItems, container) {
  let itemsNumber = 0;
  listItems.forEach(({ amount }) => {
    itemsNumber += amount;
  });
  container.setAttribute("data-value", `${getArabicNumbers(itemsNumber)}`);
}

// Increasing amount value function and updating status of quantity buttons
function increaseAmount(quantity, checkoutBtn, decreaseQuantityBtn) {
  updateAmountValue(quantity);
  amountBtnsStatus(quantity, checkoutBtn, decreaseQuantityBtn, "set");
}

// Decreasing amount value function and updating status of quantity buttons
function decreaseAmount(quantity, checkoutBtn, decreaseQuantityBtn) {
  if (parseInt(quantity.getAttribute("data-quantity")) < 2) {
    amountBtnsStatus(quantity, checkoutBtn, decreaseQuantityBtn, "reset");
  } else {
    updateAmountValue(quantity, "decrease");
    amountBtnsStatus(quantity, checkoutBtn, decreaseQuantityBtn, "set");
  }
}

// Increasing items in the cart function and updating the total price and number of items
function increaseCartItems(
  itemsList,
  moreBtn,
  amountTemps,
  index,
  itemsCart,
  orderSummary
) {
  let UID = parseInt(moreBtn.getAttribute("data-uid"));
  itemsList.forEach((item) => {
    if (item.UID === UID) {
      item.amount++;
      amountTemps[index].textContent = `×${getArabicNumbers(item.amount)}`;
    }
  });
  updateItemsNumber(itemsList, itemsCart);
  getTotalPriceTemplate(orderSummary, itemsList);
}

// Decreasing items in the cart function and updating the total price and number of items
function decreaseCartItems(
  itemsList,
  lessBtn,
  amountTemps,
  ind,
  itemsCart,
  cartItemsTemp,
  orderSummary,
  paymentBtn
) {
  let UID = parseInt(lessBtn.getAttribute("data-uid"));
  itemsList.forEach((item) => {
    if (item.UID === UID) {
      if (item.amount == 1) {
        item.amount--;
        getTotalPriceTemplate(orderSummary, itemsList);
        itemsList = removeData(item.UID);
        lessBtn.parentElement.parentElement.remove();
        removeItemModal.show();
        hideModal(removeItemModal);
        if (itemsList.length == 0) {
          clear(itemsList, itemsCart, cartItemsTemp, orderSummary, paymentBtn);
        }
      } else {
        item.amount--;
        amountTemps[ind].textContent = `×${getArabicNumbers(item.amount)}`;
        getTotalPriceTemplate(orderSummary, itemsList);
      }
    }
  });
  updateItemsNumber(itemsList, itemsCart);
}

// Removing an item from the cart function and updating the total price and number of items
function removeItem(
  itemsList,
  removeBtn,
  itemsCart,
  cartItemsTemp,
  orderSummary,
  paymentBtn,
  removeItemModal
) {
  let UID = parseInt(removeBtn.getAttribute("data-remove-id"));
  itemsList = removeData(UID);
  updateItemsNumber(itemsList, itemsCart);
  removeBtn.parentElement.remove();
  getTotalPriceTemplate(orderSummary, itemsList);
  if (itemsList.length == 0) {
    clear(itemsList, itemsCart, cartItemsTemp, orderSummary, paymentBtn);
  }
  hideModal(removeItemModal);
}

// Initializing modals from bootstrap js file
let addItemModal = new bootstrap.Modal("#addItemModal");
let removeItemModal = new bootstrap.Modal("#removeItemModal");
let paymentDoneModal = new bootstrap.Modal("#paymentDoneModal");

// Function to hide modals after a certain delay
function hideModal(modal, delay = 1000) {
  setTimeout(function () {
    modal.hide();
  }, delay);
}

// Function to clear cart and hide modals 
function clear(itemsList, itemsCart, cartItemsTemp, orderSummary, paymentBtn) {
  itemsList = [];
  itemsCart.setAttribute("data-value", "٠");
  cartItemsTemp.textContent = "";
  orderSummary.innerHTML = "";
  paymentBtn.disabled = true;
}