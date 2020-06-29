async function getPageData(level, page) {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${level - 1}&page=${page - 1}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function getPagesAmountInLevel(level) {
  const url = `https://afternoon-falls-25894.herokuapp.com/words/count?group=${level - 1}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
  const res = await fetch(url);
  const data = await res.json();
  return data.count;
}

export { getPageData, getPagesAmountInLevel };
