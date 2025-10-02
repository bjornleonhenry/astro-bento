// Outputs: /builtwith.json



export async function GET({params, request}: {params: any, request: any}) {
  return new Response(
    JSON.stringify({
      msg: 'Hello World!',
      app: 'bjornleonhenry',
      repository: 'https://github.com/bjornleonhenry/astro-bento',
      version: '1.5.0',
      endpoints: [
        '/api/v1/hello.json',
        '/api/v1/fetchNowFeed.json',
        '/api/v1/fetchProjectsFeed.json',
      ],
      status: 200,
    })
  )
}