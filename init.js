var http = require('http');
var fs = require('fs');
var path = require('path');
var riot = require('./web/bower_components/riot/riot.min.js');
var CodeGradX = require('codegradxlib');

var server = http.createServer(function (request, response) {

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './web/html/index.html';
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    if (contentType === 'application/json') {
        response.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Origin': '*' });
        if (filePath == './getAllExercices.json') {
            getAllExercices(response);
        } else if (filePath == './login.json') {
            var body = [];
            var data = '';
            var userReceive;
            request.on('data', function(chunk) {
                console.log('chunk = ',chunk)
                body.push(chunk);
            }).on('end', function() {
               
                data = Buffer.concat(body).toString();
              console.log('data = ',data);
                userReceive = JSON.parse(data);
                console.log('userReceive = ',userReceive);
                login(response, userReceive);
            });
        } else if (filePath == './getCurrentUser.json') {
            getCurrentUser(response);
        } else if (filePath == './getExercise.json') {
            var bodyEx = [];
            var dataEx = '';
            var exerciseReceive;
            request.on('data', function(chunk) {
                console.log('chunk = ',chunk)
                bodyEx.push(chunk);
            }).on('end', function() {
                dataEx = Buffer.concat(bodyEx).toString();
                console.log('data = ',dataEx);
                exerciseReceive = JSON.parse(dataEx);
                console.log('exerciseReceive = ',exerciseReceive);
                getExercise(response, exerciseReceive);
            });
        } else if (filePath == './submitExercise.json') {
           var bodySubmit = [];
           var dataSubmit = '';
           var submit;
           request.on('data', function(chunk) {
               bodySubmit.push(chunk);
               console.log(bodySubmit);
           }).on('end', function() {
               dataSubmit = Buffer.concat(bodySubmit).toString();
               submit = JSON.parse(dataSubmit);
               submitExercise(response, submit);
           });
       }
    } else {
        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    fs.readFile('./Vue/404.html', function(error, content) {
                        response.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Origin': '*' });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    response.end(); 
                }
            } else {
                response.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Origin': '*' });
                response.end(content, 'utf-8');
            }
        });
    }
});
console.log('Server running at http://127.0.0.1:8080/');

server.listen(8080);

/*(new CodeGradX.State())
// now authenticate with your own login then password:
.getAuthenticatedUser('didjo972@gmail.com', 'aurelie77')
// select the `free` campaign that lists a number of exercises in
// various programming languages. The `free` campaign is freely
// available for everybody.
.then(function (user) {
    console.log("Hello " + user.email);
    user.getCampaign('js')
    .then(function (campaign) {
        console.log("Welcome to the " + campaign.name + " set of exercises");
        // Select an exercise in the C programming language:
        campaign.getExercisesSet();
        campaign.getExercise('codegradx.js.min3.1')
        .then(function (exercise) {
            console.log("This is the " + exercise.name + " exercise");
            // The stem of that exercise is to write a function named `min`
            // taking two integers and returning the smallest one. We send
            // this string as a possible answer:
            exercise.sendStringAnswer("\
int \n\
min (int x, int y) \n\
{ \n\
  return (x<y)?x:y; \n\
}\n")
                .then(function (job) {
                    console.log("Your answer is currently being graded...");
                    // We now have to wait for the grading report:
                    job.getReport()
                        .then(function (job) {
                            // We may now see our grade:
                            console.log('Your answer is worth ' + job.mark + 
                                        '/' + job.totalMark);
                            // We may now display the whole report.
                            // This is a skinnable XML:
                            //console.log(job.XMLreport);
                        });
                });
        });
    });
}, function (raison) {
    console.log(raison);
});*/
var state = new CodeGradX.State();

function login (response, userReceive) {
    // now authenticate with your own login then password:
//    var myobj = JSON.parse(userReceive);
    console.log('PPPPPPPPpp = ',userReceive);
    console.log('pseudo = ',userReceive.user.pseudo);
    state.getAuthenticatedUser(userReceive.user.pseudo, userReceive.user.password)

    .then(function (user) {
            console.log("LA ");
        console.log("Hello " + user.email);
        response.end(JSON.stringify(user), 'utf-8');
    }, function (raison) {
        console.log(raison);
        response.end(raison.toString(), 'utf-8');
    });
}

function getCurrentUser (response) {
    CodeGradX.getCurrentUser()
    .then(function (user) {
        console.log("Rebonjour " + user.email);
        response.end(JSON.stringify(user), 'utf-8');
    }, function (raison) {
        console.log(raison);
        response.end(raison.toString(), 'utf-8');
    });
}

function getAllExercices (response) {
    CodeGradX.getCurrentUser()
    .then(function (user) {
        user.getCampaign('js')
        .then(function (campaign) {
            campaign.getExercisesSet()
            .then(function (exercises) {
                //console.log(exercises.exercises[0].exercises[0]);
                response.end(JSON.stringify(exercises), 'utf-8');
            }, function (raison) {
                console.log(raison);
                response.end(raison.toString(), 'utf-8');
            });
        }, function (raison) {
            console.log(raison);
            response.end(raison.toString(), 'utf-8');
        });
    }, function (raison) {
        console.log(raison);
        response.end(raison.toString(), 'utf-8');
    });
}

function getExercise (response, exerciseReceive){
    CodeGradX.getCurrentUser()
    .then(function (user) {
        user.getCampaign('js')
        .then(function (campaign) {
            campaign.getExercise(exerciseReceive.name)
            .then(function (exercise) {
                console.log(exercise);
                response.end(JSON.stringify(exercise), 'utf-8');
            }, function (raison) {
                console.log(raison);
                response.end(raison.toString(), 'utf-8');
            });
        }, function (raison) {
            console.log(raison);
            response.end(raison.toString(), 'utf-8');
        });
    }, function (raison) {
        console.log(raison);
        response.end(raison.toString(), 'utf-8');
    });
}

function sub*mitExercise (response, exerciseReceive) {
   CodeGradX.getCurrentUser()
   .then(function (user) {
       user.getCampaign('js')
       .then(function (campaign) {
           campaign.getExercise(exerciseReceive.name)
           .then(function (exercise) {
               exercise.sendStringAnswer(exerciseReceive.code)
               .then(function (job) {
                   console.log(job);
                   job.getReport()
                   .then(function (job) {
                       console.log('Your answer is worth ' + job.mark + 
                                       '/' + job.totalMark);
                       response.end(JSON.stringify(job), 'utf-8');
                   });
               }, function (raison) {
                   console.log(raison);
                   response.end(raison.toString(), 'utf-8');
               });
           }, function (raison) {
               console.log(raison);
               response.end(raison.toString(), 'utf-8');
           });
       }, function (raison) {
           console.log(raison);
           response.end(raison.toString(), 'utf-8');
       });
   }, function (raison) {
       console.log(raison);
       response.end(raison.toString(), 'utf-8');
   });
}