import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Clock,
  ExternalLink,
  Loader2,
  MapPin,
  Navigation,
  Phone,
  RotateCcw,
} from 'lucide-react';
import { GYM_CONTACT } from '../data/gymData';
import { TRANSLATIONS } from '../i18n/translations';
import {
  Language,
  buildGoogleMapsSearchUrl,
  formatRouteMetrics,
} from '../utils/membership';

interface GymMapProps {
  lang: Language;
}

// Decoded coordinates for Plus Code 8F87RQ58+255 (Rue Lounis Mustapha, Jijel)
const GYM_COORDS: [number, number] = [36.807512, 5.765484];
const DEFAULT_ZOOM = 16;

function createGymMarkerIcon(): L.DivIcon {
  return L.divIcon({
    className: 'fa-custom-marker',
    iconSize: [38, 46],
    iconAnchor: [19, 44],
    popupAnchor: [0, -40],
    html: `<svg width="38" height="46" viewBox="0 0 38 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M19 1C9.611 1 2 8.611 2 18c0 12.16 14.84 25.03 16.37 26.31a1 1 0 0 0 1.26 0C21.16 43.03 36 30.16 36 18 36 8.611 28.389 1 19 1Z" fill="#84cc16" stroke="#65a30d" stroke-width="2"/>
      <circle cx="19" cy="18" r="6.5" fill="#090B0A"/>
      <circle cx="19" cy="18" r="2.5" fill="#84cc16"/>
    </svg>`,
  });
}

function createUserMarkerIcon(): L.DivIcon {
  return L.divIcon({
    className: 'fa-user-marker',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    html: `<span style="display:block;width:18px;height:18px;border-radius:9999px;background:#F4F6F4;border:3px solid #84cc16;box-shadow:0 0 0 4px rgba(132,204,22,0.28);"></span>`,
  });
}

function buildPopupElement(
  subtitle: string,
  directMapsUrl: string,
): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'min-w-[205px] space-y-1.5 text-left';
  wrapper.dir = 'ltr';

  const title = document.createElement('p');
  title.className = 'text-sm font-extrabold tracking-tight text-[#84cc16]';
  title.textContent = GYM_CONTACT.brand;
  wrapper.appendChild(title);

  const sub = document.createElement('p');
  sub.className = 'text-[11px] text-[#9BA69B]';
  sub.textContent = subtitle;
  wrapper.appendChild(sub);

  const address = document.createElement('p');
  address.className = 'text-xs font-semibold text-[#F4F6F4]';
  address.textContent = GYM_CONTACT.addressDisplay;
  wrapper.appendChild(address);

  const actions = document.createElement('div');
  actions.className =
    'flex items-center justify-between gap-3 border-t border-white/10 pt-2 text-xs';

  const phoneLink = document.createElement('a');
  phoneLink.href = GYM_CONTACT.phoneHref;
  phoneLink.className = 'font-semibold text-[#F4F6F4] hover:text-[#84cc16]';
  phoneLink.textContent = GYM_CONTACT.phoneDisplay;

  const mapsLink = document.createElement('a');
  mapsLink.href = directMapsUrl;
  mapsLink.target = '_blank';
  mapsLink.rel = 'noopener noreferrer';
  mapsLink.className = 'font-semibold text-[#84cc16] hover:underline';
  mapsLink.textContent = 'Google Maps ↗';

  actions.appendChild(phoneLink);
  actions.appendChild(mapsLink);
  wrapper.appendChild(actions);

  return wrapper;
}

function haversineMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function GymMap({ lang }: GymMapProps) {
  const t = TRANSLATIONS[lang].location;
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const gymMarkerRef = useRef<L.Marker | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);

  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [distanceSummary, setDistanceSummary] = useState<{
    distanceText: string;
    durationText: string;
  } | null>(null);

  const directMapsUrl = useMemo(
    () => buildGoogleMapsSearchUrl(GYM_CONTACT.addressDisplay),
    [],
  );

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const map = L.map(container, {
      center: GYM_COORDS,
      zoom: DEFAULT_ZOOM,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const marker = L.marker(GYM_COORDS, {
      icon: createGymMarkerIcon(),
      title: GYM_CONTACT.brand,
    }).addTo(map);

    marker.bindPopup(
      buildPopupElement(t.infoWindowSubtitle, directMapsUrl),
      { maxWidth: 280 },
    );
    marker.openPopup();

    mapInstanceRef.current = map;
    gymMarkerRef.current = marker;

    return () => {
      userMarkerRef.current = null;
      routeLineRef.current = null;
      gymMarkerRef.current = null;
      mapInstanceRef.current = null;
      map.remove();
    };
  }, [directMapsUrl]);

  useEffect(() => {
    if (gymMarkerRef.current) {
      gymMarkerRef.current.setPopupContent(
        buildPopupElement(t.infoWindowSubtitle, directMapsUrl),
      );
    }
  }, [t.infoWindowSubtitle, directMapsUrl]);

  const clearUserRoute = useCallback(() => {
    const map = mapInstanceRef.current;
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
    if (routeLineRef.current) {
      routeLineRef.current.remove();
      routeLineRef.current = null;
    }
    setDistanceSummary(null);
    setRouteError(null);
    if (map) {
      map.setView(GYM_COORDS, DEFAULT_ZOOM, { animate: true });
      gymMarkerRef.current?.openPopup();
    }
  }, []);

  const handleLocateDirections = useCallback(() => {
    setRouteError(null);
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setRouteError(t.geoUnsupportedError);
      return;
    }

    const map = mapInstanceRef.current;
    if (!map) return;

    setRouteLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userCoords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];

        userMarkerRef.current?.remove();
        routeLineRef.current?.remove();

        userMarkerRef.current = L.marker(userCoords, {
          icon: createUserMarkerIcon(),
          title: t.userMarkerTitle,
        }).addTo(map);

        routeLineRef.current = L.polyline([userCoords, GYM_COORDS], {
          color: '#84cc16',
          weight: 4,
          dashArray: '8 8',
          opacity: 0.9,
        }).addTo(map);

        map.fitBounds(L.latLngBounds([userCoords, GYM_COORDS]), {
          padding: [48, 48],
        });

        const meters = haversineMeters(
          userCoords[0],
          userCoords[1],
          GYM_COORDS[0],
          GYM_COORDS[1],
        );
        // Approximate urban drive duration (~30 km/h average)
        const approxMs = Math.max(60000, (meters / 8.33) * 1000);
        const formatted = formatRouteMetrics(meters, approxMs, lang);
        setDistanceSummary(formatted);
        setRouteLoading(false);
      },
      () => {
        setRouteLoading(false);
        setRouteError(t.geoDeniedError);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }, [lang, t.geoDeniedError, t.geoUnsupportedError, t.userMarkerTitle]);

  return (
    <section
      id="gym-map"
      className="mt-16 border-t border-white/[0.08] pt-14"
      aria-label={t.title}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
        <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#121513] p-6 sm:p-7 lg:col-span-5">
          <div>
            <p className="text-sm font-medium text-[#7CE81E]">{t.eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-[#F4F6F4] sm:text-4xl">
              {t.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B8C0B8]">
              {t.subtitle}
            </p>

            <dl className="mt-6 space-y-4 border-t border-white/[0.08] pt-6 text-sm">
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#7CE81E]"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs font-medium text-[#9BA69B]">
                    {t.addressLabel}
                  </dt>
                  <dd
                    dir="ltr"
                    className={`mt-0.5 font-semibold text-[#F4F6F4] ${
                      lang === 'ar' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {GYM_CONTACT.addressDisplay}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#7CE81E]"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs font-medium text-[#9BA69B]">
                    {t.hoursLabel}
                  </dt>
                  <dd className="mt-0.5 font-semibold text-[#F4F6F4] tabular-nums">
                    {GYM_CONTACT.hours[lang]}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#7CE81E]"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs font-medium text-[#9BA69B]">
                    {t.phoneLabel}
                  </dt>
                  <dd className="mt-0.5">
                    <a
                      href={GYM_CONTACT.phoneHref}
                      dir="ltr"
                      className="font-semibold text-[#F4F6F4] tabular-nums hover:text-[#7CE81E]"
                    >
                      {GYM_CONTACT.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            {distanceSummary && (
              <div className="mt-6 rounded-xl border border-[#84cc16]/35 bg-[#090B0A] p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-[#9BA69B]">
                      {t.routeDistanceLabel}
                    </p>
                    <p className="mt-0.5 font-display text-2xl font-bold text-[#84cc16] tabular-nums">
                      {distanceSummary.distanceText}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9BA69B]">
                      {t.routeDurationLabel}
                    </p>
                    <p className="mt-0.5 font-display text-2xl font-bold text-[#F4F6F4] tabular-nums">
                      {distanceSummary.durationText}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearUserRoute}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#B8C0B8] hover:text-[#F4F6F4] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.clearRouteBtn}</span>
                </button>
              </div>
            )}

            {routeError && (
              <p
                role="alert"
                className="mt-4 rounded-lg border border-amber-500/30 bg-amber-950/30 px-3.5 py-2.5 text-xs text-amber-200"
              >
                {routeError}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleLocateDirections}
              disabled={routeLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#7CE81E] px-4 py-3 text-sm font-bold text-[#090B0A] whitespace-nowrap transition-colors hover:bg-[#8FF236] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {routeLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Navigation className="h-4 w-4" aria-hidden="true" />
              )}
              <span>
                {routeLoading ? t.directionsLoading : t.directionsBtn}
              </span>
            </button>

            <a
              href={directMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-[#181C19] px-4 py-3 text-sm font-semibold text-[#F4F6F4] whitespace-nowrap transition-colors hover:border-[#7CE81E] hover:text-[#7CE81E]"
            >
              <span>{t.openInMapsBtn}</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="h-[380px] w-full sm:h-[440px]">
            <div
              ref={mapContainerRef}
              data-testid="gym-map-container"
              className="fa-leaflet-map h-full min-h-[320px] w-full rounded-xl overflow-hidden border border-white/12 bg-[#090B0A]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
