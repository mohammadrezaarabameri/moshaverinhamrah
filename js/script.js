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


//فراخوانی نظرات کاربران

fetch('http://9099071515.ir/crm/untitled/get_all_comments.php')
.then(response => response.json())
.then(data => {
    const filteredComments = data.filter(comment => 
        comment.name && comment.matn && comment.date && comment.owner_name && comment.owner_pic && comment.owner_departeman
    );
    
    function createCommentItem(comment) {
        const commentItem = document.createElement('div');
        commentItem.classList.add('comment-item');
        

        const userQuestionDiv = document.createElement('div');
        userQuestionDiv.classList.add('user-question');
        
        const userImg = document.createElement('img');
        userImg.src = './images/person_13924070.png';
        userQuestionDiv.appendChild(userImg);
        
        const userInfoDiv = document.createElement('div');
        userInfoDiv.classList.add('user-info');
        
        const userNameLink = document.createElement('a');
        userNameLink.href = '#';
        userNameLink.textContent = comment.name;
        
        const userDateSpan = document.createElement('span');
        userDateSpan.textContent = comment.date;
        
        userInfoDiv.appendChild(userNameLink);
        userInfoDiv.appendChild(userDateSpan);
        
        userQuestionDiv.appendChild(userInfoDiv);
        
        const userComment = document.createElement('p');
        userComment.textContent = comment.matn;
        
        const adminAnswerDiv = document.createElement('div');
        adminAnswerDiv.classList.add('admin-answer');
        
        const adminImg = document.createElement('img');
        adminImg.src = `http://9099071515.ir/crm/${comment.owner_pic}`;
        adminAnswerDiv.appendChild(adminImg);
        
        const answerInfoDiv = document.createElement('div');
        answerInfoDiv.classList.add('answer-info');
        
        const answerNameLink = document.createElement('a');
        answerNameLink.href = '#';
        
        const answerNameH3 = document.createElement('h3');
        answerNameH3.textContent = comment.owner_name;
        
        const answerDepartemanP = document.createElement('p');
        answerDepartemanP.textContent = `مشاور ${comment.owner_departeman}`;
        
        answerNameLink.appendChild(answerNameH3);
        answerNameLink.appendChild(answerDepartemanP);
        answerInfoDiv.appendChild(answerNameLink);
        adminAnswerDiv.appendChild(answerInfoDiv);
        
        commentItem.appendChild(userQuestionDiv);
        commentItem.appendChild(userComment);
        commentItem.appendChild(document.createElement('hr'));
        commentItem.appendChild(adminAnswerDiv);
        
        return commentItem;
    }


    function displayComments(startIndex) {
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = '';
        
        const endIndex = startIndex + 3;
        const commentsToShow = filteredComments.slice(startIndex, endIndex);
        
        commentsToShow.forEach(comment => {
            const commentItem = createCommentItem(comment);
            commentsContainer.appendChild(commentItem);
        });
    }

    let currentIndex = 0;
    displayComments(currentIndex);
    
    setInterval(() => {
        currentIndex = (currentIndex + 3) % filteredComments.length;
        displayComments(currentIndex);
    }, 3000);
})
.catch(error => console.error('Error fetching comments:', error));