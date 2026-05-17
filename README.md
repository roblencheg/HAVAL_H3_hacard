# Haval H3 Dashboard Card

[![GitHub Release](https://img.shields.io/github/v/release/roblencheg/HAVAL_H3_hacard)](https://github.com/roblencheg/HAVAL_H3_hacard/releases)
[![Build](https://github.com/roblencheg/HAVAL_H3_hacard/actions/workflows/build.yml/badge.svg)](https://github.com/roblencheg/HAVAL_H3_hacard/actions/workflows/build.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Lovelace custom card for Home Assistant focused on **Haval H3**. It shows a vehicle image with configurable sensor badges and a GPS map panel next to it.

## Features

- Two-panel dashboard: vehicle on the left, map on the right
- Configurable `badges` model for overlay and chip-style sensors
- Drag-and-drop positioning for on-vehicle badges
- Built-in visual editor
- Support for custom vehicle images
- Preset image layouts: `front` and `side_front_right`
- Map panel with tracker or explicit latitude/longitude entities
- Optional speed, course, and update summary below the map
- Legacy `entities:` configs are still accepted and migrated into `badges`

## Installation

### HACS

1. Open HACS in Home Assistant.
2. Go to `Frontend` -> `Custom repositories`.
3. Add `https://github.com/roblencheg/HAVAL_H3_hacard` as a repository of type `Lovelace`.
4. Install `Haval H3 Dashboard Card`.
5. If needed, add the resource manually:

```text
URL: /hacsfiles/HAVAL_H3_hacard/haval-h3-dashboard-card.js
Type: JavaScript Module
```

### Manual

1. Download `haval-h3-dashboard-card.js` from the latest [release](https://github.com/roblencheg/HAVAL_H3_hacard/releases).
2. Put it into `config/www/`.
3. Add the Lovelace resource:

```text
URL: /local/haval-h3-dashboard-card.js
Type: JavaScript Module
```

## Basic Configuration

```yaml
type: custom:haval-h3-dashboard-card
title: Haval H3
map:
  device_tracker: device_tracker.gwm_ru_location
badges:
  - id: tire_fl
    entity: sensor.gwm_ru_tire_fl_pressure
    name: FL
    unit: bar
    area: on_vehicle
    position:
      top: 66
      left: 77
  - id: hood
    entity: binary_sensor.cesar_smart_hood
    name: Hood
    area: on_vehicle
    position:
      top: 22
      left: 50
  - id: battery
    entity: sensor.gwm_ru_battery_voltage
    name: Battery
    unit: V
    area: below_vehicle
```

## Configuration Reference

### Root options

| Key | Type | Description |
|---|---|---|
| `type` | string | Must be `custom:haval-h3-dashboard-card` |
| `title` | string | Optional card title |
| `vehicle_image` | string | Optional image path, usually `/local/...` |
| `vehicle.name` | string | Optional name shown in the vehicle panel logic |
| `vehicle.show_default_image` | boolean | Defaults to `true` |
| `vehicle.image_layout` | string | `front` or `side_front_right` |
| `layout.left_width` | number | Relative width of the vehicle column |
| `layout.right_width` | number | Relative width of the map column |
| `map` | object | Map configuration |
| `badges` | array | Current badge-based sensor configuration |
| `display` | object | Display and edit options |
| `entities` | object | Legacy format, still supported for migration |

### `map`

| Key | Type | Description |
|---|---|---|
| `device_tracker` | string | Main tracker entity |
| `latitude_entity` | string | Fallback latitude sensor |
| `longitude_entity` | string | Fallback longitude sensor |
| `speed_entity` | string | Optional speed entity |
| `course_entity` | string | Optional course entity |
| `updated_entity` | string | Optional timestamp/state entity for last update |
| `zoom` | number | Map zoom, default `15` |
| `show_accuracy` | boolean | Supported in config schema |
| `dark_mode` | boolean | Supported in config schema |

### `display`

| Key | Type | Description |
|---|---|---|
| `show_icons` | boolean | Default badge icon visibility |
| `show_labels` | boolean | Default badge label visibility |
| `show_units` | boolean | Default badge unit visibility |
| `hide_unavailable` | boolean | Hide unavailable/unknown values |
| `hide_disabled` | boolean | Supported in defaults |
| `status_color_rules` | boolean | Supported in defaults |
| `theme_mode` | string | `auto`, `light`, or `dark` |
| `unavailable_text` | string | Supported in defaults |
| `show_entity_name_on_hover` | boolean | Supported in defaults |
| `debug_positions` | boolean | Supported in defaults |
| `edit_positions` | boolean | Enables drag-and-drop for on-vehicle badges |

### Badge object

Each item in `badges:` supports:

| Key | Type | Description |
|---|---|---|
| `id` | string | Stable badge id |
| `entity` | string | Home Assistant entity id |
| `name` | string | Optional label |
| `icon` | string | Optional icon, e.g. `mdi:battery` |
| `unit` | string | Optional unit override |
| `area` | string | `on_vehicle`, `above_vehicle`, or `below_vehicle` |
| `position.top` | number | Percentage, used for `on_vehicle` badges |
| `position.left` | number | Percentage, used for `on_vehicle` badges |
| `precision` | number | Numeric precision |
| `enabled` | boolean | Show/hide badge |
| `hide_unavailable` | boolean | Badge-level override |
| `show_icon` | boolean | Badge-level override |
| `show_name` | boolean | Badge-level override |
| `show_unit` | boolean | Badge-level override |

## Badge Areas

- `on_vehicle`: absolutely positioned over the image
- `above_vehicle`: rendered as chips above the image
- `below_vehicle`: rendered as chips below the image

## Drag-and-Drop Positioning

To reposition overlay badges:

1. Open the visual editor.
2. Enable `Edit badge positions (drag to move)`.
3. Drag an `on_vehicle` badge on the live card.
4. Release the pointer to save the new coordinates.

Current behavior:

- Only `on_vehicle` badges can be dragged
- Position is saved into `badges[].position`
- Edit mode automatically switches off after a successful drop

## Vehicle Images

If `vehicle_image` is not set, the card uses the bundled default image.

Legacy image paths are automatically mapped to the bundled image:

- `/local/haval_h3_white_sunroof.png`
- `/local/haval_h3_white_side.png`

Example:

```yaml
vehicle_image: /local/my_haval_h3.png
vehicle:
  image_layout: side_front_right
```

### Supported image layouts

| Layout | Description |
|---|---|
| `front` | Default front/top-oriented layout |
| `side_front_right` | Side/front-right perspective |

## Visual Editor

The built-in editor currently supports:

- card title
- vehicle image path
- badge add/remove/edit
- badge area selection
- badge position reset
- map entities
- display flags
- drag mode toggle

The editor works with the current `badges` format. It also normalizes incoming config through the same schema as the runtime card.

## Legacy `entities` Support

Older configs that use:

```yaml
entities:
  some_sensor:
    entity: sensor.example
```

are still accepted. On load, they are migrated internally into `badges`.

Notes:

- legacy `render_area: vehicle` becomes `area: on_vehicle`
- other legacy entries become `area: below_vehicle`
- legacy `custom_position` maps into badge `position`

For new configs, use `badges`.

## Example: Full Current Config

```yaml
type: custom:haval-h3-dashboard-card
title: Haval H3
vehicle_image: /local/haval_h3.png
vehicle:
  name: My Haval H3
  show_default_image: true
  image_layout: side_front_right
layout:
  left_width: 55
  right_width: 45
map:
  device_tracker: device_tracker.gwm_ru_location
  speed_entity: sensor.location_speed
  course_entity: sensor.location_course
  updated_entity: sensor.last_update
  zoom: 15
badges:
  - id: tire_fl
    entity: sensor.gwm_ru_tire_fl_pressure
    name: FL
    unit: bar
    area: on_vehicle
    position:
      top: 65
      left: 78
    precision: 1
  - id: tire_fr
    entity: sensor.gwm_ru_tire_fr_pressure
    name: FR
    unit: bar
    area: on_vehicle
    position:
      top: 82
      left: 78
    precision: 1
  - id: tire_rl
    entity: sensor.gwm_ru_tire_rl_pressure
    name: RL
    unit: bar
    area: on_vehicle
    position:
      top: 65
      left: 22
    precision: 1
  - id: tire_rr
    entity: sensor.gwm_ru_tire_rr_pressure
    name: RR
    unit: bar
    area: on_vehicle
    position:
      top: 82
      left: 22
    precision: 1
  - id: hood
    entity: binary_sensor.cesar_smart_hood
    name: Hood
    area: on_vehicle
    position:
      top: 37
      left: 78
  - id: battery
    entity: sensor.gwm_ru_battery_voltage
    name: Battery
    unit: V
    area: below_vehicle
    precision: 1
  - id: mileage
    entity: sensor.gwm_ru_mileage_total
    name: Odometer
    unit: km
    area: below_vehicle
display:
  show_icons: true
  show_labels: true
  show_units: true
  hide_unavailable: true
  edit_positions: false
```

## Responsive Behavior

| Viewport | Layout |
|---|---|
| `>= 768px` | Vehicle and map side by side |
| `< 768px` | Stacked vertically |

## Development

```bash
npm install
npm run build
npm run watch
npm run typecheck
npm test
npm run check:version
```

## Project Structure

```text
src/
  index.ts
  haval-h3-card.ts
  editor.ts
  types.ts
  const.ts
  components/
    vehicle-panel.ts
    map-panel.ts
    custom-badge.ts
  utils/
    config-schema.ts
    position-resolver.ts
    entity-resolver.ts
```

## Known Limitations

- The card is read-only. It does not send control commands to the vehicle.
- Map rendering depends on Home Assistant's built-in `ha-map`.
- Without `device_tracker` or `latitude_entity` + `longitude_entity`, the map panel shows a placeholder.
- Badge positioning is percentage-based relative to the rendered vehicle image area.
- Some old README examples on the internet may still use the legacy `entities` format.

## License

MIT
