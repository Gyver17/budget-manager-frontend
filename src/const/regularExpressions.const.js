const expressions = {
	uuid: /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/,
	userName: /^[a-zA-Z0-9_-]{4,16}$/,
	name: /^[a-zA-ZÀ-ÿ\s.]{1,40}$/,
	concept: /^[a-zA-ZÀ-ÿ0-9\s.,]{0,60}$/,
	password: /^[a-zA-Z0-9_-]{4,12}$/,
	//date: /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/,
};

export { expressions };
