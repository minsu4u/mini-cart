// 이 곳에 정답 코드를 작성해주세요.
import getProductData from './api/getProductData.js';
import ProductList from './component/ProductList.js';
import CartList from './component/CartList.js';

const $productCardGrid = document.getElementById('product-card-grid');
const $openCartBtn = document.getElementById('open-cart-btn');
const $closeCartBtn = document.getElementById('close-cart-btn');
const $shoppingCart = document.getElementById('shopping-cart');
const $backdrop = document.getElementById('backdrop');
const $cartList = document.getElementById('cart-list');
const $paymentBtn = document.getElementById('payment-btn');

let productData = [];
const initialCartState = localStorage.getItem('cartState')
  ? JSON.parse(localStorage.getItem('cartState'))
  : [];
const productList = new ProductList($productCardGrid, []);
// localStorage를 체크 > 값이 있으면 > 그걸 초기값
const cartList = new CartList($cartList, initialCartState);

const toggleCart = () => {
  $shoppingCart.classList.toggle('translate-x-full');
  $shoppingCart.classList.toggle('translate-x-0');
  $backdrop.hidden = !$backdrop.hidden;
};

const fetchProductData = async () => {
  const result = await getProductData();
  productList.setState(result);
  productData = result;
};

const addCartItem = (e) => {
  const clickedProduct = productData.find(
    (product) => product.id == e.target.dataset.productid
  );
  if (!clickedProduct) return;
  cartList.addCartItem(clickedProduct);
  toggleCart();
};

const modifyCartItem = (e) => {
  const currentProductId = parseInt(e.target.closest('li').id);
  switch (e.target.className) {
    case 'increase-btn':
      cartList.increaseCartItem(currentProductId);
      break;
    case 'decrease-btn':
      cartList.decreaseCartItem(currentProductId);
      break;
    case 'remove-btn':
      cartList.removeCartItem(currentProductId);
      break;
    default:
      return;
  }
};

const saveToLocalStorage = () => {
  // 장바구니 데이터 저장
  cartList.saveToLocalStorage();
};

fetchProductData();

$openCartBtn.addEventListener('click', toggleCart);
$closeCartBtn.addEventListener('click', toggleCart);
$backdrop.addEventListener('click', toggleCart);
$productCardGrid.addEventListener('click', addCartItem);
$cartList.addEventListener('click', modifyCartItem);
$paymentBtn.addEventListener('click', saveToLocalStorage);
