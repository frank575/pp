import { rest } from 'msw'
import { createStorage, waitFunc } from '@/mocks/lib'

const storage = createStorage({
	authTime: 0,
	users: [],
})

const login = rest.post('/api/login', async (req, res, ctx) => {
	await waitFunc()
	const { username, password } = req.body
	if (
		storage.users.some(e => e.username === username && e.password === password)
	) {
		storage.authTime = 3
		return res(
			ctx.status(200),
			ctx.json({
				token: '這是token，三次訪問後將被掛消',
				message: '登入成功',
				success: true,
			}),
		)
	}
	return res(
		ctx.status(500),
		ctx.json({
			message: '請輸入正確的帳號或密碼',
			success: false,
		}),
	)
})

const register = rest.post('/api/register', async (req, res, ctx) => {
	await waitFunc()
	const { username, password } = req.body
	if (username == null || password == null) {
		return res(
			ctx.status(500),
			ctx.json({
				message: '帳號或密碼不得為空',
				success: false,
			}),
		)
	}
	if (storage.users.some(e => e.username === username)) {
		return res(
			ctx.status(500),
			ctx.json({
				message: '該用戶已存在',
				success: false,
			}),
		)
	}
	if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(username)) {
		return res(
			ctx.status(500),
			ctx.json({
				message: '帳號格式錯誤',
				success: false,
			}),
		)
	}
	if (
		typeof password !== 'string' ||
		password.length < 4 ||
		password.length > 8 ||
		!/^[A-z]\d+[A-z]$/.test(password)
	) {
		return res(
			ctx.status(500),
			ctx.json({
				message: '密碼格式錯誤',
				success: false,
			}),
		)
	}
	storage.users = [{ username, password }, ...storage.users]
	return res(
		ctx.status(200),
		ctx.json({
			message: '註冊成功',
			success: true,
		}),
	)
})

const authentication = rest.get(
	'/api/authentication',
	async (req, res, ctx) => {
		await waitFunc()
		// Check if the user is authenticated in this session
		const isAuthenticated = sessionStorage.getItem('is-authenticated')

		if (!isAuthenticated) {
			// If not authenticated, respond with a 403 error
			return res(
				ctx.status(403),
				ctx.json({
					errorMessage: 'Not authorized',
				}),
			)
		}

		// If authenticated, return a mocked user details
		return res(
			ctx.status(200),
			ctx.json({
				username: 'admin',
			}),
		)
	},
)

export const handlers = [login, register, authentication]
