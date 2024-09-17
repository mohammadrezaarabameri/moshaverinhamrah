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
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    const successfulCalls = data['COUNT(*)'] || 0;

    document.getElementById('successful-calls').textContent = `${parseInt(successfulCalls).toLocaleString('fa-IR')}+`;
})
.catch(error => {
    console.error('Error fetching data:', error);
});

//فراخوانی تعداد مشاوران

fetch('http://9099071515.ir/crm/untitled/get_count_consultants.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const numberConsultan = data['COUNT(*)'] || 0;
        const consultantElements = document.getElementsByClassName('number-consultant');

        Array.from(consultantElements).forEach(element => {
            element.textContent = `${parseInt(numberConsultan).toLocaleString('fa-IR')}+ مشاور`;
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// فراخوانی دپارتمان های مشاوره

    fetch('http://9099071515.ir/crm/untitled/get_all_expertise.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('categories-container');
        
        data.forEach(expertise => {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('categories');
            
            const link = document.createElement('a');
            link.href = expertise.link;

            const img = document.createElement('img');
            img.src = `http://9099071515.ir/crm/${expertise.pic}`;
            img.alt = expertise.name;
            link.appendChild(img);

            const h3 = document.createElement('h3');
            h3.textContent = expertise.name;
            link.appendChild(h3);

            categoryDiv.appendChild(link);

            const p = document.createElement('p');
            p.textContent = `50+ متخصص`;
            categoryDiv.appendChild(p);

            container.appendChild(categoryDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
