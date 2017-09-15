
//get year (str);
//return str nb of week in ths year
function weekendIYear(year){
    
//    get year; return if bissextil year(bool)
    var checkIfBissextil = function(cYear){}
        
    
    
//    get first day in month (str)and month
//return obj nbWeekdn and last day
    var weekendInMonth = function(maxDaysInMonth, FirstDayInMounth){
        var nb = 0;
        var day = FirstDayInMounth;
        for(var i = 1; i <= maxDaysInMonth; i++){
            if(day == 5 && (day+1) == 6 && (day+1) < maxDaysInMonth){
                nb ++;
            }
            FirstDayInMounth++;
        }
        return nb;
    }
    
    var correspondenceTable = function(value){
        var obj = {
            0: 'january',
            1: 'februar',
            2: 'march',
            3: 'april',
            4: 'may',
            5: 'jun',
            6: 'jully',
            7: 'aoust',
            8: 'september',
            9: 'october',
            10: 'novamber',
            11: 'december'
        }
        return obj[value]
    }
    
    var Listmonth = list;
    for(var i = 0; i < 12; i++){
        
        list.push([correspondenceTable(i), weekendInMonth(i)])
    }
    
}
