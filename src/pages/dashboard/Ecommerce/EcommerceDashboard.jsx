import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CustomDatePicker } from '@/components';
//import Statistics from './Statistics';
import PerformanceChart from './PerformanceChart';
import RevenueChart from './RevenueChart';
import RevenueByLocationChart from './RevenueByLocationChart';
import SalesChart from './SalesChart';
import Activity from './Activity';
import Products from './Products';
import Messages from '@/components/Messages/Messages'
import MessageDetail from '@/components/Messages/messageDetail';


const EcommerceDashboard = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedMessage, setSelectedMessage] = useState(null);


	return (
		<>
			<Row>
				<Col xs={12}>
					<div className="page-title-box">
						<div className="page-title-right">
							<form className="d-flex">
								<div className="input-group">
									<CustomDatePicker
										value={selectedDate}
										inputClass="form-control-light"
										onChange={(date) => {
											setSelectedDate(date);
										}}
									/>
								</div>
								<Link to="" className="btn btn-primary ms-2">
									<i className="mdi mdi-autorenew"></i>
								</Link>
								<Link to="" className="btn btn-primary ms-1">
									<i className="mdi mdi-filter-variant"></i>
								</Link>
							</form>
						</div>
						<h4 className="page-title">Dashboard</h4>
					</div>
				</Col>
			</Row>

			<Row>
				<Col xl={5} lg={6}>
					<Messages />
				</Col>
				<Col xl={7} lg={6}>
				<MessageDetail message={selectedMessage} />
				</Col>
				
			</Row>

			<Row>
				<Col lg={8}>
					<RevenueChart />
				</Col>
				<Col lg={4}>
					<RevenueByLocationChart />
				</Col>
			</Row>

			<Row>
				<Col xl={{ span: 6, order: 1 }} lg={{ span: 12, order: 2 }}>
					<Products />
				</Col>
				<Col xl={3} lg={{ span: 6, order: 1 }}>
					<SalesChart />
				</Col>
				<Col xl={3} lg={{ span: 6, order: 1 }}>
					<Activity />
				</Col>
			</Row>
		</>
	);
};

export { EcommerceDashboard };
