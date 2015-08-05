/**
 * Created by Jo on 02/08/2015.
 */
$(function(){
    //the array of quiz games to play
    var quizzes = [];

    //questions is an array of type Question
    function Quiz(name, questions) {
        this.name = name;
        this.questions = questions;
    }

    function Question(question, correctAnswer, incorrect_answer1, incorrect_answer2){
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.incorrect_answer1 = incorrect_answer1;
        this.incorrect_answer2 = incorrect_answer2;
    }

    var quizName = "";
    var question = $("#question").val();
    var correct_answer = $("#correct_answer").val();
    var incorrect_answer1 = $("#incorrect_answer1").val();
    var incorrect_answer2 = $("#incorrect_answer2").val();
    var questions = []; // an array of type Question
    var showAlert = false;

    //displays create a quiz
    $("#create_quiz_button").on({
            click: function(){
                $("#create_quiz").css("display", "block");
            }
        });

    //adds a question to the quiz under creation
    $("#add_question").click(function(event){
        event.preventDefault();
        checkAllFieldsComplete();
        if(showAlert === true){
            showAlert = false; //reset
            alert("Please complete the highlighted fields.")
        }else{
            if(questions.length === 0){
                quizName = $("#quiz_name").val();
            }
            addQuestion();
            $("#quizName_div").hide();
            $("#create_quiz_form").children("input").val("");
        }
    });

    //submits a new quiz to the quizzes array
    $("#submit_quiz").click(function(event){
        event.preventDefault();
        checkAllFieldsComplete();
        if(showAlert === true){
            showAlert = false; //reset
            alert("Please complete the highlighted fields.")
        }else {
            if(questions.length === 0){
                quizName = $("#quiz_name").val();
            }
            addQuestion();
            quizzes.push(new Quiz(quizName, questions.slice(0)));
            $("#quizName_div").show();
            $("#create_quiz").css("display", "none");
            $("#create_quiz_form").children("input").val("");
            questions = [];
            alert("Quiz " + quizName + " submitted!");
            $("#quiz_name").val("");
            quizName = "";
        }
    });

    //adds a new question to the quiz being created
    var addQuestion = function(){
        questions.push(new Question(question, correct_answer, incorrect_answer1, incorrect_answer2));
    };

    //checks if all fields for the create quiz form are completed -> if not highlights empty fields and sets var showAlert to true
    var checkAllFieldsComplete = function(){
        var emptyFields = $("input:text").filter(function(){ return this.value == "";});
        var nonEmptyFields = $("input:text").filter(function(){ return this.value != "";});
        //set non empty fields to white (could previously have been set to red)
        nonEmptyFields.each(function(){
            $(this).css("background-color", "#ffffff");
        });
        //set empty fields to red and set showAlert to true
        emptyFields.each(function(){
            $(this).css("background-color", "red");
            showAlert = true;
        });
    };


});