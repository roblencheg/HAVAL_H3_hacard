export interface AutoDiscoveryResult {
  key: string;
  entityId: string;
  confidence: number;
}

const KEYWORD_MAP: Record<string, string[]> = {
  tire_fl_pressure: ['tire_fl_pressure', 'tyre_fl_pressure', 'fl_pressure'],
  tire_fr_pressure: ['tire_fr_pressure', 'tyre_fr_pressure', 'fr_pressure'],
  tire_rl_pressure: ['tire_rl_pressure', 'tyre_rl_pressure', 'rl_pressure'],
  tire_rr_pressure: ['tire_rr_pressure', 'tyre_rr_pressure', 'rr_pressure'],
  tire_fl_temp: ['tire_fl_temp', 'tyre_fl_temp', 'fl_temp', 'tire_fl_temperature'],
  tire_fr_temp: ['tire_fr_temp', 'tyre_fr_temp', 'fr_temp', 'tire_fr_temperature'],
  tire_rl_temp: ['tire_rl_temp', 'tyre_rl_temp', 'rl_temp', 'tire_rl_temperature'],
  tire_rr_temp: ['tire_rr_temp', 'tyre_rr_temp', 'rr_temp', 'tire_rr_temperature'],
  fuel_level: ['fuel_level', 'fuel_liters', 'fuel', 'range_km'],
  mileage: ['mileage', 'mileage_total', 'odometer', 'km'],
  battery_voltage: ['battery_voltage', 'vehicle_battery', 'battery'],
  engine_temperature: ['engine_temperature', 'engine_coolant_temp', 'coolant_temp'],
  cabin_temperature: ['cabin_temperature', 'cabin_temp'],
  outdoor_temperature: ['outdoor_temperature', 'ambient_temperature', 'outdoor_temp'],
  ignition: ['ignition'],
  engine_state: ['engine_state', 'engine_running'],
  security_mode: ['security_mode', 'tbox_status'],
  hood: ['hood'],
  trunk: ['trunk'],
  door_front_left: ['door_front_left'],
  door_front_right: ['door_front_right'],
  door_back_left: ['door_back_left'],
  door_back_right: ['door_back_right'],
  location_speed: ['location_speed', 'speed'],
  location_course: ['location_course', 'course'],
  last_update: ['last_update', 'last_updated'],
  oil_qty: ['oil_qty', 'oil'],
  service_status: ['service_status'],
  tbox_online: ['tbox_online', 'tbox_status'],
};

export function autoDetectEntities(
  states: Record<string, { entity_id?: string; attributes?: Record<string, unknown> }> | undefined
): AutoDiscoveryResult[] {
  if (!states) return [];

  const entityIds = Object.keys(states);
  const results: AutoDiscoveryResult[] = [];

  for (const [key, keywords] of Object.entries(KEYWORD_MAP)) {
    let bestMatch = '';
    let bestScore = 0;

    for (const entityId of entityIds) {
      const lower = entityId.toLowerCase();
      let score = 0;

      for (const kw of keywords) {
        if (lower.includes(kw)) {
          score = Math.max(score, kw.length);
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = entityId;
      }
    }

    if (bestMatch && bestScore > 2) {
      results.push({ key, entityId: bestMatch, confidence: bestScore });
    }
  }

  return results;
}
