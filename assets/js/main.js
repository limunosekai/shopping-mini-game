'use strict'
// JSON 파일 불러오기
function loadItems() {
  return fetch('data/data.json') //[options] 안적으면 GET 메서드로 진행 -> url로부터 콘텐츠 다운로드
    .then(response => response.json()) //await 없이 promise만 사용한 경우 -> 응답을 json형태로 parsing
    .then(json => {return json.items}); //json에서 items 꺼내기
}
// List 업데이트
function displayItem(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}
// HTML li 작성
function createHTMLString(item) {
  return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item_thumb">
      <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
  `;
}
// 버튼 클릭 이벤트
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value; 

  if(key == null || value == null){
    return;
  } displayItem(items.filter(item => item[key] === value));
}
// 아이템 필터링 이벤트
function setEventListener(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItem(items));
  buttons.addEventListener('click', event => onButtonClick(event, items));
}
// Main
loadItems()
  .then(items => {
    displayItem(items);
    setEventListener(items);
  })
  .catch(console.log);
