export const SurrealIdMapper = (id: string) => {
	const [_, ...restId] = id.split(':');
	return restId.join(':');
};
