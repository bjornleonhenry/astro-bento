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

  const [weekDay, setWeekDay] = createSignal("Thursday");
  const [monthDay, setMonthDay] = createSignal("September 15");
  const [location, setLocation] = createSignal("Stockholm");
  const [country, setCountry] = createSignal("SE");
  const [flag, setFlag] = createSignal("🇸🇪");
  const [timeText, setTimeText] = createSignal("15:30:45 CEST");
  const [weatherIcon, setWeatherIcon] = createSignal("🌤️");
  const [weatherTemp, setWeatherTemp] = createSignal("7°");
  const [showFullCountry, setShowFullCountry] = createSignal(true);
  const [showCountryText, setShowCountryText] = createSignal(false);
  const [currentDate, setCurrentDate] = createSignal(new Date());
  const [codeCookText, setCodeCookText] = createSignal("Code");
  const [isSwitching, setIsSwitching] = createSignal(false);

  let isUserLocation = false;
  let userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let interval: ReturnType<typeof setInterval>;


  function updateDateTime() {
    const now = new Date();
    setCurrentDate(now);
    const { weekDay: wd, monthDay: md } = formatDate(now);
    setWeekDay(wd);
    setMonthDay(md);
    setTimeText(formatUserTime(now, isUserLocation, userTimezone));
  }


  // Function to toggle between user location and default
  async function toggleLocation() {
    if (isSwitching()) return; // Prevent multiple simultaneous switches

    setIsSwitching(true);

    try {
      if (isUserLocation) {
        // Switching FROM user location TO default
        setCodeCookText("Code");
        setLocation("Stockholm");
        setCountry("SE");
        setFlag("🇸🇪");

        // Fetch Stockholm weather
        const weatherData = await getWeatherDataFree(59.3293, 18.0686);
        console.log("Switching to Stockholm weather:", weatherData);
        setWeatherIcon(weatherData.icon);
        setWeatherTemp(`${weatherData.temp}°`);

        isUserLocation = false;
      } else {
        // Switching FROM default TO user location
        setCodeCookText("Cook");

        // Try to get user location and weather
        if (navigator.geolocation) {
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 10000,
                enableHighAccuracy: false
              });
            });

            const { latitude, longitude } = position.coords;
            const [locationName, countryCode, weatherData] = await Promise.all([
              getLocationName(latitude, longitude),
              getCountryCode(latitude, longitude),
              getWeatherDataFree(latitude, longitude)
            ]);

            // Update all elements simultaneously
            setLocation(locationName);
            setCountry(countryCode);
            setFlag(getCountryFlag(countryCode));
            setWeatherIcon(weatherData.icon);
            setWeatherTemp(`${weatherData.temp}°`);

            isUserLocation = true;
          } catch (error) {
            console.error("Geolocation error:", error);
            // Fall back to Stockholm
            setCodeCookText("Code");
            setLocation("Stockholm");
            setCountry("SE");
            setFlag("🇸🇪");

            const weatherData = await getWeatherDataFree(59.3293, 18.0686);
            setWeatherIcon(weatherData.icon);
            setWeatherTemp(`${weatherData.temp}°`);

            isUserLocation = false;
          }
        } else {
          // Geolocation not supported, stay on default
          setCodeCookText("Code");
          setLocation("Stockholm");
          setCountry("SE");
          setFlag("🇸🇪");

          const weatherData = await getWeatherDataFree(59.3293, 18.0686);
          setWeatherIcon(weatherData.icon);
          setWeatherTemp(`${weatherData.temp}°`);

          isUserLocation = false;
        }
      }
    } finally {
      setIsSwitching(false);
    }
  }

  async function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("Location accepted, updating...");
          const { latitude, longitude } = position.coords;
          const locationName = await getLocationName(latitude, longitude);
          const countryCode = await getCountryCode(latitude, longitude);

          isUserLocation = true;
          setCodeCookText("Cook");
          setLocation(locationName);
          setCountry(countryCode);
          setFlag(getCountryFlag(countryCode));
          const weatherData = await getWeatherDataFree(latitude, longitude);
          console.log("User location weather:", weatherData);
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
          setCodeCookText("Code");
          setLocation("Stockholm");
          setCountry("SE");
          setFlag("🇸🇪");
          const weatherData = await getWeatherDataFree(59.3293, 18.0686);
          console.log("Geolocation error, fallback to Stockholm weather:", weatherData);
          setWeatherIcon(weatherData.icon);
          setWeatherTemp(`${weatherData.temp}°`);
        }
      );
    } else {
      // Keep default Stockholm location
      isUserLocation = false;
      setCodeCookText("Code");
      setLocation("Stockholm");
      setCountry("SE");
      setFlag("🇸🇪");

      const weatherData = await getWeatherDataFree(59.3293, 18.0686);
      console.log("Geolocation not supported, Stockholm weather:", weatherData);
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
            <div class={`card group h-full sm:h-auto min-h-40 sm:min-h-auto overflow-visible shadow-lg rounded-lg p-6 border border-darkslate-100 md:hover:border-gray-500 align-start flex-none justify-start relative w-full transition-transform duration-300 ease-in-out col-span-1 lg:col-span-2 md:row-span-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] hover:-translate-y-1 ${isSwitching() ? 'animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent' : ''}`}>
      <div class="grid grid-cols-0 gap-0 h-full">
        <div class={`flex flex-col gap-0 transition-all duration-300 ${isSwitching() ? 'opacity-70 scale-95' : 'opacity-100 scale-100'}`}>
          <div class="text-lg md:text-base mb-o flex items-center gap-1">
            <span class="text-white text-2xl f-bold mr-1 cursor-pointer transition-all duration-300 hover:scale-110 hover:text-blue-300" id="code-cook">{codeCookText()} </span>
            <span class="text-white text-2xl f-bold mr-1 cursor-pointer">@ </span>
            <span class="text-white text-2xl f-bold mr-1 cursor-pointer transition-all duration-300 hover:scale-105 hover:text-blue-400 active:scale-95" onClick={toggleLocation}>{location()} {isSwitching() && <span class="inline-block animate-spin ml-1">⟳</span>}</span>
            <div class="flex items-center whitespace-nowrap" >
              <span class="text-neutral-100/60 text-2xl cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12 active:scale-110" onClick={() => setShowCountryText(!showCountryText())}>
                {flag()}
              </span>
              {showCountryText() && (
                <span class="text-white text-2xl f-bold text-neutral-100/100 cursor-pointer ml-2 transition-all duration-500 ease-in-out opacity-100 transform translate-x-0 hover:text-yellow-300 animate-fade-in" onClick={() => setShowFullCountry(!showFullCountry())}>
                  {showFullCountry() ? getCountryName(country()) : country()}
                </span>
              )}
            </div>
          </div>
          <div class="flex items-start gap-2 flex-wrap md:flex-nowrap mb-4 min-w-0 tracking-wider">
            <span class="relative top-0 text-neutral-100/60 transition-all duration-300">{weekDay()}, {monthDay()}</span>
            <span class="text-1xl text-neutral-100/100 transition-all duration-500 ease-in-out hover:scale-110">{weatherIcon()}</span>
            <span class="text-1xl f-bold text-neutral-100/100 transition-all duration-300 hover:text-blue-300">{weatherTemp()}</span>
          </div>
          <div class="text-xl md:text-lg lg:text-2xl text-neutral-100/90 mt-1 f-bold flex">
            <span>
              <time
                datetime={currentDate().toISOString()}
                class="text-4xl md:text-3xl lg:text-5xl flex h-full tracking-widest transition-all duration-300"
              >
                {timeText()}
              </time>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}