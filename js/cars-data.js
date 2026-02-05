// بيانات سيارات وهمية للعرض
const carsData = [
    {
        id: 1,
        title: "رينو ميجان 2018 توماتيك",
        price: 85000,
        currency: "درهم",
        city: "الدار البيضاء",
        brand: "رينو",
        model: "ميجان",
        year: 2018,
        fuel: "ديزل",
        transmission: "أتوماتيك",
        mileage: 75000,
        description: "سيارة في حالة جيدة جداً، صيانة دورية في الوكالة، بدون حوادث",
        phone: "06 12 34 56 78",
        images: ["car1.jpg"],
        date: "2023-10-15"
    },
    {
        id: 2,
        title: "داسيا لوجان 2020",
        price: 65000,
        currency: "درهم",
        city: "الرباط",
        brand: "داسيا",
        model: "لوجان",
        year: 2020,
        fuel: "بنزين",
        transmission: "مانوال",
        mileage: 45000,
        description: "سيارة جديدة شبه، أول مالك، كاملة المواصفات",
        phone: "06 23 45 67 89",
        images: ["car2.jpg"],
        date: "2023-10-14"
    },
    {
        id: 3,
        title: "بيجو 308 2019",
        price: 95000,
        currency: "درهم",
        city: "مراكش",
        brand: "بيجو",
        model: "308",
        year: 2019,
        fuel: "ديزل",
        transmission: "أتوماتيك",
        mileage: 60000,
        description: "فول أوبشن، كاميرا خلفية، شاشة ملاحة",
        phone: "06 34 56 78 90",
        images: ["car3.jpg"],
        date: "2023-10-13"
    },
    {
        id: 4,
        title: "مرسيدس C200 2017",
        price: 180000,
        currency: "درهم",
        city: "فاس",
        brand: "مرسيدس",
        model: "C200",
        year: 2017,
        fuel: "بنزين",
        transmission: "أتوماتيك",
        mileage: 80000,
        description: "فئة AMG، جلد، كاملة المواصفات",
        phone: "06 45 67 89 01",
        images: ["car4.jpg"],
        date: "2023-10-12"
    },
    {
        id: 5,
        title: "سيتروين C3 2021",
        price: 75000,
        currency: "درهم",
        city: "طنجة",
        brand: "سيتروين",
        model: "C3",
        year: 2021,
        fuel: "بنزين",
        transmission: "مانوال",
        mileage: 30000,
        description: "سيارة عائلية، اقتصادية في الاستهلاك",
        phone: "06 56 78 90 12",
        images: ["car5.jpg"],
        date: "2023-10-11"
    },
    {
        id: 6,
        title: "بي إم دبليو X1 2016",
        price: 150000,
        currency: "درهم",
        city: "أكادير",
        brand: "بي إم دبليو",
        model: "X1",
        year: 2016,
        fuel: "ديزل",
        transmission: "أتوماتيك",
        mileage: 90000,
        description: "دبل، فتحة سقف، كاملة المواصفات",
        phone: "06 67 89 01 23",
        images: ["car6.jpg"],
        date: "2023-10-10"
    }
];

// دالة لعرض السيارات
function displayCars(cars = carsData) {
    const container = document.getElementById('cars-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    cars.forEach(car => {
        const carCard = `
            <div class="car-card" data-id="${car.id}">
                <img src="images/cars/${car.images[0] || 'default-car.jpg'}" alt="${car.title}" class="car-img">
                <div class="car-info">
                    <h3 class="car-title">${car.title}</h3>
                    <div class="car-details">
                        <span>${car.year}</span>
                        <span>${car.mileage.toLocaleString()} كم</span>
                        <span>${car.fuel}</span>
                    </div>
                    <div class="car-price">${car.price.toLocaleString()} ${car.currency}</div>
                    <span class="car-city">${car.city}</span>
                </div>
            </div>
        `;
        container.innerHTML += carCard;
    });
    
    // إضافة حدث النقر للبطاقات
    document.querySelectorAll('.car-card').forEach(card => {
        card.addEventListener('click', function() {
            const carId = this.getAttribute('data-id');
            window.location.href = `car-details.html?id=${carId}`;
        });
    });
}

// دالة للفلترة
function filterCars() {
    const city = document.getElementById('city')?.value;
    const brand = document.getElementById('brand')?.value;
    const price = document.getElementById('price')?.value;
    
    const filteredCars = carsData.filter(car => {
        if (city && car.city !== getCityName(city)) return false;
        if (brand && car.brand !== getBrandName(brand)) return false;
        if (price) {
            const [min, max] = price.split('-');
            if (max === '+') {
                if (car.price < parseInt(min)) return false;
            } else {
                if (car.price < parseInt(min) || car.price > parseInt(max)) return false;
            }
        }
        return true;
    });
    
    displayCars(filteredCars);
}

// دوال مساعدة
function getCityName(value) {
    const cities = {
        'casablanca': 'الدار البيضاء',
        'rabat': 'الرباط',
        'marrakech': 'مراكش',
        'fes': 'فاس',
        'tanger': 'طنجة'
    };
    return cities[value] || value;
}

function getBrandName(value) {
    const brands = {
        'renault': 'رينو',
        'dacia': 'داسيا',
        'peugeot': 'بيجو',
        'citroen': 'سيتروين',
        'mercedes': 'مرسيدس',
        'bmw': 'بي إم دبليو'
    };
    return brands[value] || value;
}

// حفظ بيانات سيارة جديدة
function saveCar(carData) {
    const cars = JSON.parse(localStorage.getItem('morocco-cars')) || carsData;
    carData.id = cars.length + 1;
    carData.date = new Date().toISOString().split('T')[0];
    cars.push(carData);
    localStorage.setItem('morocco-cars', JSON.stringify(cars));
    return carData;
}

// جلب سيارة بواسطة ID
function getCarById(id) {
    const cars = JSON.parse(localStorage.getItem('morocco-cars')) || carsData;
    return cars.find(car => car.id === parseInt(id));
}

// تحميل البيانات عند فتح الصفحة
document.addEventListener('DOMContentLoaded', function() {
    displayCars();
    
    // إضافة أحداث للفلترة
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', filterCars);
    }
    
    // القائمة المتحركة للجوال
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});
