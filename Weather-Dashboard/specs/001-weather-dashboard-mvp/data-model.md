# Data Model: Weather Dashboard MVP

## Entities

### 1. City
*Represents the user's search target.*

| Field | Type | Description | Source |
| :--- | :--- | :--- | :--- |
| `name` | String | Name of the city (e.g., "London") | User Input / API Response |
| `lat` | Float | Latitude | API Response |
| `lon` | Float | Longitude | API Response |

### 2. CurrentWeather
*Snapshot of right now.*

| Field | Type | Description | Source |
| :--- | :--- | :--- | :--- |
| `temp` | Float | Temperature in Celsius | `main.temp` |
| `humidity` | Integer | Humidity % | `main.humidity` |
| `windSpeed` | Float | Wind speed in m/s | `wind.speed` |
| `description`| String | Weather condition (e.g., "scattered clouds") | `weather[0].description` |
| `icon` | String | Icon code (e.g., "04d") | `weather[0].icon` |
| `dt` | Integer | Unix Timestamp | `dt` |

### 3. ForecastDay
*Simplified view for the 5-day forecast.*

| Field | Type | Description | Source |
| :--- | :--- | :--- | :--- |
| `date` | String | Formatted Date (YYYY-MM-DD) | derived from `dt_txt` |
| `temp` | Float | Temperature (mid-day) | `main.temp` |
| `humidity` | Integer | Humidity % | `main.humidity` |
| `icon` | String | Icon code | `weather[0].icon` |

## Storage Schema (`localStorage`)

**Key**: `weather_dashboard_last_city`
**Value**: String (e.g., `"London"`)

> Note: Spec only requires "last searched city", not full history. Simpler string storage is sufficient.
