const fs = require('fs')
const dotenv = require('dotenv')

// 環境注入
console.log(`[START] set env`)
for (const file of [`.env`, `.env.${process.env.APP_ENV}`]) {
	try {
		const f = fs.readFileSync(file)
		const envConfig = dotenv.parse(f)
		for (const k in envConfig) {
			process.env[k] = envConfig[k]
		}
	} catch (err) {}
}
console.log(`[END] set env`)
