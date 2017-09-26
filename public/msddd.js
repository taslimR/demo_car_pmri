var svg = d3.select(".ms1"),
    margin = {top: 0, right: 35, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%d-%b-%y");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var YaxisScale = d3.scaleLinear()
                         .domain([-30, 5])
                         .range([height, 0], 0.3);

var prevHighSnp = 100;
var prevHighBg = 100;
var flag = 0;
var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) {
      if(prevHighSnp < d.snp){
        //if(flag == 0){
          prevHighSnp = d.snp;
        //}
          return y(275);
      }
      else if(prevHighSnp >= d.snp){
        //flag = 1;
        return y( 275 + (d.snp - prevHighSnp) * 6);
      }
    });


    
	var line2 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) {
      //BG
      if(prevHighBg < d.bg){
        //if(flag == 0){
          prevHighBg = d.bg;
        //}
          return y(275);
      }
      else if(prevHighBg >= d.bg){
        //flag = 1;
        return y( 275 + (d.bg - prevHighBg) * 6);
      }  
    });

var tooltip = d3.select("body")
                .select("#Summary").append("div").attr("class", "toolTip");



d3.tsv("snpAndbg.tsv", function(d) {
  d.date = parseTime(d.date);
  d.snp = +d.snp;
  d.bg = +d.bg;
  return d;
}, function(error, data) {
  if (error) throw error;
var prevHigh = 100;
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.bg;}));

  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    // .select(".domain")
      //.remove();
  g.append("g")
  .call(d3.axisLeft(YaxisScale))

  g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#6F95AD")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

  g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0F2747")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line2);
  
});