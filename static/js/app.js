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
        var sampleV = readData.samples.map(object => object.sample_values)[0];
        // console.log (sampleV)
        var sampleValues = readData.samples.map(object => object.sample_values).sort((a,b) => a-b)[0].slice(0, 10);
        var otu_ids = sampleData.map(object => object.otu_ids)[0];
        // console.log (otu_ids)
        var bacteriaId = sampleData.map(object => object.otu_ids).sort((a,b) => a-b)[0].slice(0, 10);
        var bacteriaLabels = sampleData.map(object => object.otu_labels).sort((a,b) => a-b)[0].slice(0, 10);
        // console.log(bacteriaId);
        var bacteriaLabelsAll = sampleData.map(object => object.otu_labels)[0];
        //console.log(bacteriaLabelsAll)
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
        text: bacteriaLabels,
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
    // Use otu_ids for the x values.
    // Use sample_values for the y values.
    // Use sample_values for the marker size.
    // Use otu_ids for the marker colors.
    // Use otu_labels for the text values.
        let trace2 = {
            x: otu_ids,
            y: sampleV,
            text: bacteriaLabelsAll,
            mode: 'markers',
            marker: {
                size: sampleV,
                color: otu_ids,
                colorscale:"Electric"
            }
            
        };
        let bubbleData= [trace2];
        let layout2 = {
            title: 'Total number of Bacteria per Person',
            showlegend: true,
            xaxis: {title:"OTU ID"},
            automargin: true
        };
        Plotly.newPlot("bubble", bubbleData, layout2);
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