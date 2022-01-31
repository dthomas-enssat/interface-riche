import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import styles from "./Map.module.css"

export function Map({waypoint, className}) {
    return (
        <section className={className}>
            <MapContainer 
                className={styles.map}
                center={[32.42, -90.13]}
                zoom={2}
                scrollWheelZoom={false}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                { waypoint && (<Marker position={[waypoint.lat, waypoint.lng]}>
                    <Popup>{waypoint.label}</Popup>
                </Marker>)}
            </MapContainer>
        </section>
    );
}