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
    //.sort((a,b) => a-b)
    //console.log(name)

    d3.json("data/samples.json").then(readData => {
        var sampleData = readData.samples;
        filteredData = sampleData.filter(object => object.id == name)[0];        
        //console.log(filteredData);
        var sampleV = filteredData.sample_values;
        //console.log (sampleV)
        var sampleValues = sampleV.slice(0, 10);
        //console.log(sampleValues)
        var otu_ids = filteredData.otu_ids;
        // console.log (otu_ids)
        var bacteriaId = otu_ids.slice(0, 10);
        var bacteriaLabelsAll = filteredData.otu_labels;
        //console.log(bacteriaLabelsAll)
        var bacteriaLabels = bacteriaLabelsAll.slice(0, 10);
        //console.log(bacteriaId);
        var demoInfo = d3.select("#sample-metadata");
        demoInfo.html("");
        var subjectInfo = readData.metadata.filter(object => object.id == name)[0];
        // console.log(subjectInfo);
        Object.entries(subjectInfo).forEach(([key, value]) => { 
            demoInfo.append("h5").text(`${key} : ${value}`);
            
        });
        // var filteredData = readData.metadata.map(object => {
        //     if (object.id == name) {
        //         var washFreq = object.wfreq};
        //         console.log(washFreq)
            // });
        var filteredData = readData.metadata.map(object => object.wfreq);
        //console.log(washFreq)
        
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
            showlegend: false,
            xaxis: {title:"OTU ID"},
            automargin: true
        };
        Plotly.newPlot("bubble", bubbleData, layout2);

        var washingData = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: filteredData,
                title: { text: "Belly Button Washing Frequency: Scrubs per Week" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range :[null, 10]},
                    steps: [
                        {range: [0, 1], color: "#00429d"},
                        {range: [1, 2], color: "#2e59a8"},
                        {range: [2, 3], color: "#4771b2"},
                        {range: [3, 4], color: "#5d8abd"},
                        {range: [4, 5], color: "#73a2c6"},
                        {range: [5, 6], color: "#8abccf"},
                        {range: [6, 7], color: "#a5d5d8"},
                        {range: [7, 8], color: "#c5eddf"},
                        {range: [8, 9], color: "#ffffe0"}                            
                    ]
                }
            }
        ];
        
        var washLayout = { width: 600, height: 500, color: "Electric", margin: { t: 0, b: 0 } };
        Plotly.newPlot("gauge", washingData, washLayout);
        
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