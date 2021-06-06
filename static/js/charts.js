function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/static/data/samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("/static/data/samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("/static/data/samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var samplesArray = samples.filter(sampleObject =>
      sampleObject.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var results = samplesArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = results.otu_ids;
    var labels = results.otu_labels;
    var values = results.sample_values;

    // BAR CHART
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order so the otu_ids with the most bacteria are last. 

    var yticks = otu_ids.slice(0, 10).map(function(number) {
      return "OTU: " + number.toString()
    }).reverse();

    // 8. Create the trace for the bar chart. 
    var barData = [
      {
        y:yticks,
        x:values.slice(0, 10).reverse(),
        text:labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
      }
    ];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 75, r: 50, b: 30 }
    };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout)


    // BUBBLE CHART
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otu_ids,
      y: values,
      text: labels,
      mode: 'markers',
      marker: {
        size: values,
        color: otu_ids,
        colorscale: "Portland",
        type: 'heatmap'
      }
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures per Sample',
      xaxis: {title: "OTU ID"},
      margin: { t: 30, l: 75, r: 50},
      hovermode: "closest"
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble' ,bubbleData, bubbleLayout)

    // GAUGE CHART  // Create trace for the gauge chart.
    // Variable for wash frequency
    var resultsArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
    // Array
    var results = resultsArray[0]
    var wfreq = parseFloat(results.wfreq)

    var gaugeData = [
      {
        value: wfreq,
        domain: { x: [0, 1], y: [0, 1] },
        marker: {size: 28, color:'850000'},
        title: 'Belly Button Washing Frequency<br> Scrubs per Week',
        titlefont: {family: 'Arial, sans-serif'},
        type: "indicator",
        gauge: { 
          axis: { visible: true, range: [0, 10] },
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "lightgreen" },
            { range: [8, 10], color: "darkseagreen" },
          ] },
        mode: "number+gauge"
      }
    ];

    // Create layout for the gauge chart.
    var gaugeLayout = {
      width: 650,
      height: 450,
      line: {
      color: '#1e73af'
      },
      font: { color: "black", family: "Arial, sans-serif" }
    };

    Plotly.newPlot("gauge", gaugeData, gaugeLayout)
  });
}