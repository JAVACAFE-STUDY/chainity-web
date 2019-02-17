---
title: React-компонент Таблица
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---
# Таблицы

<p class="description">Таблицы отображают массивы данных. Они могут быть полностью кастомизированны.</p>

[Таблицы](https://material.io/design/components/data-tables.html) отображают информацию так, чтобы ее было легко воспринимать визуально. Так чтобы пользователи видели шаблоны отображения данных. Они могут быть встроены в основной контент, например в карточки.

Таблицы могут включать в себя:

- Соответствующую визуализацию
- Навигацию
- Инструменты для запросов и манипулирования данными

При использовании таких инструментов их следует размещать непосредственно сверху или снизу таблицы.

## Структура

Таблица данных содержит 1 строку заголовка, в которой перечислены имена столбцов, за которыми следуют строки для данных.

Чекбоксы должны сопровождать каждую строку, если пользователю необходимо сделать выбор или произвести манипуляции с данными.

Для доступности(accessibility) первый столбец должен быть элементом `<th>` с атрибутом `scope` со значением `"row"`. Это позволяет программам чтения с экрана идентифицировать значение ячейки по имени строки и столбца.

## Простая таблица

Простой пример без излишеств.

{{"demo": "pages/demos/tables/SimpleTable.js"}}

## Сортировка и выбор строк

В этом примере демонстрируется использование `чекбокса` и кликабельных строк для выбора данных в настраиваемой `панели инструментов`. Здесь используется компонент `TableSortLabel` чтобы помочь стилизовать заголовки столбцов.

Таблица имеет фиксированную ширину для демонстрации горизонтальной прокрутки. Чтобы предотвратить прокрутку элементов управления нумерацией страниц, компонент TablePagination находится за пределами таблицы. (В [примерe «собственные действия элементов нумерации»](#custom-table-pagination-action) ниже показывается управление нумерацией таблиц с помощью TableFooter.)

{{"demo": "pages/demos/tables/EnhancedTable.js"}}

## Индивидуальное изменение таблицы

Если вы читали [overrides documentation page](/customization/overrides/) но все еще не до конца уверены как будет выглядеть компонент, вот примеры того, как вы можете изменить отображение `TableCell`.

⚠️ While the material design specification encourages theming, this example is off the beaten path.

{{"demo": "pages/demos/tables/CustomizedTable.js"}}

## Настройка постраничной навигации

Свойство `Action` компонента `TablePagination` позволяет реализовать собственную обработку пользовательский событий.

{{"demo": "pages/demos/tables/CustomPaginationActionsTable.js"}}

## Объединение таблиц

Простой пример соединения строк и столбцов.

{{"demo": "pages/demos/tables/SpanningTable.js"}}

## Виртуализированная таблица

В следующем примере мы покажем, как использовать [react-virtualized](https://github.com/bvaughn/react-virtualized) с компонентом `Table`. Он отображает 200 строк и c легкостью может еще больше.

{{"demo": "pages/demos/tables/ReactVirtualizedTable.js"}}

## Дополнительные проекты

For more advanced use cases you might be able to take advantage of:

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/) A data grid for Material-UI with paging, sorting, filtering, grouping and editing features ([custom license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables) Адаптируемые таблицы данных для Material-UI с фильтрацией, сортировкой, поиском и многим другим.
- [material-table](https://github.com/mbrn/material-table) Таблицы данных основанные на компоненте таблицы, с дополнительной функциональностью, такой как: поиск, фильтрация, сортировка и многое другое.
- [mui-virtualized-table](https://github.com/techniq/mui-virtualized-table) Виртуализированная таблица для Material-UI.