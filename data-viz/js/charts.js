
   
   function renderPercentageDailyValues(data) {
  
    var percentagesArray = [];
    percentagesArray.push({ "measure": "Total Fat (%)", "amount": parseFloat(data["Total Fat (% Daily Value)"]) / 100 });
    percentagesArray.push({ "measure": "Saturated Fat (%)", "amount": parseFloat(data["Saturated Fat (% Daily Value)"]) / 100 });
    percentagesArray.push({ "measure": "Cholesterol (%)", "amount": parseFloat(data["Cholesterol (% Daily Value)"]) / 100 });
    percentagesArray.push({ "measure": "Sodium (%)", "amount": parseFloat(data["Sodium (% Daily Value)"]) / 100 });
    percentagesArray.push({ "measure": "Carbohydrates (%)", "amount": parseFloat(data["Carbohydrates (% Daily Value)"]) / 100 });
    percentagesArray.push({ "measure": "Dietary Fiber (%)", "amount": parseFloat(data["Dietary Fiber (% Daily Value)"]) / 100 });
    percentagesArray.push({ "measure": "Vitamin A (%)", "amount": parseFloat(data["Vitamin A (% Daily Value)"]) / 100 });
    percentagesArray.push({ "measure": "Vitamin C (%)", "amount": parseFloat(data["Vitamin C (% Daily Value)"]) / 100 });
    percentagesArray.push({ "measure": "Calcium (%)", "amount": parseFloat(data["Calcium (% Daily Value)"]) / 100 });
    percentagesArray.push({ "measure": "Iron (%)", "amount": parseFloat(data["Iron (% Daily Value)"]) / 100 });
  
    data = percentagesArray;
  
    var margin = { top: 40, right: 20, bottom: 100, left: 80 },
      width = 720 - margin.left - margin.right,
      height = 375 - margin.top - margin.bottom;
  
    var formatPercent = d3.format(".0%");
  
    var x = d3.scaleBand()
      .range([0, width], .1);
  
    var y = d3.scaleLinear()
      .rangeRound([height, 0]);
  
    var xAxis = d3.axisBottom(x);
  
    var yAxis = d3.axisLeft(y)
      .tickFormat(formatPercent);
  
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function (d) {
        return "<strong>Daily Percentage:</strong> <span style='color:red'>" + d.amount * 100 + "%</span>";
      })
  
    var svg = d3.select("#percentageArea").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    svg.call(tip);
    x.domain(data.map(function (d) { return d.measure; }));
    y.domain([0, d3.max(data, function (d) { return d.amount; })]);
  
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .attr("stroke","white")
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", function (d) {
        return "rotate(-65)"
      });
  
  
    svg.append("g")
      .attr("class", "y axis")
      .attr("stroke","white")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");  
    svg.selectAll(".bar1")
      .data(data)
      .enter().append("rect")
      .attr("x", function (d) { return x(d.measure); })
      .attr("width", x.bandwidth() * 0.75)
      .attr("y", function (d) { return y(d.amount); })
      .attr("height", function (d) { return height - y(d.amount); })
      .attr("fill","steelBlue")
      .attr("class",function(d){
        console.log(d)

        if (d.amount>1){
           return "risky"
        }
        return "bar1"

      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

      setInterval(function(){
        d3.selectAll(".risky")
        .transition().duration(0)
          .style("fill", "red")
        .transition().duration(500)
          .style("fill", "steelBlue")
      },1000)

  
      svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left * 0.75)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("fill","white")
    .text("Percentage Daily Recommended");   
  }
  
  function renderNutritionGraph (data) {
  
    document.getElementById("selectedItem").innerText = data["Item"] + " : " + data["Calories"] + " Calories"
    oriData=data
    var dataGramsArray = [];
    dataGramsArray.push({ "measure": "Total Fat", "amount": parseFloat(data["Total Fat"]) });
    dataGramsArray.push({ "measure": "Saturated Fat", "amount": parseFloat(data["Saturated Fat"]) });
    dataGramsArray.push({ "measure": "Trans Fat", "amount": parseFloat(data["Trans Fat"]) });
    dataGramsArray.push({ "measure": "Cholesterol", "amount": parseFloat(data["Cholesterol"]) / 1000 });
    dataGramsArray.push({ "measure": "Sodium", "amount": parseFloat(data["Sodium"]) / 1000 });
    dataGramsArray.push({ "measure": "Carbohydrates", "amount": parseFloat(data["Carbohydrates"]) });
    dataGramsArray.push({ "measure": "Dietary Fiber", "amount": parseFloat(data["Dietary Fiber"]) });
    dataGramsArray.push({ "measure": "Sugars", "amount": parseFloat(data["Sugars"]) });
    dataGramsArray.push({ "measure": "Protein", "amount": parseFloat(data["Protein"]) });
  
    data = dataGramsArray;
  
    var margin = { top: 40, right: 20, bottom: 100, left: 80 },
      width = 720 - margin.left - margin.right,
      height = 375 - margin.top - margin.bottom;
  
    var x = d3.scaleBand()
      .range([0, width], .1);
  
    var y = d3.scaleLinear()
      .range([height, 0]);
  
    var xAxis = d3.axisBottom(x);
  
    var yAxis = d3.axisLeft(y);
  
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function (d) {
        return "<strong>Amount:</strong> <span style='color:red'>" + d.amount + "g</span>";
      })
  
    var svg = d3.select("#gramsArea").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    svg.call(tip);
    x.domain(data.map(function (d) { return d.measure; }));
    y.domain([0, d3.max(data, function (d) { return d.amount; })]);
  
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("stroke","white")
      .attr("transform", function (d) {
        return "rotate(-65)"
      });
  
    svg.append("g")
      .attr("class", "axis")
      .attr("stroke","white")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", height / 2)
      .attr("dy", ".71em")
      // .style("fill","white")
      .style("text-anchor", "middle")
  
 svg.selectAll(".bar1")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar1")
      .attr("x", function (d) { return x(d.measure); })
      .attr("width", x.bandwidth() * 0.75)
      .attr("y", function (d) { return y(d.amount); })
      .attr("fill","steelBlue")
      .attr("height", function (d) { return height - y(d.amount); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
   

      svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left * 0.75)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .attr("stroke","white")
    .style("fill","white")
    .style("text-anchor", "middle")
    .text("Nutrient Content (in grams)");   
  }


$(document).ready(function(){
  d3.csv("https://asanka88.github.io/data-viz/data/menu.csv", function (data) {
    var dataset = {};
    dataset.children = data;
    var diameter = 750;
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    renderNutritionGraph(data[0]);
    renderPercentageDailyValues(data[0]);

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-1, 0])
      .html(function (d) {
        return "<strong>Item Name: </strong><span class='details'>" + d.data.Item + "<br></span>" + "<strong>Amount of Calories: </strong><span style='color:red' class='details'>" + d.data.Calories + "</span>";
      })

    var bubble = d3.pack(dataset)
      .size([diameter, diameter])
      .padding(1.5);

    var svg = d3.select("#bubbleArea")
      .append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble")
      .style("display", "block")
      .style("margin", "auto");

    svg.call(tip);

    var nodes = d3.hierarchy(dataset)
      .sum(function (d) { return d.Calories; });

    var node = svg.selectAll(".node")
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function (d) {
        return !d.children
      })
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    node.append("circle")
      .attr("r", function (d) {
        return d.r;
      })
      .style("fill", function (d, i) {
        return color(i);
      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .on("click", function (d) {
        document.getElementById("gramsArea").innerHTML = "";
        document.getElementById("percentageArea").innerHTML = "";
        renderNutritionGraph(d.data);
        renderPercentageDailyValues(d.data);
        document.getElementById("chartsArea").click();
        document.getElementById("selectedItem").innerText = d.data["Item"] + " : " + d.data["Calories"] + " Calories"
      });

    node.append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function (d) {
        return d.data.Item.substring(0, d.r / 3);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function (d) {
        return d.r / 5;
      })
      .attr("fill", "white");

    node.append("text")
      .attr("dy", "1.3em")
      .style("text-anchor", "middle")
      .text(function (d) {
        return d.data.Count;
      })
      .attr("font-family", "Gill Sans", "Gill Sans MT")
      .attr("font-size", function (d) {
        return d.r / 5;
      })
      .attr("fill", "white");

    d3.select(self.frameElement)
      .style("height", diameter + "px");
  });

 

  });


