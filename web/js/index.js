//riot.mount('exercice', {title: 'exercice', page: 'exercice#'});
//riot.mount('error', {title: 'error', page: 'error#'});

$('body').on('click', 'a', function () {
    var exo = $(this).attr('data-exo');
    console.log('dimi = ', exo);
    unExo(exo);
})


const URL = "http://localhost:8080";

function unExo(exo) {
    console.log('dDATDATDAT = ', exo);
    $.ajax({
        type: 'POST',
        url: '/getExercise.json',
        data: JSON.stringify({name: exo}),
        success: function (retour) {
            console.log('PANDA = ', retour);
            riot.mount('exercice', {title: retour.nickname, page: 'exercice', exo: retour.summary, tag: retour.name});
            riot.mount('summary', {page: 'summary#'});
        }

    });

}
function recuperationExcercices() {

    $.ajax({
        type: 'POST',
        url: '/getAllExercices.json',
        success: function (retour) {
            console.log('all exos = ', retour);
            var bloc = retour.exercises;
            var exos = [];
            for (var i in bloc) {
                exos.push(bloc[i].exercises);
            }
            riot.mount('summary', {title: ' exercices à correction automatisée', page: 'summary', bloc: bloc});
  
        }

    });
}

function recupereUserConnected() {
    try {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", URL + "/", false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4) {
                let response = JSON.parse(xhttp.responseText);
                console.log(response);
            }
        }
        xhttp.send();
    } catch (err) {
        console.log(err);
        alert("Vous n'êtes pas connecté !");
    }
}

function connexion() {
    try {
        let user = new Object();
        user.pseudo = 'didjo972@gmail.com';
        user.password = 'aurelie77';
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", URL + "/login.json", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4) {
                console.log('response = ', xhttp.responseText);
                let response = JSON.parse(xhttp.responseText);
            }
        }
        console.log(user);
        xhttp.send(JSON.stringify(user));
    } catch (err) {
        console.log(err);
    }
}



function connexion() {
    $.ajax({
        type: 'POST',
        url: '/login.json',
        data: '{"user":{"pseudo":"didjo972@gmail.com","password":"aurelie77"}}',
        success: function (msg) {
            console.log('msg = ', msg);
            var exos = recuperationExcercices();
            console.log('exos = ', exos);
        }

    });
}

$('body').on('click','#btnRetour', function () {
    console.log('bgfuidgfzui');
    recuperationExcercices()
});
$('body').on('click', '#evaluer',function () {
    var tag = $(this).attr('data-tag');
    console.log('tag = ',tag);
    var submit = $(this).parent().prev().children().html();
 
        var obj = {
            name: tag,
            code : submit   
        }
             $.ajax({
        type: 'POST',
        url: '/submitExercise.json',
        data: submit,
        success: function (msg) {
            console.log('fzebsyufeugfeui = ', msg);
                 }

    });
    
 

});

connexion();


