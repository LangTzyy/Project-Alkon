// Fade-up animation
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});
fadeElements.forEach(el => observer.observe(el));

// INDEX PAGE - toggle password
const togglePassword = document.getElementById('togglePassword');
if (togglePassword) {
  const passwordInput = document.getElementById('password');
  const icon = togglePassword.querySelector("i");
  togglePassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      passwordInput.type = 'password';
      icon.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
}

// INDEX PAGE - login form dummy
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    if (email === "rsudgenteng@banyuwangikab.go.id" && password === "12345678") {
      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil!',
        text: 'Anda akan diarahkan ke Dashboard.',
        showConfirmButton: false,
        timer: 2000
      }).then(() => { window.location.href = "pages/dashboard.html"; });
    } else {
      Swal.fire({ icon: 'error', title: 'Login Gagal', text: 'Email atau password salah!', confirmButtonColor: '#3b7bbf' });
    }
  });
}

// DASHBOARD PAGE - chart
if (document.getElementById('barChart')) {
  const ctx = document.getElementById('barChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
      datasets: [{
        label: 'Pemesanan',
        data: [15,48,60,30,47,52,50,58,60,49,59,53],
        backgroundColor: '#A6C28F',
        borderWidth: 0,
        barThickness: 15
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            // hanya garis horizontal
            display: true,
            drawBorder: false,
            color: '#A39E9E',
            lineWidth: 1,
            drawTicks: false
          },
          border: {
            display: false   // ⬅️ hilangkan garis vertikal sumbu Y
          },
          ticks: {
            stepSize: 10,
            color: '#333',
            font: { family: 'Inter', size: 14, weight: 'bold' },
            padding: 10,
            callback: function (value) {
              const allowed = [0, 10, 20, 30, 40, 50, 60];
              return allowed.includes(value) ? value : '';
            }
          },
          min: 0,
          max: 60
        },
        x: {
          grid: {
            display: false,
            drawTicks: false,
            drawOnChartArea: false
          },
          border: {
            display: false   // ⬅️ hilangkan garis horizontal di bawah chart
          },
          ticks: {
            color: '#333',
            font: { family: 'Inter', size: 14, weight: 'bold' }
          }
        }
      }
    }
  });
}

// PEMESANAN PAGE - tab switch
const tabs = document.querySelectorAll(".tabs .tab");
const contents = document.querySelectorAll(".tab-content");
if (tabs.length > 0) {
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.style.display = "none");
      tab.classList.add("active");
      const target = tab.dataset.target;
      document.getElementById(target).style.display = "block";
    });
  });
}

// STOK ALKON PAGE - show month
if (document.getElementById("dateInfo")) {
  const monthNames = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  const now = new Date();
  document.getElementById("dateInfo").textContent = `${monthNames[now.getMonth()]}`;
}

// === LOAD SIDEBAR ===
document.addEventListener("DOMContentLoaded", () => {
  const sidebarContainer = document.getElementById("sidebar-container");
  if (sidebarContainer) {
    fetch("../sidebar.html")
      .then(response => response.text())
      .then(html => {
        sidebarContainer.innerHTML = html;

        // setelah sidebar dimuat → tandai menu aktif
        const currentPage = window.location.pathname.split("/").pop(); 
        const links = sidebarContainer.querySelectorAll("nav a");
        
        links.forEach(link => {
          if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
          }
        });
      })
      .catch(err => console.error("Gagal load sidebar:", err));
  }
});
