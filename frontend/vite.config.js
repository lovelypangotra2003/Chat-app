import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000, //client side is at server 3000
		proxy: {
			"/api": {
				target: "http://localhost:8000",//backend server is running on port 8000
			},
		},
	},
});
