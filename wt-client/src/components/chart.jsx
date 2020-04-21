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
							size: 2,
							'border-color': '#1DDB00',
							'border-width': 2
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
					{values: null}
				]
			};

			chartConfig.series[0].values = this.updateValues(this.props.data);
			
			this.setState({ chartConfig });
			
			console.log(this.state.chartConfig.series[0]); //<--- state successfully updated
			this.chart.current.render({ data:this.state.chartConfig });
		}
	}

	updateValues(data) {
		return data.map((entry,i) => [entry.date.substring(0,10),data[i].value]);
	}

	render() { 
		return (
			<ZingChart ref={this.chart} data={this.state.chartConfig} complete={this.chartDone} />
		);
	}

	chartDone(event) {
		console.log('Event "Complete" - The chart is rendered\n');
	}

}
 
export default Chart;