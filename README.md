#
TO RUN Locally, type in: <br/>
1) npm install
2) npm start

<br/>
If you wish to test using your own Wistia account, you can change the API key to yours in public/js/app.js, line 14 @ $scope.key. <br/>
<strong>jQuery-angular-uploader App : Few notes</strong><br/>
-Wistia's free account allows up to 3 video uploads.<br/>
<br/>
-Using Karma-jasmine for unit tests.<br/>
-To Run unit tests, run; <strong> karma start</strong> in directory.<br/>
<br/>
-Disabled multiple file upload<br/>
<br/>
-Enforced video file format on adding file<br/>
<br/>
-Drag&Drop is still supported on this version with format forcing that I implemented manually; <strong>File format enforcing was not supported on Drag&Drop feature from Blueimp-plugin.</strong><br/>
<br/>
-App's scope variables change depending on multiple call back events from jquery-file-uploader, which I use to display/edit different components <br/>
<br/>
