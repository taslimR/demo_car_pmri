var svg1 = d3.select(".ms"),
    margin1 = {top: 0, right: 35, bottom: 30, left: 50},
    width1 = +svg1.attr("width") - margin1.left - margin1.right,
    height1 = +svg1.attr("height") - margin1.top - margin1.bottom,
    g1 = svg1.append("g").attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

var parseTime1 = d3.timeParse("%d-%b-%y");

var x1 = d3.scaleTime()
    .rangeRound([0, width1]);

var y1 = d3.scaleLinear()
    .rangeRound([height1, 0]);

var YaxisScale1 = d3.scaleLinear()
                         .domain([-30, 5])
                         .range([height1, 0], 0.3);

var prevHighSnp1 = 100;
var prevHighBg1 = 100;
var flag12 = 0;
var line1 = d3.line()
    .x(function(d) { return x1(d.date); })
    .y(function(d) {
      if(prevHighSnp1 < d.snp){
        //if(flag1 == 0){
          prevHighSnp1 = d.snp;
        //}
          return y1(275);
      }
      else if(prevHighSnp1 >= d.snp){
        //flag1 = 1;
        return y1( 275 + (d.snp - prevHighSnp1) * 6);
      }
    });


    
/*	var line2 = d3.line()
    .x(function(d) { return x1(d.date); })
    .y(function(d) {
      //BG
      if(prevHighBg1 < d.bg){
        //if(flag1 == 0){
          prevHighBg12 = d.bg;
        //}
          return y1(275);
      }
      else if(prevHighBg1 >= d.bg){
        //flag1 = 1;
        return y1( 275 + (d.bg - prevHighBg1) * 6);
      }  
    });*/
	var line22 = d3.line()
    .x(function(d) { return x1(d.date); })
    .y(function(d) {
      //BG
      if(prevHighBg1 < d.bg){
        //if(flag == 0){
          prevHighBg1 = d.bg;
        //}
          return y1(275);
      }
      else if(prevHighBg1 >= d.bg){
        //flag = 1;
        return y1( 275 + (d.bg - prevHighBg1) * 6);
      }  
    });

var tooltip1 = d3.select("body")
                .select("#Summary").append("div").attr("class", "toolTip");



d3.tsv("snpAndbg.tsv", function(d) {
  d.date = parseTime1(d.date);
  d.snp = +d.snp;
  d.bg = +d.bg;
  return d;
}, function(error, data) {
  if (error) throw error;
var prevHigh1 = 100;
  x1.domain(d3.extent(data, function(d) { return d.date; }));
  y1.domain(d3.extent(data, function(d) { return d.bg;}));

  g1.append("g")
      .attr("transform", "translate(0," + height1 + ")")
      .call(d3.axisBottom(x1));
    // .select(".domain")
      //.remove();
  g1.append("g")
  .call(d3.axisLeft(YaxisScale1))

  g1.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#6F95AD")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line1);

  g1.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0F2747")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line22);
  
});