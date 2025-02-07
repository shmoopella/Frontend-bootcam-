#  Day 00 - Frontend boot camp


## Contents

1. [Chapter I](#chapter-i)
2. [Chapter II](#chapter-ii) \
   2.1. [Типы данных](#типы-данных) \
   2.2 [Объявление переменных и область видимости](#объявление-переменных-и-область-видимости)
3. [Chapter III](#chapter-iii) \
   3.1 [Операторы сравнения](#операторы-сравнения) \
   3.2 [Условные операторы ](#условные-операторы ) \
   3.3 [Логические операторы](#логические-операторы) \
   3.4 [Циклы](#циклы) \
   3.5 [Методы массивов, строк и объектов](#методы-массивов-строк-и-объектов)
 4. [Chapter IV](#chapter-iv) \
   4.1 [Функции](#функции) \
   4.2 [Замыкания](#замыкания) \
   4.3 [Всплытие](#всплытие) \
   4.4 [Каррирование](#каррирование) \
   4.5 [Рекурсия](#рекурсия)
<br>

Перед началом изучения ознакомься с [инструкцией](./materials/Instructions.md) и убедись, что у тебя установлены все необходимые инструменты для выполнения заданий.

## Chapter I

JavaScript (JS) - мультипарадигменный язык программирования, который используют для написания frontend и backend-частей сайтов, а также мобильных приложений.
Это язык программирования высокого уровня, на основе которого код читается понятно.
Во frontend-части сайтов язык используют для создания интерактива (анимаций, всплывающих форм, автозаполнения), так как он связан и может манипулировать HTML и CSS.

HTML - это язык разметки, который используется для визуального и смыслового структурирования web контента, например, для определения параграфов, заголовков, таблиц данных или добавления изображений и видео на страницу.  

CSS - это язык стилей, с помощью которого мы придаём стиль отображения нашего HTML контента, например, придаём цвет фону (background) и шрифту, придаём контенту многоколоночный вид.

Где применяется:  
1. Клиентская часть веб—приложений (frontend).
Это интерфейс страницы, то есть всё, что видит пользователь: контент, кнопки, формы обратной связи, меню и др..
С помощью JS интерфейс реагирует на действия пользователя (клики мыши, нажатия клавиш), также язык отвечает за запоминание данных и автозаполнение форм.

2. Серверная часть веб—приложений (backend).
Серверный код пишут на платформе Node.js. На JS работают, например, запросы AJAX (asynchronous javascript and XML), которые отправляются на сервер в фоновом режиме без перезагрузки веб-страницы, и push-уведомления — всплывающие сообщения в браузере, которые реализуются с помощью технологии Comet.
Такие уведомления приходят со специального Comet-сервера, который постоянно поддерживает соединение с браузером. Как раз с помощью JavaScript устанавливается данное соединение.

3. Мобильные приложения на Android, iOS — когда нужно кросс-платформенное приложение или адаптация веб-приложения.

Подробнее об истории создания JavaScript можно узнать в [статье](https://habr.com/ru/company/livetyping/blog/324196/).

## Chapter II
### Типы данных

[_В JavaScript есть 8 основных типов данных_](./materials/JS_types.md)


### Объявление переменных и область видимости
Переменную можно объявить тремя способами c помощью ключевых слов «var» , «let» и  «const».
<br>

**JavaScript является слабо типизированным или динамическим языком**.  Это значит, что тебе не нужно определять тип переменной заранее. 

Переменные, объявленные с помощью ключевых слов const и let могут иметь блочную, функциональную или модульную область видимости, а переменные, объявленные с помощью ключевого слова var, не имеют блочной области видимости.

Блочная область видимости означает, что переменная будет доступна только в текущем блоке, в котором была объявлена (функция, блок if/else etc).

## Chapter III
### Операторы сравнения

Многие операторы сравнения известны из математики.
Операторы сравнения сравнивают значения операндов и возвращают логическое значение – true или false в зависимости от результатов проверки.

### Условные операторы

Существуют несколько форм условных операторов в JavaScript:

`-` Условный оператор if (с одной ветвью)

`-` Тернарный оператор (?:)

`-` Оператор выбора switch

### Логические операторы

`-` && - логическое "И"

`-` || - логическое "ИЛИ"

`-` ! - логическое "НЕ"

`-` ?? - оператор нулевого слияния (который возвращает значение правого операнда, когда значение левого операнда равно null или undefined, в противном случае будет возвращено значение левого операнда)

### Циклы

При написании кода часто необходимо совершить однотипное действие несколько раз, тогда на помощь приходят циклы.
В JavaScript есть [несколько видов циклов](./materials/Cycles.md).


**Задание 1.**  
Тебе нужно написать функцию, которая принимает в качестве аргумента массив чисел и удаляет все повторяющиеся значения.
Напиши функцию с ипользованием 2 разных циклов.

```
function removeReps(array) {}

removeReps([1, 1, 2, 4, 5, 6, 6, 8, 9, 11]); // Вывод [1,2,4,5,6,8,9,11]
```
| Ввод          | Вывод                
| ------------- |:------------------:| 
| removeReps([1, 1, 2, 4, 5, 6, 6, 8, 9, 11])           |         [1,2,4,5,6,8,9,11]          |
| removeReps([1,1,1,1])                                 |         [1]                         |
| removeReps([1,2,3,4,5,6])                             |        [1,2,3,4,5,6]                |


Заготовки для функций ты можешь найти по [ссылке](./src//chapter_3/removeReps.js).

### Методы массивов, строк и объектов

Все значения в JavaScript, за исключением null и undefined, содержат набор вспомогательных функций и значений.
Такие функции называют «методами», а значения – «свойствами».

<br>
Пример вызова метода:

```
const string = 'STRING'
console.log(string.toLowerCase()); //string
```

Подробнее о разных методах можно узнать в следующих материалов: \
`-` [Методы массивов](https://habr.com/ru/company/plarium/blog/483958) \
`-` [Методы строк](https://html5css.ru/js/js_string_methods.php) \
`-` [Методы объектов](https://www.8host.com/blog/metody-obektov-v-javascript) 
<br>


**Задание 2.** 
<br>
Напиши функцию, которая на вход принимает две строки - сообщение (обычная строка с текстом) и символ, который надо удалить из этого сообщения.
**Обязательно используй методы и циклы, которые ты изучил.**


| Ввод          | Вывод                
| ------------- |:------------------:| 
| removeString("Большое и интересное сообщение", "о")          |         Бльше и интересне сбщение          |
| removeString("Hello world!", "z")                            |         Hello world!                       |
| removeString("А роза азора", "А")                            |         роза азора                         |

Заготовки для функций ты можешь найти по [ссылке](./src//chapter_3/removeSymbol.js)


## Chapter IV
### Функции

Функция в JavaScript - это специальный тип объектов, позволяющий формализовать средствами языка определённую логику поведения и обработки данных. Важно понимать разницу между Function expression, Function Declaration и  Arrow function.

Область видимости функций:
Переменные, объявленные в функции, не могут быть доступными где-нибудь вне этой функции, поэтому переменные (которые нужны именно для функции) объявляют только в scope функции.
При этом функция имеет доступ ко всем переменным и функциям, объявленными внутри её scope.

<br>

### Замыкания

JavaScript формирует так называемые замыкания. Замыкание — это комбинация функции и лексического окружения, в котором данная функция была объявлена.
<br>


**Задание 3.** 
<br>
Напиши функцию counter, которая при каждом вызове будет возвращать число на 3 больше, чем в прошлый. Нельзя использовать переменные, объявленные через var!

```
function counter() {}

counter(); // Функция вернет 0
counter(); // Функция вернет 3
counter(); // Функция вернет 6
counter(); // Функция вернет 9

```

[Заготовки для функций](./src//chapter_4/counter.js).

<br>

### Всплытие

Этап создания - это этап, в котором JavaScript-движок вызвал функцию, но само ее выполнение еще не началось.
На этапе создания контекста JavaScript-движок находится на фазе компиляции (сборки), то есть он сначала просматривает и анализирует код данной функции для последующего выполнения. На этапе создания все переменные получают значения undefined, независимо от того, какое значение им присвоено в коде, на следующем этапе - этапе исполнения - переменным присваивается фактическое значение. При таком поведении мы имеем возможность обратиться к переменной до её объявления и в результате получим undefined - данный эффект называется эффект всплытия (hoisting).

<br>

### Каррирование

Каррирование – продвинутая техника для работы с функциями, которая используется не только в JavaScript, но и в других языках.
Цель каррирования – это трансформация функций таким образом, чтобы они принимали аргументы не как f(a, b, c), а как f(a)(b)(c).

**Задание 4.**   
Тебе нужно описать ряд функций, которые могут принимать в качестве необязательного аргумента callback. Если такой аргумент есть, то передать число n в этот коллбек, иначе просто вернуть число n.

Например, функция one может принять в качестве аргумента функцию sum, тогда в return будет sum(1). Если же в функцию не передали ничего, то она просто вернет 1.
Также надо написать 4 функции основных арифмитических операторов, которые принимают в качестве аргумента первое число, а возвращают функцию, которая принимает в качестве аргумента второе число и возвращает их сумму/разность/частное/произведение.

| Ввод          | Вывод                
| ------------- |:------------------:| 
| four()                           |         4          |
| five(mult(three()))              |         15         |
|  one(mult(three(plus(four()))))  |         7          |

[Заготовки для функций](./src//chapter_4/calculator.js).

<br>

### Рекурсия

Рекурсивной функцией является функция, которая в теле вызывает сама себя.
<br>

**Задание 5.**  
Напиши функцию, которая будет принимать координаты числа в треугольнике Паскаля и будет возвращать значение по координатам. 
Перед выполнением задания, необходимо подробнее изучить треугольник Паскаля.
Начальные координаты: \[0;0]. \
Возможно, тут поможет рекурсия.


| Ввод          | Вывод                
| ------------- |:------------------:| 
| pascalsTriangle(3,2)           |         3          |
| pascalsTriangle(5,4)           |         5          |
| pascalsTriangle(1,1)           |         1          |

Заготовки для функций ты можешь найти по [ссылке](./src//chapter_4/pascalsTriangle.js).
<br>

**Задание 6.**   
Напиши функцию, которая принимает индекс числа из ряда Фибоначчи и возвращает его значение \
Предположим, что ряд Фибоначчи начинается с 0 индекса \
Предположим, что ряд Фибоначчи представлен как  1,1,2,3,5,8,13 ...... 


| Ввод          | Вывод                
| ------------- |:------------------:| 
| fibo(5)           |         8          |
| fibo(1)           |         1          |
| fibo(8)           |        34          |
| fibo(21)          |        17711       |


Заготовки для функций ты можешь найти по [ссылке](./src//chapter_4/fibonacci.js).


<br>

**Задание 7.**  
Напиши функцию, описывающую базовое поведение банкомата, которая принимает на вход число и возвращает объект в формате  {номинал_купюры : количество_купюр}. \
Условия работы функции:

`-` Если банкомат не может выдать данную сумму, то выводится ошибка 'Incorrect value'

`-` Купюры должны выдаться оптимальным образом (вместо 5 купюр номиналом 1000 выдается одна 5000)

`-` За раз банкомат может выдавать не более 20 купюр, если купюр для выдачи не хватает, то выводится ошибка 'Limit exceeded'

```
function atm(sum) {
  const banknots = [5000, 2000, 1000, 500, 200, 100, 50];
}
Пример работы функции:
atm(8350); // {5000 : 1, 2000 : 1, 1000 : 1, 200 : 1, 100 : 1, 50 : 1 }
atm(2570); // Incorrect value
atm(100050); // Limit exceeded
```
| Ввод          | Вывод                
| ------------- |:------------------:| 
| atm(8350)                                       |         {5000 : 1, 2000 : 1, 1000 : 1, 200 : 1, 100 : 1, 50 : 1 }          |
| atm(2570)                                       |         Incorrect value                                                    |
| atm(100050)                                     |         limit exceeded                                                     |


Заготовки для функций ты можешь найти по [ссылке](./src//chapter_4/atm.js).

<br>

**Задание 8.**  
В данной задаче нужно будет написать алгоритм поиска, который скажет, можно ли найти входное слово в головоломке поиска слов, которая тоже подается функции на вход.  
Данная задача имеет два уровня сложности:  

`-` Первый уровень включает в себя исключительно поиск по вертикали и по горизонтали.

`-` Второй уровень дополнительно включает в себя поиск по диагонали.

`-` Слова могут быть записаны слева направо и наоборот.

Пример головоломки и результат вывода можно найти по [ссылке](./src//chapter_4/wordSearch.js).

<br>

И финальное задание на сегодня. Оно является дополнительным! Здесь тебе понадобятся знания, полученные в ходе изучения тем и выполенения предыдущих заданий.

**Задание 9.**  
Тебе нужно написать функцию для решения Судоку. Функция принимает один аргумент - строку, в которой на месте пропущенных цифр стоят -.
Функция должна вернуть строку, в которой все значения будут заполнены.

Сыграем в настоящую головоломку Судоку, обращая внимание на то, как приближаемся к решению поставленной задачи.

`-`  Какие стратегии мы принимаем и почему?

`-`  Как мы выбираем с чего начать?

`-`  Как мы узнаем, когда действительно следует поставить число в клетку?

`-`  Что мы делаем, когда окончательно не знаем, как заполнить остальные клетки?

Обязательно реализуй метод `prettyBoard`, который берет доску, записанную в строчку, и возвращает отформатированный вариант, более привычный для нашего визуального восприятия. Например:

```
1 - 5 8 - 2 - - -
- 9 - - 7 6 4 - 5
2 - - 4 - - 8 1 9
- 1 9 - - 7 3 - 6
7 6 2 - 8 3 - 9 -
- - - - 6 1 - 5 -
- - 7 6 - - - 3 -
4 3 - - 2 - 5 - 1
6 - - 3 - 8 9 - -
```


| Ввод          | Вывод                
| ------------- |:------------------:| 
| sudoku("53--7----6--195----98----6-8---6---34--8-3--17---2---6-6----28----419--5----8--79") | <img width="136" alt="Screenshot 2022-04-18 at 20 36 18" src="https://user-images.githubusercontent.com/46561905/163840787-2a2248b5-2cb4-43e3-9837-cc9a4564db9b.png"> |



[В файле задания](./src//chapter_4/sudoku.js) представлены тестовые данные для твоей функции, они имеют 3 уровня сложности:

`-`  Пять головоломок могут быть решены с помощью базовой логики

`-`  Пять - требуют немного более продвинутой логики

`-`  Пять - требуют от твоего решателя умения угадывать и перерешивать, если зашёл в тупик

Удачи!)

