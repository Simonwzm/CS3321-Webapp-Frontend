import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './index.css'
import naive from 'naive-ui'
// import ECharts from 'vue-echarts'
// import { use } from 'echarts/core'
// import { CanvasRenderer } from 'echarts/renderers'
// import { PieChart, LineChart } from 'echarts/charts'
// import { GridComponent, TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)
// use vue-echarts
// use([CanvasRenderer, PieChart, LineChart, GridComponent, TooltipComponent, TitleComponent, LegendComponent])    

app.mount('#app')
