describe('Testing ', function () {
  // var UploaderCtrl, scope;
  var scope = null;
  var ctrl = null;

  beforeEach(function() {
    module('uploaderAngular');

    inject(function($rootScope, $controller){
        scope = $rootScope.$new();
          ctrl = $controller('uploaderController', {$scope:scope});
    });
  });

  it('Uploader Controller is defined', function() {
    expect(ctrl).toBeDefined();
  });

  it('Wistia API KEY should be defined',function() {
    expect(scope.key).toBeDefined();
  });

  it('Wistia Upload URL should be defined',function () {
    expect(scope.url).toBeDefined();
    expect(scope.url).toBe("https://upload.wistia.com/?api_password=f51248913c389ca1dab3c3385a45f984a4800a1ed7e3ae3ed51bb2501c7b3727");
  });

  it('On start, should not show: error, video and disable button ',function () {
    expect(scope.showVideo).toBe(false);
    expect(scope.showError).toBe(false);
    expect(scope.wrongFormat).toBe(true);
  });


  it('User Uploaded video file, enable upload button', function () {
    scope.$broadcast('fileuploadadd', { 'originalFiles' : [{'type':'video/'}]}  );
    scope.$digest();
    expect(scope.wrongFormat).toBe(false);
    expect(scope.showVideo).toBe(false);
    expect(scope.showError).toBe(false);
  });

  it('User Uploaded image file (From drag&drop action), Show error message and disable upload button', function () {
    scope.$broadcast('fileuploadadd', { 'originalFiles' : [{'type':'img/'}]}  );
    scope.$digest();
    expect(scope.wrongFormat).toBe(true);
    expect(scope.showVideo).toBe(false);
    expect(scope.showError).toBe(true);
    expect(scope.errorMessage).toBe("We only accept video files. Please try again");
  });

  it('User Uploaded finished with no error, display video', function () {
    scope.$broadcast('fileuploaddone', { 'result' : {'hashed_id':'GOT-ID-TESTING'}}  );
    scope.$digest();
    expect(scope.embedLink).toBeDefined();
    expect(scope.showVideo).toBe(true);
    expect(scope.showVideo).toBe(true);
    expect(scope.showError).toBe(false);
  });

  it('Should show error and disable upload button on uploadfail; Server Failure (i.e; maximum upload reached) ', function () {
    scope.$broadcast('fileuploadfail', { 'errorThrown': 'Forbidden' ,'result' : {'error':'SERVER FAILED-TESTING'}}  );
    scope.$digest();
    expect(scope.showError).toBe(true);
    expect(scope.wrongFormat).toBe(true);
  });

  it('User clicks on cancel; should not show error, video, disable upload button', function () {
    scope.$broadcast('fileuploadfail', { 'errorThrown': 'abort' }  );
    scope.$digest();
    expect(scope.showError).toBe(false);
    expect(scope.showVideo).toBe(false);
    expect(scope.wrongFormat).toBe(true);
  });


});
