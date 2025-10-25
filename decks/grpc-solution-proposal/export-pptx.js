const pptxgen = require('pptxgenjs');
const { html2pptx } = require('@ant/html2pptx');
const fs = require('fs');
const path = require('path');

async function createPresentation() {
  // Initialize presentation
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Technical Team';
  pptx.title = 'Giải pháp Tối ưu gRPC và Metadata Kubernetes';
  
  // Get all slide files
  const slidesDir = path.join(__dirname, 'slides');
  const slideFiles = fs.readdirSync(slidesDir)
    .filter(f => f.startsWith('slide-') && f.endsWith('.html'))
    .sort();
  
  console.log(`Processing ${slideFiles.length} slides...`);
  
  // Chart data configurations
  const chartData = {
    'message-size-chart': {
      type: 'BAR',
      data: [
        {
          name: 'Configuration',
          labels: ['Agent Message', 'Server Limit', 'Recommended Max'],
          values: [12, 10, 25]
        }
      ],
      options: {
        barDir: 'bar', // horizontal
        chartColors: ['E33737', 'E33737', '4A90E2'],
        showTitle: true,
        title: 'Message Size (MB)',
        showCatAxisTitle: true,
        catAxisTitle: 'Configuration Type',
        showValAxisTitle: true,
        valAxisTitle: 'Size (MB)',
        dataLabelPosition: 'outEnd',
        valAxisMinVal: 0,
        valAxisMaxVal: 30,
        valAxisMajorUnit: 5
      }
    },
    'data-waste-chart': {
      type: 'PIE',
      data: [
        {
          name: 'Metadata Distribution',
          labels: ['Dữ liệu thay đổi', 'Dữ liệu không đổi'],
          values: [15, 85]
        }
      ],
      options: {
        chartColors: ['4A90E2', 'E33737'],
        showPercent: true,
        showLegend: true,
        legendPos: 'b',
        showTitle: true,
        title: 'Phân bổ Dữ liệu Metadata'
      }
    },
    'bandwidth-chart': {
      type: 'LINE',
      data: [
        {
          name: 'Polling',
          labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
        },
        {
          name: 'Streaming',
          labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          values: [12, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
        }
      ],
      options: {
        chartColors: ['E33737', '4A90E2'],
        lineSize: 3,
        showTitle: true,
        title: 'Băng thông theo thời gian',
        showCatAxisTitle: true,
        catAxisTitle: 'Thời gian (phút)',
        showValAxisTitle: true,
        valAxisTitle: 'Băng thông (MB/phút)',
        showLegend: true,
        legendPos: 'tr',
        valAxisMinVal: 0,
        valAxisMaxVal: 13,
        valAxisMajorUnit: 2
      }
    },
    'scalability-chart': {
      type: 'BAR',
      data: [
        {
          name: '1k pods',
          labels: ['API Req/sec', 'Metadata (MB)', 'Latency (ms)'],
          values: [10, 2, 50]
        },
        {
          name: '10k pods',
          labels: ['API Req/sec', 'Metadata (MB)', 'Latency (ms)'],
          values: [100, 20, 200]
        },
        {
          name: '20k pods',
          labels: ['API Req/sec', 'Metadata (MB)', 'Latency (ms)'],
          values: [200, 40, 500]
        }
      ],
      options: {
        barDir: 'col',
        chartColors: ['2ECC71', 'FF8C00', 'E33737'],
        showTitle: true,
        title: 'Metrics tại các quy mô cụm khác nhau',
        showCatAxisTitle: true,
        catAxisTitle: 'Metric Type',
        showValAxisTitle: true,
        valAxisTitle: 'Value',
        showLegend: true,
        legendPos: 'b',
        valAxisMinVal: 0,
        valAxisMaxVal: 550,
        valAxisMajorUnit: 100
      }
    }
  };
  
  // Process each slide
  for (const file of slideFiles) {
    const slideNum = file.match(/slide-(\d+)/)[1];
    const htmlPath = path.join(slidesDir, file);
    
    console.log(`Processing slide ${slideNum}: ${file}`);
    
    try {
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
    } catch (error) {
      console.error(`Error processing slide ${slideNum}:`, error.message);
      throw error;
    }
  }
  
  // Save presentation
  const outputFile = 'presentation.pptx';
  await pptx.writeFile({ fileName: outputFile });
  console.log(`\nPresentation saved: ${outputFile}`);
  
  return outputFile;
}

createPresentation().catch(error => {
  console.error('Export failed:', error);
  process.exit(1);
});

