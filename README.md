# Todo App

![todo](https://cloud.githubusercontent.com/assets/5430091/17703525/a41fe46a-6397-11e6-986f-47f606714bd3.gif)

## Running the app

Clone this repo using:

```bash
git clone https://github.com/shansm/todo-app.git
cd todo-app
```

Install all dependencies with:

```bash
npm i
```

Now you'll need a backend API. I recommend [json-server](https://github.com/typicode/json-server) along with [todos-list](https://github.com/shansm/todos-list).

Once the backend is up and running you can now run this app with:

```bash
npm start
```

It will start a local server using `webpack-dev-server` and then head over to `http://localhost:8080`.

## Testing

#### 1. Unit Tests

* single run: `npm test`
* live mode (TDD style): `npm run test-watch`

#### 2. End-to-End Tests (aka. e2e, integration)

* in a tab, *if not already running!*: `npm start`
* in a new tab: `npm run webdriver-start`
* in another new tab: `npm run e2e`
