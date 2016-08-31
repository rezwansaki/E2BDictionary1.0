/* This reference path helps to write Angular JS code easily */
/// <reference path="angular.min.js" />


//variables
var dataFile = "data/data.txt"; //data file name which contain database 


var app = angular.module('myApp', []);

app.controller('customersCtrl', function($scope, $http) {
    $http.get(dataFile) //data.txt contain unicode but maximum data problem 
            .then(function (response) {$scope.names = response.data.myData;});
    
    
    //variables 
    //information of app, developer and data file will displayed dynamically 
    $scope.dataFileType = "non-unicode"; //data file information 
    $scope.dataInfo = "Data source : '" + dataFile + "' file, " + $scope.dataFileType + " text file. This database file is collected from Internet."; //data file information 
    $scope.developerInfo = "Developed by Md. Rezwan Saki Alin"; //developer's information 
    $scope.developerInfo2 = "web: http://www.alinsworld.com"; //developer's information 
    $scope.developerInfo3 = "email: rezwansaki@gmail.com"; //developer's information 
    $scope.developDate = "Date : 01-September-2016"; //developer's information 
    $scope.appInfo = "E2B Dictionary v.1.0";
    //information of app, developer and data file will displayed dynamically 
    
    $scope.results = []; //this array will store the result so it array will be 1 row 
    $scope.results2 = [];
    $scope.notFound = "Not Found!! Please, type your word in lowercase!"; 
    $scope.enteredValue = '';
    $scope.str = '';
    $("#info").hide();
    

    $scope.findValue = function(enteredValue) {     
        $scope.results = []; //clear the result array 
        for(i=0; i<$scope.names.length; i++) {
            $scope.str = $scope.names[i].cWord.toLowerCase(); //convert all cWord into lowercase to fix the problem 
            //$scope.str = $scope.names[i].en_word.toLowerCase(); //convert all cWord into lowercase to fix the problem 
            if ($scope.str == enteredValue) {  //$scope.str.startsWith(enteredValue) 
                $scope.notFound = '';

                //$scope.results.push({id: $scope.names[i].id, en_word: $scope.names[i].en_word, bn_word: $scope.names[i].bn_word}); //for another text file database unicode text file 

                $scope.results.push({ID: $scope.names[i].ID, cWord: $scope.names[i].cWord, cMean: $scope.names[i].cMean}); //store final search result in the result array not unicode text file  
                $scope.results2 = []; //to hide suggession box 
                
                document.getElementById("srchBox").value = '';
                document.getElementById("srchBox").focus();
            }
        }
        
        if($scope.notFound == "") {
            $scope.notFound = "Not Found!! Please, type your word in lowercase!"; 
        }else { 
            alert($scope.notFound);
        }

    };
    
    //total words count 
    $scope.tWords = 0;
    $scope.totalWords = function() {
        $scope.tWords = $scope.names.length;
    }
    
    //suggestion word  
    $scope.results2 = []; //this array will store the result so it array will be 1 row 
    $scope.suggestion = function(enteredValue) {     
        $scope.results = []; //clear the result array for final result 
        $scope.results2 = []; //clear the result2 array for suggesstion result 
        for(i=0; i<$scope.names.length; i++) {
            $scope.str2 = $scope.names[i].cWord.toLowerCase(); //convert all cWord into lowercase to fix the problem 
            if ($scope.str2.startsWith(enteredValue)) { 
                $scope.results2.push({ID: $scope.names[i].ID, cWord: $scope.names[i].cWord, cMean: $scope.names[i].cMean}); //store final search result in the result array not unicode text file  
            }
        }
        //if searchbox is empty 
        if($scope.enteredValue == '') { //enteredValue is a variable that binds with search box and another items 
            $scope.results = []; //to clear and hide result box 
            $scope.results2 = [];  //to clear and hide suggesstion box 
        }
    };
    

    //get result after click suggesstion 
    $scope.getResult = function (cWord) {
        document.getElementById("srchBox").value = cWord;
        $scope.findValue(cWord.toLowerCase());
    }
    
    //clear function
    $scope.clear = function() {
        document.getElementById("srchBox").value = '';
        $scope.results = []; 
        $scope.results2 = [];
    }
    
    //show infomation box 
    $scope.showInfo = function() {
        $scope.totalWords();
        $("#info").show(); //show information div 
        $("#bodyContent").hide(); //show information div 
        $("#search").hide(); //show information div 
    }
    
    $scope.hideInfo = function() {
        $("#info").hide(); //show information div 
        $("#bodyContent").show(); //show information div 
        $("#search").show(); //show information div 
    }
    
    
    /*=============================================================*/
    //press Enter key from anywhere then ... 
    $scope.myFunct = function(keyEvent) {
        if (keyEvent.which === 13) { //Enter key when cursor will stay in the search input box 
            $scope.w = document.getElementById("srchBox").value;
            $scope.findValue($scope.w.toLowerCase());
        }
    };
    //creating keypress system for using from keyboard 
    /*=============================================================*/
        

});






