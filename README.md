
# Your Tour

Веб-приложение для планирования и организации туров с интуитивным интерфейсом.

[![Demo](https://img.shields.io/badge/demo-live-green)](https://panasenkovadim.github.io/SNP-Task-1/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## Демо

[Посмотреть живую демо-версию](https://panasenkovadim.github.io/SNP-Task-1/)

## Установка

Установите зависимости:

```bash
npm install
```

## Режим разработки

Запустите development сервер:

```bash

npm run dev

```

Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000)

## Production сборка

Соберите проект для production:

```bash
npm run build
```

## Доступные скрипты

- `npm run dev` - запуск development сервера
- `npm run build` - сборка для production
- `npm run lint:check` - проверка кода линтером
- `npm run lint:fix` - автоматическое исправление ошибок

## Технологии

- Html + JavaScript + SCSS
- **Стилизация**: CSS Modules / SCSS
- **Сборка**: Webpack
- **Линтинг**: ESLint + Prettier + Stylelint
- **Хостинг**: GitHub Pages

## Линтинг

Проверка кода:

```bash
npm run lint:check
```

Автоматическое исправление ошибок:
```bash
npm run lint:fix
```

## Деплой на GitHub Pages

Проект автоматически деплоится на GitHub Pages при пуше в ветку `master`.
