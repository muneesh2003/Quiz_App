const container=document.querySelector('.container');
const questionBox=document.querySelector('.question');
const choiceBox=document.querySelector('.choice');
const btn=document.querySelector('.btn');
const scrCard=document.querySelector('.scrCard');
const alert=document.querySelector('.alert');
const startbtn=document.querySelector('.startbtn');
const timer=document.querySelector('.timer');


const quiz=[
    {
        question:"How to insert an image in HTML?",
        choice:["<img href = jtp.png />",
            "<img url = jtp.png />",
            "<img link = jtp.png/>",
            "<img src = jtp.png/>"],
            answer:"<img src = jtp.png/>"
    },
    {
        question:"Which of the following tag is used to define options in a drop-down selection list?",
        choice:["<select>",
            "<list>",
            "<dropdown>",
            "<option>"],
            answer:"<option>"

    },
    {
        question:"In JavaScript, what is a block of statement?",
        choice:["Conditional block",
            "block that combines a number of statements into a single compound statement",
            "both conditional block and a single statement",
            "block that contains a single statement"],
            answer:"block that combines a number of statements into a single compound statement"
    },
    {
        question:"The function and var are known as:",
        choice:["Keywords",
            "Data types",
            " Declaration statements",
            "Prototypes"],
             answer:" Declaration statements"
    },
    {
        question:"Which one of the following is the correct way for calling the JavaScript code ",
        choice:["Preprocessor",
            "Triggering Event",
            "RMI",
            "Function/Method" ],
            answer:"Function/Method"
    }
];

let curquestion=0;
let score=0;
let quizOver=false;
let timeleft=15;
let timerid=null;

const checkAnswer=()=>
{
    const selected=document.querySelector('.choice.select');
    if(selected.textContent===quiz[curquestion].answer)
    {
        
        displayAlert("Correct Answer");
        score++;
    }
    else 
    {
        displayAlert(` wrong answer ! ${quiz[curquestion].answer} is Right answer `);
    }
    timeleft=15;
    curquestion++;
    if(curquestion<quiz.length)
        { 
            showQuestion();
        }
        else 
        {
            showscore();
            stopTimer();
           
           
        }
}

//arrow function to show questions 
const showQuestion=()=>
{
    const questionDetail=quiz[curquestion];
    questionBox.textContent=questionDetail.question;
    choiceBox.textContent="";
    for(let i=0;i<questionDetail.choice.length;i++)
    {
        const currentchoice=questionDetail.choice[i];
        const choicediv=document.createElement('div');
        choicediv.textContent=currentchoice;
        choicediv.classList.add('choice');
        choiceBox.appendChild(choicediv);
        choicediv.addEventListener('click',()=>
        {
            if(choicediv.classList.contains('select'))
            {
                choicediv.classList.remove('select');
            }
            
            else 
            {
                choicediv.classList.add('select');
            }

        });
    }
    if(curquestion<quiz.length)
    {
        starttimer();
    }
}

//function to start Timer
const starttimer=()=>
{
    clearInterval(timerid);
    timer.textContent=timeleft;
    const countdown =()=>
    {
        timeleft--;
        timer.textContent=timeleft;
        
        if(timeleft===0)
        {
            const confirmUser=confirm("Time up ? Do you want to start quiz again");
            if(confirmUser)
            {
                timeleft=15;
                startQuiz();
            }
            else 
            {
                startbtn.style.display="block";
                container.style.display="none";
                timer.textContent="";
                
                    return;
            }
        }
       
    }
    timerid=setInterval(countdown,1000);

}

//function to shuffle question 
const shuffleQuestion=()=>
{
    for(let i=quiz.length-1;i>0;i--)
    {
        const j=Math.floor(Math.random()*(i+1));
        [quiz[i],quiz[j]]=[quiz[j],quiz[i]];
    }
    curquestion=0;
    showQuestion();
}
//function to show score
const showscore=()=>
{
    // to remove the question and choice box 
    questionBox.textContent= "";
    choiceBox.textContent= "";
    scrCard.textContent=`you scored markes ${score} out of ${quiz.length}`;
    displayAlert("you have completed this quiz");
    btn.textContent="play Again";
    quizOver=true;
    timer.style.display="none";
}

// function to display alert 
 const displayAlert =(msg)=>
 {
    alert.style.display="block";
    alert.textContent=msg;
    setTimeout(()=>
    {
        alert.style.display="none"; 
    },2000);
 }

 const stopTimer=()=>
 {
    clearInterval(timerid);
 }

 //function to start Quiz
 const startQuiz =()=>
 {
    timeleft=15;
    timer.style.display="flex";
    shuffleQuestion();


 }

// add event listener to startbtn 
startbtn.addEventListener('click',()=>
{
    startbtn.style.display="none";
    container.style.display="block";
    startQuiz();
});

//adding event Listener to start button
btn.addEventListener('click',()=>
{ scrCard.textContent="";
    const selectchoice=document.querySelector('.choice.select');
    if(!selectchoice && btn.textContent==="Next")
    {
        
        displayAlert("select your choice")
        return;
    }
    if(quizOver)
    {
        
        btn.textContent="Next";
        scrCard.textContent="";
        curquestion=0;
        quizOver=false;
        score=0;
        startQuiz();
        
    }

    else 
    {
        checkAnswer();
    }
    

});
