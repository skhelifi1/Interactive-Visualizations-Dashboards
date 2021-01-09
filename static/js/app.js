// * index 0 - id
// * index 1 - otu_ids
// * index 2 - sample_values
// * index 3 - otu_labels

var dropdownMenu = d3.select("#selDataset");

// On change to the DOM, call changeData()
d3.selectAll("#selDataset").on("change", changeGraph);
init()
// Function called by DOM changes
function changeGraph() {
    // Assign the value of the dropdown menu option to a variable
    let name = dropdownMenu.property("value");
    
    d3.json("data/samples.json").then(readData => {
        let sampleData = readData.samples;
        sampleData.filter(object => object.id == name);
        // console.log(id);
        let sortedValues = readData.samples.map(object => object.sample_values).sort((a,b) => a-b);
        // console.log(sortedValues);
        // .forEach(name => name.sample_values.sort((a,b) => a-b));
        let slicedValues = sortedValues.map(object => object.slice(0, 11));
        // console.log(slicedValues);
        let sortedData = readData.samples.sort((a,b) => a-b);
        // console.log(sortedData);
        let bacteriaId = sortedData.map(object => object.otu_ids);
        // console.log(bacteriaId);
        let slicedBacteriaId = bacteriaId.map(object => object.slice(0, 11));
        // console.log(slicedBacteriaId);
        let demoInfo = d3.select("#sample-metadata");
        demoInfo.html("");
        let subjectInfo = readData.metadata[0];
        // console.log(subjectInfo);
        Object.entries(subjectInfo).forEach(([key, value]) => { 
            demoInfo.append("br").text(`${key} : ${value}`);
            // if (subjectInfo) {
            //     let demoInfoContent = subjectInfo.filter(object => object[key] === subjectInfo);
            //     // console.log(demoInfoContent);
            //     return demoInfoContent;
            // };
        });




        //Make graph
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
                l: 100,
                r: 300,
                t: 200,
                b: 600,
            }
        };
        Plotly.newPlot("bar", data, layout);
    }).catch(err => console.log(err));
}

function init() {
    //get values
    d3.json("data/samples.json").then(data => {
        // console.log(data);
        let id= data.names
        id.forEach(names => {
            dropdownMenu.append("option").text(names).property("value", names);
            
        });
    });

    changeGraph();

}