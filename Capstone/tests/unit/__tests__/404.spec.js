import ReactDOMServer from 'react-dom/server';
const Custom404 = require('../../../pages/404')

describe("Test 404 text", () => {
	test("it should return the correct html", () => {
		const output = '<h1>404 - Page Not Found</h1>'
		const value = ReactDOMServer.renderToStaticMarkup(Custom404.default())
		expect(value).toEqual(output)
	})
})