var app = angular.module('uploaderAngular', ['ngAnimate','blueimp.fileupload'] )
.config (['$httpProvider', 'fileUploadProvider', function($httpProvider, fileUploadProvider){
  $httpProvider.defaults.transformRequest = function(data) {
     if (data === undefined) {
       return data;
     }
     return jQuery.param(data);
   };
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
}])

.controller('uploaderController', ['$scope','$http', function ($scope, $http){
  $scope.title = "HI";
  $scope.key = 'f51248913c389ca1dab3c3385a45f984a4800a1ed7e3ae3ed51bb2501c7b3727';
  $scope.url = 'https://upload.wistia.com/?api_password='+$scope.key;
  $scope.videoId = ''
  $scope.showVideo = false;
  $scope.showError = false;
  $scope.wrongFormat = true;
  $scope.errorMessage = '';
  //options for file upload. Just setting Wistia upload link
  $scope.options = {
       url: $scope.url
  };

  $scope.$on('fileuploadfail', function (e,data){
    //Get message from Server to display
    if(data.errorThrown === 'Forbidden'){
      console.log("FAILED FROM SERVER");
      console.log(data.textStatus);
      $scope.errorMessage = data.result.error;
      $scope.showVideo = false;
      $scope.showError = true;
      $scope.wrongFormat = true;
    } else if (data.errorThrown === 'abort'){
      console.log('User canceled upload');
      $scope.showVideo = false;
      $scope.showError = false;
      $scope.wrongFormat = true;
      $scope.errorMessage = '';
    }
  });
//When new file is added, reset screen so the video doesn't appear anymore
  $scope.$on('fileuploadadd', function(e, data){
    $scope.showVideo = false;
    $scope.showError = false;
    $scope.wrongFormat = false;
    var file = $scope.file;
    //fileuploadadd does not force video files for drag&drop. Do it manually
      if (data.originalFiles[0].type.indexOf('video/') == -1){
        console.log("NOT A VIDEO FILE FROM DRAG DROP ACTION");
        $scope.errorMessage = "We only accept video files. Please try again";
        $scope.showVideo = false;
        $scope.showError = true;
        $scope.wrongFormat = true;
      }
  });

  //File upload done call back. Used to get the id of videoID from Wistia and setting embed link for display
  $scope.$on('fileuploaddone', function(e,data){
    console.log("UPLOADS DONE");
    console.log(data);
    $scope.videoId = data.result.hashed_id;
    console.log($scope.videoId);
    $scope.showVideo= true;
    $scope.showError = false;
    $scope.wrongFormat = true;
    $scope.embedLink = 'wistia_embed wistia_async_'+ $scope.videoId+' playlistLinks=auto';
    console.log("EMBED LINK: " + $scope.embedLink);
  });
}]);
