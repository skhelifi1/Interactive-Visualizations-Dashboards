// * index 0 - id
// * index 1 - otu_ids
// * index 2 - sample_values
// * index 3 - otu_labels

var dropdownMenu = d3.select("#selDataset");

// On change to the DOM, call changeData()
//d3.selectAll("#selDataset").on("change", changeGraph);
// Function called by DOM changes
function changeGraph(name) {
    // Assign the value of the dropdown menu option to a variable
    // let name = dropdownMenu.property("value");
    
    d3.json("data/samples.json").then(readData => {
        var sampleData = readData.samples;
        filteredData = sampleData.filter(object => object.id == name);
        // console.log(sampleData);
        var sampleValues = readData.samples.map(object => object.sample_values).sort((a,b) => a-b)[0].slice(0, 10);
        var bacteriaId = sampleData.map(object => object.otu_ids).sort((a,b) => a-b)[0].slice(0, 10);
        var bacteriaLabels = sampleData.map(object => object.otu_labels).sort((a,b) => a-b)[0].slice(0, 10);
        // console.log(bacteriaId);
        var demoInfo = d3.select("#sample-metadata");
        demoInfo.html("");
        var subjectInfo = readData.metadata.filter(object => object.id == name)[0];
        // console.log(subjectInfo);
        Object.entries(subjectInfo).forEach(([key, value]) => { 
            demoInfo.append("h5").text(`${key} : ${value}`);
            // if (subjectInfo) {
            //     let demoInfoContent = subjectInfo.filter(object => object[key] === subjectInfo);
            //     // console.log(demoInfoContent);
            //     return demoInfoContent;
            // };
        });


        // console.log(sampleValues)
        // console.log(bacteriaId)
        // console.log(bacteriaLabels)

        //Make graph
            let trace1 = {
            x: sampleValues,
            y: bacteriaId.map(num => `OTU ${num}`),
            text: bacteriaId,
            name: "Top 10 Bacteria Found", 
            type: "bar",
            orientation:"h"
        };
        let data= [trace1];
        let layout = {
            title: "Top 10 Bacteria Found",
            automargin: true      
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

    changeGraph(940);

}
init()