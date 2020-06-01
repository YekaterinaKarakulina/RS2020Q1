export default async function getWords(level, page) {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
