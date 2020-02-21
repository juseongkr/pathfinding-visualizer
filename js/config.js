const CONFIG = {
	WIDTH: 35,
	HEIGHT: 35,
	START_X: 0,
	START_Y: 0,
	END_X: 1,
	END_Y: 1,

	DIR: 4,
	DX: [0, 1, 0, -1],
	DY: [1, 0, -1, 0],

	WALL_CNT: 3,
	SPEED: 20,

	STYLE: {
		width: "20px",
		height: "20px",
		padding: "0px",
		margin: "0px",
		textAlign: "center",
		border: "solid #30446B 0.1em",
	},

	COLORS: {
		START: "#0046CF",
		END: "#AB283F",
		WALL: "#5E646F",
		GO: "#8FDE93",
		PATH: "#C1B04E",
		PATTERN: ["#C2D7E8", "#A5C4DD"],
	},
};

let options = {
	command: "WALL",
	type: "bfs",
}