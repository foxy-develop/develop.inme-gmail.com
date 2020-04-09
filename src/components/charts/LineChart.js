import { Line } from "vue-chartjs";
import { reactiveProp } from "vue-chartjs/es/mixins";
import ChartDataLabels from "chartjs-plugin-datalabels";
import router from "../../router";

const colors = {
  dark: {
    font: "#fff",
    line: "rgba(255,255,255,0.1)"
  },
  light: {
    font: "#414D55",
    line: "rgba(0,0,0,0.1)"
  }
};

const setPostRequest = (type, date) => {
  router.push("/mentions/" + type + "/" + date);
  console.log(type);
}
const customLabels = {
  labels: {
    value: 'o'
  },
  listeners: {
  },
  backgroundColor: 'rgba(14,214,220, 0)',
  borderRadius: 100,
  color: "rgba(255,255,255,0)",
  padding: 5
};

export default {
  extends: Line,
  props: ["chartData", "theme", "positive", "negative"],
  mixins: { reactiveProp },
  components: {
    ChartDataLabels
  },
  plugins: [ChartDataLabels],
  data() {
    return {
      labels: null,
      windowWidth: window.innerWidth,
      gradients: {
        negative: '',
        positive: ''
      },
      data: {
        labels: 0,
        xAxisID: "Дата",
        yAxisID: "Количество",
        datasets: [
          {
            datalabels: customLabels,
            borderDash: [],
            borderDashOffset: 0.0,
            label: ["Приемлимые"],
            data: [],
            backgroundColor: "rgba(14, 214, 220, 0.05)",
            pointBackgroundColor:"rgba(14, 214, 220, 0.7)",
            pointHoverBackgroundColor:"rgba(14, 214, 220, 1)",
            pointHoverBorderWidth: 5,
            borderColor: "#0ED6DC",
            borderWidth: 2,
            total: {
              domains: 0,
              links: 0
            }
          },
          {
            datalabels: customLabels,
            label: ["Негативные"],
            data: [],
            backgroundColor: "rgba(241, 117, 78, 0.1)",
            pointBackgroundColor:"rgba(241, 117, 78, 0.7)",
            pointHoverBackgroundColor:"rgba(241, 117, 78, 1)",
            pointHoverBorderWidth: 5,
            borderColor: "#F17105",
            borderWidth: 2,
            total: {
              domains: 0,
              links: 0
            }
          }
        ]
      },
      options: {
        dark: {
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 0
            }
          },
          maintainAspectRatio: false,
          responsive: true,
          aspectRatio: 1,
          tooltips: {
            callbacks: {
              labelTextColor: function(tooltipItem, chart) {
                if (tooltipItem.datasetIndex != 1) {
                  return '#0ed6dc';
                } else {
                  return '#f17105'
                }
              }
            },
            titleFontStyle: 'normal',
            bodyFontStyle: 'bold',
            backgroundColor: '#fff',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
            displayColors: false
          },

          legend: { display: false },
          scales: {
            yAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  zeroLineColor: "rgba(255, 255, 255, 0)",
                  color: "rgba(0,0,0,0)"
                },
                ticks: {
                  fontColor: colors.dark.font,
                  beginAtZero: true,
                  suggestedMin: 0,
                  maxTicksLimit: 8
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  zeroLineColor: "rgba(255, 255, 255, 0)",
                  color: colors.dark.line
                },
                ticks: {
                  fontColor: colors.dark.font,
                  maxTicksLimit: 10
                }
              }
            ]
          },
          animation: {
            duration: 1000,
            easing: "easeOutCirc"
          }
        },
        light: {
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 20,
              bottom: 0
            }
          },
          maintainAspectRatio: false,
          responsive: true,
          aspectRatio: 1,
          tooltips: {
            callbacks: {
              labelTextColor: function(tooltipItem, chart) {
                if (tooltipItem.datasetIndex != 1) {
                  return '#0ed6dc';
                } else {
                  return '#f17105'
                }
              }
            },
            titleFontStyle: 'normal',
            bodyFontStyle: 'bold',
            backgroundColor: '#414d55',
            titleFontColor: '#fff',
            bodyFontColor: '#fff',
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
            displayColors: false
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  zeroLineColor: "rgba(255, 255, 255, 0)",
                  color: "rgba(0,0,0,0)"
                },
                ticks: {
                  fontColor: colors.light.font,
                  beginAtZero: true,
                  suggestedMin: 0,
                  maxTicksLimit: 8
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  zeroLineColor: "rgba(255, 255, 255, 0)",
                  color: colors.light.line
                },
                ticks: {
                  fontColor: colors.light.font,
                  maxTicksLimit: 10
                }
              }
            ]
          },
          animation: {
            duration: 1000,
            easing: "easeOutCirc"
          }
        }
      },
      init: 0
    };
  },
  methods: {
    createGradients: function() {
      this.gradients.positive = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
      this.gradients.negative = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);

      this.gradients.positive.addColorStop(0, 'rgba(14, 214, 220, .35)');
      this.gradients.positive.addColorStop(1, 'rgba(14, 214, 220, 0)');

      this.gradients.negative.addColorStop(0, 'rgba(241, 117, 78, .35)');
      this.gradients.negative.addColorStop(1, 'rgba(241, 117, 78, 0)');
    },
    render: async function(update = false) {
      const data = await this.chartData;
      const options = this.options[this.theme];

      this.labels = this.prepareData(data.labels);

      this.data.labels = this.prepareData(data.labels);

      this.data.datasets[1].datalabels.listeners.click = context => {
        const type = context.dataset.label[0] === "Негативные" ? 'negative' : 'positive'
        setPostRequest(type, data.labels[context.dataIndex]);
      }


      this.data.datasets[0].datalabels.listeners.enter = () => { this.$refs.canvas.style.cursor = "pointer" };
      this.data.datasets[0].datalabels.listeners.leave = () => { this.$refs.canvas.style.cursor = "default"};

      this.data.datasets[0].data = this.prepareData(data.positive.data);
      this.data.datasets[0].total = data.positive.total;
      this.data.datasets[0].hidden = !this.positive;
      this.data.datasets[1].data = this.prepareData(data.negative.data);
      this.data.datasets[1].total = data.negative.total;
      this.data.datasets[1].hidden = !this.negative;

      this.data.datasets[0].backgroundColor = this.gradients.positive;
      this.data.datasets[1].backgroundColor = this.gradients.negative;

      update
        ? this.renderChart(this.data, options)
        : this.$data._chart.update();
    },
    prepareData: function(arr) {
      if (window.innerWidth <= 768 && arr.length > 10) {
        let newData = [];
        for (let i = 0; i < arr.length; ) {
          newData.push(arr[i]);
          i += Math.ceil(arr.length / 10);
        }
        return newData;
      } else {
        return arr;
      }
    },
    resizeData: async function() {
      if (this.$refs.canvas && window.innerWidth <= 768) {
        this.data.datasets[0].data = this.prepareData(this.chartData.positive.data);
        this.data.datasets[1].data = this.prepareData(this.chartData.negative.data);
        this.$data._chart.update();
      }
    }
  },
  mounted() {
    this.render(true);
    this.createGradients();
    window.addEventListener("resize", this.resizeData);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeData);
  },
  watch: {
    chartData() {
      this.render()
    },
    theme() {
      this.render(true);
    },
    positive() {
      this.render();
    },
    negative() {
      this.render();
    }
  }
};
