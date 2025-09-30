// Helper functions for TimeZoneCard

export function formatUserTime(date: Date, isUserLocation: boolean, userTimezone: string): string {
  const timezone = isUserLocation ? userTimezone : "Europe/Stockholm";
  return date.toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", second: "2-digit", hour12: false,
    timeZone: timezone,
  //  timeZoneName: "none",
  });
}

export function getCountryFlag(countryCode: string): string {
  const flagMap: { [key: string]: string } = {
    US: "🇺🇸", TH: "🇹🇭", GB: "🇬🇧", CA: "🇨🇦", AU: "🇦🇺", DE: "🇩🇪", FR: "🇫🇷", IT: "🇮🇹", ES: "🇪🇸", NL: "🇳🇱", BE: "🇧🇪", CH: "🇨🇭", AT: "🇦🇹", SE: "🇸🇪", NO: "🇳🇴", DK: "🇩🇰", FI: "🇫🇮", PL: "🇵🇱", CZ: "🇨🇿", SK: "🇸🇰", HU: "🇭🇺", RO: "🇷🇴", BG: "🇧🇬", GR: "🇬🇷", PT: "🇵🇹", IE: "🇮🇪", LU: "🇱🇺", MT: "🇲🇹", CY: "🇨🇾", SI: "🇸🇮", EE: "🇪🇪", LV: "🇱🇻", LT: "🇱🇹", HR: "🇭🇷", BA: "🇧🇦", ME: "🇲🇪", MK: "🇲🇰", AL: "🇦🇱", RS: "🇷🇸", XK: "🇽🇰", IS: "🇮🇸", FO: "🇫🇴", GL: "🇬🇱", RU: "🇷🇺", UA: "🇺🇦", BY: "🇧🇾", MD: "🇲🇩", GE: "🇬🇪", AM: "🇦🇲", AZ: "🇦🇿", TR: "🇹🇷", IL: "🇮🇱", JO: "🇯🇴", LB: "🇱🇧", SY: "🇸🇾", IQ: "🇮🇶", KW: "🇰🇼", SA: "🇸🇦", AE: "🇦🇪", QA: "🇶🇦", BH: "🇧🇭", OM: "🇴🇲", YE: "🇾🇪", IR: "🇮🇷", PK: "🇵🇰", AF: "🇦🇫", TJ: "🇹🇯", TM: "🇹🇲", UZ: "🇺🇿", KG: "🇰🇬", KZ: "🇰🇿", MN: "🇲🇳", CN: "🇨🇳", JP: "🇯🇵", KR: "🇰🇷", TW: "🇹🇼", HK: "🇭🇰", MO: "🇲🇴", VN: "🇻🇳", LA: "🇱🇦", KH: "🇰🇭", MM: "🇲🇲", MY: "🇲🇾", SG: "🇸🇬", ID: "🇮🇩", PH: "🇵🇭", BN: "🇧🇳", TL: "🇹🇱", PG: "🇵🇬", SB: "🇸🇧", VU: "🇻🇺", FJ: "🇫🇯", TO: "🇹🇴", WS: "🇼🇸", KI: "🇰🇮", MH: "🇲🇭", FM: "🇫🇲", PW: "🇵🇼", NR: "🇳🇷", TV: "🇹🇻", NU: "🇳🇺", CK: "🇨🇰", PF: "🇵🇫", NC: "🇳🇨", WF: "🇼🇫", AS: "🇦🇸", GU: "🇬🇺", MP: "🇲🇵", PR: "🇵🇷", VI: "🇻🇮", UM: "🇺🇸", MX: "🇲🇽", GT: "🇬🇹", BZ: "🇧🇿", SV: "🇸🇻", HN: "🇭🇳", NI: "🇳🇮", CR: "🇨🇷", PA: "🇵🇦", CU: "🇨🇺", JM: "🇯🇲", HT: "🇭🇹", DO: "🇩🇴", TT: "🇹🇹", BB: "🇧🇧", LC: "🇱🇨", VC: "🇻🇨", GD: "🇬🇩", AG: "🇦🇬", DM: "🇩🇲", KN: "🇰🇳", MS: "🇲🇸", AI: "🇦🇮", VG: "🇻🇬", KY: "🇰🇾", BM: "🇧🇲", TC: "🇹🇨", BS: "🇧🇸", AR: "🇦🇷", CL: "🇨🇱", UY: "🇺🇾", PY: "🇵🇾", BO: "🇧🇴", PE: "🇵🇪", EC: "🇪🇨", CO: "🇨🇴", VE: "🇻🇪", GY: "🇬🇾", SR: "🇸🇷", GF: "🇬🇫", BR: "🇧🇷", ZA: "🇿🇦", BW: "🇧🇼", ZW: "🇿🇼", MZ: "🇲🇿", MW: "🇲🇼", ZM: "🇿🇲", TZ: "🇹🇿", KE: "🇰🇪", UG: "🇺🇬", RW: "🇷🇼", BI: "🇧🇮", CD: "🇨🇩", CG: "🇨🇬", GA: "🇬🇦", CM: "🇨🇲", TD: "🇹🇩", CF: "🇨🇫", GQ: "🇬🇶", AO: "🇦🇴", ST: "🇸🇹", CV: "🇨🇻", GW: "🇬🇼", SN: "🇸🇳", GM: "🇬🇲", GN: "🇬🇳", SL: "🇸🇱", LR: "🇱🇷", CI: "🇨🇮", BF: "🇧🇫", TG: "🇹🇬", BJ: "🇧🇯", NE: "🇳🇪", NG: "🇳🇬", GH: "🇬🇭", ET: "🇪🇹", DJ: "🇩🇯", ER: "🇪🇷", SS: "🇸🇸", SD: "🇸🇩", EG: "🇪🇬", LY: "🇱🇾", TN: "🇹🇳", DZ: "🇩🇿", MA: "🇲🇦", EH: "🇪🇭", MR: "🇲🇷", ML: "🇲🇱", IN: "🇮🇳", BD: "🇧🇩", NP: "🇳🇵", BT: "🇧🇹", LK: "🇱🇰", MV: "🇲🇻", IO: "🇮🇴", CC: "🇨🇨", CX: "🇨🇽", NZ: "🇳🇿",
  };
  return flagMap[countryCode] || "🏳️";
}

export function getCountryName(countryCode: string): string {
  try {
    return new Intl.DisplayNames(['en'], {type: 'region'}).of(countryCode) || countryCode;
  } catch {
    return countryCode;
  }
}

export function formatDate(date: Date): { weekDay: string; monthDay: string } {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", month: "long", day: "numeric",
  };
  const formatted = date.toLocaleDateString("en-US", options);
  const [weekDay, month, day] = formatted.split(" ");
  return { weekDay: weekDay.replace(",", ""), monthDay: `${month} ${day}` };
}

export async function getLocationName(lat: number, lon: number): Promise<string> {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    const data = await response.json();
    return `${data.city || data.locality || ""}`;
  } catch (error) {
    console.error("Error fetching location name:", error);
    return " ";
  }
}

export async function getCountryCode(lat: number, lon: number): Promise<string> {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    const data = await response.json();
    return data.countryCode || "SE";
  } catch (error) {
    console.error("Error fetching country code:", error);
    return "SE";
  }
}

export function getWeatherIcon(condition: string, isDay: boolean): string {
  const weatherMap: { [key: string]: string } = {
    "clear sky": isDay ? "☀️" : "🌙", "few clouds": "🌤️", "scattered clouds": "⛅", "broken clouds": "☁️", "shower rain": "🌦️", "rain": "🌧️", "thunderstorm": "⛈️", "snow": "❄️", "mist": "🌫️", "overcast clouds": "☁️", "light rain": "🌦️", "moderate rain": "🌧️", "heavy intensity rain": "🌧️", "very heavy rain": "🌧️", "extreme rain": "🌧️", "freezing rain": "🌧️", "light snow": "❄️", "heavy snow": "❄️", "sleet": "🌨️", "shower sleet": "🌨️", "light shower snow": "🌨️", "shower snow": "🌨️", "heavy shower snow": "🌨️", "thunderstorm with light rain": "⛈️", "thunderstorm with rain": "⛈️", "thunderstorm with heavy rain": "⛈️", "light thunderstorm": "⛈️", "heavy thunderstorm": "⛈️", "ragged thunderstorm": "⛈️", "thunderstorm with light drizzle": "⛈️", "thunderstorm with drizzle": "⛈️", "thunderstorm with heavy drizzle": "⛈️", "light intensity drizzle": "🌦️", "drizzle": "🌦️", "heavy intensity drizzle": "🌦️", "light intensity drizzle rain": "🌦️", "drizzle rain": "🌦️", "heavy intensity drizzle rain": "🌦️", "shower rain and drizzle": "🌦️", "heavy shower rain and drizzle": "🌦️", "shower drizzle": "🌦️", "fog": "🌫️", "haze": "🌫️", "sand/dust whirls": "🌪️", "sand": "🌪️", "dust": "🌪️", "volcanic ash": "🌋", "squalls": "🌬️", "tornado": "🌪️",
  };
  return weatherMap[condition.toLowerCase()] || "🌤️";
}

export function getWeatherIconFromCode(code: number, isDay: boolean): string {
  const iconMap: { [key: number]: string } = {
    0: isDay ? "☀️" : "🌙", // Clear sky
    1: "🌤️", // Mainly clear
    2: "⛅", // Partly cloudy
    3: "☁️", // Overcast
    45: "🌫️", // Fog
    48: "🌫️", // Depositing rime fog
    51: "🌦️", // Light drizzle
    53: "🌦️", // Moderate drizzle
    55: "🌦️", // Dense drizzle
    56: "🌨️", // Light freezing drizzle
    57: "🌨️", // Dense freezing drizzle
    61: "🌦️", // Slight rain
    63: "🌧️", // Moderate rain
    65: "🌧️", // Heavy rain
    66: "🌨️", // Light freezing rain
    67: "🌨️", // Heavy freezing rain
    71: "❄️", // Slight snow fall
    73: "❄️", // Moderate snow fall
    75: "❄️", // Heavy snow fall
    77: "❄️", // Snow grains
    80: "🌦️", // Slight rain showers
    81: "🌧️", // Moderate rain showers
    82: "🌧️", // Violent rain showers
    85: "🌨️", // Slight snow showers
    86: "🌨️", // Heavy snow showers
    95: "⛈️", // Thunderstorm
    96: "⛈️", // Thunderstorm with slight hail
    99: "⛈️", // Thunderstorm with heavy hail
  };
  return iconMap[code] || "🌤️";
}

export async function getWeatherDataFree(
  lat: number,
  lon: number
): Promise<{ icon: string; temp: number }> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    const data = await response.json();
    const temp = data.current_weather.temperature;
    const code = data.current_weather.weathercode;
    const isDay = data.current_weather.is_day;
    const icon = getWeatherIconFromCode(code, isDay);
    return { icon, temp: Math.round(temp) };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return { icon: "🌤️", temp: 20 };
  }
}