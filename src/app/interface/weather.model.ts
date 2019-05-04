export class Weather {
  constructor(
    public cityName?: string,
    public foreCastdata?: object,
    public humidity?: number,
    public temparature?: number,
    public max_temp?: number,
    public min_temp?: number,
    public main?: string,
    public date?: string,
    public icon?: string
  ) { }
}

export class DailyWeather {
  constructor(
    public date?: string,
    public data?: [],
    public max_temp?: number,
    public min_temp?: number,
    public icon?: string,
    public humidity?: number,
    public pressure?: number,
    public sea_level?: number,
    public weather_desc?: string
  ) { }
}
