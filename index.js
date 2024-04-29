import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";



//# of adults based on # of previous cancellations
//average price over the years
//# of cancellations based on arrival month

//find amount of cancellations per month and push the total to the correct month array.
let bookingstat = [];
var dataset;
var adults=[[], [], [], []];
let cancellations = [[],[]];
var monthcancellations = [[0,0], [1, 0], [2, 0],[3, 0], [4, 0], [5, 0],[6, 0], [7, 0], [8, 0],[9, 0], [10, 0], [11, 0]]
var adultcancellations = [];
var statusTotal = []
let canceltotal = 0;
let notcanceltotal = 0;
//maxavgprice shows data for the highest priced rooms (Over 300)
let maxaverageprice = [];
let minaverageprice = [];
let minmaxtotals = [];




d3.csv("Hotel Reservations.csv").then(function (data) {
dataset = data;
getArrays();
generatevis1();
generateVis2();
generateVis3();
generateVis4();
    
});

function generatevis1(){
    let w = 200;
    let h = 400;
   

    var svg1 = d3.select(".visualize")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    

    svg1.selectAll("rect")
    .data(adultcancellations)
    .text("hey")
    .enter()
    .append("rect")
    .attr("x", function(d, i){
        return i * 51;
    })
    .attr("y", function(d){
        return h - (d*0.6);
    })
    .attr("width", 50)
    .attr("height", function(d){
        return d;
    })
    .attr("fill", function(d){
        return "rgb(0,0, "+ (d * 0.35) + ")";
    })
    

    svg1.selectAll("text")
.data(adultcancellations)
.enter()
.append("text")
.text(function(d){
    return d;
}
)
.attr("x", function(d, i) {
    return ((i * 51)+15);
    })
    .attr("y", function(d) {
    return h - ((d * 0.3)+155);
    });

  


   
    

    


    // d3.select("body").selectAll("div")
    // .data(dataset)
    // .enter()
    // .append("div")
    // .attr("class", "bar")
    // .style("height", function(d){
    //     var barheight = d.avg_price_per_room*0.5;
    //     return barheight + "px";

    // })

}

function generateVis2(){
    let w = 200;
    let h = 400;
   

    var svg2 = d3.select(".visualize")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

    svg2.selectAll("rect")
    .data(statusTotal)
    .enter()
    .append("rect")
    .attr("x", function(d, i){
        return i * 51;
    })
    .attr("y", function(d){
        return h - (d*0.01);
    })
    .attr("width", 50)
    .attr("height", function(d){
        return d;
    })
    .attr("fill", function(d){
        
        return `rgb(0,${(d * 0.006)},50 )`;
    });

    

    svg2.selectAll("text")
.data(statusTotal)
.enter()
.append("text")
.text(function(d){
    
    return d;
}
)
.attr("x", function(d, i) {
    return ((i * 51));
    })
    .attr("y", function(d) {
    return h - ((d * 0.011));
    });
}


function generateVis3(){

    let h = 400;
    let w = 500;
    var svg3 = d3.select(".visualize")
.append("svg")
.attr("width", w)
.attr("height", h);

svg3.selectAll("circle") // <-- No longer "rect"
.data(monthcancellations)
.enter()
.append("circle")
.attr("cx", function(d) {
    return d[0]*35;
    })
    .attr("cy", function(d) {
    return h - d[1]/15+20;
    })
    .attr("r", 6)
    .attr("fill", 'green');

    svg3.selectAll("text") // <-- Note "text", not "circle" or "rect"
.data(monthcancellations)
.enter()
.append("text")
.text(function(d) {
    return d[0] + "," + d[1];
    })
    .attr("x", function(d) {
        return d[0]*35+ 10;
        })
        .attr("y", function(d) {
        return h - d[1]/15-10;
        })
        .attr("font-family", "sans-serif")
.attr("font-size", "11px")
}

function generateVis4(){
    let w = 400;
    let h = 400;
   

    var svg4 = d3.select(".visualize")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    

    svg4.selectAll("rect")
    .data(minmaxtotals)
    .enter()
    .append("rect")
    .attr("x", function(d){
        
        return (0);
    })
    .attr("y", function(d, i){
        
        return i * 51;
    })
    .attr("width", function(d){
        return d * 0.054;})
    .attr("height", 50)
    .attr("fill", function(d){
        return "rgb(0,0, "+ (d * 0.35) + ")";
    })
    

    svg4.selectAll("text")
.data(minmaxtotals)
.enter()
.append("text")
.text(function(d){
    return d;
}
)
.attr("x", function(d) {
    return (d*0.054) + 5;
    })
    .attr("y", function(d, i) {
        return ((i * 51)+15);
    
    });
}


function getArrays(){

    //find adults arrays
    for(let i = 0; i < dataset.length; i++)
        if(dataset[i].no_of_adults == 1){
            adults[0].push(dataset[i]);
        };

        for(let i = 0; i < dataset.length; i++)
        if(dataset[i].no_of_adults == 2){
            adults[1].push(dataset[i]);
        };

        for(let i = 0; i < dataset.length; i++)
        if(dataset[i].no_of_adults == 3){
            adults[2].push(dataset[i]);
        };

        for(let i = 0; i < dataset.length; i++)
        if(dataset[i].no_of_adults == 4){
            adults[3].push(dataset[i]);
        };

        //find cancellation array
        for(let i = 0; i < dataset.length; i++)
        if(dataset[i].no_of_previous_cancellations == 0){
            cancellations[0].push(dataset[i]);
        };

        for(let i = 0; i < dataset.length; i++)
        if(dataset[i].no_of_previous_cancellations == 1){
            cancellations[1].push(dataset[i]);
        };
       
        findadultCancellations();
        findStatus();
        findMonthCancelations();
        findAvgPrices();
        
}


function findadultCancellations(){

    //avg price for 1 adult reservations
    let total = [];
    
    for(let i = 0; i < adults[0].length - 1; i++){
        
        total.push(parseInt(adults[0][i].no_of_previous_cancellations));
    };
    let sum = total.reduce((partialSum, a) => partialSum + a, 0);

    adultcancellations.push(sum);
    

    
    //avg price for two adults
    total = [];
    
    for(let i = 0; i < adults[1].length - 1; i++){
        
        total.push(parseInt(adults[1][i].no_of_previous_cancellations));
    };
    sum = total.reduce((partialSum, a) => partialSum + a, 0);

    adultcancellations.push(sum);
   

    //avg price for three adults
    total = [];
    
    for(let i = 0; i < adults[2].length - 1; i++){
        
        total.push(parseInt(adults[2][i].no_of_previous_cancellations));
    };
    sum = total.reduce((partialSum, a) => partialSum + a, 0);

    adultcancellations.push(sum);
    


    //avg price for four adults
    total = [];
    
    for(let i = 0; i < adults[3].length - 1; i++){
        
        total.push(parseInt(adults[3][i].no_of_previous_cancellations));
    };
    sum = total.reduce((partialSum, a) => partialSum + a, 0);

    adultcancellations.push(sum+1);
    

}

function findStatus(){
    

    for(let i = 0; i < cancellations[0].length; i++){
        console.log
        if(cancellations[0][i].booking_status == 'Canceled'){
            canceltotal += 1;
        } else {
            notcanceltotal += 1;
        }
    }
    statusTotal.push(canceltotal);
    statusTotal.push(notcanceltotal);
    
   
}

function findMonthCancelations(){
    
    for(let i = 0; i < dataset.length; i++){
        if(dataset[i].booking_status == 'Canceled'){
            
            bookingstat.push(dataset[i]);

        }
        
    }
    
    
    for(let i = 0; i< bookingstat.length; i++){
        if(bookingstat[i].arrival_month == 1){
            monthcancellations[0][1] += 1;
        }  else if(bookingstat[i].arrival_month == 2){
            monthcancellations[1][1] += 1;
        } else if(bookingstat[i].arrival_month == 3){
            monthcancellations[2][1] += 1;
        } else if(bookingstat[i].arrival_month == 4){
            monthcancellations[3][1] += 1;
        } else if(bookingstat[i].arrival_month == 5){
            monthcancellations[4][1] += 1;
        } else if(bookingstat[i].arrival_month == 6){
            monthcancellations[5][1] += 1;
        } else if(bookingstat[i].arrival_month == 7){
            monthcancellations[6][1] += 1;
        } else if(bookingstat[i].arrival_month == 8){
            monthcancellations[7][1] += 1;
        } else if(bookingstat[i].arrival_month == 9){
            monthcancellations[8][1] += 1;
        } else if(bookingstat[i].arrival_month == 10){
            monthcancellations[9][1] += 1;
        } else if(bookingstat[i].arrival_month == 11){
            monthcancellations[10][1] += 1;
        } else if(bookingstat[i].arrival_month == 12){
            monthcancellations[11][1] += 1;
        } 
      
    }
    
}

function findAvgPrices(){
    for(let i = 0; i < dataset.length; i++)
  if(dataset[i].avg_price_per_room > 200){
    maxaverageprice.push(dataset[i]);
  }

  for(let i = 0; i < dataset.length; i++)
  if(dataset[i].avg_price_per_room < 80 && dataset[i].avg_price_per_room > 0){
    minaverageprice.push(dataset[i]);
  }
  


//total min rooms that have been canceled canceled
let total = 0;
for(let i = 0; i< minaverageprice.length; i++){
    if(minaverageprice[i].booking_status == 'Canceled'){
        total += 1;
    }
}
minmaxtotals.push(total);

total = 0;
for(let i = 0; i< minaverageprice.length; i++){
    if(minaverageprice[i].booking_status == 'Not_Canceled'){
        total += 1;
    }
}
minmaxtotals.push(total);


total = 0;
for(let i = 0; i< maxaverageprice.length; i++){
    if(maxaverageprice[i].booking_status == 'Canceled'){
        total += 1;
    }
}
minmaxtotals.push(total);


total = 0;
for(let i = 0; i< maxaverageprice.length; i++){
    if(maxaverageprice[i].booking_status == 'Not_Canceled'){
        total += 1;
    }
}
minmaxtotals.push(total);




   
}


















