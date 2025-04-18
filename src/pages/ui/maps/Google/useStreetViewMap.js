import { useRef } from 'react';

export default function useStreetViewMap() {
	let mapRef = useRef();

	/**
	 * Assign reference of map
	 */
	const setMapRef = (map) => {
		mapRef = map;
	};

	/**
	 * Activate the street view
	 */
	const activateStreetView = (position) => {
		if (mapRef) {
			const mapObj = mapRef.map.getStreetView();
			mapObj.setPov({ heading: 34, pitch: 10 });
			mapObj.setPosition(position);
			mapObj.setVisible(true);
		}
	};

	return {
		setMapRef,
		activateStreetView,
	};
}
