# Interactive-Visualizations-Dashboards
In this project, an interactive dashboard was built to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Plotly

* D3 library was used to read in samples.json.
* A horizontal bar chart was created with a dropdown menu to display the top 10 OTUs found in that individual.
* A bubble chart was also created to display all samples.
* The sample metadata was displayed, i.e., an individual's demographic information using each key-value pair from the metadata JSON object.
* All plots are updated each timea new sample is selected.

