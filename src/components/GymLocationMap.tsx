import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  APILoadingStatus,
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
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
import { ErrorBoundary } from './ErrorBoundary';

declare const __MAPS_KEY_FALLBACK__: string;

interface GymLocationMapProps {
  lang: Language;
}

interface ResolvedPlaceInfo {
  position: google.maps.LatLngLiteral;
  displayName: string;
  formattedAddress: string;
  plusCode?: string;
  googleMapsURI?: string;
  attributions: { provider: string; providerURI?: string | null }[];
}

interface RouteSummary {
  distanceText: string;
  durationText: string;
  origin: google.maps.LatLngLiteral;
}

const ATTRIBUTION_IDS = ['gmp_mcp_codeassist_v1_aistudio'];

function getMapsApiKey(): string {
  return (
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
    (typeof __MAPS_KEY_FALLBACK__ !== 'undefined'
      ? __MAPS_KEY_FALLBACK__
      : '') ||
    ''
  );
}

function isQuotaError(err: unknown): boolean {
  const text =
    err instanceof Error
      ? `${err.name} ${err.message}`
      : typeof err === 'object' && err !== null
        ? JSON.stringify(err)
        : String(err);
  return (
    text.includes('RESOURCE_EXHAUSTED') ||
    text.includes('OVER_QUERY_LIMIT') ||
    text.includes('429')
  );
}

function GymMapInner({ lang }: GymLocationMapProps) {
  const t = TRANSLATIONS[lang].location;
  const apiStatus = useApiLoadingStatus();
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const routesLib = useMapsLibrary('routes');
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [resolvedPlace, setResolvedPlace] = useState<ResolvedPlaceInfo | null>(
    null,
  );
  const [placeLoading, setPlaceLoading] = useState(true);
  const [placeError, setPlaceError] = useState<string | null>(null);
  const [infoOpen, setInfoOpen] = useState(true);

  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [routeSummary, setRouteSummary] = useState<RouteSummary | null>(null);
  const polylinesRef = useRef<google.maps.Polyline[]>([]);

  const directMapsUrl = useMemo(
    () =>
      resolvedPlace?.googleMapsURI ||
      buildGoogleMapsSearchUrl(GYM_CONTACT.addressDisplay),
    [resolvedPlace],
  );

  const clearRoute = useCallback(() => {
    polylinesRef.current.forEach((polyline) => polyline.setMap(null));
    polylinesRef.current = [];
    setRouteSummary(null);
    setRouteError(null);
    if (map && resolvedPlace) {
      map.panTo(resolvedPlace.position);
      map.setZoom(16);
    }
  }, [map, resolvedPlace]);

  useEffect(() => {
    return () => {
      polylinesRef.current.forEach((polyline) => polyline.setMap(null));
      polylinesRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (apiStatus === APILoadingStatus.AUTH_FAILURE) {
      window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
      setPlaceLoading(false);
      setPlaceError(t.apiError);
    } else if (apiStatus === APILoadingStatus.FAILED) {
      setPlaceLoading(false);
      setPlaceError(t.apiError);
    }
  }, [apiStatus, t.apiError]);

  useEffect(() => {
    if (!placesLib) return;
    const { Place } = placesLib;

    let cancelled = false;
    setPlaceLoading(true);
    setPlaceError(null);

    async function resolveGymPlace() {
      const fields = [
        'displayName',
        'formattedAddress',
        'location',
        'googleMapsURI',
        'plusCode',
      ];

      for (const query of GYM_CONTACT.addressQueries) {
        const request: google.maps.places.SearchByTextRequest = {
          textQuery: query,
          fields,
          region: 'dz',
          language: lang,
          maxResultCount: 1,
          internalUsageAttributionIds: ATTRIBUTION_IDS,
        };

        const { places } = await Place.searchByText(request);
        const match = places?.[0];
        if (match?.location) {
          const lat =
            typeof match.location.lat === 'function'
              ? match.location.lat()
              : Number(match.location.lat);
          const lng =
            typeof match.location.lng === 'function'
              ? match.location.lng()
              : Number(match.location.lng);

          if (!cancelled) {
            setResolvedPlace({
              position: { lat, lng },
              displayName: GYM_CONTACT.brand,
              formattedAddress:
                match.formattedAddress || GYM_CONTACT.addressDisplay,
              plusCode: match.plusCode?.globalCode || undefined,
              googleMapsURI: match.googleMapsURI || undefined,
              attributions: (match.attributions || []).map((attr) => ({
                provider: attr.provider || 'Google Maps',
                providerURI: attr.providerURI,
              })),
            });
            setInfoOpen(true);
            setPlaceLoading(false);
          }
          return;
        }
      }

      if (!cancelled) {
        setPlaceLoading(false);
        setPlaceError(t.noResultsError);
      }
    }

    resolveGymPlace().catch((err) => {
      if (isQuotaError(err)) {
        window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
      }
      if (!cancelled) {
        setPlaceLoading(false);
        setPlaceError(t.apiError);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [placesLib, lang, t.apiError, t.noResultsError]);

  const handleGetDirections = useCallback(() => {
    if (!resolvedPlace) return;
    setRouteError(null);

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setRouteError(t.geoUnsupportedError);
      return;
    }

    if (!routesLib || !map) {
      setRouteError(t.routeError);
      return;
    }

    setRouteLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const origin: google.maps.LatLngLiteral = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        try {
          const response = await routesLib.Route.computeRoutes({
            origin,
            destination: resolvedPlace.position,
            travelMode: 'DRIVING',
            fields: ['path', 'distanceMeters', 'durationMillis', 'viewport'],
          });

          const primaryRoute = response.routes?.[0];
          if (!primaryRoute) {
            setRouteError(t.routeError);
            setRouteLoading(false);
            return;
          }

          polylinesRef.current.forEach((polyline) => polyline.setMap(null));
          const nextPolylines = primaryRoute.createPolylines();
          nextPolylines.forEach((polyline) => {
            polyline.setOptions({
              strokeColor: '#7CE81E',
              strokeOpacity: 0.95,
              strokeWeight: 5,
            });
            polyline.setMap(map);
          });
          polylinesRef.current = nextPolylines;

          if (primaryRoute.viewport) {
            map.fitBounds(primaryRoute.viewport, 48);
          }

          const formatted = formatRouteMetrics(
            primaryRoute.distanceMeters,
            primaryRoute.durationMillis,
            lang,
          );

          setRouteSummary({
            distanceText: formatted?.distanceText ?? '—',
            durationText: formatted?.durationText ?? '—',
            origin,
          });
        } catch (err) {
          if (isQuotaError(err)) {
            window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
          }
          setRouteError(t.routeError);
        } finally {
          setRouteLoading(false);
        }
      },
      () => {
        setRouteLoading(false);
        setRouteError(t.geoDeniedError);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }, [
    lang,
    map,
    resolvedPlace,
    routesLib,
    t.geoDeniedError,
    t.geoUnsupportedError,
    t.routeError,
  ]);

  return (
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
                {resolvedPlace?.formattedAddress &&
                  resolvedPlace.formattedAddress !==
                    GYM_CONTACT.addressDisplay && (
                    <dd className="mt-0.5 text-xs text-[#9BA69B]">
                      {resolvedPlace.formattedAddress}
                    </dd>
                  )}
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

          {routeSummary && (
            <div className="mt-6 rounded-xl border border-[#7CE81E]/35 bg-[#090B0A] p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-[#9BA69B]">
                    {t.routeDistanceLabel}
                  </p>
                  <p className="mt-0.5 font-display text-2xl font-bold text-[#7CE81E] tabular-nums">
                    {routeSummary.distanceText}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#9BA69B]">
                    {t.routeDurationLabel}
                  </p>
                  <p className="mt-0.5 font-display text-2xl font-bold text-[#F4F6F4] tabular-nums">
                    {routeSummary.durationText}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={clearRoute}
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
            onClick={handleGetDirections}
            disabled={!resolvedPlace || routeLoading}
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
        <div
          data-testid="gym-map-container"
          className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-white/12 bg-[#121513] sm:h-[440px]"
        >
          {placeLoading && (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
              <Loader2
                className="h-7 w-7 animate-spin text-[#7CE81E]"
                aria-hidden="true"
              />
              <p className="text-sm text-[#B8C0B8]">{t.loadingMap}</p>
            </div>
          )}

          {!placeLoading && placeError && (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
              <MapPin className="h-9 w-9 text-[#7CE81E]" aria-hidden="true" />
              <p dir="ltr" className="font-display text-2xl font-bold text-[#F4F6F4]">
                {GYM_CONTACT.addressDisplay}
              </p>
              <p className="max-w-md text-sm text-[#B8C0B8]">{placeError}</p>
              <a
                href={directMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#7CE81E] px-5 py-3 text-sm font-bold text-[#090B0A] hover:bg-[#8FF236]"
              >
                <span>{t.openInMapsBtn}</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          )}

          {!placeLoading && !placeError && resolvedPlace && (
            <GoogleMap
              mapId="DEMO_MAP_ID"
              defaultCenter={resolvedPlace.position}
              defaultZoom={16}
              gestureHandling="greedy"
              mapTypeControl={false}
              streetViewControl={false}
              fullscreenControl={true}
              internalUsageAttributionIds={ATTRIBUTION_IDS}
              className="h-full w-full"
            >
              <AdvancedMarker
                ref={markerRef}
                position={resolvedPlace.position}
                onClick={() => setInfoOpen((prev) => !prev)}
                title={GYM_CONTACT.brand}
              >
                <Pin
                  background="#7CE81E"
                  borderColor="#090B0A"
                  glyphColor="#090B0A"
                  scale={1.15}
                />
              </AdvancedMarker>

              {routeSummary && (
                <AdvancedMarker
                  position={routeSummary.origin}
                  title={t.userMarkerTitle}
                >
                  <Pin
                    background="#F4F6F4"
                    borderColor="#090B0A"
                    glyphColor="#090B0A"
                    scale={0.95}
                  />
                </AdvancedMarker>
              )}

              {infoOpen && marker && (
                <InfoWindow
                  anchor={marker}
                  maxWidth={290}
                  shouldFocus={false}
                  onCloseClick={() => setInfoOpen(false)}
                  headerContent={
                    <span className="text-sm font-extrabold tracking-tight text-[#090B0A]">
                      {GYM_CONTACT.brand}
                    </span>
                  }
                >
                  <div className="space-y-1.5 text-[#090B0A]">
                    <p className="text-xs text-[#374151]">
                      {t.infoWindowSubtitle}
                    </p>
                    <p dir="ltr" className="text-xs font-semibold text-[#111827]">
                      {GYM_CONTACT.addressDisplay}
                    </p>
                    <div className="flex items-center justify-between gap-3 pt-1 text-xs">
                      <a
                        href={GYM_CONTACT.phoneHref}
                        dir="ltr"
                        className="rounded font-semibold text-[#111827] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                      >
                        {GYM_CONTACT.phoneDisplay}
                      </a>
                      <a
                        href={directMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded font-semibold text-[#15803D] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                      >
                        Google Maps ↗
                      </a>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </div>

        {resolvedPlace?.attributions && resolvedPlace.attributions.length > 0 && (
          <p className="mt-2 text-xs text-[#6E786E]">
            {resolvedPlace.attributions.map((attr, idx) => (
              <span key={`${attr.provider}-${idx}`}>
                {idx > 0 ? ' · ' : ''}
                {attr.providerURI ? (
                  <a
                    href={attr.providerURI}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#9BA69B]"
                  >
                    {attr.provider}
                  </a>
                ) : (
                  attr.provider
                )}
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}

export function GymLocationMap({ lang }: GymLocationMapProps) {
  const t = TRANSLATIONS[lang].location;
  const apiKey = getMapsApiKey();
  const directMapsUrl = buildGoogleMapsSearchUrl(GYM_CONTACT.addressDisplay);

  const fallbackCard = (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="rounded-2xl border border-white/[0.08] bg-[#121513] p-6 sm:p-7 lg:col-span-5">
        <p className="text-sm font-medium text-[#7CE81E]">{t.eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-[#F4F6F4]">
          {t.title}
        </h2>
        <p className="mt-3 text-sm text-[#B8C0B8]">{t.subtitle}</p>
        <p dir="ltr" className="mt-5 font-semibold text-[#F4F6F4]">
          {GYM_CONTACT.addressDisplay}
        </p>
        <a
          href={directMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#7CE81E] px-4 py-3 text-sm font-bold text-[#090B0A] hover:bg-[#8FF236]"
        >
          <span>{t.openInMapsBtn}</span>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <div
        data-testid="gym-map-container"
        className="flex h-[380px] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-white/12 bg-[#121513] p-8 text-center sm:h-[440px] lg:col-span-7"
      >
        <MapPin className="h-8 w-8 text-[#7CE81E]" aria-hidden="true" />
        <p className="max-w-md text-sm text-[#B8C0B8]">
          {apiKey ? t.apiError : t.missingKeyError}
        </p>
      </div>
    </div>
  );

  return (
    <section
      id="gym-map"
      className="mt-16 border-t border-white/[0.08] pt-14"
      aria-label={t.title}
    >
      {apiKey ? (
        <ErrorBoundary fallback={fallbackCard}>
          <APIProvider
            apiKey={apiKey}
            libraries={['places', 'marker', 'routes']}
            language="fr"
            region="DZ"
          >
            <GymMapInner lang={lang} />
          </APIProvider>
        </ErrorBoundary>
      ) : (
        fallbackCard
      )}
    </section>
  );
}
