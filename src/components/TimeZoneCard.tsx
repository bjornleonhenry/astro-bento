import { createSignal, onMount, onCleanup } from "solid-js";
import {
  formatUserTime,
  getCountryFlag,
  formatDate,
  getLocationName,
  getCountryCode,
  getWeatherIcon,
  getWeatherDataFree,
  getTimeZoneName,
  getCountryName,
} from "../lib/timeZoneUtils";

export default function TimeZoneCard() {

  const [weekDay, setWeekDay] = createSignal("Thursday");
  const [monthDay, setMonthDay] = createSignal("September 15");
  const [location, setLocation] = createSignal("Stockholm");
  const [country, setCountry] = createSignal("SE");
  const [flag, setFlag] = createSignal("🇸🇪");
  const [timeText, setTimeText] = createSignal("15:30:45 CEST");
  const [weatherIcon, setWeatherIcon] = createSignal("");
  const [weatherTemp, setWeatherTemp] = createSignal("");
  const [showFullCountry, setShowFullCountry] = createSignal(true);
  const [showCountryText, setShowCountryText] = createSignal(true);
  const [currentDate, setCurrentDate] = createSignal(new Date());
  const [codeCookText, setCodeCookText] = createSignal("Code");
  const [isSwitching, setIsSwitching] = createSignal(false);

  let isUserLocation = false;
  // start with default timezone for Stockholm
  let userTimezone = "Europe/Stockholm";
  let interval: ReturnType<typeof setInterval>;


  function updateDateTime(timeZone?: string) {
    const now = new Date();
    setCurrentDate(now);
    const { weekDay: wd, monthDay: md } = formatDate(now, timeZone);
    setWeekDay(wd);
    setMonthDay(md);
    const tzToUse = timeZone || userTimezone;
    const shortName = getTimeZoneName(tzToUse);
    const baseTime = formatUserTime(now, tzToUse);
    setTimeText(`${baseTime}${shortName ? ' ' + shortName : ''}`);
    // Debug log to trace timezone and formatted values
    // console.debug("updateDateTime -> now:", now.toISOString(), "tz:", tzToUse, "weekDay:", wd, "monthDay:", md, "timeText:", formatUserTime(now, tzToUse), "tzName:", shortName);
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
      //  console.log("Switching to Stockholm weather:", weatherData);
        setWeatherIcon(weatherData.icon);
        setWeatherTemp(`${weatherData.temp}°`);

        isUserLocation = false;
        // Immediately refresh displayed date/time for default timezone
        userTimezone = "Europe/Stockholm";
        updateDateTime(userTimezone);
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

            // If the weather API returned a timezone, use that as the displayed timezone.
            if (weatherData.timezone) {
              userTimezone = weatherData.timezone;
            } else {
              // fallback to browser-resolved timezone
              userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            }

            isUserLocation = true;
          //  console.debug("User location set -> location:", locationName, "country:", countryCode, "weather.timezone:", weatherData.timezone, "userTimezone:", userTimezone);
            // Recompute date/time strings using the user's timezone immediately
            updateDateTime(userTimezone);
          } catch (error) {
          //  console.error("Geolocation error:", error);
            // Fall back to Stockholm
            setCodeCookText("Code");
            setLocation("Stockholm");
            setCountry("SE");
            setFlag("🇸🇪");

            const weatherData = await getWeatherDataFree(59.3293, 18.0686);
            setWeatherIcon(weatherData.icon);
            setWeatherTemp(`${weatherData.temp}°`);

            isUserLocation = false;
            userTimezone = "Europe/Stockholm";
          //  console.debug("Geolocation fallback to Stockholm -> userTimezone:", userTimezone);
            updateDateTime(userTimezone);
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
          userTimezone = "Europe/Stockholm";
        //  console.debug("Geolocation not supported -> fallback userTimezone:", userTimezone);
          updateDateTime(userTimezone);
        }
      }
    } finally {
      setIsSwitching(false);
    }
  }

  async function getUserLocation() {
    if (!navigator.geolocation) {
      // Keep default Stockholm location
      isUserLocation = false;
      setCodeCookText("Code");
      setLocation("Stockholm");
      setCountry("SE");
      setFlag("🇸🇪");

      const weatherData = await getWeatherDataFree(59.3293, 18.0686);
    //  console.log("Geolocation not supported, Stockholm weather:", weatherData);
      setWeatherIcon(weatherData.icon);
      setWeatherTemp(`${weatherData.temp}°`);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setIsSwitching(true);
        try {
        //  console.log("Location accepted, updating...");
          const { latitude, longitude } = position.coords;

          // Fetch all required data in parallel
          const [locationName, countryCode, weatherData] = await Promise.all([
            getLocationName(latitude, longitude),
            getCountryCode(latitude, longitude),
            getWeatherDataFree(latitude, longitude),
          ]);

          // Batch update signals for a single UI change
          isUserLocation = true;
          setCodeCookText("Cook");
          setLocation(locationName);
          setCountry(countryCode);
          setFlag(getCountryFlag(countryCode));
          setWeatherIcon(weatherData.icon);
          setWeatherTemp(`${weatherData.temp}°`);

          // Determine timezone
          userTimezone = weatherData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

          // Update date/time once with the final timezone
          updateDateTime(userTimezone);

        //   console.log("Updated values:", {
        //    isUserLocation,
        //    location: locationName,
        //    country: countryCode,
        //    flag: getCountryFlag(countryCode),
        //    weatherIcon: weatherData.icon,
        //    weatherTemp: weatherData.temp,
        //    timezone: userTimezone,
        //  });
        } catch (err) {
        //  console.error("Error updating user location:", err);
          // fallback to Stockholm
          isUserLocation = false;
          setCodeCookText("Code");
          setLocation("Stockholm");
          setCountry("SE");
          setFlag("🇸🇪");
          const weatherData = await getWeatherDataFree(59.3293, 18.0686);
          setWeatherIcon(weatherData.icon);
          setWeatherTemp(`${weatherData.temp}°`);
          userTimezone = weatherData.timezone || "Europe/Stockholm";
          updateDateTime(userTimezone);
        } finally {
          setIsSwitching(false);
        }
      },
      async (error) => {
      // .error("Geolocation error:", error);
        isUserLocation = false;
        setCodeCookText("Code");
        setLocation("Stockholm");
        setCountry("SE");
        setFlag("🇸🇪");
        const weatherData = await getWeatherDataFree(59.3293, 18.0686);
        console.log("Geolocation error, fallback to Stockholm weather:", weatherData);
        setWeatherIcon(weatherData.icon);
        setWeatherTemp(`${weatherData.temp}°`);
        setIsSwitching(false);
      }
    );
  }

  onMount(() => {
    updateDateTime(userTimezone);
    // Fetch default Stockholm weather immediately so UI shows it while geolocation resolves
    (async () => {
      try {
        const defaultWeather = await getWeatherDataFree(59.3293, 18.0686);
        if (defaultWeather) {
          setWeatherIcon(defaultWeather.icon);
          setWeatherTemp(`${defaultWeather.temp}°`);
          // If backend gives a timezone for Stockholm, ensure userTimezone stays consistent
          if (defaultWeather.timezone) {
            // Keep default userTimezone as returned (usually Europe/Stockholm)
            userTimezone = defaultWeather.timezone;
            updateDateTime(userTimezone);
          }
        }
      } catch (e) {
      //  console.error('Error fetching default weather:', e);
      }
    })();

    getUserLocation();
    interval = setInterval(() => updateDateTime(userTimezone), 1000);
  });

  onCleanup(() => {
    clearInterval(interval);
  });

  // <span class="text-neutral-100/60 hover:text-neutral-100/100 text-4xl cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-4 active:scale-110 ml-4 mr-4 mb-1" onClick={() => setShowCountryText(!showCountryText())}>{flag()}</span>
  //         <span class="text-2xl ml-1 mr-1">{flag()}</span>     <span class="text-2xl mr-1 f-bold">{showFullCountry() ? getCountryName(country()) : country()}</span>

  return (
    <div class={`card group h-full sm:h-auto min-h-40 sm:min-h-auto overflow-visible shadow-lg rounded-lg p-6 border border-darkslate-100 md:hover:border-gray-500 align-start flex-none justify-start relative w-full transition-transform duration-300 ease-in-out col-span-1 lg:col-span-2 md:row-span-2 cursor-pointer hover:shadow-green-500/10  ${isSwitching() ? 'animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent' : ''}`}  onClick={toggleLocation}>
      <div class="grid grid-cols-0 gap-0 h-full w-full overflow-hidden">
        <div class={`flex flex-col gap-0 transition-all duration-300 ${isSwitching() ? 'opacity-80 scale-98 animate pulse' : 'opacity-100 scale-100'}`}>
          {/* Allow wrapping on small screens: use flex-wrap and remove forced whitespace-nowrap */}
          <div class="text-lg md:text-base mb-0 flex flex-wrap items-center gap-0">
            <div class="flex items-center">
              <span class="text-white text-2xl f-bold cursor-pointer hidden" id="code-cook">{codeCookText()} </span>
              <span class="text-white text-2xl f-bold ml-1 cursor-pointer hidden">@ </span>
            </div>
            <div class="flex-shrink">
             <button class="text-white text-2xl f-bold mr-1.5 cursor-pointer transition-all duration-300 active:scale-95" onClick={toggleLocation}>
               {location()} {isSwitching()}
             </button>
            </div>
            <div class="text-neutral-100/100">
              <span class={`text-white text-2xl f-bold ml-0 cursor-pointer inline-block mr-1.5 ${isSwitching() ? '' : ''}`}>@ </span>
               <span class="text-2xl ml-0 f-bold break-words">{showFullCountry() ? getCountryName(country()) : country()}</span>
            </div>
          </div>
          <div class="flex flex-wrap items-start gap-2 mb-4 min-w-0 tracking">  
            <div class="min-w-0 mr-o">
              <span class="relative top-0 text-neutral-100/60 transition-all duration-300">{weekDay()}, {monthDay()}</span>
            </div>
            <div class="flex items-center flex-shrink-0 sm:flex-shrink ml-0 sm:ml-0 mt-0 sm:mt-0">
             <span class="text-1xl text-neutral-100/80">{flag()}</span>
             <span class="text-1xl text-neutral-100/80 ml-1.5">{weatherIcon()}</span>
             <span class="text-1xl f-bold text-neutral-100/80 ml-1.5">{weatherTemp()}</span>
            </div>
          </div>
          <div class="text-xl md:text-lg lg:text-2xl text-neutral-100/90 mt-1 f-bold flex">
            <span>
              <time
                datetime={currentDate().toISOString()}
                class="text-4xl md:text-3xl lg:text-5xl flex h-full tracking-wider transition-all duration-300"
              >
                {timeText()}
              </time>
            </span>
          </div>
        </div>
        <div class="text-lg md:text-base mb-o flex items-center centered w-full text-6xl">
        </div>
      </div>
    </div>
  );
}