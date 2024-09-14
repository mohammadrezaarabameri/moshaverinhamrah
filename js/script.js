// تابع منو همبرگر
document.getElementById('menu-icon').addEventListener('click', function() {
    const navLinks = document.getElementById('header-menu');
    navLinks.classList.toggle('active');
  });
  
  // تابع بستن منو همبرگر
  document.getElementById('close-icon').addEventListener('click', function() {
    const navLinks = document.getElementById('header-menu');
    navLinks.classList.remove('active');
  });

  //فراخوانی تعداد مشاوره موفق

  fetch('http://9099071515.ir/crm/untitled/get_count_call.php')
.then(response => response.json())
.then(data => {
    const successfulCalls = data['COUNT(*)'];

    document.getElementById('successful-calls').textContent = `${parseInt(successfulCalls).toLocaleString('fa-IR')}+`;
})
.catch(error => {
    console.error('Error fetching data:', error);
});
