import 'babel-polyfill';

import getWords from './js/wordsAPI';
import Word from './js/Word';


// для изображения files/01_0009.jpg
// https://raw.githubusercontent.com/yekaterinakarakulina/rslang-data/master/files/01_0009.jpg
// Для аудио files/01_0009_example.mp3
// https://raw.githubusercontent.com/yekaterinakarakulina/rslang-data/master/files/01_0009_example.mp3


async function myF() {
  const data = await getWords(0, 0);
  console.log(data);
  console.log(data[0]);

  const wordObj = {
    id: data[0].id,
    word: data[0].word,
    audioExample: data[0].audioExample,
    textExample: data[0].textExample,
  };

  const wordElem = new Word(wordObj);
  console.log(wordElem.createWordElement());
  const sentence = wordObj.textExample.replace(/<b>/, '').replace(/<\/b>/, '').replace(/[.]/, '');
  console.log(sentence);
  const sentenceArray = sentence.split(' ');
  console.log(sentenceArray);

  const sentenceArrayMixed = [];
  const sentenceArrayLength = sentenceArray.length;
  for (let i = 0; i < sentenceArrayLength; i += 1) {
    const randomNumber = Math.floor(Math.random() * sentenceArray.length);
    const randomWord = sentenceArray[randomNumber];
    sentenceArray.splice(randomNumber, 1);
    sentenceArrayMixed.push(randomWord);
  }
  console.log(sentenceArrayMixed);
}

myF();
