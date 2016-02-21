var uiModule = require('../_index');

uiModule.directive('datepicker',getDatepicker);

function getDatepicker() {
    return {
        restrict: 'EA',
        templateUrl: 'views/datepicker.html',
        link: function (scope, element, attrs) {
            scope.shiftMonth=shiftMonth;
            scope.pick=pickDay;
            scope.getDays=getDays;

            scope.currentDate=null;
            scope.dateSelection=false;
            scope.days=[];
            scope.max=(attrs.max!=null)?Date.today().addDays(parseInt(attrs.max-1)):null;
            scope.min=(attrs.min!=undefined)?Date.today().addDays(parseInt(attrs.min)):null;
            scope.today=Date.today();

            /* ---------------------------------------------------------- */

            (function() {
                generateCalendar();
                getDays();
            })();

            /* ---------------------------------------------------------- */

            function shiftMonth(dir) {
                scope.currentDate.addMonths(dir);
                generateCalendar();
            }

            function getDays() {
                var start=Date.today().monday();
                var res = [];
                var i=0;
                while(i++<7) {
                    res.push(start.toString('dddd').slice(0,2));
                    start.addDays(1);
                }
                return res;
            }

            function pickDay(day) {
                if (day.getMonth()<scope.currentDate.getMonth())
                    shiftMonth(-1);
                else if (day.getMonth()>scope.currentDate.getMonth())
                    shiftMonth(1);
                scope.selectedDay=angular.copy(day);
                scope.$parent.selectedDay=angular.copy(day);
                scope.dateSelection=false;
            }

            function generateCalendar() {
                if(!scope.currentDate)
                    scope.currentDate= Date.today();
                var monthStart = scope.currentDate.moveToFirstDayOfMonth();
                var days=new Array(Date.getDaysInMonth(scope.currentDate.getFullYear(),scope.currentDate.getMonth())).length;
                days+=(days%7==0)?0:(7-days%7);
                var resultArray = [];

                var shift = angular.copy(monthStart).addDays(1).getDay()-1;
                if(shift==-1) shift=6;

                var indexDate = angular.copy(monthStart).addDays(-shift);

                // Fun fact: Sometimes your monthly calendar contains 42 days (6 weeks!).
                // This would have happened only 100 times by May 2743 apparently.
                days+=(scope.currentDate.getMonth()==angular.copy(indexDate).addDays(days+1).getMonth())?7:0;

                var i=0;
                while(i++<days) {
                    indexDate.addDays(1);
                    resultArray.push(angular.copy(indexDate));
                }
                scope.days=resultArray;
            }
        }
    }
};