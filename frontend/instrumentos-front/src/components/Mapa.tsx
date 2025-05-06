import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';  // Importar Leaflet para poder personalizar el marcador
import 'leaflet/dist/leaflet.css';

export const Mapa = () => {

    const lat: number = -32.8885;
    const long: number = -68.8355;

  // Crear un icono personalizado
    const customIcon = new L.Icon({
        iconUrl: 'https://images.icon-icons.com/1559/PNG/512/3440906-direction-location-map-marker-navigation-pin_107531.png', // Ruta a tu imagen personalizada
        iconSize: [40, 40], // Tamaño del ícono
        iconAnchor: [16, 32], // Punto de anclaje del ícono
        popupAnchor: [0, -32], // Donde se muestra el popup en relación al ícono
    });

    return (
        <MapContainer
        center={[lat, long]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        >
        {/* Capa de OpenStreetMap */}
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={[lat, long]} icon={customIcon}>
            <Popup>
                <div>
                    <span className='text-2xl text-slate-900 font-bold'>Musical Hendrix</span>
                </div>
                <div className='flex gap-2 mt-4'>
                    <span className='text-md text-slate-900 font-bold'>Direccion: </span>
                    <span>Av. Las Heras y Av. San Martin, Ciudad de Mendoza</span>
                </div>
            </Popup>
        </Marker>
        </MapContainer>
    );
};

export default Mapa;