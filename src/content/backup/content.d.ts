declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"backup": {
"ai-twitter-bio-generator.md": {
	id: "ai-twitter-bio-generator.md";
  slug: "ai-twitter-bio-generator";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"astro-bento.md": {
	id: "astro-bento.md";
  slug: "astro-bento";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"beauty-by-jitka.md": {
	id: "beauty-by-jitka.md";
  slug: "beauty-by-jitka";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"blood-glucose-tracker.md": {
	id: "blood-glucose-tracker.md";
  slug: "blood-glucose-tracker";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"building-a-nextjs-application-with-notion-as-a-backend.md": {
	id: "building-a-nextjs-application-with-notion-as-a-backend.md";
  slug: "building-a-nextjs-application-with-notion-as-a-backend";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"building-sites-with-astro.md": {
	id: "building-sites-with-astro.md";
  slug: "building-sites-with-astro";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"crypto-dashbord.md": {
	id: "crypto-dashbord.md";
  slug: "crypto-dashbord";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"deploying-pocketbase-on-ubuntu.md": {
	id: "deploying-pocketbase-on-ubuntu.md";
  slug: "deploying-pocketbase-on-ubuntu";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"fastapi-for-python-development.md": {
	id: "fastapi-for-python-development.md";
  slug: "fastapi-for-python-development";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"fullstack-web-store.md": {
	id: "fullstack-web-store.md";
  slug: "fullstack-web-store";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"getting-started-with-tailwindcss-in-nextjs.md": {
	id: "getting-started-with-tailwindcss-in-nextjs.md";
  slug: "getting-started-with-tailwindcss-in-nextjs";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"getting-started-with-the-chatgpt-api.md": {
	id: "getting-started-with-the-chatgpt-api.md";
  slug: "getting-started-with-the-chatgpt-api";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"gsa-rag.md": {
	id: "gsa-rag.md";
  slug: "gsa-rag";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"hckrnws.md": {
	id: "hckrnws.md";
  slug: "hckrnws";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"how-to-use-react-tailwind-and-svelte-inside-astro.md": {
	id: "how-to-use-react-tailwind-and-svelte-inside-astro.md";
  slug: "how-to-use-react-tailwind-and-svelte-inside-astro";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"kind-aesthetics.md": {
	id: "kind-aesthetics.md";
  slug: "kind-aesthetics";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"linktreez.md": {
	id: "linktreez.md";
  slug: "linktreez";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"litterbot.md": {
	id: "litterbot.md";
  slug: "litterbot";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"managing-global-state-with-solidjs-and-typescript.md": {
	id: "managing-global-state-with-solidjs-and-typescript.md";
  slug: "managing-global-state-with-solidjs-and-typescript";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"medium-article.md": {
	id: "medium-article.md";
  slug: "medium-article";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"ollama.md": {
	id: "ollama.md";
  slug: "ollama";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"project-nexum-wiki.md": {
	id: "project-nexum-wiki.md";
  slug: "project-nexum-wiki";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"raspberry-pi-server-dashboard.md": {
	id: "raspberry-pi-server-dashboard.md";
  slug: "raspberry-pi-server-dashboard";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"rugged-development.md": {
	id: "rugged-development.md";
  slug: "rugged-development";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"running-hugging-face-transformers-locally.md": {
	id: "running-hugging-face-transformers-locally.md";
  slug: "running-hugging-face-transformers-locally";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"server-dashboard.md": {
	id: "server-dashboard.md";
  slug: "server-dashboard";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"spatz.md": {
	id: "spatz.md";
  slug: "spatz";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"spatz2.md": {
	id: "spatz2.md";
  slug: "spatz2";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"stonk-ai.md": {
	id: "stonk-ai.md";
  slug: "stonk-ai";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"stonkbot.md": {
	id: "stonkbot.md";
  slug: "stonkbot";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"svelteflix.md": {
	id: "svelteflix.md";
  slug: "svelteflix";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"sveltekit-landing-page-with-daisyui.md": {
	id: "sveltekit-landing-page-with-daisyui.md";
  slug: "sveltekit-landing-page-with-daisyui";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"the-future-of-personal-compute.md": {
	id: "the-future-of-personal-compute.md";
  slug: "the-future-of-personal-compute";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"transformning-real-estate-investments-with-solana-blockchain.md": {
	id: "transformning-real-estate-investments-with-solana-blockchain.md";
  slug: "transformning-real-estate-investments-with-solana-blockchain";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"unmineable.md": {
	id: "unmineable.md";
  slug: "unmineable";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"using-cockpit-to-manage-linux-servers.md": {
	id: "using-cockpit-to-manage-linux-servers.md";
  slug: "using-cockpit-to-manage-linux-servers";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"using-direnv-for-software-development-in-linux.md": {
	id: "using-direnv-for-software-development-in-linux.md";
  slug: "using-direnv-for-software-development-in-linux";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"using-pocketbase-with-sveltekit.md": {
	id: "using-pocketbase-with-sveltekit.md";
  slug: "using-pocketbase-with-sveltekit";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"using-trpc-in-nextjs.md": {
	id: "using-trpc-in-nextjs.md";
  slug: "using-trpc-in-nextjs";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
"wally.md": {
	id: "wally.md";
  slug: "wally";
  body: string;
  collection: "backup";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"posts": Record<string, {
  id: string;
  collection: "posts";
  data: any;
}>;

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
