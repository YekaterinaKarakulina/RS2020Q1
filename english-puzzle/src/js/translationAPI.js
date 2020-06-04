
export default async function getTranslation(sentence) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${sentence}&lang=en-ru`;
  const res = await fetch(url);
  const data = await res.json();
  return data.text[0];
}
