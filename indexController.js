app.controller('indexCtrl', function($scope,Excel,$timeout) {
   
    $scope.nameValue = "";
    $scope.longLat = "";
    $scope.tabledata = [];
    $scope.filename = "";

    $scope.exportToExcel=function(tableId,sheetname){ // ex: '#my-table'
        var exportHref=Excel.tableToExcel(tableId,sheetname);
        $timeout(function(){location.href=exportHref;},100); // trigger download
    }

    $scope.getVal = function(){
        var valueLatLong = $scope.longLat;
        var lon = valueLatLong.split(',')[0];
        var lat = valueLatLong.split(',')[1];

        var point = new GeoPoint(Number(lon), Number(lat));

        console.log($scope.nameValue + " :: " +point.getLonDeg()+"N "+point.getLatDeg()+"E"); 
        
        var obj = {
            'name' : $scope.nameValue.toUpperCase(),
            'latitude' : point.getLonDeg()+"N ",
            'longitude' : point.getLatDeg()+"E"
        }

      $scope.tabledata.push(obj); 
     
    }

    $scope.exportToJSON = function(){
      const blob = new Blob([JSON.stringify($scope.tabledata)], {type : 'application/json'});
      saveAs(blob, $scope.filename+'.json');
    }

  });
  