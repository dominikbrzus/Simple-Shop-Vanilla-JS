import {
    productsForMan
} from './products.js'
import {
    highestRated,
    highestSort,
    lowestSort
} from './sortList.js'

export const productsSection = document.querySelector('.main__products-area')
const btnTopCart = document.querySelector('.top__cart-area')
const shoppingCart = document.querySelector('.shopping-cart')
const btnCartClose = document.querySelector('.shopping-cart__close')
let amount = document.querySelector('.top__amount')
const cart = document.querySelector('.shopping-cart__products-area')
const logo = document.querySelector('.top__logo')
const selectOption = document.querySelector('.main__select')
let cartArray = []
let sum = 0;
amount.innerHTML = sum;

// Function responsible for generate products and fetch data from localStorage.
function render() {
    let parseCartArray = window.JSON.parse(localStorage.getItem('productsList'))
    let parseAmount = window.JSON.parse(localStorage.getItem('amount'))

    if (typeof (Storage) !== "undefined" && parseCartArray !== null) {
        cartArray = parseCartArray
        sum = parseAmount
        amount.innerHTML = sum;
    } else if (parseCartArray === null) {
        cartArray = []
        sum = 0;
        amount.innerHTML = sum;
    }
    showSuits()
}

// Function responsible for update products cart.
function updateCart() {
    cart.innerHTML = ``

    if (cartArray.length === 0) {
        cart.innerHTML = `<p style="text-align: center; font-size: 20px;">Your cart is empty</p>`
    } else {
        cartArray.forEach(product => {
            const {
                id,
                name,
                price,
                rating,
                img,
            } = product

            product = `<div class="shopping-cart__product" id="${id}">
        <img src="${img}" class="shopping-cart__img">
        <h3 class="shopping-cart__product-name">${name}</h3>
        <div class="main__stars-area shopping-cart__stars-area">
        <i class="fa-solid fa-star main__stars ${rating >= 1 ? 'color-orange' 
        : ''}"></i><i class="fa-solid fa-star main__stars ${rating >= 2 ? 'color-orange' : ''}"></i><i
            class="fa-solid fa-star main__stars ${rating >= 3 ? 'color-orange' 
            : ''}"></i><i class="fa-solid fa-star main__stars ${rating >= 4 ? 'color-orange' : ''}"></i><i
            class="fa-solid fa-star main__stars ${rating >= 5 ? 'color-orange' 
            : ''}"></i>
        </div>
        <p class="shopping-cart__price">Price: ${price}$</p>
        <button class="shopping-cart__btn-delete shopping-cart__checkout-btn">Remove from Cart</button>
        </div> `
            cart.innerHTML += product
        })
        cart.innerHTML += `<div class="shopping-cart__line"></div>
    <h4 class="shopping-cart__total-price-all">Total price is ${sum}$</h4>
    <button class="shopping-cart__checkout-btn">Checkout</button>`
    }
    removeProductFromArr()
}

// This function allows remove a product from cart.
function removeProductFromArr() {
    const removeFromCartBtns = document.querySelectorAll('.shopping-cart__btn-delete')
    removeFromCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parseElementIDToNumber = parseInt(btn.parentElement.id)
            const filterFunctionProduct = cartArray.filter(el => el.id !== parseElementIDToNumber)
            cartArray = filterFunctionProduct
            updateCart()
            const addAmountProducts = cartArray.reduce((acc, obj) => {
                return acc + obj.price
            }, 0)
            sum = addAmountProducts
            amount.innerHTML = sum;
            updateCart()
            window.localStorage.setItem('productsList', JSON.stringify(cartArray))
            window.localStorage.setItem('amount', JSON.stringify(sum))
        })

    })
}

// Function allows open the cart. 
function openShoppingCart() {
    if (shoppingCart.classList.contains('hidden')) {
        shoppingCart.classList.remove('hidden')
        updateCart()
    } else if (!shoppingCart.classList.contains('hidden')) {
        shoppingCart.classList.add('hidden')
    }
    btnCartClose.addEventListener('click', () => {
        shoppingCart.classList.add('hidden')
    })
}

//Function responsible for generate products data (img,ID, name etc.).
function showSuits() {
    const filterByID = productsForMan.sort((a, b) => {
        return a.id - b.id
    })
    productsSection.innerHTML = ''
    filterByID.forEach(product => {
        const {
            id,
            name,
            price,
            rating,
            img,
        } = product
        product = `<div class="main__product" id="${id}">
    <img src="${img}" class="main__img">
    <h3 class="main__name-product">${name}</h3>
    <div class="main__stars-area">
        <i class="fa-solid fa-star main__stars ${rating >= 1 ? 'color-orange' 
        : ''}"></i><i class="fa-solid fa-star main__stars ${rating >= 2 ? 'color-orange' : ''}"></i><i
            class="fa-solid fa-star main__stars ${rating >= 3 ? 'color-orange' 
            : ''}"></i><i class="fa-solid fa-star main__stars ${rating >= 4 ? 'color-orange' : ''}"></i><i
            class="fa-solid fa-star main__stars ${rating >= 5 ? 'color-orange' 
            : ''}"></i>
    </div>
    <p class="main__price">${price}$</p>
    <button class="main__btn">Add to cart</button>
</div>`
        productsSection.innerHTML += product
    })
    addToCart()
}

// Generate random number for ID.
const randomNumber = () => {
    return Math.floor(Math.random() * 10000000)
}

// Add a product to cart.
export function addToCart() {
    document.querySelectorAll('.main__btn').forEach((btn) => {
        let parseElementIDToNumber = parseInt(btn.parentElement.id)
        btn.addEventListener('click', () => {
            let addProductToCart = productsForMan.find(el => el.id === parseElementIDToNumber)
            cartArray.push(addProductToCart)
            const changeIDinArr = cartArray.map(el => {
                if (el.id === el.id) return {
                    ...el,
                    id: randomNumber()
                }
                return el
            })

            cartArray = changeIDinArr
            const addAmountProducts = cartArray.reduce((acc, obj) => {
                return acc + obj.price
            }, 0)
            sum = addAmountProducts
            amount.innerHTML = sum;
            window.localStorage.setItem('productsList', JSON.stringify(cartArray))
            window.localStorage.setItem('amount', JSON.stringify(sum))
        })
    })
}

// Event Listeners.
window.addEventListener('DOMContentLoaded', render)
btnTopCart.addEventListener('click', openShoppingCart)
logo.addEventListener('click', render)
selectOption.addEventListener('change', (e) => {
    if (e.target.value === 'Default') showSuits()
    else if (e.target.value === 'Hight to low (price)') highestSort()
    else if (e.target.value === 'Low to high (price)') lowestSort()
    else if (e.target.value === 'Highest rated') highestRated()
})