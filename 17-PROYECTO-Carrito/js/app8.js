let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartList = document.querySelector('#lista-carrito tbody');
const clearCartBtn = document.getElementById('vaciar-carrito');
const addCartBtns = document.querySelectorAll('.agregar-carrito');

const addCourseToCart = (course) => {
    const exists = cart.some(item => item.id === course.id);
    if (exists) {
        cart = cart.map(item => {
            if (item.id === course.id) {
                item.quantity++;
            }
            return item;
        });
    } else {
        cart.push({ ...course, quantity: 1 });
    }
    updateCart();
};

const displayCart = () => {
    cartList.innerHTML = '';
    cart.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${course.image}" width="50"></td>
            <td>${course.name}</td>
            <td>${course.price}€</td>
            <td>${course.quantity}</td>
            <td><a href="#" class="remove-course" data-id="${course.id}">X</a></td>
        `;
        cartList.appendChild(row);
    });
    addRemoveEventListeners(); 
};

const updateCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
};

const addRemoveEventListeners = () => {
    const removeCourseBtns = document.querySelectorAll('.remove-course');
    removeCourseBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const courseId = parseInt(btn.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== courseId); 
            updateCart(); 
        });
    });
};

addCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const courseCard = btn.closest('.card');
        const courseId = btn.getAttribute('data-id');
        const courseName = courseCard.querySelector('h4').textContent;
        const coursePrice = courseCard.querySelector('.precio').textContent.split(' ')[0];
        const courseImage = courseCard.querySelector('.imagen-curso').src;

        const course = {
            id: parseInt(courseId),
            name: courseName,
            price: parseFloat(coursePrice),
            image: courseImage,
        };

        addCourseToCart(course);
    });
});

clearCartBtn.addEventListener('click', () => {
    cart = [];
    updateCart();
});

displayCart();
