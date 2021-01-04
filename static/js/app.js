// * index 0 - id
// * index 1 - otu_ids
// * index 2 - sample_values
// * index 3 - otu_labels

d3.json("data/samples.json").then((readData) => {
    // console.log(readData);
    let data = readData;
    let id= data.names;
    // console.log(id);
    let sortedValues = data.samples.map(object => object.sample_values).sort((a,b) => a-b);
    // console.log(sortedValues);
    // .forEach(name => name.sample_values.sort((a,b) => a-b));
    let slicedValues = sortedValues.map(object => object.slice(0, 11));
    // console.log(slicedValues);
    let sortedData = data.samples.sort((a,b) => a-b);
    // console.log(sortedData);
    let bacteriaId = sortedData.map(object => object.otu_ids);
    // console.log(bacteriaId);
    let slicedBacteriaId = bacteriaId.map(object => object.slice(0, 11));
    // console.log(slicedBacteriaId);
});

let trace1 = {
    x: slicedValues,
    y: slicedBacteriaId,
    text: slicedBacteriaId,
    name: "Top 10 Bacteria Found", 
    type: "bar",
    orientation:"h"
};
let data= [trace1];
let layout = {
    title: "Top 10 Bacteria Found",
    margin: {
        l: 200,
        r: 200,
        t: 400,
        b: 600,
    }
};
Plotly.newPlot("bar", data, layout);

// On change to the DOM, call changeData()
d3.selectAll("#selDataset").on("change", changeData);
// Function called by DOM changes
function changeData() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");
};