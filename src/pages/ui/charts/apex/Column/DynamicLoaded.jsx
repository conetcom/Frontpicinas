import { Col, Row } from 'react-bootstrap';
import ApexCharts from 'apexcharts';
import { useEffect } from 'react';

const DynamicLoaded = () => {
	useEffect(() => {
		/**
		 * Randomize array element order in-place.
		 * Using Durstenfeld shuffle algorithm.
		 */
		function shuffleArray(array) {
			for (let i = array.length - 1; i > 0; i--) {
				let j = Math.floor(Math.random() * (i + 1));
				let temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
			return array;
		}

		let arrayData = [
			{
				y: 400,
				quarters: [
					{
						x: 'Q1',
						y: 120,
					},
					{
						x: 'Q2',
						y: 90,
					},
					{
						x: 'Q3',
						y: 100,
					},
					{
						x: 'Q4',
						y: 90,
					},
				],
			},
			{
				y: 430,
				quarters: [
					{
						x: 'Q1',
						y: 120,
					},
					{
						x: 'Q2',
						y: 110,
					},
					{
						x: 'Q3',
						y: 90,
					},
					{
						x: 'Q4',
						y: 110,
					},
				],
			},
			{
				y: 448,
				quarters: [
					{
						x: 'Q1',
						y: 70,
					},
					{
						x: 'Q2',
						y: 100,
					},
					{
						x: 'Q3',
						y: 140,
					},
					{
						x: 'Q4',
						y: 138,
					},
				],
			},
			{
				y: 470,
				quarters: [
					{
						x: 'Q1',
						y: 150,
					},
					{
						x: 'Q2',
						y: 60,
					},
					{
						x: 'Q3',
						y: 190,
					},
					{
						x: 'Q4',
						y: 70,
					},
				],
			},
			{
				y: 540,
				quarters: [
					{
						x: 'Q1',
						y: 120,
					},
					{
						x: 'Q2',
						y: 120,
					},
					{
						x: 'Q3',
						y: 130,
					},
					{
						x: 'Q4',
						y: 170,
					},
				],
			},
			{
				y: 580,
				quarters: [
					{
						x: 'Q1',
						y: 170,
					},
					{
						x: 'Q2',
						y: 130,
					},
					{
						x: 'Q3',
						y: 120,
					},
					{
						x: 'Q4',
						y: 160,
					},
				],
			},
		];

		function makeData() {
			let dataSet = shuffleArray(arrayData);

			let dataYearSeries = [
				{
					x: '2011',
					y: dataSet[0].y,
					color: '#727cf5',
					quarters: dataSet[0].quarters,
				},
				{
					x: '2012',
					y: dataSet[1].y,
					color: '#6c757d',
					quarters: dataSet[1].quarters,
				},
				{
					x: '2013',
					y: dataSet[2].y,
					color: '#0acf97',
					quarters: dataSet[2].quarters,
				},
				{
					x: '2014',
					y: dataSet[3].y,
					color: '#fa5c7c',
					quarters: dataSet[3].quarters,
				},
				{
					x: '2015',
					y: dataSet[4].y,
					color: '#ffbc00',
					quarters: dataSet[4].quarters,
				},
				{
					x: '2016',
					y: dataSet[5].y,
					color: '#39afd1',
					quarters: dataSet[5].quarters,
				},
			];

			return dataYearSeries;
		}

		function updateQuarterChart(sourceChart, destChartIDToUpdate) {
			let series = [];
			let seriesIndex = 0;
			let colors = [];

			if (sourceChart.w.globals.selectedDataPoints[0]) {
				let selectedPoints = sourceChart.w.globals.selectedDataPoints;
				for (let i = 0; i < selectedPoints[seriesIndex].length; i++) {
					let selectedIndex = selectedPoints[seriesIndex][i];
					let yearSeries = sourceChart.w.config.series[seriesIndex];
					series.push({
						name: yearSeries.data[selectedIndex].x,
						data: yearSeries.data[selectedIndex].quarters,
					});
					colors.push(yearSeries.data[selectedIndex].color);
				}

				if (series.length === 0)
					series = [
						{
							data: [],
						},
					];

				return ApexCharts.exec(destChartIDToUpdate, 'updateOptions', {
					series: series,
					colors: colors,
					fill: {
						colors: colors,
					},
				});
			}
		}

		let options = {
			series: [
				{
					data: makeData(),
				},
			],
			chart: {
				id: 'barYear',
				height: 400,
				width: '100%',
				type: 'bar',
				toolbar: {
					show: false,
				},
				events: {
					dataPointSelection: function (e, chart, opts) {
						let quarterChartEl = document.querySelector('#chart-quarter');
						let yearChartEl = document.querySelector('#chart-year');

						if (opts.selectedDataPoints[0].length === 1) {
							if (quarterChartEl?.classList.contains('active')) {
								updateQuarterChart(chart, 'barQuarter');
							} else {
								yearChartEl?.classList.add('chart-quarter-activated');
								quarterChartEl?.classList.add('active');
								updateQuarterChart(chart, 'barQuarter');
							}
						} else {
							updateQuarterChart(chart, 'barQuarter');
						}

						if (opts.selectedDataPoints[0].length === 0) {
							yearChartEl?.classList.remove('chart-quarter-activated');
							quarterChartEl?.classList.remove('active');
						}
					},
					updated: function (chart) {
						updateQuarterChart(chart, 'barQuarter');
					},
				},
			},
			plotOptions: {
				bar: {
					distributed: true,
					horizontal: true,
					barHeight: '75%',
					dataLabels: {
						position: 'bottom',
					},
				},
			},
			dataLabels: {
				enabled: true,
				textAnchor: 'start',
				style: {
					colors: ['#fff'],
				},
				formatter: function (val, opt) {
					return opt.w.globals.labels[opt.dataPointIndex];
				},
				offsetX: 0,
				dropShadow: {
					enabled: true,
				},
			},

			colors: ['#727cf5', '#6c757d', '#0acf97', '#fa5c7c', '#ffbc00', '#39afd1'],

			states: {
				normal: {
					filter: {
						type: 'desaturate',
					},
				},
				active: {
					allowMultipleDataPointsSelection: true,
					filter: {
						type: 'darken',
						value: 1,
					},
				},
			},
			tooltip: {
				x: {
					show: false,
				},
				y: {
					title: {
						formatter: function (val, opts) {
							return opts.w.globals.labels[opts.dataPointIndex];
						},
					},
				},
			},
			title: {
				text: 'Yearly Results',
				offsetX: 15,
			},
			subtitle: {
				text: '(Click on bar to see details)',
				offsetX: 15,
			},
			yaxis: {
				labels: {
					show: false,
				},
			},
		};

		let chart = new ApexCharts(document.querySelector('#chart-year'), options);
		chart.render();

		let optionsQuarter = {
			series: [
				{
					data: [],
				},
			],
			chart: {
				id: 'barQuarter',
				height: 400,
				width: '100%',
				type: 'bar',
				stacked: true,
			},
			plotOptions: {
				bar: {
					columnWidth: '50%',
					horizontal: false,
				},
			},
			legend: {
				show: false,
			},
			grid: {
				yaxis: {
					lines: {
						show: false,
					},
				},
				xaxis: {
					lines: {
						show: true,
					},
				},
			},
			yaxis: {
				labels: {
					show: false,
				},
			},
			title: {
				text: 'Quarterly Results',
				offsetX: 10,
			},
			tooltip: {
				x: {
					formatter: function (val, opts) {
						return opts.w.globals.seriesNames[opts.seriesIndex];
					},
				},
				y: {
					title: {
						formatter: function (val, opts) {
							return opts.w.globals.labels[opts.dataPointIndex];
						},
					},
				},
			},
		};

		let chartQuarter = new ApexCharts(document.querySelector('#chart-quarter'), optionsQuarter);
		chartQuarter.render();

		document.querySelector('#phoneModel')?.addEventListener('change', function () {
			chart.updateSeries([
				{
					data: makeData(),
				},
			]);
		});
		return () => {
			chart.destroy();
			chartQuarter.destroy();
		};
	}, []);

	return (
		<>
			<div dir="ltr">
				<Row>
					<Col sm={6}>
						<div id="chart-year"></div>
					</Col>
					<Col sm={6}>
						<div id="chart-quarter"></div>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default DynamicLoaded;
