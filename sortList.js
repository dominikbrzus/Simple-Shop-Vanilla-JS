import {
    productsForMan
} from './products.js'

import {productsSection} from './app.js'
import { addToCart } from './app.js'


// Sort products from the highest price to the lowest price.
function highestSort() {
    const newHighestList = productsForMan.sort((a, b) => {
        return a.price - b.price
    }).reverse()

    productsSection.innerHTML = ''
    newHighestList.forEach(product => {
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

// Sort products from the lowest price to the highest price.
function lowestSort() {
    const newLowestList = productsForMan.sort((a, b) => {
        return a.price - b.price
    })

    productsSection.innerHTML = ''
    newLowestList.forEach(product => {
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

//Sort products from the top rated.
function highestRated() {
    const ratingList = productsForMan.sort((a, b) => {
        return b.rating - a.rating
    })
    productsSection.innerHTML = ''
    ratingList.forEach(product => {
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

export {
    highestSort,
    lowestSort,
    highestRated
}