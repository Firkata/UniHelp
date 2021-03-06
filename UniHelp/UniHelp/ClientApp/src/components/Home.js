﻿import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div>
        <h1>Здравейте, студенти!</h1>
        <p>Добре дошли в UniHelp на ТУ-София, мястото за получаване на релевантни новини за всичко свързано с учебната дейност като:</p>
        <ul>
          <li>Дисциплини</li>
          <li>Сесии и изпити</li>
          <li>Курсови проекти и курсови работи</li>
          <li>Стипендии и награди</li>
          <li>Дни на кариерата</li>
          <li>Летни практики</li>
        </ul>
        <p>Тази система е направена, за да Ви помогне лесно да получавате информация от Вашите преподаватели и от администрацията.</p>
        <p>За вход в системата, моля използвайте Вашето ЕГН и Факултетен номер.</p>
      </div>
    );
  }
}
