// 이 곳에 정답 코드를 작성해주세요.
import getProductData from './api/getProductData.js';
import ProductList from './component/ProductList.js';

const $productCardGrid = document.getElementById('product-card-grid');
const $openCartBtn = document.getElementById('open-cart-btn');
const $closeCartBtn = document.getElementById('close-cart-btn');
const $shoppingCart = document.getElementById('shopping-cart');
const $backdrop = document.getElementById('backdrop');

const productList = new ProductList($productCardGrid, []);

const toggleCart = () => {
  $shoppingCart.classList.toggle('translate-x-full');
  $shoppingCart.classList.toggle('translate-x-0');
  $backdrop.hidden = !$backdrop.hidden;
};

const fetchProductData = async () => {
  const result = await getProductData();
  console.log(result);
  productList.setState(result);
};

fetchProductData();

$openCartBtn.addEventListener('click', toggleCart);
$closeCartBtn.addEventListener('click', toggleCart);
$backdrop.addEventListener('click', toggleCart);
$productCardGrid.addEventListener('click', toggleCart);
