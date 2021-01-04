// * index 0 - id
// * index 1 - otu_ids
// * index 2 - sample_values
// * index 3 - otu_labels

d3.json("data/samples.json").then((readData) => {
    // console.log(readData);
    let data = readData;
    // let sampleValues = data.map(value => value.sample_values);
    // let bacteriaId = data.map(number => number.otu_ids);
    // let labels = data.map(label => label.otu_labels);
    let id= data.names;
    // console.log(id);
    let sortedValues = data.samples.map(object => object.sample_values).sort((a,b) => a-b);
    // console.log(sortedValues);
    // .forEach(name => name.sample_values.sort((a,b) => a-b));
    // console.log(sortedValues);
    let sliced = sortedValues.map(object => object.slice(0, 11));
    console.log(sliced);
});