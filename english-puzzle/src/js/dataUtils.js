import getData from './wordsAPI';

// async function getLevelData(level) {
//   const promises = [];
//   const levelData = [];
//   for (let i = 0; i < 30; i += 1) {
//     promises.push(getData(level, i));
//   }
//   const data = await Promise.all(promises);
//   data.forEach((array) => array.forEach((el) => levelData.push(el)));
//   const levelDataFiltered = levelData.filter((el) => el.textExample.split(' ').length <= 10);
//   console.log(levelDataFiltered);
//   const roundAmount = Math.floor(levelDataFiltered.length / 10);
//   console.log(roundAmount);
//   return levelDataFiltered;
// }

// function getRoundData(levelData, roundNumber) {
//   const roundData = [];
//   for (let i = roundNumber * 10 - 10; i <= roundNumber * 10 - 1; i += 1) {
//     roundData.push(levelData[i]);
//   }
//   return roundData;
// }

// export default async function initData(level, round) {
//   const levelData = await getLevelData(level - 1);
//   return getRoundData(levelData, round);
// }

// async function getData(level, round) {
//   const promises = [];
//   const levelData = [];
//   for (let i = 0; i < 30; i += 1) {
//     promises.push(getData(level, i));
//   }
//   const data = await Promise.all(promises);
//   data.forEach((array) => array.forEach((el) => levelData.push(el)));
//   const levelDataFiltered = levelData.filter((el) => el.textExample.split(' ').length <= 10);
//   console.log(levelDataFiltered);
//   const roundAmount = Math.floor(levelDataFiltered.length / 10);
//   console.log(roundAmount);
//   return levelDataFiltered;
// }
