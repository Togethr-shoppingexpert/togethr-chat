const production = {
  url: "govoyr.com",
};
const development = {
  url: "qa.govoyr.com",
};

//export const config = process.env.NODE_ENV === 'development' ? production : development;
export const config = process.env.NODE_ENV === 'development' ? development : production;

// export const config = development;
//export const config =process.env.NODE_ENV === "development" ? production : development;
 // export const config = process.env.NODE_ENV === 'development' ? development : production;
console.log('config console', config.url);
