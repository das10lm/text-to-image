import { Ai } from './vendor/@cloudflare/ai.js';

export default {
	async fetch(request, env) {
		const ai = new Ai(env.AI);

		const url = new URL(request.url);

		const params = url.searchParams;
		const promptText = params.get('prompt');

		if (promptText && promptText.trim()) {
			const inputs = {
				prompt: promptText ?? 'cyberpunk cat',
			};

			const response = await ai.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', inputs);

			return new Response(response, {
				headers: {
					'content-type': 'image/png',
				},
			});
		} else {
			return new Response("Please provide a text with 'prompt' query parameter to generate a image");
		}
	},
};
