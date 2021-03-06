
# Belly Button Biodiversity Dashboard

<img src="https://github.com/tn64/Belly-Button-Biodiversity/blob/main/static/images/Bacteria.png">

This analysis examines bacteria samples from the Belly Button Biodiversity dataset which catalogs the microbes that colonize human navels and then displays results via an interactive dashboard. 

The dataset revealed that, of a large number of bacteria species, only a small handful of these species were present in more than 70% of people. The rest were rarely found.

# Tools Used:
- HTML, CSS, JavaScript, D3.js, Plotly, Bootstrap

## Bootstrap and Plotly
Using Bootstrap and JavaScript, I created test subject and demographic info panels. This allows users to filter demographic data by the subject id.

<img src="https://github.com/tn64/Belly-Button-Biodiversity/blob/main/static/images/Panels.png"><br>

Then I used the D3 library to read in the samples (samples.json), and used JavaScript and Plotly to create interactive charts.

I first created two charts:
- A horizontal bar chart displaying the top 10 bacteria species found in the research subjects.

<img src="https://github.com/tn64/Belly-Button-Biodiversity/blob/main/static/images/bar_chart.png"><br>

- A bubble chart showing the prevalence of bacteria cultures per subject id.

<img src="https://github.com/tn64/Belly-Button-Biodiversity/blob/main/static/images/bubble_chart.png"><br>

Finally, I created a gauge chart to show belly button washign frequency per week.

<img src="https://github.com/tn64/Belly-Button-Biodiversity/blob/main/static/images/gauge_chart.png"><br>

The resulting dashboard looks like this:

<img src="https://github.com/tn64/Belly-Button-Biodiversity/blob/main/static/images/page.png"><br>



