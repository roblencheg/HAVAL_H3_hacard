# Haval H3 Dashboard Card

[![GitHub Release](https://img.shields.io/github/v/release/roblencheg/HAVAL_H3_hacard)](https://github.com/roblencheg/HAVAL_H3_hacard/releases)
[![Build](https://github.com/roblencheg/HAVAL_H3_hacard/actions/workflows/build.yml/badge.svg)](https://github.com/roblencheg/HAVAL_H3_hacard/actions/workflows/build.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A full-screen **Lovelace custom card** for **Home Assistant** that turns your dashboard into a premium vehicle monitoring interface for **Haval H3**.

![Dashboard screenshot placeholder](docs/screenshot.png)

> ⚠️ **Screenshot coming soon.** Replace `docs/screenshot.png` with your own screenshot.

---

## Features

- **Split-panel layout**: vehicle image on the left, interactive GPS map on the right
- **Configurable overlay sensors**: TPMS, doors, hood, trunk, battery, fuel, temperatures — positioned directly on the vehicle image
- **Dual integration support**: works with both [cesar-smart-hass](https://github.com/roblencheg/cesar-smart-hass) and [HAVAL_H3 (GWM RU)](https://github.com/roblencheg/HAVAL_H3) integrations
- **Custom vehicle image**: replace with your own image
- **20+ preset positions** for sensor overlays, plus custom percentage-based positioning
- **Responsive**: two-column on wide screens, stacked on mobile/tablet
- **Dark/light theme** support (auto-detect or manual)
- **Map panel** with speed, course, and last-update summary
- **All entities optional** — card works with any subset of sensors
- **Visual editor** for basic configuration

---

## Installation

### HACS (recommended)

1. Open HACS in Home Assistant
2. Go to "Frontend" → "Custom repositories"
3. Add `https://github.com/roblencheg/HAVAL_H3_hacard` as a custom repository of type **Lovelace**
4. Click "Download" on the "Haval H3 Dashboard Card"
 5. Add the resource to your Lovelace dashboard if not auto-added:
   - Settings → Dashboards → Resources → Add Resource
   - URL: `/hacsfiles/HAVAL_H3_hacard/haval-h3-dashboard-card.js`
   - Type: JavaScript Module
   - *Note*: If HACS auto-adds the resource, use the URL shown in Settings → Dashboards → Resources.

### Manual install

1. Download the latest `haval-h3-dashboard-card.zip` from [releases](https://github.com/roblencheg/HAVAL_H3_hacard/releases)
2. Extract `haval-h3-dashboard-card.js` into your `config/www/` directory
3. Add the resource in Lovelace:
   - Settings → Dashboards → Resources → Add Resource
   - URL: `/local/haval-h3-dashboard-card.js`
   - Type: JavaScript Module

---

## Vehicle Image

Place your vehicle image in `config/www/` and reference it as `/local/your-image.png`.

The card ships with an SVG placeholder. Choose the image that matches your `vehicle.image_layout`:

| Layout | Recommended Image |
|---|---|
| `front` | Top-down or front view of the vehicle |
| `side_front_right` | Side 3/4 view, front of the car facing right |

Recommended image format: PNG with transparent background, ~800×600 px.

---

## Configuration

> **Important**: Entity IDs shown below are examples. Your actual entity IDs may differ depending on your integration configuration and device names. Check your Home Assistant **Settings → Devices & Services** for the exact entity IDs created by cesar-smart-hass and HAVAL_H3 integrations.

### Minimal Configuration

```yaml
type: custom:haval-h3-dashboard-card
title: Haval H3
vehicle_image: /local/haval_h3_white_sunroof.png
```

### Minimal Configuration with Map

```yaml
type: custom:haval-h3-dashboard-card
title: Haval H3
vehicle_image: /local/haval_h3_white_sunroof.png
map:
  device_tracker: device_tracker.cesar_smart_vehicle
```

### Full Configuration

```yaml
type: custom:haval-h3-dashboard-card
title: Haval H3
vehicle_image: /local/haval_h3_white_sunroof.png
vehicle:
  name: My Haval H3
  show_default_image: true
layout:
  left_width: 50
  right_width: 50
map:
  device_tracker: device_tracker.cesar_smart_vehicle
  speed_entity: sensor.location_speed
  course_entity: sensor.location_course
  updated_entity: sensor.last_update
  zoom: 15
  show_accuracy: false
entities:
  # --- Tire Pressure (TPMS) from HAVAL_H3 ---
  front_left_tire_pressure:
    entity: sensor.gwm_ru_tire_fl_pressure
    enabled: true
    label: FL
    unit: bar
    position: front_left_wheel
  front_right_tire_pressure:
    entity: sensor.gwm_ru_tire_fr_pressure
    enabled: true
    label: FR
    unit: bar
    position: front_right_wheel
  rear_left_tire_pressure:
    entity: sensor.gwm_ru_tire_rl_pressure
    enabled: true
    label: RL
    unit: bar
    position: rear_left_wheel
  rear_right_tire_pressure:
    entity: sensor.gwm_ru_tire_rr_pressure
    enabled: true
    label: RR
    unit: bar
    position: rear_right_wheel

  # --- Tire Temperature (optional, from HAVAL_H3) ---
  front_left_tire_temp:
    entity: sensor.gwm_ru_tire_fl_temp
    enabled: false
    label: FL °C
    unit: °C
    position: front_left_wheel_secondary
  front_right_tire_temp:
    entity: sensor.gwm_ru_tire_fr_temp
    enabled: false
    label: FR °C
    unit: °C
    position: front_right_wheel_secondary
  rear_left_tire_temp:
    entity: sensor.gwm_ru_tire_rl_temp
    enabled: false
    label: RL °C
    unit: °C
    position: rear_left_wheel_secondary
  rear_right_tire_temp:
    entity: sensor.gwm_ru_tire_rr_temp
    enabled: false
    label: RR °C
    unit: °C
    position: rear_right_wheel_secondary

  # --- Doors / Body (from cesar-smart-hass) ---
  hood:
    entity: binary_sensor.hood
    enabled: true
    position: hood
  trunk:
    entity: binary_sensor.trunk
    enabled: true
    position: trunk
  door_front_left:
    entity: binary_sensor.door_front_left
    enabled: true
    position: door_front_left
  door_front_right:
    entity: binary_sensor.door_front_right
    enabled: true
    position: door_front_right
  door_back_left:
    entity: binary_sensor.door_back_left
    enabled: true
    position: door_back_left
  door_back_right:
    entity: binary_sensor.door_back_right
    enabled: true
    position: door_back_right

  # --- Vehicle Status (from cesar-smart-hass) ---
  ignition:
    entity: binary_sensor.ignition
    enabled: true
    position: dashboard
  engine_state:
    entity: sensor.engine_state
    enabled: true
    position: engine
  security_mode:
    entity: sensor.security_mode
    enabled: true
    position: roof

  # --- Fuel & Battery (from cesar-smart-hass) ---
  fuel:
    entity: sensor.fuel_level
    enabled: true
    label: Fuel
    unit: L
    position: fuel_area
  battery:
    entity: sensor.battery_voltage
    enabled: true
    label: Bat
    unit: V
    position: battery_area

  # --- Mileage & Temperatures (from cesar-smart-hass) ---
  mileage:
    entity: sensor.mileage
    enabled: true
    label: Odometer
    unit: km
    position: info_block
  outdoor_temp:
    entity: sensor.outdoor_temperature
    enabled: true
    label: Outside
    unit: °C
    position: front_center
  cabin_temp:
    entity: sensor.cabin_temperature
    enabled: true
    label: Cabin
    unit: °C
    position: center_console

display:
  show_icons: true
  show_labels: true
  show_units: true
  hide_unavailable: true
  hide_disabled: true
  status_color_rules: true
  theme_mode: auto
  unavailable_text: "\u2014"
```

> **Note**: Entity IDs shown above do NOT include the `cesar_smart_` prefix (e.g. `binary_sensor.hood` vs `binary_sensor.cesar_smart_hood`). The actual entity ID in your system depends on what name the integration assigned during setup. Check your Home Assistant **Developer Tools → States** for the exact entity IDs.

---

## Preset Positions

These named positions can be used in `position:` for any entity:

| Position | Description |
|---|---|
| `front_left_wheel` | Front left wheel (TPMS pressure) |
| `front_right_wheel` | Front right wheel (TPMS pressure) |
| `rear_left_wheel` | Rear left wheel (TPMS pressure) |
| `rear_right_wheel` | Rear right wheel (TPMS pressure) |
| `front_left_wheel_secondary` | Below FL wheel (TPMS temperature) |
| `front_right_wheel_secondary` | Below FR wheel (TPMS temperature) |
| `rear_left_wheel_secondary` | Below RL wheel (TPMS temperature) |
| `rear_right_wheel_secondary` | Below RR wheel (TPMS temperature) |
| `hood` | Hood area |
| `engine` | Engine bay |
| `roof` | Roof/sunroof area |
| `windshield` | Windshield |
| `dashboard` | Dashboard area |
| `center_console` | Center console |
| `fuel_area` | Fuel area |
| `battery_area` | Battery area |
| `trunk` | Trunk |
| `front_center` | Front center |
| `rear_center` | Rear center |
| `info_block` | Info panel area |
| `door_front_left` | Front left door |
| `door_front_right` | Front right door |
| `door_back_left` | Rear left door |
| `door_back_right` | Rear right door |

### Image Layout Presets

The card supports different vehicle image layouts that remap all preset positions automatically.

Set `vehicle.image_layout` to switch between views:

```yaml
type: custom:haval-h3-dashboard-card
vehicle:
  image_layout: side_front_right
vehicle_image: /local/haval_h3.png
```

| Layout | Description |
|---|---|
| `front` | Front/top-down view (default) |
| `side_front_right` | 3/4 side view, car facing right |

When using `side_front_right`, all `position:` values (e.g. `hood`, `trunk`, `front_left_wheel`) are automatically adjusted to match the side perspective.

---

### Debug Mode

Set `display.debug_positions: true` to overlay a 10% grid and position markers — useful for fine-tuning coordinates.

```yaml
display:
  debug_positions: true
```

---

### Custom Positioning

Use `custom_position` for pixel-perfect placement:

```yaml
entities:
  my_sensor:
    entity: sensor.my_sensor
    custom_position:
      top: 45
      left: 30
```

Coordinates are in **percentages** relative to the image container.

---

## Entity Mapping by Integration

> The entity IDs below are the **default names** generated by each integration. If you have multiple config entries or custom names, the actual entity_id may have prefixes/suffixes. Always verify in Developer Tools → States.

### From `cesar-smart-hass`

Entities are created under the device "Cesar Smart ReadOnly". The default entity_id prefix is `cesar_smart_`.

| Entity ID | Description |
|---|---|
| `sensor.cesar_smart_engine_state` | Engine state |
| `sensor.cesar_smart_security_mode` | Security/alarm mode |
| `sensor.cesar_smart_fuel_level` | Fuel level |
| `sensor.cesar_smart_mileage` | Mileage (km) |
| `sensor.cesar_smart_battery_voltage` | Battery voltage |
| `sensor.cesar_smart_engine_temperature` | Engine coolant temp |
| `sensor.cesar_smart_cabin_temperature` | Cabin temperature |
| `sensor.cesar_smart_outdoor_temperature` | Outdoor temperature |
| `sensor.cesar_smart_left_side_temperature` | Left side temp (disabled by default) |
| `sensor.cesar_smart_right_side_temperature` | Right side temp (disabled by default) |
| `sensor.cesar_smart_location_speed` | GPS speed (km/h) |
| `sensor.cesar_smart_location_course` | GPS course (degrees, disabled by default) |
| `sensor.cesar_smart_last_update` | Last data update timestamp |
| `binary_sensor.cesar_smart_ignition` | Ignition on/off |
| `binary_sensor.cesar_smart_hood` | Hood open/closed |
| `binary_sensor.cesar_smart_door_front_left` | Front left door |
| `binary_sensor.cesar_smart_door_front_right` | Front right door |
| `binary_sensor.cesar_smart_door_back_left` | Rear left door |
| `binary_sensor.cesar_smart_door_back_right` | Rear right door |
| `binary_sensor.cesar_smart_trunk` | Trunk open/closed |
| `binary_sensor.cesar_smart_engine_running` | Engine running |
| `device_tracker.cesar_smart_vehicle` | GPS location (default name) |

### From `HAVAL_H3` (GWM RU)

Entities are created under the device "GWM RU". The prefix is `gwm_ru`.

| Entity ID | Description |
|---|---|
| `sensor.gwm_ru_range_km` | Driving range |
| `sensor.gwm_ru_fuel_liters` | Fuel volume |
| `sensor.gwm_ru_mileage_total` | Total mileage |
| `sensor.gwm_ru_tire_fl_pressure` | Front left tire pressure (атм) |
| `sensor.gwm_ru_tire_fl_temp` | Front left tire temp (°C) |
| `sensor.gwm_ru_tire_fr_pressure` | Front right tire pressure |
| `sensor.gwm_ru_tire_fr_temp` | Front right tire temp |
| `sensor.gwm_ru_tire_rl_pressure` | Rear left tire pressure |
| `sensor.gwm_ru_tire_rl_temp` | Rear left tire temp |
| `sensor.gwm_ru_tire_rr_pressure` | Rear right tire pressure |
| `sensor.gwm_ru_tire_rr_temp` | Rear right tire temp |
| `sensor.gwm_ru_engine_coolant_temp` | Engine coolant temp |
| `sensor.gwm_ru_ambient_temperature` | Ambient temperature |
| `sensor.gwm_ru_battery_voltage` | Battery voltage |
| `sensor.gwm_ru_vehicle_battery` | Battery level |
| `sensor.gwm_ru_brand` | Vehicle brand |
| `sensor.gwm_ru_model` | Vehicle model |
| `sensor.gwm_ru_color` | Vehicle color |
| `sensor.gwm_ru_oil_qty` | Oil level |
| `sensor.gwm_ru_service_status` | Service status |
| `sensor.gwm_ru_tbox_status` | TBOX status |
| `binary_sensor.gwm_ru_tbox_online` | TBOX online |
| `device_tracker.gwm_ru_location` | GPS location |

---

## Color Rules

You can define custom color rules per entity:

```yaml
entities:
  battery:
    entity: sensor.battery_voltage
    position: battery_area
    color_rules:
      - state: 12.0
        operator: lt
        color: "#f44336"    # Red when low
      - state: 12.5
        operator: lt
        color: "#ff9800"    # Orange when medium
```

Supported operators: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`.

---

## Responsive Behavior

| Viewport | Layout |
|---|---|
| ≥768px wide | Two columns side by side |
| <768px wide | Stacked (vehicle above, map below) |
| Narrow dashboard | Auto-adjusts, scrollable |

---

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run watch

# Typecheck
npm run typecheck
```

### Project Structure

```
haval-h3-dashboard-card/
├── src/
│   ├── index.ts              # Entry point, card registration
│   ├── haval-h3-card.ts      # Main card component
│   ├── editor.ts             # Visual config editor
│   ├── types.ts              # TypeScript interfaces
│   ├── const.ts              # Constants, integration entity maps
│   ├── components/
│   │   ├── vehicle-panel.ts  # Left panel (image + overlays)
│   │   ├── map-panel.ts      # Right panel (map + summary)
│   │   └── overlay-badge.ts  # Individual sensor overlay
│   └── utils/
│       ├── entity-resolver.ts   # Entity state resolution
│       ├── position-resolver.ts # Position calculation
│       └── config-schema.ts     # Config validation & merge
├── dist/                     # Built output
├── docs/
│   ├── haval_h3_white_sunroof.svg  # Placeholder vehicle image
│   └── screenshot.png         # (add your own)
├── hacs.json
├── package.json
├── tsconfig.json
├── rollup.config.js
├── LICENSE
└── README.md
```

---

## Known Limitations

- **This card is read-only** — it displays data only. No vehicle control (lock/unlock, remote start, etc.)
- The vehicle image is a **placeholder SVG**. Replace with a real top-down photo for best results
- Map uses Home Assistant's built-in `<ha-map>` element, which requires the map integration to be configured in HA
- If `map.device_tracker` is not configured, the map will show a placeholder. Latitude/longitude sensors are supported as a fallback
- Some Cesar Smart entities are **disabled by default** in the integration — enable them in Settings → Devices & Services → Cesar Smart ReadOnly
- Entity IDs may vary if you have multiple instances of an integration or custom names
- The `cesar_smart_` prefix is the default; your actual entity IDs may differ — always verify in Developer Tools → States

---

## License

MIT
