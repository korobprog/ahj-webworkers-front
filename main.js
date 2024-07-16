/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/template.js
function container() {
  const newContainer = document.createElement('div');
  newContainer.classList.add('wrapper');
  newContainer.innerHTML = `
  <div class="unit-container">
    <div class="container__header">
      <h2 class="widget-header">Новости мира кино</h2>
      <span class="link">Обновить</span>
    </div>
    <ul class="unit-list">
    </ul>
    <div class="container__footer">
    </div>
  </div>
    `;
  return newContainer;
}
function unit(data) {
  const {
    id = 'clear',
    content = '&nbsp;',
    logoUrl = ''
  } = data;
  let {
    description = ''
  } = data;
  let img = '';
  let descrMarkup = `
  <span class="unit__descr-text">&nbsp;</span>
  <br>
  <span>&nbsp;</span>
  <br>
  <span class="unit__descr-text">&nbsp;</span>
  `;
  if (logoUrl) {
    img = `<img src="${logoUrl}" width="100%" height="100%"></img>`;
  }
  if (description) {
    if (description.length > 150) {
      description = description.substring(0, 150);
      description += '...';
    }
    descrMarkup = `
    <span class="unit__descr-text">${description}</span>
    `;
  }
  const newUnit = document.createElement('li');
  newUnit.classList.add('unit');
  newUnit.dataset.unitId = id;
  newUnit.innerHTML = `
      <div class="unit__header-block">
        <span class="unit__header-text">${content}</span>
      </div>
      <div class="unit__body">
        <div class="unit__img-block">${img}</div>
        <div class="unit__descr-block">
          ${descrMarkup}
        </div>
      </div>
  `;
  return newUnit;
}
function placeholder() {
  const placeHolder = document.createElement('div');
  const markup = `
  <li class="placeholder-unit">
    <div class="placeholder-unit__header-block">
      <span class="placeholder-unit__header-text placeholder-item">&nbsp</span>
    </div>
    <div class="placeholder-unit__body">
      <div class="placeholder-unit__img-block placeholder-item"></div>
      <div class="placeholder-unit__descr-block">
        <span class="placeholder-unit__descr-text placeholder-item">&nbsp;</span>
        <br>
        <span>&nbsp;</span>
        <br>
        <span class="placeholder-unit__descr-text placeholder-item">&nbsp;</span>
      </div>
    </div>
  </li>
  `;
  for (let i = 0; i < 3; i += 1) {
    placeHolder.innerHTML += markup;
  }
  return placeHolder;
}

;// CONCATENATED MODULE: ./src/js/widget.js
/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */


class Widget {
  constructor() {
    this.idSet = new Set();
    this.error = null;
  }
  init() {
    this.renderContainer();
    this.bindToDOM();
    this.defaultScreen();
    this.addListeners();
    this.getData();
    this.registerWorker();
  }
  registerWorker() {
    if (navigator.serviceWorker) {
      window.addEventListener('load', async () => {
        try {
          await navigator.serviceWorker.register('./service.worker.js', {
            scope: './'
          });
          console.log('service worker registered');
        } catch (err) {
          console.log('service worker register error: ', err);
        }
      });
    }
  }
  renderContainer() {
    document.body.append(container());
  }
  bindToDOM() {
    this.wrapper = document.querySelector('div.wrapper');
    this.refresh = document.querySelector('span.link');
    this.unitList = document.querySelector('ul.unit-list');
    this.unitContainer = document.querySelector('.unit-container');
  }
  defaultScreen() {
    this.clearList();
    this.unitList.prepend(placeholder());
  }
  addUnit(element) {
    const newUnit = unit(element);
    this.unitList.prepend(newUnit);
  }
  addListeners() {
    this.refresh.addEventListener('click', event => {
      event.preventDefault();
      this.defaultScreen();
      this.getData();
    }, false);
  }
  clearList() {
    this.unitList.innerHTML = '';
  }
  async getData() {
    const baseURL = 'https://api-ahj-workers.onrender.com/api/news';
    console.log('🚀 ~ Widget ~ getData ~ baseURL:', baseURL);
    // const baseURL = 'http://localhost:3000/news';

    try {
      const request = await fetch(baseURL);
      const response = await request.json();
      if (response.status === 'ok') {
        this.unitContainer.classList.remove('unit-container-offline');
        this.clearList();
        response.news.forEach(element => {
          this.addUnit(element);
        });
      }
      return true;
    } catch (err) {
      console.error(err);
    }
    this.widgetOffline();
    return false;
  }
  widgetOffline() {
    [...this.unitList.querySelectorAll('.placeholder-item')].forEach(element => element.classList.remove('placeholder-item'));
    this.unitContainer.classList.add('unit-container-offline');
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

function app() {
  const widget = new Widget();
  widget.init();
}
app();
;// CONCATENATED MODULE: ./src/index.js



// Точка входа webpack
// Не пишите код в данном файле
/******/ })()
;