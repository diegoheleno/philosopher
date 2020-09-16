let colors = {
  green: '#61bd4f',
  blue: '#0079bf',
  orange: '#ff9f1a',
  lightgreen: '#51e898',
  pink: '#ff78cb',
  red: '#eb5a46',
  lightgray: 'lightgray',
  white: 'white',
};

Object.keys(colors).map((prop, index) => colors[index] = colors[prop])

export default colors;
