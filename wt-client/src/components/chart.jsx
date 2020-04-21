import React,{ Component } from 'react';
import ZingChart from 'zingchart-react';

class Chart extends Component {

	constructor(props) {
		super(props);

		const { data } = props;
		console.log(data.map((e,i) => [e.date.substring(0,10),data[i].value]));
		
		this.state = {
			chartConfig: {
				type: 'area',
				series: [
					{
						values: this.updateValues(data),
						'line-color': '#1DDB00',
						'line-width' : 2,
						'background-color': '#1DDB00 #FFFFFF',
						'alpha-area': 0.6,
						marker: {
							'background-color': '#1DDB00',/* hexadecimal or RGB value */
							size: 4,
							'border-color': '#FFFFFF',
							'border-width': 1
						}
					}
				]
			}
		};

		this.chart = React.createRef();
	}

	componentDidUpdate(prevProps) {
		if (this.props.data !== prevProps.data) {

			const chartConfig = {
				type: 'area',
				series: [
					{
						values: null,
						'line-color': '#1DDB00',
						'line-width' : 2,
						'background-color': '#1DDB00 #FFFFFF',
						'alpha-area': 0.6,
						marker: {
							'background-color': '#1DDB00',/* hexadecimal or RGB value */
							size: 4,
							'border-color': '#FFF',
							'border-width': 1
						}
					}
				]
			};

			chartConfig.series[0].values = this.updateValues(this.props.data);
			
			this.setState({ chartConfig });
			
			console.log(this.state.chartConfig.series[0]); //<--- state successfully updated
			this.chart.current.render({ data:this.state.chartConfig });
		}
	}

	updateValues(data) {
		return data.map((entry,i) => [this.formatDate(entry.date),data[i].value]);
	}

	formatDate(date) {
		const day = date.substring(8,10);
		const month = date.substring(5,7);
	
		return day + '-' + month; 
	}

	render() { 
		return (
			<ZingChart ref={this.chart} data={this.state.chartConfig}/>
		);
	}
}
 
export default Chart;