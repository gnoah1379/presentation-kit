const pptxgen = require('pptxgenjs');
const { html2pptx } = require('@ant/html2pptx');
const fs = require('fs');
const path = require('path');

async function createPresentation() {
  // Initialize presentation
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'AI Assistant';
  pptx.title = 'AI Agentic Workflow';
  
  // Get all slide files
  const slidesDir = path.join(__dirname, 'slides');
  const slideFiles = fs.readdirSync(slidesDir)
    .filter(f => f.startsWith('slide-') && f.endsWith('.html'))
    .sort();
  
  console.log(`Processing ${slideFiles.length} slides...`);
  
  // Chart data configurations
  const chartData = {
    'benefits-chart': {
        type: 'BAR',
        data: [
            {
                name: 'Percentage Improvement',
                labels: ['Code Generation Speed', 'Bug Detection Rate', 'Documentation Time', 'Onboarding Time', 'Test Coverage'],
                values: [50, 30, -50, -35, 40]
            }
        ],
        options: {
            barDir: 'bar',
            showTitle: false,
            showCatAxisTitle: false,
            showValAxisTitle: false,
            chartColors: ['40695B'],
            showLegend: false,
            dataLabelPosition: 'outEnd',
            valAxisMinVal: -60,
            valAxisMaxVal: 60
        }
    }
  };
  
  // Process each slide
  for (const file of slideFiles) {
    const slideNum = file.match(/slide-(\d+)/)[1];
    const htmlPath = path.join(slidesDir, file);
    
    console.log(`Processing slide ${slideNum}: ${file}`);
    
    // Convert HTML to PowerPoint slide
    const { slide, placeholders } = await html2pptx(htmlPath, pptx);
    
    // Add charts to placeholders
    for (const placeholder of placeholders) {
      const chartConfig = chartData[placeholder.id];
      
      if (chartConfig) {
        console.log(`  Adding ${chartConfig.type} chart to ${placeholder.id}`);
        
        const chartType = pptx.charts[chartConfig.type];
        const chartOptions = {
          ...placeholder,
          ...chartConfig.options
        };
        
        slide.addChart(chartType, chartConfig.data, chartOptions);
      }
    }
  }
  
  // Save presentation
  const outputFile = 'presentation.pptx';
  await pptx.writeFile({ fileName: outputFile });
  console.log(`\nPresentation saved: ${outputFile}`);
}

createPresentation().catch(console.error);
