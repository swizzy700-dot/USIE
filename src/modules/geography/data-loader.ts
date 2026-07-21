/**
 * Geography Data Loader
 * Handles lazy loading and on-demand indexing of USA geographic data
 */

import { State, County, City, ZipCode, MetroArea } from './types';

export class GeographyDataLoader {
  private states: Map<string, State> = new Map();
  private counties: Map<string, County> = new Map();
  private cities: Map<string, City> = new Map();
  private zipCodes: Map<string, ZipCode> = new Map();
  private metroAreas: Map<string, MetroArea> = new Map();
  
  // Search indexes (built on demand)
  private cityIndex: Map<string, string[]> = new Map(); // name -> city IDs
  private zipIndex: Map<string, string> = new Map();     // zip -> full zip data
  private countyIndex: Map<string, string[]> = new Map(); // name -> county FIPS
  
  // Lazy loading flags
  private statesLoaded = false;
  private countiesLoaded = false;
  private citiesLoaded = false;
  private zipCodesLoaded = false;
  private metroAreasLoaded = false;
  private indexesBuilt = false;

  async initialize(): Promise<void> {
    // Only load states on initialization - everything else loads on demand
    if (!this.statesLoaded) {
      await this.loadStates();
      this.statesLoaded = true;
    }
  }

  // Lazy load states
  private async ensureStatesLoaded(): Promise<void> {
    if (!this.statesLoaded) {
      await this.loadStates();
      this.statesLoaded = true;
    }
  }

  // Lazy load counties
  private async ensureCountiesLoaded(): Promise<void> {
    if (!this.countiesLoaded) {
      await this.loadCounties();
      this.countiesLoaded = true;
    }
  }

  // Lazy load cities
  private async ensureCitiesLoaded(): Promise<void> {
    if (!this.citiesLoaded) {
      await this.loadCities();
      this.citiesLoaded = true;
    }
  }

  // Lazy load ZIP codes
  private async ensureZipCodesLoaded(): Promise<void> {
    if (!this.zipCodesLoaded) {
      await this.loadZipCodes();
      this.zipCodesLoaded = true;
    }
  }

  // Lazy load metro areas
  private async ensureMetroAreasLoaded(): Promise<void> {
    if (!this.metroAreasLoaded) {
      await this.loadMetroAreas();
      this.metroAreasLoaded = true;
    }
  }

  // Build indexes on demand
  private async ensureIndexesBuilt(): Promise<void> {
    if (!this.indexesBuilt) {
      await this.ensureCitiesLoaded();
      await this.ensureZipCodesLoaded();
      await this.ensureCountiesLoaded();
      this.buildIndexes();
      this.indexesBuilt = true;
    }
  }

  private async loadStates(): Promise<void> {
    // Using US Census Bureau data - generator function for memory efficiency
    const statesGenerator = this.generateStates();
    for (const state of statesGenerator) {
      this.states.set(state.code, state);
    }
  }

  // Generator function for states - memory efficient
  private *generateStates(): Generator<State> {
    const stateData: Array<[string, string, string, string, string, number, number]> = [
      ['AL', 'Alabama', '01', 'South', 'East South Central', 5024279, 50645],
      ['AK', 'Alaska', '02', 'West', 'Pacific', 733391, 570641],
      ['AZ', 'Arizona', '04', 'West', 'Mountain', 7151502, 113594],
      ['AR', 'Arkansas', '05', 'South', 'West South Central', 3011524, 52035],
      ['CA', 'California', '06', 'West', 'Pacific', 39538223, 155779],
      ['CO', 'Colorado', '08', 'West', 'Mountain', 5773714, 103642],
      ['CT', 'Connecticut', '09', 'Northeast', 'New England', 3605944, 4842],
      ['DE', 'Delaware', '10', 'South', 'South Atlantic', 989948, 1949],
      ['FL', 'Florida', '12', 'South', 'South Atlantic', 21538187, 53625],
      ['GA', 'Georgia', '13', 'South', 'South Atlantic', 10711908, 56858],
      ['HI', 'Hawaii', '15', 'West', 'Pacific', 1455271, 6423],
      ['ID', 'Idaho', '16', 'West', 'Mountain', 1839106, 82643],
      ['IL', 'Illinois', '17', 'Midwest', 'East North Central', 12812508, 55519],
      ['IN', 'Indiana', '18', 'Midwest', 'East North Central', 6785528, 35826],
      ['IA', 'Iowa', '19', 'Midwest', 'West North Central', 3190369, 55857],
      ['KS', 'Kansas', '20', 'Midwest', 'West North Central', 2937880, 81756],
      ['KY', 'Kentucky', '21', 'South', 'East South Central', 4505836, 39486],
      ['LA', 'Louisiana', '22', 'South', 'West South Central', 4657757, 43204],
      ['ME', 'Maine', '23', 'Northeast', 'New England', 1362359, 30843],
      ['MD', 'Maryland', '24', 'South', 'South Atlantic', 6177224, 9707],
      ['MA', 'Massachusetts', '25', 'Northeast', 'New England', 7029917, 7800],
      ['MI', 'Michigan', '26', 'Midwest', 'East North Central', 10077331, 56539],
      ['MN', 'Minnesota', '27', 'Midwest', 'West North Central', 5706494, 79610],
      ['MS', 'Mississippi', '28', 'South', 'East South Central', 2961279, 46897],
      ['MO', 'Missouri', '29', 'Midwest', 'West North Central', 6154913, 68886],
      ['MT', 'Montana', '30', 'West', 'Mountain', 1084225, 145546],
      ['NE', 'Nebraska', '31', 'Midwest', 'West North Central', 1961504, 76824],
      ['NV', 'Nevada', '32', 'West', 'Mountain', 3104614, 109781],
      ['NH', 'New Hampshire', '33', 'Northeast', 'New England', 1377529, 8953],
      ['NJ', 'New Jersey', '34', 'Northeast', 'Middle Atlantic', 9288994, 7358],
      ['NM', 'New Mexico', '35', 'West', 'Mountain', 2117522, 121356],
      ['NY', 'New York', '36', 'Northeast', 'Middle Atlantic', 20201249, 47214],
      ['NC', 'North Carolina', '37', 'South', 'South Atlantic', 10439388, 48371],
      ['ND', 'North Dakota', '38', 'Midwest', 'West North Central', 779094, 68976],
      ['OH', 'Ohio', '39', 'Midwest', 'East North Central', 11799448, 40861],
      ['OK', 'Oklahoma', '40', 'South', 'West South Central', 3959353, 68667],
      ['OR', 'Oregon', '41', 'West', 'Pacific', 4237256, 95988],
      ['PA', 'Pennsylvania', '42', 'Northeast', 'Middle Atlantic', 13002700, 44743],
      ['RI', 'Rhode Island', '44', 'Northeast', 'New England', 1097379, 1034],
      ['SC', 'South Carolina', '45', 'South', 'South Atlantic', 5118425, 30061],
      ['SD', 'South Dakota', '46', 'Midwest', 'West North Central', 886667, 75811],
      ['TN', 'Tennessee', '47', 'South', 'East South Central', 6910840, 41217],
      ['TX', 'Texas', '48', 'South', 'West South Central', 29145505, 261232],
      ['UT', 'Utah', '49', 'West', 'Mountain', 3271616, 82144],
      ['VT', 'Vermont', '50', 'Northeast', 'New England', 643077, 9216],
      ['VA', 'Virginia', '51', 'South', 'South Atlantic', 8631393, 39494],
      ['WA', 'Washington', '53', 'West', 'Pacific', 7705281, 66544],
      ['WV', 'West Virginia', '54', 'South', 'South Atlantic', 1793716, 24038],
      ['WI', 'Wisconsin', '55', 'Midwest', 'East North Central', 5893718, 54169],
      ['WY', 'Wyoming', '56', 'West', 'Mountain', 576851, 97100],
    ];

    for (const [code, name, fips, region, division, population, area] of stateData) {
      yield { code, name, fips, region, division, population, area };
    }
  }

  private async loadCounties(): Promise<void> {
    // Load sample counties for major states using generator
    const countiesGenerator = this.generateCounties();
    for (const county of countiesGenerator) {
      this.counties.set(county.fips, county);
    }
  }

  // Generator function for counties - memory efficient
  private *generateCounties(): Generator<County> {
    const countyData: Array<[string, string, string, string, number, number]> = [
      // Counties for 15 top investment hubs
      ['36061', '36', 'New York County', 'NY', 1694202, 23], // New York City
      ['06075', '06', 'San Francisco County', 'CA', 873965, 47], // San Francisco
      ['25025', '25', 'Suffolk County', 'MA', 684379, 48], // Boston
      ['06037', '06', 'Los Angeles County', 'CA', 10001040, 4060], // Los Angeles
      ['48453', '48', 'Travis County', 'TX', 974447, 297], // Austin
      ['53033', '53', 'King County', 'WA', 2299646, 2126], // Seattle
      ['17031', '17', 'Cook County', 'IL', 2746388, 234], // Chicago
      ['12086', '12', 'Miami-Dade County', 'FL', 2704160, 1946], // Miami
      ['11001', '11', 'District of Columbia', 'DC', 689545, 61], // Washington DC
      ['06085', '06', 'Santa Clara County', 'CA', 1927614, 1291], // San Jose
      ['06085', '06', 'Santa Clara County', 'CA', 1927614, 1291], // Palo Alto
      ['06085', '06', 'Santa Clara County', 'CA', 1927614, 1291], // Menlo Park
      ['48113', '48', 'Dallas County', 'TX', 2635516, 879], // Dallas
      ['13121', '13', 'Fulton County', 'GA', 498715, 134], // Atlanta
      ['09001', '09', 'Fairfield County', 'CT', 62976, 48], // Greenwich
    ];

    for (const [fips, stateFips, name, state, population, area] of countyData) {
      yield { fips, stateFips, name, state, population, area };
    }
  }

  private async loadCities(): Promise<void> {
    // Load major cities using generator
    const citiesGenerator = this.generateCities();
    for (const city of citiesGenerator) {
      this.cities.set(city.id, city);
    }
  }

  // Generator function for cities - memory efficient
  // PRIORITIZED: 15 top investor hubs with highest VC/PE concentration
  private *generateCities(): Generator<City> {
    const cityData: Array<[string, string, string, string, number, number, number, number, boolean, string]> = [
      // TOP 15 INVESTMENT HUBS
      ['new-york-ny', 'New York', 'NY', '36061', 8419600, 303, 40.7128, -74.0060, true, 'New York-Newark-Jersey City, NY-NJ-PA'],
      ['san-francisco-ca', 'San Francisco', 'CA', '06075', 808437, 47, 37.7749, -122.4194, true, 'San Francisco-Oakland-Hayward, CA'],
      ['boston-ma', 'Boston', 'MA', '25025', 684379, 48, 42.3601, -71.0589, true, 'Boston-Cambridge-Newton, MA-NH'],
      ['los-angeles-ca', 'Los Angeles', 'CA', '06037', 3898747, 469, 34.0522, -118.2437, true, 'Los Angeles-Long Beach-Anaheim, CA'],
      ['austin-tx', 'Austin', 'TX', '48453', 974447, 297, 30.2672, -97.7431, true, 'Austin-Round Rock, TX'],
      ['seattle-wa', 'Seattle', 'WA', '53033', 753675, 83, 47.6062, -122.3321, true, 'Seattle-Tacoma-Bellevue, WA'],
      ['chicago-il', 'Chicago', 'IL', '17031', 2746388, 234, 41.8781, -87.6298, true, 'Chicago-Naperville-Elgin, IL-IN-WI'],
      ['miami-fl', 'Miami', 'FL', '12086', 467963, 36, 25.7617, -80.1918, true, 'Miami-Fort Lauderdale-Pompano Beach, FL'],
      ['washington-dc', 'Washington', 'DC', '11001', 689545, 61, 38.9072, -77.0369, true, 'Washington-Arlington-Alexandria, DC-VA-MD-WV'],
      ['san-jose-ca', 'San Jose', 'CA', '06085', 1021795, 178, 37.3382, -121.8863, true, 'San Jose-Sunnyvale-Santa Clara, CA'],
      ['palo-alto-ca', 'Palo Alto', 'CA', '06085', 66666, 10, 37.4419, -122.1430, true, 'San Jose-Sunnyvale-Santa Clara, CA'],
      ['menlo-park-ca', 'Menlo Park', 'CA', '06085', 33880, 10, 37.4529, -122.1817, true, 'San Jose-Sunnyvale-Santa Clara, CA'],
      ['dallas-tx', 'Dallas', 'TX', '48113', 1343573, 342, 32.7767, -96.7970, true, 'Dallas-Fort Worth-Arlington, TX'],
      ['atlanta-ga', 'Atlanta', 'GA', '13121', 498715, 134, 33.7490, -84.3880, true, 'Atlanta-Sandy Springs-Alpharetta, GA'],
      ['greenwich-ct', 'Greenwich', 'CT', '09001', 62976, 48, 41.0262, -73.6280, true, 'New York-Newark-Jersey City, NY-NJ-PA'],
    ];

    for (const [id, name, state, county, population, area, latitude, longitude, isMetro, metroArea] of cityData) {
      yield { id, name, state, county, population, area, latitude, longitude, isMetro, metroArea };
    }
  }

  private async loadZipCodes(): Promise<void> {
    // Load sample ZIP codes for major cities using generator
    const zipGenerator = this.generateZipCodes();
    for (const zip of zipGenerator) {
      this.zipCodes.set(zip.zip, zip);
    }
  }

  // Generator function for ZIP codes - memory efficient
  // PRIORITIZED: Financial district ZIP codes for 15 top investment hubs
  private *generateZipCodes(): Generator<ZipCode> {
    const zipData: Array<[string, string, string, string, number, number, number, number]> = [
      // New York City: Midtown, Flatiron, Financial District
      ['10016', 'New York', 'NY', '36061', 40.7439, -73.9883, 45000, 0.4], // Midtown
      ['10010', 'New York', 'NY', '36061', 40.7426, -73.9909, 38000, 0.3], // Flatiron
      ['10004', 'New York', 'NY', '36061', 40.7024, -74.0119, 32000, 0.5], // Financial District
      ['10017', 'New York', 'NY', '36061', 40.7552, -73.9734, 41000, 0.4], // Midtown East
      ['10022', 'New York', 'NY', '36061', 40.7587, -73.9670, 39000, 0.4], // Midtown
      
      // San Francisco: Financial District, SoMa
      ['94104', 'San Francisco', 'CA', '06075', 37.7949, -122.3930, 28000, 0.6], // Financial District
      ['94105', 'San Francisco', 'CA', '06075', 37.7905, -122.3920, 26000, 0.5], // Financial District
      ['94107', 'San Francisco', 'CA', '06075', 37.7705, -122.4010, 32000, 0.8], // SoMa
      ['94103', 'San Francisco', 'CA', '06075', 37.7685, -122.4020, 35000, 0.9], // SoMa
      ['94111', 'San Francisco', 'CA', '06075', 37.7950, -122.4000, 24000, 0.4], // Financial District
      
      // Boston: Back Bay, Financial District
      ['02116', 'Boston', 'MA', '25025', 42.3504, -71.0765, 29000, 0.6], // Back Bay
      ['02108', 'Boston', 'MA', '25025', 42.3590, -71.0580, 24000, 0.5], // Financial District
      ['02110', 'Boston', 'MA', '25025', 42.3570, -71.0550, 22000, 0.4], // Financial District
      ['02199', 'Boston', 'MA', '25025', 42.3510, -71.0700, 18000, 0.3], // Back Bay
      ['02111', 'Boston', 'MA', '25025', 42.3550, -71.0600, 26000, 0.5], // Financial District
      
      // Los Angeles: Century City, Beverly Hills
      ['90067', 'Los Angeles', 'CA', '06037', 34.0539, -118.4000, 22000, 0.7], // Century City
      ['90210', 'Beverly Hills', 'CA', '06037', 34.0736, -118.4004, 21000, 0.5], // Beverly Hills
      ['90024', 'Los Angeles', 'CA', '06037', 34.0600, -118.4400, 32000, 0.8], // Westwood
      ['90025', 'Los Angeles', 'CA', '06037', 34.0500, -118.4600, 28000, 0.7], // West LA
      ['90049', 'Los Angeles', 'CA', '06037', 34.0450, -118.4800, 24000, 0.6], // Brentwood
      
      // Austin: Downtown, The Domain
      ['78701', 'Austin', 'TX', '48453', 30.2672, -97.7431, 32000, 0.8], // Downtown
      ['78705', 'Austin', 'TX', '48453', 30.2900, -97.7400, 28000, 0.7], // University area
      ['78759', 'Austin', 'TX', '48453', 30.3600, -97.7200, 35000, 0.9], // The Domain
      ['78746', 'Austin', 'TX', '48453', 30.2200, -97.8200, 26000, 0.6], // Southwest
      ['78703', 'Austin', 'TX', '48453', 30.2800, -97.7700, 29000, 0.7], // Tarrytown
      
      // Seattle: Downtown, South Lake Union
      ['98101', 'Seattle', 'WA', '53033', 47.6062, -122.3321, 34000, 0.6], // Downtown
      ['98109', 'Seattle', 'WA', '53033', 47.6200, -122.3500, 31000, 0.5], // South Lake Union
      ['98121', 'Seattle', 'WA', '53033', 47.6150, -122.3400, 28000, 0.5], // Belltown
      ['98104', 'Seattle', 'WA', '53033', 47.6000, -122.3300, 26000, 0.6], // Pioneer Square
      ['98119', 'Seattle', 'WA', '53033', 47.6300, -122.3600, 24000, 0.5], // Queen Anne
      
      // Chicago: The Loop, River North
      ['60601', 'Chicago', 'IL', '17031', 41.8827, -87.6233, 36000, 0.5], // The Loop
      ['60611', 'Chicago', 'IL', '17031', 41.8900, -87.6200, 32000, 0.4], // Streeterville
      ['60610', 'Chicago', 'IL', '17031', 41.9100, -87.6300, 29000, 0.5], // Lincoln Park
      ['60654', 'Chicago', 'IL', '17031', 41.8900, -87.6500, 27000, 0.4], // River North
      ['60603', 'Chicago', 'IL', '17031', 41.8800, -87.6300, 25000, 0.4], // The Loop
      
      // Miami: Brickell
      ['33131', 'Miami', 'FL', '12086', 25.7617, -80.1918, 28000, 0.5], // Brickell
      ['33132', 'Miami', 'FL', '12086', 25.7700, -80.1900, 26000, 0.4], // Downtown
      ['33130', 'Miami', 'FL', '12086', 25.7500, -80.2000, 24000, 0.5], // Little Havana
      ['33129', 'Miami', 'FL', '12086', 25.7400, -80.2100, 22000, 0.4], // Coconut Grove
      ['33133', 'Miami', 'FL', '12086', 25.7300, -80.2200, 20000, 0.5], // Coral Gables
      
      // Washington DC: Downtown, Georgetown
      ['20001', 'Washington', 'DC', '11001', 38.9072, -77.0369, 32000, 0.6], // Downtown
      ['20005', 'Washington', 'DC', '11001', 38.9000, -77.0200, 29000, 0.5], // Mount Vernon Square
      ['20037', 'Washington', 'DC', '11001', 38.9000, -77.0500, 27000, 0.4], // Georgetown
      ['20006', 'Washington', 'DC', '11001', 38.9100, -77.0400, 25000, 0.4], // Foggy Bottom
      ['20036', 'Washington', 'DC', '11001', 38.9050, -77.0300, 28000, 0.5], // Farragut Square
      
      // San Jose: Downtown
      ['95113', 'San Jose', 'CA', '06085', 37.3382, -121.8863, 26000, 0.6], // Downtown
      ['95112', 'San Jose', 'CA', '06085', 37.3300, -121.8600, 28000, 0.7], // East San Jose
      ['95110', 'San Jose', 'CA', '06085', 37.3200, -121.8500, 24000, 0.6], // South San Jose
      ['95126', 'San Jose', 'CA', '06085', 37.3100, -121.9300, 22000, 0.5], // Willow Glen
      ['95125', 'San Jose', 'CA', '06085', 37.3000, -121.9200, 20000, 0.5], // Almaden
      
      // Palo Alto: Sand Hill Road, Downtown Palo Alto
      ['94304', 'Palo Alto', 'CA', '06085', 37.4419, -122.1430, 18000, 0.3], // Sand Hill Road area
      ['94301', 'Palo Alto', 'CA', '06085', 37.4419, -122.1430, 16000, 0.2], // Downtown Palo Alto
      ['94306', 'Palo Alto', 'CA', '06085', 37.4200, -122.1500, 14000, 0.2], // South Palo Alto
      ['94303', 'Palo Alto', 'CA', '06085', 37.4000, -122.1300, 12000, 0.2], // East Palo Alto
      ['94305', 'Palo Alto', 'CA', '06085', 37.4300, -122.1600, 10000, 0.2], // Stanford area
      
      // Menlo Park: Sand Hill Road, Downtown Menlo Park
      ['94025', 'Menlo Park', 'CA', '06085', 37.4529, -122.1817, 12000, 0.2], // Downtown Menlo Park
      ['94027', 'Menlo Park', 'CA', '06085', 37.4600, -122.1800, 10000, 0.2], // Sand Hill Road
      ['94026', 'Menlo Park', 'CA', '06085', 37.4400, -122.1700, 8000, 0.2], // West Menlo Park
      ['94028', 'Menlo Park', 'CA', '06085', 37.4500, -122.1900, 6000, 0.2], // Sharon Heights
      ['94065', 'Menlo Park', 'CA', '06085', 37.4700, -122.2000, 4000, 0.2], // Ravenswood
      
      // Dallas: Uptown, Downtown
      ['75201', 'Dallas', 'TX', '48113', 32.7767, -96.7970, 34000, 0.5], // Downtown
      ['75219', 'Dallas', 'TX', '48113', 32.8000, -96.8100, 32000, 0.4], // Uptown
      ['75204', 'Dallas', 'TX', '48113', 32.7800, -96.7900, 30000, 0.4], // Deep Ellum
      ['75202', 'Dallas', 'TX', '48113', 32.7700, -96.8000, 28000, 0.4], // Main Street District
      ['75206', 'Dallas', 'TX', '48113', 32.8200, -96.7700, 26000, 0.5], // Lakewood
      
      // Atlanta: Buckhead
      ['30305', 'Atlanta', 'GA', '13121', 33.8400, -84.3800, 28000, 0.5], // Buckhead
      ['30326', 'Atlanta', 'GA', '13121', 33.8300, -84.3700, 26000, 0.4], // Buckhead
      ['30309', 'Atlanta', 'GA', '13121', 33.8100, -84.3600, 24000, 0.4], // Midtown
      ['30303', 'Atlanta', 'GA', '13121', 33.7500, -84.3900, 22000, 0.5], // Downtown
      ['30324', 'Atlanta', 'GA', '13121', 33.8200, -84.3500, 20000, 0.4], // Morningside
      
      // Greenwich CT: Downtown Greenwich
      ['06830', 'Greenwich', 'CT', '09001', 41.0262, -73.6280, 12000, 0.4], // Downtown Greenwich
      ['06831', 'Greenwich', 'CT', '09001', 41.0300, -73.6400, 10000, 0.3], // Riverside
      ['06870', 'Greenwich', 'CT', '09001', 41.0200, -73.6200, 8000, 0.3], // Old Greenwich
      ['06878', 'Greenwich', 'CT', '09001', 41.0400, -73.6500, 6000, 0.3], // Cos Cob
      ['06807', 'Greenwich', 'CT', '09001', 41.0100, -73.6100, 4000, 0.3], // Byram
    ];

    for (const [zip, city, state, county, latitude, longitude, population, area] of zipData) {
      yield { zip, city, state, county, latitude, longitude, population, area };
    }
  }

  private async loadMetroAreas(): Promise<void> {
    // Load metro areas using generator
    const metroGenerator = this.generateMetroAreas();
    for (const metro of metroGenerator) {
      this.metroAreas.set(metro.fips, metro);
    }
  }

  // Generator function for metro areas - memory efficient
  private *generateMetroAreas(): Generator<MetroArea> {
    const metroData: Array<[string, string, number, string, string]> = [
      // Metro areas for 15 top investment hubs
      ['New York-Newark-Jersey City, NY-NJ-PA', '35620', 19267207, 'New York', 'NY'],
      ['San Francisco-Oakland-Hayward, CA', '41860', 4758614, 'San Francisco', 'CA'],
      ['Boston-Cambridge-Newton, MA-NH', '14460', 4853158, 'Boston', 'MA'],
      ['Los Angeles-Long Beach-Anaheim, CA', '31080', 13246003, 'Los Angeles', 'CA'],
      ['Austin-Round Rock, TX', '12420', 2291194, 'Austin', 'TX'],
      ['Seattle-Tacoma-Bellevue, WA', '42660', 4103494, 'Seattle', 'WA'],
      ['Chicago-Naperville-Elgin, IL-IN-WI', '16974', 9512999, 'Chicago', 'IL'],
      ['Miami-Fort Lauderdale-Pompano Beach, FL', '33124', 6137982, 'Miami', 'FL'],
      ['Washington-Arlington-Alexandria, DC-VA-MD-WV', '47900', 6680934, 'Washington', 'DC'],
      ['San Jose-Sunnyvale-Santa Clara, CA', '41940', 2021426, 'San Jose', 'CA'],
      ['San Jose-Sunnyvale-Santa Clara, CA', '41940', 2021426, 'Palo Alto', 'CA'],
      ['San Jose-Sunnyvale-Santa Clara, CA', '41940', 2021426, 'Menlo Park', 'CA'],
      ['Dallas-Fort Worth-Arlington, TX', '19124', 7846293, 'Dallas', 'TX'],
      ['Atlanta-Sandy Springs-Alpharetta, GA', '12060', 6107351, 'Atlanta', 'GA'],
      ['New York-Newark-Jersey City, NY-NJ-PA', '35620', 19267207, 'Greenwich', 'CT'],
    ];

    for (const [name, fips, population, principalCity, state] of metroData) {
      yield { name, fips, population, principalCity, state };
    }
  }

  private buildIndexes(): void {
    // Build city name index
    this.cities.forEach((city, id) => {
      const nameLower = city.name.toLowerCase();
      if (!this.cityIndex.has(nameLower)) {
        this.cityIndex.set(nameLower, []);
      }
      this.cityIndex.get(nameLower)!.push(id);
    });

    // Build ZIP index
    this.zipCodes.forEach((zip, code) => {
      this.zipIndex.set(code, code);
    });

    // Build county name index
    this.counties.forEach((county, fips) => {
      const nameLower = county.name.toLowerCase();
      if (!this.countyIndex.has(nameLower)) {
        this.countyIndex.set(nameLower, []);
      }
      this.countyIndex.get(nameLower)!.push(fips);
    });
  }

  // Data accessors with lazy loading
  getStates(): State[] {
    return Array.from(this.states.values());
  }

  getState(code: string): State | undefined {
    return this.states.get(code);
  }

  async getCounties(): Promise<County[]> {
    await this.ensureCountiesLoaded();
    return Array.from(this.counties.values());
  }

  async getCounty(fips: string): Promise<County | undefined> {
    await this.ensureCountiesLoaded();
    return this.counties.get(fips);
  }

  async getCities(): Promise<City[]> {
    await this.ensureCitiesLoaded();
    return Array.from(this.cities.values());
  }

  async getCity(id: string): Promise<City | undefined> {
    await this.ensureCitiesLoaded();
    return this.cities.get(id);
  }

  async getZipCodes(): Promise<ZipCode[]> {
    await this.ensureZipCodesLoaded();
    return Array.from(this.zipCodes.values());
  }

  async getZipCode(zip: string): Promise<ZipCode | undefined> {
    await this.ensureZipCodesLoaded();
    return this.zipCodes.get(zip);
  }

  async getMetroAreas(): Promise<MetroArea[]> {
    await this.ensureMetroAreasLoaded();
    return Array.from(this.metroAreas.values());
  }

  async getMetroArea(fips: string): Promise<MetroArea | undefined> {
    await this.ensureMetroAreasLoaded();
    return this.metroAreas.get(fips);
  }

  // Search indexes with lazy loading
  async getCityIndex(): Promise<Map<string, string[]>> {
    await this.ensureIndexesBuilt();
    return this.cityIndex;
  }

  async getZipIndex(): Promise<Map<string, string>> {
    await this.ensureIndexesBuilt();
    return this.zipIndex;
  }

  async getCountyIndex(): Promise<Map<string, string[]>> {
    await this.ensureIndexesBuilt();
    return this.countyIndex;
  }

  isInitialized(): boolean {
    return this.statesLoaded;
  }
}