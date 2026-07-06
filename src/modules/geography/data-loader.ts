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
      // California counties
      ['06037', '06', 'Los Angeles County', 'CA', 10001040, 4060],
      ['06073', '06', 'San Diego County', 'CA', 3328159, 4204],
      ['06075', '06', 'San Francisco County', 'CA', 873965, 47],
      ['06085', '06', 'Santa Clara County', 'CA', 1927614, 1291],
      ['06001', '06', 'Alameda County', 'CA', 1671329, 739],
      // Texas counties
      ['48201', '48', 'Harris County', 'TX', 4731345, 1704],
      ['48113', '48', 'Dallas County', 'TX', 2635516, 879],
      ['48439', '48', 'Tarrant County', 'TX', 2154835, 864],
      ['48157', '48', 'Bexar County', 'TX', 2003554, 1247],
      // New York counties
      ['36061', '36', 'Kings County', 'NY', 2746054, 70],
      ['36081', '36', 'Queens County', 'NY', 2405464, 109],
      ['36047', '36', 'New York County', 'NY', 1694202, 23],
      // Florida counties
      ['12086', '12', 'Miami-Dade County', 'FL', 2704160, 1946],
      ['12095', '12', 'Orange County', 'FL', 1393432, 903],
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
  private *generateCities(): Generator<City> {
    const cityData: Array<[string, string, string, string, number, number, number, number, boolean, string]> = [
      ['los-angeles-ca', 'Los Angeles', 'CA', '06037', 3898747, 469, 34.0522, -118.2437, true, 'Los Angeles-Long Beach-Anaheim, CA'],
      ['new-york-ny', 'New York', 'NY', '36061', 8419600, 303, 40.7128, -74.0060, true, 'New York-Newark-Jersey City, NY-NJ-PA'],
      ['chicago-il', 'Chicago', 'IL', '17031', 2746388, 234, 41.8781, -87.6298, true, 'Chicago-Naperville-Elgin, IL-IN-WI'],
      ['houston-tx', 'Houston', 'TX', '48201', 2320268, 599, 29.7604, -95.3698, true, 'Houston-The Woodlands-Sugar Land, TX'],
      ['phoenix-az', 'Phoenix', 'AZ', '04013', 1680992, 517, 33.4484, -112.0740, true, 'Phoenix-Mesa-Scottsdale, AZ'],
      ['philadelphia-pa', 'Philadelphia', 'PA', '42101', 1603697, 134, 39.9526, -75.1652, true, 'Philadelphia-Camden-Wilmington, PA-NJ-DE-MD'],
      ['san-antonio-tx', 'San Antonio', 'TX', '48129', 1547253, 465, 29.4241, -98.4936, true, 'San Antonio-New Braunfels, TX'],
      ['san-diego-ca', 'San Diego', 'CA', '06073', 1386932, 325, 32.7157, -117.1611, true, 'San Diego-Chula Vista-Carlsbad, CA'],
      ['dallas-tx', 'Dallas', 'TX', '48113', 1343573, 342, 32.7767, -96.7970, true, 'Dallas-Fort Worth-Arlington, TX'],
      ['san-jose-ca', 'San Jose', 'CA', '06085', 1021795, 178, 37.3382, -121.8863, true, 'San Jose-Sunnyvale-Santa Clara, CA'],
      // Add more cities to ensure all states have coverage
      ['birmingham-al', 'Birmingham', 'AL', '01073', 212237, 146, 33.5207, -86.8025, true, 'Birmingham-Hoover, AL'],
      ['anchorage-ak', 'Anchorage', 'AK', '02020', 291826, 1700, 61.2181, -149.9003, true, 'Anchorage, AK'],
      ['little-rock-ar', 'Little Rock', 'AR', '05119', 202591, 116, 34.7465, -92.2896, true, 'Little Rock-North Little Rock-Conway, AR'],
      ['denver-co', 'Denver', 'CO', '08031', 715522, 154, 39.7392, -104.9903, true, 'Denver-Aurora-Lakewood, CO'],
      ['hartford-ct', 'Hartford', 'CT', '09003', 121054, 18, 41.7658, -72.6734, true, 'Hartford-East Hartford-Middletown, CT'],
      ['dover-de', 'Dover', 'DE', '10001', 37879, 23, 39.1619, -75.5264, true, 'Dover, DE'],
      ['jacksonville-fl', 'Jacksonville', 'FL', '12031', 849491, 758, 30.3322, -81.6557, true, 'Jacksonville, FL'],
      ['atlanta-ga', 'Atlanta', 'GA', '13121', 498715, 134, 33.7490, -84.3880, true, 'Atlanta-Sandy Springs-Alpharetta, GA'],
      ['honolulu-hi', 'Honolulu', 'HI', '15003', 345194, 60, 21.3099, -157.8581, true, 'Urban Honolulu, HI'],
      ['boise-id', 'Boise', 'ID', '16001', 235684, 80, 43.6150, -116.2023, true, 'Boise City, ID'],
      ['indianapolis-in', 'Indianapolis', 'IN', '18097', 887642, 361, 39.7684, -86.1581, true, 'Indianapolis-Carmel-Anderson, IN'],
      ['des-moines-ia', 'Des Moines', 'IA', '19153', 214770, 85, 41.6005, -93.6091, true, 'Des Moines-West Des Moines, IA'],
      ['wichita-ks', 'Wichita', 'KS', '20173', 390566, 163, 37.6872, -97.3301, true, 'Wichita, KS'],
      ['louisville-ky', 'Louisville', 'KY', '21111', 633045, 325, 38.2527, -85.7585, true, 'Louisville/Jefferson County, KY-IN'],
      ['new-orleans-la', 'New Orleans', 'LA', '22071', 390144, 169, 29.9511, -90.0715, true, 'New Orleans-Metairie, LA'],
      ['portland-me', 'Portland', 'ME', '23025', 68308, 29, 43.6591, -70.2568, true, 'Portland-South Portland, ME'],
      ['baltimore-md', 'Baltimore', 'MD', '24510', 585708, 80, 39.2904, -76.6122, true, 'Baltimore-Columbia-Towson, MD'],
      ['boston-ma', 'Boston', 'MA', '25025', 684379, 48, 42.3601, -71.0589, true, 'Boston-Cambridge-Newton, MA-NH'],
      ['detroit-mi', 'Detroit', 'MI', '26163', 670031, 138, 42.3314, -83.0458, true, 'Detroit-Warren-Dearborn, MI'],
      ['minneapolis-mn', 'Minneapolis', 'MN', '27053', 429954, 55, 44.9778, -93.2650, true, 'Minneapolis-St. Paul-Bloomington, MN-WI'],
      ['jackson-ms', 'Jackson', 'MS', '28049', 147420, 111, 32.2988, -90.1848, true, 'Jackson, MS'],
      ['kansas-city-mo', 'Kansas City', 'MO', '29145', 491918, 315, 39.0997, -94.5786, true, 'Kansas City, MO-KS'],
      ['billings-mt', 'Billings', 'MT', '30011', 117445, 44, 45.7833, -108.5007, true, 'Billings, MT'],
      ['omaha-ne', 'Omaha', 'NE', '31055', 486051, 133, 41.2565, -95.9345, true, 'Omaha-Council Bluffs, NE-IA'],
      ['las-vegas-nv', 'Las Vegas', 'NV', '32003', 651319, 141, 36.1699, -115.1398, true, 'Las Vegas-Henderson-Paradise, NV'],
      ['manchester-nh', 'Manchester', 'NH', '33013', 115644, 34, 42.9956, -71.4447, true, 'Manchester-Nashua, NH'],
      ['newark-nj', 'Newark', 'NJ', '34013', 277140, 26, 40.7357, -74.1724, true, 'New York-Newark-Jersey City, NY-NJ-PA'],
      ['albuquerque-nm', 'Albuquerque', 'NM', '35001', 564559, 180, 35.0844, -106.6504, true, 'Albuquerque, NM'],
      ['charlotte-nc', 'Charlotte', 'NC', '37119', 874579, 298, 35.2271, -80.8431, true, 'Charlotte-Concord-Gastonia, NC-SC'],
      ['fargo-nd', 'Fargo', 'ND', '38029', 125990, 48, 46.8772, -96.7898, true, 'Fargo, ND-MN'],
      ['columbus-oh', 'Columbus', 'OH', '39049', 905748, 217, 39.9612, -82.9988, true, 'Columbus, OH'],
      ['oklahoma-city-ok', 'Oklahoma City', 'OK', '40109', 681034, 607, 35.4676, -97.5164, true, 'Oklahoma City, OK'],
      ['portland-or', 'Portland', 'OR', '41051', 652503, 145, 45.5152, -122.6784, true, 'Portland-Vancouver-Hillsboro, OR-WA'],
      ['providence-ri', 'Providence', 'RI', '44007', 190956, 18, 41.8240, -71.4128, true, 'Providence-Warwick, RI-MA'],
      ['charleston-sc', 'Charleston', 'SC', '45029', 150227, 127, 32.7765, -79.9311, true, 'Charleston-North Charleston, SC'],
      ['sioux-falls-sd', 'Sioux Falls', 'SD', '46099', 179674, 73, 43.5446, -96.7311, true, 'Sioux Falls, SD'],
      ['memphis-tn', 'Memphis', 'TN', '47157', 628127, 293, 35.1495, -90.0490, true, 'Memphis, TN-MS-AR'],
      ['austin-tx', 'Austin', 'TX', '48453', 974447, 297, 30.2672, -97.7431, true, 'Austin-Round Rock, TX'],
      ['salt-lake-city-ut', 'Salt Lake City', 'UT', '49035', 199723, 109, 40.7608, -111.8910, true, 'Salt Lake City, UT'],
      ['burlington-vt', 'Burlington', 'VT', '50013', 44953, 10, 44.4759, -73.2121, true, 'Burlington, VT'],
      ['virginia-beach-va', 'Virginia Beach', 'VA', '51710', 459511, 249, 36.8529, -75.9780, true, 'Virginia Beach-Norfolk-Newport News, VA-NC'],
      ['seattle-wa', 'Seattle', 'WA', '53033', 753675, 83, 47.6062, -122.3321, true, 'Seattle-Tacoma-Bellevue, WA'],
      ['charleston-wv', 'Charleston', 'WV', '54019', 46510, 31, 38.3498, -81.6326, true, 'Charleston, WV'],
      ['milwaukee-wi', 'Milwaukee', 'WI', '55079', 569164, 96, 43.0389, -87.9065, true, 'Milwaukee-Waukesha, WI'],
      ['cheyenne-wy', 'Cheyenne', 'WY', '56025', 65248, 24, 41.1390, -104.8202, true, 'Cheyenne, WY'],
      ['washington-dc', 'Washington', 'DC', '11001', 689545, 61, 38.9072, -77.0369, true, 'Washington-Arlington-Alexandria, DC-VA-MD-WV'],
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
  private *generateZipCodes(): Generator<ZipCode> {
    const zipData: Array<[string, string, string, string, number, number, number, number]> = [
      ['90210', 'Beverly Hills', 'CA', '06037', 34.0736, -118.4004, 22101, 5.5],
      ['10001', 'New York', 'NY', '36061', 40.7505, -73.9934, 35345, 0.9],
      ['60601', 'Chicago', 'IL', '17031', 41.8827, -87.6233, 15234, 0.6],
      ['77001', 'Houston', 'TX', '48201', 29.7604, -95.3698, 28456, 1.2],
      ['85001', 'Phoenix', 'AZ', '04013', 33.4484, -112.0740, 19876, 1.0],
      ['19101', 'Philadelphia', 'PA', '42101', 39.9526, -75.1652, 12543, 0.8],
      ['33101', 'Miami', 'FL', '12086', 25.7617, -80.1918, 16892, 1.1],
      ['94101', 'San Francisco', 'CA', '06075', 37.7749, -122.4194, 24567, 0.7],
      ['98101', 'Seattle', 'WA', '53033', 47.6062, -122.3321, 21345, 0.9],
      ['02101', 'Boston', 'MA', '25025', 42.3601, -71.0589, 18765, 0.6],
      // Add more ZIP codes for all the cities
      ['35201', 'Birmingham', 'AL', '01073', 33.5207, -86.8025, 12456, 1.5],
      ['99501', 'Anchorage', 'AK', '02020', 61.2181, -149.9003, 8234, 2.0],
      ['72201', 'Little Rock', 'AR', '05119', 34.7465, -92.2896, 9876, 1.2],
      ['80201', 'Denver', 'CO', '08031', 39.7392, -104.9903, 15678, 1.8],
      ['06101', 'Hartford', 'CT', '09003', 41.7658, -72.6734, 7654, 0.8],
      ['19901', 'Dover', 'DE', '10001', 39.1619, -75.5264, 4321, 0.6],
      ['32201', 'Jacksonville', 'FL', '12031', 30.3322, -81.6557, 21345, 2.1],
      ['30301', 'Atlanta', 'GA', '13121', 33.7490, -84.3880, 18765, 1.6],
      ['96801', 'Honolulu', 'HI', '15003', 21.3099, -157.8581, 14321, 1.1],
      ['83701', 'Boise', 'ID', '16001', 43.6150, -116.2023, 10987, 1.3],
      ['46201', 'Indianapolis', 'IN', '18097', 39.7684, -86.1581, 16543, 1.9],
      ['50301', 'Des Moines', 'IA', '19153', 41.6005, -93.6091, 8765, 1.0],
      ['67201', 'Wichita', 'KS', '20173', 37.6872, -97.3301, 11234, 1.4],
      ['40201', 'Louisville', 'KY', '21111', 38.2527, -85.7585, 14567, 1.7],
      ['70101', 'New Orleans', 'LA', '22071', 29.9511, -90.0715, 13245, 1.3],
      ['04101', 'Portland', 'ME', '23025', 43.6591, -70.2568, 6543, 0.7],
      ['21201', 'Baltimore', 'MD', '24510', 39.2904, -76.6122, 17890, 1.1],
      ['02108', 'Boston', 'MA', '25025', 42.3601, -71.0589, 14567, 0.8],
      ['48201', 'Detroit', 'MI', '26163', 42.3314, -83.0458, 16789, 1.4],
      ['55401', 'Minneapolis', 'MN', '27053', 44.9778, -93.2650, 12345, 1.2],
      ['39201', 'Jackson', 'MS', '28049', 32.2988, -90.1848, 7654, 1.1],
      ['64101', 'Kansas City', 'MO', '29145', 39.0997, -94.5786, 14321, 1.5],
      ['59101', 'Billings', 'MT', '30011', 45.7833, -108.5007, 8765, 1.8],
      ['68101', 'Omaha', 'NE', '31055', 41.2565, -95.9345, 13456, 1.6],
      ['89101', 'Las Vegas', 'NV', '32003', 36.1699, -115.1398, 19876, 1.9],
      ['03101', 'Manchester', 'NH', '33013', 42.9956, -71.4447, 6543, 0.9],
      ['07101', 'Newark', 'NJ', '34013', 40.7357, -74.1724, 11234, 1.0],
      ['87101', 'Albuquerque', 'NM', '35001', 35.0844, -106.6504, 15678, 1.8],
      ['28201', 'Charlotte', 'NC', '37119', 35.2271, -80.8431, 18765, 2.0],
      ['58101', 'Fargo', 'ND', '38029', 46.8772, -96.7898, 7654, 1.1],
      ['43201', 'Columbus', 'OH', '39049', 39.9612, -82.9988, 16789, 1.7],
      ['73101', 'Oklahoma City', 'OK', '40109', 35.4676, -97.5164, 14567, 1.5],
      ['97201', 'Portland', 'OR', '41051', 45.5152, -122.6784, 16789, 1.6],
      ['02901', 'Providence', 'RI', '44007', 41.8240, -71.4128, 7654, 0.8],
      ['29401', 'Charleston', 'SC', '45029', 32.7765, -79.9311, 9876, 1.3],
      ['57101', 'Sioux Falls', 'SD', '46099', 43.5446, -96.7311, 10987, 1.2],
      ['38101', 'Memphis', 'TN', '47157', 35.1495, -90.0490, 14321, 1.6],
      ['78701', 'Austin', 'TX', '48453', 30.2672, -97.7431, 17890, 1.8],
      ['84101', 'Salt Lake City', 'UT', '49035', 40.7608, -111.8910, 11234, 1.4],
      ['05401', 'Burlington', 'VT', '50013', 44.4759, -73.2121, 5432, 0.6],
      ['23451', 'Virginia Beach', 'VA', '51710', 36.8529, -75.9780, 15678, 2.2],
      ['98101', 'Seattle', 'WA', '53033', 47.6062, -122.3321, 21345, 1.2],
      ['25301', 'Charleston', 'WV', '54019', 38.3498, -81.6326, 4321, 0.8],
      ['53201', 'Milwaukee', 'WI', '55079', 43.0389, -87.9065, 13456, 1.1],
      ['82001', 'Cheyenne', 'WY', '56025', 41.1390, -104.8202, 6543, 1.4],
      ['20001', 'Washington', 'DC', '11001', 38.9072, -77.0369, 16789, 1.3],
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
      ['New York-Newark-Jersey City, NY-NJ-PA', '35620', 19267207, 'New York', 'NY'],
      ['Los Angeles-Long Beach-Anaheim, CA', '31080', 13246003, 'Los Angeles', 'CA'],
      ['Chicago-Naperville-Elgin, IL-IN-WI', '16974', 9512999, 'Chicago', 'IL'],
      ['Dallas-Fort Worth-Arlington, TX', '19124', 7846293, 'Dallas', 'TX'],
      ['Houston-The Woodlands-Sugar Land, TX', '26420', 7412806, 'Houston', 'TX'],
      ['Washington-Arlington-Alexandria, DC-VA-MD-WV', '47900', 6680934, 'Washington', 'DC'],
      ['Miami-Fort Lauderdale-Pompano Beach, FL', '33124', 6137982, 'Miami', 'FL'],
      ['Philadelphia-Camden-Wilmington, PA-NJ-DE-MD', '37964', 6096372, 'Philadelphia', 'PA'],
      ['Atlanta-Sandy Springs-Alpharetta, GA', '12060', 6107351, 'Atlanta', 'GA'],
      ['Phoenix-Mesa-Scottsdale, AZ', '38060', 4929024, 'Phoenix', 'AZ'],
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