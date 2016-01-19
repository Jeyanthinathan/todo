angular.module('starter')
    .controller('todoCtrl', ['$scope', 'localStorageService',
        function($scope, localStorageService) {

            var TODO_KEY = "todo_lists";

            var setDataToLS = function(data) {
                localStorageService.set(TODO_KEY, data);
            };

            var getDatafromLS = function() {
                return localStorageService.get(TODO_KEY);
            };

            $scope.task = {
                name: ""
            };

            var loadToDo = function() {
                var data = getDatafromLS();
                if (data) {
                    $scope.tasks = data;
                } else {
                    $scope.tasks = {
                        'complete': [],
                        'incomplete': []
                    };
                }
            };

            loadToDo();

            $scope.addTask = function(task) {
                $scope.tasks.incomplete.splice(0, 0, {
                    'name': task.name
                });
                $scope.task = {};
                setDataToLS($scope.tasks);
            };

            $scope.toggleTaskCompleted = function(from, task) {
                if (from == "incomplete") {
                    var removedTask = $scope.tasks.incomplete.splice($scope.tasks.incomplete.indexOf(task), 1);
                    $scope.tasks.complete.splice(0, 0, removedTask[0]);
                } else {
                    var removedTask = $scope.tasks.complete.splice($scope.tasks.complete.indexOf(task), 1);
                    $scope.tasks.incomplete.splice(0, 0, removedTask[0]);

                }
                setDataToLS($scope.tasks);
            };

            $scope.deleteTask = function(from, task) {
                if (from == "incomplete") {
                    $scope.tasks.incomplete.splice($scope.tasks.incomplete.indexOf(task), 1);
                } else {
                    $scope.tasks.complete.splice($scope.tasks.complete.indexOf(task), 1);
                }
                setDataToLS($scope.tasks);
            };

        }
    ]);