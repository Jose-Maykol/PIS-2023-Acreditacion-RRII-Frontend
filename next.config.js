/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/auth/login',
				permanent: true
			},
			{
				source: '/dashboard/standards/:id',
				destination: '/dashboard/standards/:id/narrative',
				permanent: true
			}
		]
	}
}