export async function searchProvider(query: string | null, page: number, location: string): Promise<Response> {
  try {
    const data = await Deno.readTextFile("./data/MPN link.txt");
    const providers = data.split('\n')
      .filter(line => (!query || line.toLowerCase().includes(query.toLowerCase())) &&
                      (!location || line.toLowerCase().includes(location.toLowerCase())));

    const limit = 10;  // Limit results per page
    const paginated = providers.slice((page - 1) * limit, page * limit);

    return new Response(JSON.stringify({
      providers: paginated,
      totalPages: Math.ceil(providers.length / limit),
    }), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error in searchProvider:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
