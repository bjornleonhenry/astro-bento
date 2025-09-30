import { createSignal, onMount, onCleanup } from "solid-js";
import {
  formatUserTime,
  getCountryFlag,
  formatDate,
  getLocationName,
  getCountryCode,
  getWeatherIcon,
  getWeatherDataFree,
  getCountryName,
} from "../lib/timeZoneUtils";

export default function TimeZoneCard() {
  // Reactive signals for all dynamic data
  const [weekDay, setWeekDay] = createSignal("Thursday");
  const [monthDay, setMonthDay] = createSignal("September 15");
  const [location, setLocation] = createSignal("now @ Stockholm");
  const [country, setCountry] = createSignal("SE");
  const [flag, setFlag] = createSignal("🇸🇪");
  const [timeText, setTimeText] = createSignal("15:30:45 CEST");
  const [weatherIcon, setWeatherIcon] = createSignal("🌤️");
  const [weatherTemp, setWeatherTemp] = createSignal("7°");
  const [showFullCountry, setShowFullCountry] = createSignal(false);

  let isUserLocation = false;
  let userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let interval: ReturnType<typeof setInterval>;

  // Function to update date and time displays
  function updateDateTime() {
    const now = new Date();
    const { weekDay: wd, monthDay: md } = formatDate(now);
    setWeekDay(wd);
    setMonthDay(md);
    setTimeText(formatUserTime(now, isUserLocation, userTimezone));
  }

  // Function to get user location and weather
  async function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("Location accepted, updating...");
          const { latitude, longitude } = position.coords;
          const locationName = await getLocationName(latitude, longitude);
          const countryCode = await getCountryCode(latitude, longitude);

          isUserLocation = true;
          setLocation(locationName);
          setCountry(countryCode);
          setFlag(getCountryFlag(countryCode));
          const weatherData = await getWeatherDataFree(latitude, longitude);
          setWeatherIcon(weatherData.icon);
          setWeatherTemp(`${weatherData.temp}°`);

          console.log("Updated values:", {
            isUserLocation,
            location: locationName,
            country: countryCode,
            flag: getCountryFlag(countryCode),
            weatherIcon: weatherData.icon,
            weatherTemp: weatherData.temp,
          });
        },
        async (error) => {
          console.error("Geolocation error:", error);
          isUserLocation = false;
          setLocation("now @ Stockholm");
          setCountry("SE");
          setFlag("🇸🇪");
          const weatherData = await getWeatherDataFree(59.3293, 18.0686);
          setWeatherIcon(weatherData.icon);
          setWeatherTemp(`${weatherData.temp}°`);
        }
      );
    } else {
      // Keep default Stockholm location
      isUserLocation = false;
      setLocation("now @ Stockholm");
      setCountry("SE");
      setFlag("🇸🇪");

      // Get real Stockholm weather
      const weatherData = await getWeatherDataFree(59.3293, 18.0686);
      setWeatherIcon(weatherData.icon);
      setWeatherTemp(`${weatherData.temp}°`);
    }
  }

  onMount(() => {
    updateDateTime();
    getUserLocation();
    interval = setInterval(updateDateTime, 1000);
  });

  onCleanup(() => {
    clearInterval(interval);
  });

  return (
    <div class="card group h-max sm:h-auto min-h-40 sm:min-h-auto overflow-hidden transform-y-[-40%] shadow-lg rounded-lg p-6 border border-darkslate-100 md:hover:border-gray-500 align-start flex-none justify-start relative transform perspective-1200 w-full transition duration-200 ease-in-out col-span-1 h-full lg:col-span-2 md:row-span-2">
      <div class="grid grid-cols-1 gap-4 h-full">
        <div class="flex flex-col gap-2">
          <div>
            <div class="text-lg md:text-base mb-4 flex flex-wrap items-center gap-1">
              <span class="text-white text-2xl f-bold">{location()},</span>
              <div class="flex items-center whitespace-nowrap">
                <span class="text-2xl text-neutral-100/100 f-bold mr-2">
                  {showFullCountry() ? getCountryName(country()) : country()}
                </span>
                <span class="text-2xl cursor-pointer" onClick={() => setShowFullCountry(!showFullCountry())}> {flag()}</span>
              </div>
            </div>

            <div class="flex items-start gap-2 flex-wrap md:flex-nowrap mb-0 min-w-0">
              <div class="text-xl md:text-lg lg:text-xl text-neutral-100/60 flex items-start gap-2 min-w-0 flex-wrap">
                <span class="relative top-1">{weekDay()}, {monthDay()}</span>
              </div>

              <div class="flex items-center gap-1 w-full md:w-auto mt-0 md:mt-0 justify-start">
                <span class="text-xl md:text-2xl text-neutral-100/90">{weatherIcon()}</span>
                <span class="text-xl md:text-2xl text-neutral-100/90 ml-0 f-bold">{weatherTemp()}</span>
              </div>
          </div>

            <div class="text-xl md:text-lg lg:text-2xl text-neutral-100/90 mb-0 f-bold flex">
              <span>
                <time
                  datetime={new Date().toISOString()}
                  class="text-4xl md:text-3xl lg:text-5xl flex h-full tracking"
                >
                  {timeText()}
                </time>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}