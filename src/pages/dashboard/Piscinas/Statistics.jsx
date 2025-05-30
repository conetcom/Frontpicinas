import { Card, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = () => {
	const [statistics, setStatistics] = useState([]);

	useEffect(() => {
		// Obtener datos desde la API
		axios.get('https://piscina-api.onrender.com/api/st_piscinas')
			.then(response => {
				setStatistics(response.data);
			})
			.catch(error => {
				console.error('Error al obtener los datos:', error);
			});
	}, []);

	return (
		<Row>
			<Col xs={12}>
				<Card className="widget-inline">
					<Card.Body className="p-0">
						<Row className="g-0">
							{/* Iterar sobre las estadísticas y renderizar cada una */}
							{statistics.map((stat, index) => (
								<>
									<Col key={index} sm={6} lg={2}>
										<Card className="shadow-none m-0">
											<Card.Body className="text-center">
												<i className="ri-briefcase-line text-muted font-24"></i>
												<h3>
													<span>{stat.ph}</span> {/* Mostrar valor de pH */}
												</h3>
												<p className="text-muted font-15 mb-0">P H</p>
											</Card.Body>
										</Card>
									</Col>

									<Col sm={6} lg={2}>
										<Card className="shadow-none m-0 border-start">
											<Card.Body className="text-center">
												<i className="ri-list-check-2 text-muted font-24"></i>
												<h3>
													<span>{stat.orp}</span> {/* Mostrar valor de ORP */}
												</h3>
												<p className="text-muted font-15 mb-0">O R P</p>
											</Card.Body>
										</Card>
									</Col>

									<Col sm={6} lg={2}>
										<Card className="shadow-none m-0 border-start">
											<Card.Body className="text-center">
												<i className={`ri-group-line text-muted font-24 ${stat.st_bombas ? "text-success" : "text-danger"}`}></i>
												<h3>
													<span>{stat.st_bombas ? "Encendido" : "Apagado"}</span> {/* Mostrar estado de BOMBA */}
												</h3>
												<p className="text-muted font-15 mb-0">BOMBA</p>
											</Card.Body>
										</Card>
									</Col>

									<Col sm={6} lg={2}>
										<Card className="shadow-none m-0 border-start">
											<Card.Body className="text-center">
												<i className={`ri-lightbulb-line text-muted font-24 ${stat.st_light ? "text-success" : "text-danger"}`}></i>
												<h3>
													<span>{stat.st_light ? "Encendido" : "Apagado"}</span> {/* Mostrar estado de LUCES */}
												</h3>
												<p className="text-muted font-15 mb-0">LUCES</p>
											</Card.Body>
										</Card>
									</Col>

									{/* Nueva columna para mostrar la fecha de registro como timestamp */}
									<Col sm={6} lg={4}>
										<Card className="shadow-none m-0 border-start">
											<Card.Body className="text-center">
												<i className="ri-calendar-line text-muted font-24"></i>
												<h3>
													<span>{new Date(stat.fecha_registro).toLocaleString()}</span> {/* Mostrar fecha y hora (timestamp) */}
												</h3>
												<p className="text-muted font-15 mb-0">Fecha de Registro</p>
											</Card.Body>
										</Card>
									</Col>
								</>
							))}
						</Row>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default Statistics;
